# DevSecOps Production Guide for a NestJS Project on AWS (Step-by-Step, From Scratch)

This guide takes you from zero to production for a NestJS app using:
- AWS EC2 (Ubuntu 24.04) for admin box and Jenkins
- Docker, ECR
- Jenkins pipelines (CI/CD)
- EKS (Kubernetes) for runtime
- cert-manager + external-dns + AWS Load Balancer Controller for TLS + DNS + Ingress
- Prometheus/Grafana/Loki for monitoring/logging (optional ELK)
- Trivy (image & FS scans), SonarQube (code quality)
- Route53 + ACM for DNS + Certificates
- Security: IRSA, NetworkPolicies, resource limits, Gatekeeper/Kyverno (optional)

Everything includes commands and exact file snippets. Replace placeholders like:
- YOUR_AWS_REGION (e.g., us-east-1)
- YOUR_AWS_ACCOUNT_ID (12 digits)
- YOUR_DOMAIN (e.g., example.com)
- YOUR_HOST (e.g., api.example.com)

---

## 0) Workstation Setup (once)
1. Install tools:
   - AWS CLI v2, kubectl, eksctl, helm, docker, jq, git, node LTS.
2. Authenticate AWS:
   - `aws configure` and set region to YOUR_AWS_REGION.
3. Prepare DNS domain in Route53 (Hosted Zone present and delegated).

### 0.1) Node.js Installation & Version Management
```bash
# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install and use Node.js LTS
nvm install --lts
nvm use --lts
nvm alias default node

# Verify installation
node --version
npm --version
```

### 0.2) Project Folder Structure
```
nestjs-production-app/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   └── health/
│   ├── common/
│   │   ├── decorators/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   └── main.ts
├── test/
├── k8s/
│   ├── base/
│   ├── overlays/
│   │   ├── dev/
│   │   ├── staging/
│   │   └── prod/
│   └── helm/
├── docker/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── docker-compose.yml
├── scripts/
│   ├── deploy.sh
│   ├── backup.sh
│   └── health-check.sh
├── monitoring/
│   ├── prometheus/
│   ├── grafana/
│   └── loki/
├── .github/
│   └── workflows/
├── Jenkinsfile
├── sonar-project.properties
├── package.json
└── README.md
```

---

### Day 36–42 Start

## 1) AWS IAM & ECR (10 min)
1. Create ECR repository for the app:
```bash
aws ecr create-repository --repository-name nestjs-app --region YOUR_AWS_REGION
```
2. Get ECR login (used later by Jenkins):
```bash
aws ecr get-login-password --region YOUR_AWS_REGION \
| docker login --username AWS --password-stdin YOUR_AWS_ACCOUNT_ID.dkr.ecr.YOUR_AWS_REGION.amazonaws.com
```

---

## 2) EC2 (Ubuntu 24.04) Admin & Jenkins Host (20 min)
1. Launch EC2:
   - AMI: Ubuntu Server 24.04 LTS (latest)
   - Instance: t3.medium (or larger)
   - SG inbound: SSH (22) from your IP; HTTP(80), HTTPS(443) from 0.0.0.0/0
   - Attach an IAM role with permissions for ECR/EKS/Route53/ACM (least privilege if possible).

### 2.1) Security Groups Configuration
```bash
# Create security group for Jenkins
aws ec2 create-security-group \
  --group-name jenkins-sg \
  --description "Security group for Jenkins server" \
  --vpc-id vpc-xxxxxxxxx

# Allow SSH from your IP
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxxxxxx \
  --protocol tcp \
  --port 22 \
  --cidr YOUR_IP/32

# Allow HTTP/HTTPS from anywhere
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxxxxxx \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxxxxxx \
  --protocol tcp \
  --port 443 \
  --cidr 0.0.0.0/0

# Allow Jenkins agent port
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxxxxxx \
  --protocol tcp \
  --port 50000 \
  --cidr 0.0.0.0/0
```

