# DevOps Interview Questions - 7 Years Experience Level (Senior Full-Stack Developer)

## Docker

### Docker Fundamentals

1. **What is Docker and why use it?**
   Docker is a containerization platform that packages applications and their dependencies into lightweight, portable containers. Benefits include consistency, scalability, and resource efficiency.

2. **Difference between Docker and Virtual Machines**
   - **Docker**: Shares host OS kernel, lightweight, faster startup
   - **VMs**: Full OS per VM, heavier, slower startup

3. **What is a Docker image vs container?**
   - **Image**: Read-only template with application code and dependencies
   - **Container**: Running instance of an image

4. **How to create a Dockerfile?**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

5. **Docker commands you use regularly**
   ```bash
   docker build -t myapp .
   docker run -d -p 3000:3000 myapp
   docker ps
   docker logs container_id
   docker exec -it container_id /bin/bash
   docker stop container_id
   docker rm container_id
   ```

6. **What is Docker Compose?**
   Docker Compose defines multi-container applications using YAML files:
   ```yaml
   version: '3.8'
   services:
     web:
       build: .
       ports:
         - "3000:3000"
     db:
       image: postgres:13
       environment:
         POSTGRES_DB: myapp
   ```

7. **Docker networking basics**
   - **Bridge**: Default network for containers
   - **Host**: Container shares host's network
   - **None**: No networking
   - **Overlay**: Multi-host networking

8. **Docker volumes and bind mounts**
   - **Volumes**: Managed by Docker, stored in Docker area
   - **Bind mounts**: Mount host directory into container

9. **Docker registry and image management**
   - **Docker Hub**: Public registry
   - **Private registries**: AWS ECR, Azure ACR, Harbor
   - **Image tagging**: `docker tag myapp:v1.0 myregistry/myapp:v1.0`

10. **Docker best practices**
    - Use multi-stage builds
    - Minimize layers
    - Use .dockerignore
    - Don't run as root
    - Use specific base image tags

## Kubernetes

### Kubernetes Fundamentals

11. **What is Kubernetes and why use it?**
    Kubernetes is a container orchestration platform that automates deployment, scaling, and management of containerized applications.

12. **Kubernetes architecture components**
    - **Master Node**: API Server, etcd, Scheduler, Controller Manager
    - **Worker Node**: kubelet, kube-proxy, container runtime

13. **What are Pods in Kubernetes?**
    Pods are the smallest deployable units in Kubernetes, containing one or more containers that share storage and network.

14. **Kubernetes basic resources**
    - **Deployment**: Manages replica sets and pods
    - **Service**: Exposes pods to network
    - **ConfigMap**: Configuration data
    - **Secret**: Sensitive data
    - **Namespace**: Virtual clusters