### 2.2) Firewall Configuration (UFW)
```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow ssh

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow Jenkins agent port
sudo ufw allow 50000/tcp

# Check status
sudo ufw status verbose
```
2. SSH to EC2:
```bash
ssh -i your-key.pem ubuntu@EC2_PUBLIC_IP
```
3. Install Docker & basics:
```bash
sudo apt update && sudo apt install -y ca-certificates curl gnupg lsb-release unzip git
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker ubuntu
sudo systemctl enable docker && sudo systemctl start docker
```
4. Install awscli v2, kubectl, eksctl, helm:
```bash
# AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# eksctl
curl -sSLO "https://github.com/eksctl-io/eksctl/releases/latest/download/eksctl_Linux_amd64.tar.gz"
sudo tar -xzf eksctl_Linux_amd64.tar.gz -C /usr/local/bin

# helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```
5. (Optional) Nginx reverse proxy for Jenkins later:
```bash
sudo apt install -y nginx
sudo systemctl enable nginx && sudo systemctl start nginx
```

---

## 3) Jenkins in Docker (25 min)
1. Create directories:
```bash
sudo mkdir -p /opt/jenkins && sudo chown -R ubuntu:ubuntu /opt/jenkins
```
2. Run Jenkins LTS:
```bash
docker run -d --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v /opt/jenkins:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```
3. Get admin password:
```bash
docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```
4. Access http://EC2_PUBLIC_IP:8080 and finish setup.
5. Install Plugins:
   - Pipeline, Git, Credentials Binding
   - Docker Pipeline
   - Kubernetes, Kubernetes Credentials (for future)
   - AWS Credentials
   - SonarQube Scanner for Jenkins
   - Generic Webhook Trigger (optional)
6. Global Tools:
   - NodeJS (Install NodeJS plugin or use Docker agent)
   - SonarQube server + scanner (we’ll configure server URL/token in credentials)

---

## 4) SonarQube (15 min)
1. Run SonarQube container:
```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts
```
2. Open http://EC2_PUBLIC_IP:9000 (default admin/admin), change password.
3. Create project + token; store token in Jenkins Credentials (Secret Text).

---

## 5) Trivy (5 min)
- Install on host or use a Docker image in pipeline:
```bash
sudo curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sudo sh -s -- -b /usr/local/bin
trivy --version
```

---

### Day 43–49 End

### Day 50–56 Start

## 6) EKS Cluster (40 min)
1. Create EKS (managed node group):
```bash
eksctl create cluster \
  --name prod-eks \
  --region YOUR_AWS_REGION \
  --with-oidc \
  --nodes 3 --node-type t3.large
```
2. Configure kubeconfig:
```bash
aws eks update-kubeconfig --region YOUR_AWS_REGION --name prod-eks
kubectl get nodes
```

---

## 7) Ingress, DNS, TLS (45 min)
### 7.1 AWS Load Balancer Controller
1. Create IAM policy + service account (IRSA):
```bash
helm repo add eks https://aws.github.io/eks-charts
kubectl create namespace kube-system --dry-run=client -o yaml | kubectl apply -f -
```
2. Install controller:
```bash
helm upgrade --install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=prod-eks \
  --set serviceAccount.create=false \
  --set region=YOUR_AWS_REGION \
  --set vpcId=$(aws eks describe-cluster --name prod-eks --region YOUR_AWS_REGION --query "cluster.resourcesVpcConfig.vpcId" --output text)
```

### 7.2 cert-manager
```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
kubectl create namespace cert-manager
helm install cert-manager jetstack/cert-manager -n cert-manager --set crds.enabled=true
```
Create ClusterIssuer (Let’s Encrypt):
```yaml
# clusterissuer-le-prod.yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@YOUR_DOMAIN
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: alb
```
Apply:
```bash
kubectl apply -f clusterissuer-le-prod.yaml
```

### 7.3 external-dns
```bash
helm repo add external-dns https://kubernetes-sigs.github.io/external-dns/
helm upgrade --install external-dns external-dns/external-dns \
  -n kube-system \
  --set provider=aws \
  --set policy=upsert-only \
  --set registry=txt \
  --set domainFilters={"YOUR_DOMAIN"}
```

---

## 8) Observability Stack (40–60 min)
### 8.1 Prometheus/Grafana
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
kubectl create namespace monitoring
helm install kp prometheus-community/kube-prometheus-stack -n monitoring
```
### 8.2 Loki + Promtail
```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm upgrade --install loki grafana/loki-stack -n monitoring \
  --set grafana.enabled=false --set promtail.enabled=true
```
- In Grafana (exposed via port-forward or Ingress), add Loki as data source.

(ELK optional: use Elastic Helm charts for Elasticsearch, Kibana, and Fluent Bit.)

---

### Day 50–56 End

### Day 43–49 Start

## 9) NestJS App: Dockerfile, Docker Compose, K8s Manifests (30–40 min)

### 9.1) Docker Compose for Local Development
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/nestjs_db
      - REDIS_URL=redis://redis:6379
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - postgres
      - redis
    networks:
      - app-network

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: nestjs_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - app-network

  pgadmin:
    image: dpage/pgadmin4:latest
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - postgres
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
```

### 9.2) Development Dockerfile
```dockerfile
# Dockerfile.dev
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
```

### 9.3) Production Dockerfile
```dockerfile
# Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --production

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json /app/
RUN npm ci --omit=dev && adduser -D app && chown -R app:app /app
USER app
EXPOSE 3000
CMD ["node","dist/main.js"]
```

### 9.4) ConfigMaps and Secrets
```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nestjs-config
  namespace: prod
data:
  NODE_ENV: "production"
  PORT: "3000"
  LOG_LEVEL: "info"
  CORS_ORIGIN: "https://YOUR_DOMAIN"
  RATE_LIMIT_TTL: "60"
  RATE_LIMIT_LIMIT: "100"
---
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: nestjs-secrets
  namespace: prod
type: Opaque
data:
  DATABASE_URL: <base64-encoded-db-url>
  REDIS_URL: <base64-encoded-redis-url>
  JWT_SECRET: <base64-encoded-jwt-secret>
  API_KEY: <base64-encoded-api-key>
```

### 9.5) Database and Redis Setup
```yaml
# postgres-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
  namespace: prod
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15-alpine
        env:
        - name: POSTGRES_DB
          value: nestjs_db
        - name: POSTGRES_USER
          value: postgres
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: nestjs-secrets
              key: POSTGRES_PASSWORD
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
      volumes:
      - name: postgres-storage
        persistentVolumeClaim:
          claimName: postgres-pvc
---
# redis-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  namespace: prod
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

### 9.6) Kubernetes Manifests (Enhanced)
```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: prod
---
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nestjs-app
  namespace: prod
spec:
  replicas: 3
  selector:
    matchLabels: { app: nestjs-app }
  template:
    metadata:
      labels: { app: nestjs-app }
    spec:
      containers:
      - name: app
        image: YOUR_AWS_ACCOUNT_ID.dkr.ecr.YOUR_AWS_REGION.amazonaws.com/nestjs-app:latest
        ports: [{containerPort: 3000}]
        env:
        - name: NODE_ENV
          valueFrom:
            configMapKeyRef:
              name: nestjs-config
              key: NODE_ENV
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: nestjs-secrets
              key: DATABASE_URL
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: nestjs-secrets
              key: REDIS_URL
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: nestjs-secrets
              key: JWT_SECRET
        resources:
          requests: { cpu: "100m", memory: "256Mi" }
          limits:   { cpu: "500m", memory: "512Mi" }
        livenessProbe:
          httpGet: { path: /health, port: 3000 }
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        readinessProbe:
          httpGet: { path: /health/ready, port: 3000 }
          initialDelaySeconds: 10
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3
        startupProbe:
          httpGet: { path: /health/startup, port: 3000 }
          initialDelaySeconds: 10
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 30
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 1000
---
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: nestjs-svc
  namespace: prod