15. **How to create a basic deployment?**
    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: myapp-deployment
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: myapp
      template:
        metadata:
          labels:
            app: myapp
        spec:
          containers:
          - name: myapp
            image: myapp:v1.0
            ports:
            - containerPort: 3000
    ```

16. **Kubernetes services types**
    - **ClusterIP**: Internal cluster access
    - **NodePort**: Access via node IP and port
    - **LoadBalancer**: External load balancer
    - **ExternalName**: Maps to external service

17. **Kubernetes commands you use regularly**
    ```bash
    kubectl get pods
    kubectl get services
    kubectl apply -f deployment.yaml
    kubectl describe pod pod_name
    kubectl logs pod_name
    kubectl exec -it pod_name -- /bin/bash
    kubectl scale deployment myapp --replicas=5
    ```

18. **What are ConfigMaps and Secrets?**
    - **ConfigMap**: Non-sensitive configuration data
    - **Secret**: Sensitive data (passwords, tokens)

19. **Kubernetes namespaces**
    Namespaces provide virtual clusters within a physical cluster for resource isolation and organization.

20. **Kubernetes health checks**
    - **Liveness Probe**: Container is running
    - **Readiness Probe**: Container is ready to serve traffic
    - **Startup Probe**: Container has started

## Jenkins

### Jenkins Fundamentals

21. **What is Jenkins and why use it?**
    Jenkins is an open-source automation server that helps automate CI/CD pipelines for building, testing, and deploying applications.

22. **Jenkins pipeline types**
    - **Declarative Pipeline**: Structured approach with predefined syntax
    - **Scripted Pipeline**: Groovy-based scripting

23. **How to create a basic Jenkins pipeline?**
    ```groovy
    pipeline {
        agent any
        stages {
            stage('Build') {
                steps {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
            stage('Test') {
                steps {
                    sh 'npm test'
                }
            }
            stage('Deploy') {
                steps {
                    sh 'docker build -t myapp .'
                    sh 'docker push myregistry/myapp'
                }
            }
        }
    }
    ```

24. **Jenkins plugins you commonly use**
    - **Docker Pipeline**: Docker integration
    - **Git**: Source code management
    - **Blue Ocean**: Modern UI
    - **Pipeline**: Pipeline support
    - **Credentials**: Secret management

25. **Jenkins multibranch pipeline**
    Automatically creates jobs for each branch in a repository, enabling branch-based CI/CD.

26. **Jenkins shared libraries**
    Reusable pipeline code shared across multiple Jenkins jobs for consistency and maintainability.

27. **Jenkins security best practices**
    - Enable authentication
    - Use role-based access control
    - Secure credentials
    - Regular updates
    - Network security

## SonarQube

### SonarQube Fundamentals

28. **What is SonarQube and why use it?**
    SonarQube is a code quality and security analysis platform that detects bugs, vulnerabilities, and code smells in multiple programming languages.

29. **SonarQube quality gates**
    Quality gates define conditions that must be met before code can be merged, such as coverage thresholds and technical debt limits.

30. **SonarQube metrics you track**
    - **Code Coverage**: Percentage of code covered by tests
    - **Duplicated Lines**: Code duplication percentage
    - **Technical Debt**: Time to fix all issues
    - **Maintainability Rating**: Code maintainability score
    - **Reliability Rating**: Bug-free code score
    - **Security Rating**: Security vulnerability score

31. **How to integrate SonarQube with CI/CD?**
    ```bash
    # In Jenkins pipeline
    stage('SonarQube Analysis') {
        steps {
            sh 'sonar-scanner -Dsonar.projectKey=myproject -Dsonar.sources=.'
        }
    }
    ```

32. **SonarQube rules and custom rules**
    SonarQube provides predefined rules for different languages and allows custom rule creation for specific coding standards.

## Trivy

### Trivy Fundamentals

33. **What is Trivy and why use it?**
    Trivy is a vulnerability scanner that detects security vulnerabilities in container images, file systems, and Git repositories.

34. **How to scan Docker images with Trivy?**
    ```bash
    trivy image myapp:latest
    trivy image --severity HIGH,CRITICAL myapp:latest
    trivy image --format json myapp:latest
    ```

35. **Trivy integration in CI/CD**
    ```bash
    # In Jenkins pipeline
    stage('Security Scan') {
        steps {
            sh 'trivy image --exit-code 1 --severity HIGH,CRITICAL myapp:latest'
        }
    }
    ```

36. **Trivy for infrastructure scanning**
    Trivy can scan infrastructure as code files (Terraform, CloudFormation) for security misconfigurations.

## Prometheus and Grafana

### Prometheus Fundamentals

37. **What is Prometheus and why use it?**
    Prometheus is a monitoring and alerting system that collects metrics from configured targets and provides querying capabilities.

38. **Prometheus data model**
    - **Metrics**: Time series data
    - **Labels**: Key-value pairs for metric identification
    - **Queries**: PromQL for data retrieval

39. **Prometheus metrics types**
    - **Counter**: Monotonically increasing values
    - **Gauge**: Values that can go up or down
    - **Histogram**: Distribution of values
    - **Summary**: Quantiles of values

40. **How to expose metrics in applications?**
    ```javascript
    const prometheus = require('prom-client');
    const httpRequestDuration = new prometheus.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status']
    });
    ```

41. **Prometheus configuration**
    ```yaml
    global:
      scrape_interval: 15s
    scrape_configs:
      - job_name: 'myapp'
        static_configs:
          - targets: ['localhost:3000']
    ```

### Grafana Fundamentals

42. **What is Grafana and why use it?**
    Grafana is a visualization and analytics platform that creates dashboards from various data sources including Prometheus.

43. **Grafana dashboard creation**
    - Create panels for different metrics
    - Use PromQL queries
    - Configure alerts
    - Set up variables for dynamic dashboards

44. **Grafana alerting**
    Configure alerts based on metric thresholds and send notifications via email, Slack, or other channels.

## Loki

### Loki Fundamentals

45. **What is Loki and why use it?**
    Loki is a log aggregation system designed to be cost-effective and easy to operate, similar to Prometheus but for logs.

46. **Loki vs ELK stack**
    - **Loki**: Simpler, more cost-effective, Prometheus-like querying
    - **ELK**: More features, complex setup, powerful search capabilities

47. **How to send logs to Loki?**
    ```yaml
    # Promtail configuration
    server:
      http_listen_port: 9080
    positions:
      filename: /tmp/positions.yaml
    scrape_configs:
      - job_name: containers
        static_configs:
          - targets:
              - localhost
            labels:
              job: containerlogs
              __path__: /var/log/containers/*.log
    ```

## ELK Stack

### ELK Stack Fundamentals

48. **What is ELK stack?**
    ELK stack consists of:
    - **Elasticsearch**: Search and analytics engine
    - **Logstash**: Data processing pipeline
    - **Kibana**: Data visualization

49. **Elasticsearch basics**
    - **Index**: Database equivalent
    - **Document**: Record equivalent
    - **Mapping**: Schema definition
    - **Query DSL**: Query language

50. **Logstash configuration**
    ```ruby
    input {
      file {
        path => "/var/log/application.log"
        start_position => "beginning"
      }
    }
    filter {
      grok {
        match => { "message" => "%{COMBINEDAPACHELOG}" }
      }
    }
    output {
      elasticsearch {
        hosts => ["localhost:9200"]
        index => "application-logs"
      }
    }
    ```

51. **Kibana dashboard creation**
    - Create index patterns
    - Build visualizations
    - Create dashboards
    - Set up alerts

## CI/CD Best Practices

52. **CI/CD pipeline stages**
    - **Source**: Code repository
    - **Build**: Compile and package
    - **Test**: Unit, integration, security tests
    - **Deploy**: Deploy to environments
    - **Monitor**: Application monitoring

53. **Infrastructure as Code (IaC)**
    - **Terraform**: Multi-cloud provisioning
    - **Ansible**: Configuration management
    - **CloudFormation**: AWS-specific
    - **Helm**: Kubernetes package manager

54. **GitOps principles**
    - Git as single source of truth
    - Declarative configuration
    - Automated deployments
    - Continuous monitoring

## Monitoring and Observability

55. **Three pillars of observability**
    - **Metrics**: Quantitative data (Prometheus)
    - **Logs**: Event records (Loki, ELK)
    - **Traces**: Request flow (Jaeger, Zipkin)

56. **SLA, SLO, SLI concepts**
    - **SLA**: Service Level Agreement (contract)
    - **SLO**: Service Level Objective (target)
    - **SLI**: Service Level Indicator (measurement)

## Security in DevOps

57. **DevSecOps practices**
    - Shift security left in development
    - Automated security scanning
    - Infrastructure security
    - Compliance automation

58. **Container security best practices**
    - Use minimal base images
    - Scan for vulnerabilities
    - Run as non-root user
    - Use secrets management
    - Network segmentation

## Common Interview Scenarios

59. **How would you design a CI/CD pipeline for a microservices application?**
    - Source code management (Git)
    - Build automation (Jenkins/GitHub Actions)
    - Containerization (Docker)
    - Orchestration (Kubernetes)
    - Monitoring (Prometheus/Grafana)
    - Logging (ELK/Loki)

60. **How would you troubleshoot a production issue?**
    - Check application logs
    - Monitor metrics and alerts
    - Verify infrastructure health
    - Use distributed tracing
    - Implement rollback if needed

61. **How would you implement blue-green deployment?**
    - Maintain two identical environments
    - Route traffic to blue environment
    - Deploy to green environment
    - Test green environment
    - Switch traffic to green
    - Keep blue as rollback option

62. **How would you scale a Kubernetes application?**
    - Horizontal Pod Autoscaler (HPA)
    - Vertical Pod Autoscaler (VPA)
    - Cluster Autoscaler
    - Custom metrics scaling
    - Resource limits and requests

## Advanced DevOps Architecture (7+ Years Experience)

63. **How would you design a GitOps workflow for a microservices architecture?**
    - Use ArgoCD or Flux for GitOps implementation
    - Implement environment-specific branches (dev, staging, prod)
    - Use Helm charts for application packaging
    - Implement automated testing in CI/CD pipeline
    - Use Kubernetes operators for complex stateful applications

64. **How would you implement a multi-cluster Kubernetes strategy?**
    - Use cluster federation or multi-cluster management tools
    - Implement cross-cluster service discovery
    - Use consistent networking policies across clusters
    - Implement centralized logging and monitoring
    - Use GitOps for consistent configuration management

65. **How would you design a disaster recovery strategy for containerized applications?**
    - Implement multi-region Kubernetes clusters
    - Use persistent volume replication
    - Implement automated backup and restore procedures
    - Use service mesh for traffic management
    - Implement chaos engineering for resilience testing

66. **How would you optimize CI/CD pipeline performance for large teams?**
    - Implement parallel job execution
    - Use distributed build systems
    - Implement intelligent caching strategies
    - Use container-based build environments
    - Implement pipeline optimization and monitoring

67. **How would you implement security scanning in a DevSecOps pipeline?**
    - Integrate SAST/DAST tools in CI/CD
    - Use container image scanning with Trivy/Clair
    - Implement infrastructure as code security scanning
    - Use dependency vulnerability scanning
    - Implement runtime security monitoring

68. **How would you design a monitoring and alerting strategy for a distributed system?**
    - Implement distributed tracing with Jaeger/Zipkin
    - Use Prometheus for metrics collection
    - Implement log aggregation with ELK/Loki
    - Use Grafana for visualization and alerting
    - Implement SLI/SLO monitoring and alerting