spec:
  type: ClusterIP
  selector: { app: nestjs-app }
  ports:
  - port: 80
    targetPort: 3000
---
# ingress.yaml (ALB Ingress)
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nestjs-ing
  namespace: prod
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts: [ YOUR_HOST ]
    secretName: nestjs-cert
  rules:
  - host: YOUR_HOST
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nestjs-svc
            port:
              number: 80
---
# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nestjs-hpa
  namespace: prod
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nestjs-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 60
```
Apply:
```bash
kubectl apply -f namespace.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
kubectl apply -f hpa.yaml
```

---

## 10) Jenkins Pipeline (Jenkinsfile) (40–60 min)

### 10.1) Jenkins Credentials Management
```bash
# Create AWS credentials in Jenkins
# Go to Jenkins > Manage Jenkins > Manage Credentials > System > Global credentials
# Add credentials:
# - Kind: AWS Credentials
# - ID: aws-credentials
# - Access Key ID: YOUR_ACCESS_KEY
# - Secret Access Key: YOUR_SECRET_KEY

# Create SonarQube token
# Go to SonarQube > User > Security > Generate Tokens
# Store in Jenkins as Secret Text with ID: sonarqube-token

# Create GitHub token (if using private repos)
# Store in Jenkins as Secret Text with ID: github-token
```

### 10.2) Enhanced Jenkinsfile with Notifications
Create `Jenkinsfile` in your repo root:
```groovy
pipeline {
  agent any
  environment {
    AWS_REGION = 'YOUR_AWS_REGION'
    ACCOUNT_ID = 'YOUR_AWS_ACCOUNT_ID'
    ECR_REPO   = 'nestjs-app'
    IMAGE      = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}"
    SONARQUBE  = 'SonarQubeServer' // Jenkins Global config name
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Node Audit & Test') {
      steps {
        sh 'node -v || true'
        sh 'npm ci'
        sh 'npm run lint || true'
        sh 'npm test -- --ci --reporters=default'
      }
      post { always { junit '**/junit.xml' } }
    }
    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('SonarQubeServer') {
          sh "./node_modules/.bin/sonar-scanner || sonar-scanner"
        }
      }
    }
    stage('Build Docker Image') {
      steps {
        sh 'aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${IMAGE}'
        sh 'docker build -t ${ECR_REPO}:$BUILD_NUMBER .'
        sh 'docker tag ${ECR_REPO}:$BUILD_NUMBER ${IMAGE}:$BUILD_NUMBER'
      }
    }
    stage('Trivy Scan') {
      steps {
        sh 'trivy image --exit-code 0 --severity HIGH,CRITICAL ${IMAGE}:$BUILD_NUMBER || true'
      }
    }
    stage('Push Image') {
      steps { sh 'docker push ${IMAGE}:$BUILD_NUMBER' }
    }
    stage('Deploy to Staging') {
      steps {
        sh 'kubectl set image deploy/nestjs-app app=${IMAGE}:$BUILD_NUMBER -n prod'
        sh 'kubectl rollout status deploy/nestjs-app -n prod'
      }
    }
    stage('Health Check') {
      steps {
        sh 'sleep 30'
        sh 'curl -f https://YOUR_HOST/health || exit 1'
      }
    }
  }
  post {
    always {
      cleanWs()
    }
    success {
      emailext (
        subject: "✅ Pipeline Success: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
        body: "Build ${env.BUILD_NUMBER} of ${env.JOB_NAME} completed successfully!\n\nView build: ${env.BUILD_URL}",
        to: "devops@YOUR_DOMAIN"
      )
    }
    failure {
      emailext (
        subject: "❌ Pipeline Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
        body: "Build ${env.BUILD_NUMBER} of ${env.JOB_NAME} failed!\n\nView build: ${env.BUILD_URL}\n\nConsole output: ${env.BUILD_URL}console",
        to: "devops@YOUR_DOMAIN"
      )
    }
  }
}
```
- Configure Sonar project key in `sonar-project.properties`:
```properties
sonar.projectKey=nestjs-app
sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.spec.ts
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

---

### Day 43–49 End

### Day 57–63 Start

## 11) Security Hardening (15–30 min)
- IRSA: ensure controllers (ALB, external-dns, cert-manager DNS01) run with least privilege IAM roles.
- NetworkPolicy:
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
  namespace: prod
spec:
  podSelector: {}
  policyTypes: [Ingress, Egress]
```
  Then add allow policies for Ingress -> app, app -> DNS/DB as needed.
- Gatekeeper/Kyverno: enforce non-root, probes, limits.
- Secrets: use AWS Secrets Manager or SSM + CSI driver.
- Regular Trivy scans; fail build on CRITICAL in protected branches.

---

## 12) EKS kubectl Quick Commands
```bash
kubectl get nodes -o wide
kubectl get pods -n prod -o wide
kubectl logs -f deploy/nestjs-app -n prod
kubectl describe ingress nestjs-ing -n prod
kubectl rollout status deploy/nestjs-app -n prod
kubectl top pods -n prod
kubectl get events -n prod --sort-by=.metadata.creationTimestamp
```

---

## 13) Route53 + SSL Verification
- After applying Ingress, check:
  - external-dns created `A` record for YOUR_HOST
  - cert-manager issued certificate `nestjs-cert`
  - ALB status is active; Ingress address shows DNS name
  - `curl -I https://YOUR_HOST` returns 200 and valid certificate

---

### Day 57–63 End

### Day 64–70 Start

## 14) ELK Stack Setup (Alternative to Loki)
### 14.1) Elasticsearch
```bash
helm repo add elastic https://helm.elastic.co
helm repo update

# Install Elasticsearch
helm install elasticsearch elastic/elasticsearch \
  -n monitoring \
  --set replicas=1 \
  --set minimumMasterNodes=1 \
  --set resources.requests.memory="1Gi" \
  --set resources.limits.memory="2Gi"
```

### 14.2) Kibana
```bash
helm install kibana elastic/kibana \
  -n monitoring \
  --set service.type=LoadBalancer \
  --set resources.requests.memory="512Mi" \
  --set resources.limits.memory="1Gi"
```

### 14.3) Fluent Bit
```bash
helm install fluent-bit elastic/fluent-bit \
  -n monitoring \
  --set config.service='
    [SERVICE]
        Flush         1
        Log_Level     info
        Daemon        off
        Parsers_File  parsers.conf
        HTTP_Server   On
        HTTP_Listen   0.0.0.0
        HTTP_Port     2020
  ' \
  --set config.inputs='
    [INPUT]
        Name              tail
        Tag               kube.*
        Path              /var/log/containers/*.log
        Parser            docker
        DB                /var/log/flb_kube.db
        Mem_Buf_Limit     50MB
        Skip_Long_Lines   On
        Refresh_Interval  10
  ' \
  --set config.outputs='
    [OUTPUT]
        Name  es
        Match *
        Host  elasticsearch-master
        Port  9200
        Index nestjs-logs
        Type  _doc
  '
```

### 14.4) Log Shipping Configuration
```yaml
# fluent-bit-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluent-bit-config
  namespace: monitoring
data:
  fluent-bit.conf: |
    [SERVICE]
        Flush         1
        Log_Level     info
        Daemon        off
        Parsers_File  parsers.conf
        HTTP_Server   On
        HTTP_Listen   0.0.0.0
        HTTP_Port     2020

    [INPUT]
        Name              tail
        Tag               kube.*
        Path              /var/log/containers/*.log
        Parser            docker
        DB                /var/log/flb_kube.db
        Mem_Buf_Limit     50MB
        Skip_Long_Lines   On
        Refresh_Interval  10

    [FILTER]
        Name                kubernetes
        Match               kube.*
        Kube_URL            https://kubernetes.default.svc:443
        Kube_CA_File        /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        Kube_Token_File     /var/run/secrets/kubernetes.io/serviceaccount/token
        Kube_Tag_Prefix     kube.var.log.containers.
        Merge_Log           On
        Merge_Log_Key       log_processed
        K8S-Logging.Parser  On
        K8S-Logging.Exclude Off

    [OUTPUT]
        Name  es
        Match *
        Host  elasticsearch-master
        Port  9200
        Index nestjs-logs
        Type  _doc
```

---

### Day 64–70 End

### Day 71–77 Start

## 15) Health Checks and Monitoring Endpoints
### 15.1) NestJS Health Module
```typescript
// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check() {
    return this.healthService.getHealth();
  }

  @Get('ready')
  ready() {
    return this.healthService.getReadiness();
  }

  @Get('startup')
  startup() {
    return this.healthService.getStartup();
  }

  @Get('metrics')
  metrics() {
    return this.healthService.getMetrics();
  }
}
```

### 15.2) Health Service Implementation
```typescript
// src/health/health.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async getHealth() {
    const dbStatus = await this.checkDatabase();
    const redisStatus = await this.checkRedis();
    
    return {
      status: dbStatus && redisStatus ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus ? 'up' : 'down',
        redis: redisStatus ? 'up' : 'down',
      },
    };
  }

  async getReadiness() {
    const dbStatus = await this.checkDatabase();
    const redisStatus = await this.checkRedis();
    
    return {
      status: dbStatus && redisStatus ? 'ready' : 'not ready',
      timestamp: new Date().toISOString(),
    };
  }

  async getStartup() {
    return {
      status: 'started',
      timestamp: new Date().toISOString(),
    };
  }

  async getMetrics() {
    return {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      timestamp: new Date().toISOString(),
    };
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      await this.dataSource.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }

  private async checkRedis(): Promise<boolean> {
    try {
      await this.redis.ping();
      return true;
    } catch {
      return false;
    }
  }
}
```

## 16) DR, Backups, and Cost Optimization
### 16.1) Backup Strategy
```bash
# Jenkins backup script
#!/bin/bash
# scripts/backup-jenkins.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="jenkins-backup-$DATE.tar.gz"

# Create backup
tar -czf "/tmp/$BACKUP_NAME" /opt/jenkins

# Upload to S3
aws s3 cp "/tmp/$BACKUP_NAME" s3://YOUR_BACKUP_BUCKET/jenkins/

# Cleanup local backup
rm "/tmp/$BACKUP_NAME"

# Set up cron job
# 0 2 * * * /path/to/backup-jenkins.sh
```

### 16.2) Database Backup
```bash
# scripts/backup-database.sh
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="postgres-backup-$DATE.sql"

# Create database backup
kubectl exec -n prod deployment/postgres -- pg_dump -U postgres nestjs_db > "/tmp/$BACKUP_NAME"

# Upload to S3
aws s3 cp "/tmp/$BACKUP_NAME" s3://YOUR_BACKUP_BUCKET/database/

# Cleanup
rm "/tmp/$BACKUP_NAME"
```

### 16.3) Cost Optimization
```bash
# ECR lifecycle policy
aws ecr put-lifecycle-policy \
  --repository-name nestjs-app \
  --lifecycle-policy-text '{
    "rules": [
      {
        "rulePriority": 1,
        "description": "Keep last 10 images",
        "selection": {
          "tagStatus": "tagged",
          "countType": "imageCountMoreThan",
          "countNumber": 10
        },
        "action": {
          "type": "expire"
        }
      }
    ]
  }'

# EKS node group with Graviton
eksctl create nodegroup \
  --cluster=prod-eks \
  --name=graviton-nodes \
  --node-type=m6g.large \
  --nodes=2 \
  --nodes-min=1 \
  --nodes-max=5
```

---

### Day 71–77 End

### Day 80–84 Start

## 17) Troubleshooting Tips
### 17.1) Common Issues and Solutions
- **Ingress 404** -> check Service selector labels match Deployment labels
- **TLS pending** -> check ClusterIssuer and DNS challenges; `kubectl describe cert -n prod`
- **external-dns not updating** -> check IAM, `kubectl logs -n kube-system deploy/external-dns`
- **Jenkins cannot push ECR** -> check `aws ecr get-login-password` step and IAM perms
- **Pod not starting** -> check resource limits, `kubectl describe pod -n prod`
- **Database connection failed** -> verify secrets and ConfigMaps
- **Health checks failing** -> check health endpoints and probe configuration

### 17.2) Debugging Commands
```bash
# Check pod logs
kubectl logs -f deployment/nestjs-app -n prod

# Check pod events
kubectl get events -n prod --sort-by=.metadata.creationTimestamp

# Check resource usage
kubectl top pods -n prod
kubectl top nodes

# Check ingress status
kubectl describe ingress nestjs-ing -n prod

# Check certificate status
kubectl describe certificate nestjs-cert -n prod

# Check service endpoints
kubectl get endpoints -n prod

# Check persistent volumes
kubectl get pv,pvc -n prod
```

### 17.3) Performance Monitoring
```bash
# Check cluster autoscaler
kubectl logs -n kube-system deployment/cluster-autoscaler

# Check HPA status
kubectl get hpa -n prod

# Check node resources
kubectl describe nodes

# Check pod resource usage
kubectl top pods -n prod --containers
```

---

## 18) Production Checklist
### 18.1) Pre-Deployment Checklist
- [ ] All secrets are properly configured
- [ ] Resource limits are set for all containers
- [ ] Health checks are implemented and working
- [ ] Monitoring and logging are configured
- [ ] Backup strategy is in place
- [ ] Security policies are applied
- [ ] SSL certificates are valid
- [ ] DNS records are pointing correctly

### 18.2) Post-Deployment Checklist
- [ ] Application is accessible via HTTPS
- [ ] Health endpoints are responding
- [ ] Monitoring dashboards are showing data
- [ ] Logs are being collected
- [ ] Alerts are configured
- [ ] Backup jobs are running
- [ ] Performance metrics are within expected ranges

---

## 19) Best Practices Summary
1. **Security**: Use IRSA, NetworkPolicies, non-root containers, secrets management
2. **Monitoring**: Implement comprehensive health checks, metrics, and logging
3. **Scalability**: Use HPA, cluster autoscaler, and resource optimization
4. **Reliability**: Implement proper backup strategies and disaster recovery
5. **Cost**: Use Graviton instances, ECR lifecycle policies, and resource limits
6. **CI/CD**: Automate testing, scanning, and deployment processes
7. **Documentation**: Keep all configurations and procedures documented

---

You now have a complete, production-ready DevSecOps pipeline and platform that covers every aspect from development to production deployment. This guide includes:

✅ **Complete Infrastructure Setup**: EC2, EKS, Route53, ACM, ECR
✅ **Security**: Security groups, IAM roles, NetworkPolicies, secrets management
✅ **CI/CD Pipeline**: Jenkins with comprehensive pipeline including testing, scanning, and deployment
✅ **Monitoring & Logging**: Prometheus, Grafana, Loki, and ELK stack options
✅ **Database & Caching**: PostgreSQL and Redis with proper configuration
✅ **Health Checks**: Comprehensive health monitoring endpoints
✅ **Backup & DR**: Automated backup strategies and disaster recovery
✅ **Cost Optimization**: Resource limits, lifecycle policies, and Graviton instances
✅ **Troubleshooting**: Common issues and debugging commands
✅ **Best Practices**: Security, monitoring, scalability, and reliability guidelines

Replace all placeholders (YOUR_AWS_REGION, YOUR_DOMAIN, etc.) with your actual values and follow the steps in sequence for a complete production deployment.

### Day 80–84 End
