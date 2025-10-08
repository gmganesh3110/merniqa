# AWS Interview Questions - 3 Years Experience Level

## Core AWS Fundamentals

1. **What is AWS and its core value proposition?**
   AWS (Amazon Web Services) is a comprehensive cloud computing platform offering over 200 services. Its core value proposition includes scalability, reliability, cost-effectiveness, and global infrastructure.

2. **What is a region vs availability zone?**
   - **Region**: Geographic area containing multiple AZs (e.g., us-east-1, eu-west-1)
   - **Availability Zone**: Isolated data centers within a region (e.g., us-east-1a, us-east-1b)

3. **How to choose a region?**
   - Latency requirements
   - Data residency/compliance needs
   - Service availability
   - Cost considerations

## Compute Services

4. **What is EC2 and common instance families?**
   EC2 (Elastic Compute Cloud) provides virtual servers. Common families:
   - **General Purpose**: t3, t4g, m5, m6i
   - **Compute Optimized**: c5, c6i
   - **Memory Optimized**: r5, r6i, x1e
   - **Storage Optimized**: i3, i4i
   - **GPU**: p3, p4, g4

5. **What are EC2 AMIs?**
   AMI (Amazon Machine Image) is a template containing OS, applications, and configuration needed to launch EC2 instances.

6. **What is EBS and volume types?**
   EBS (Elastic Block Store) provides persistent block storage:
   - **gp3**: General purpose SSD (latest generation)
   - **gp2**: General purpose SSD (previous generation)
   - **io1/io2**: Provisioned IOPS SSD
   - **st1**: Throughput optimized HDD
   - **sc1**: Cold HDD

7. **Difference between EBS and Instance Store**
   - **EBS**: Persistent, survives instance termination, network-attached
   - **Instance Store**: Ephemeral, lost on instance termination, physically attached

8. **EBS snapshot basics**
   Snapshots are point-in-time backups of EBS volumes, stored in S3, incremental, and can be used to create new volumes.

## Storage Services

9. **What is S3 and common storage classes?**
   S3 (Simple Storage Service) is object storage with classes:
   - **S3 Standard**: Frequently accessed data
   - **S3 IA**: Infrequently accessed data
   - **S3 Glacier**: Archive data
   - **S3 Intelligent Tiering**: Automatic cost optimization

10. **S3 durability vs availability**
    - **Durability**: 99.999999999% (11 9's) - data won't be lost
    - **Availability**: 99.99% - service will be accessible

11. **S3 versioning and lifecycle policies**
    - **Versioning**: Keep multiple versions of objects
    - **Lifecycle policies**: Automatically transition objects between storage classes or delete them

12. **S3 encryption at rest and in transit**
    - **At rest**: SSE-S3, SSE-KMS, SSE-C, client-side encryption
    - **In transit**: HTTPS/TLS encryption

13. **S3 presigned URLs and use cases**
    Presigned URLs provide temporary access to S3 objects. Use cases: secure file sharing, direct uploads from clients.

## Identity and Access Management

14. **What is IAM and its core components?**
    IAM (Identity and Access Management) manages access to AWS resources:
    - **Users**: Individual accounts
    - **Groups**: Collections of users
    - **Roles**: Temporary permissions
    - **Policies**: Permission documents

15. **IAM policy JSON basics**
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::my-bucket/*"
        }
      ]
    }
    ```

16. **IAM best practices**
    - Principle of least privilege
    - Use roles instead of access keys
    - Enable MFA
    - Regular access reviews

## Networking

17. **What is VPC and its main components?**
    VPC (Virtual Private Cloud) is your isolated network in AWS:
    - **Subnets**: Network segments
    - **Route Tables**: Traffic routing rules
    - **Internet Gateway**: Internet access
    - **NAT Gateway**: Outbound internet for private subnets

18. **Subnets: public vs private**
    - **Public**: Has route to Internet Gateway, can have public IPs
    - **Private**: No direct internet access, uses NAT Gateway for outbound

19. **Internet Gateway vs NAT Gateway vs NAT instance**
    - **Internet Gateway**: Managed, bidirectional internet access
    - **NAT Gateway**: Managed, outbound-only internet access
    - **NAT Instance**: Self-managed EC2 instance for NAT

20. **Security groups vs NACLs**
    - **Security Groups**: Stateful, instance-level, allow rules only
    - **NACLs**: Stateless, subnet-level, allow and deny rules

21. **VPC peering and when to use it**
    VPC peering connects two VPCs. Use for: cross-region connectivity, shared services, hybrid cloud scenarios.

## Database Services

22. **What is RDS and supported engines?**
    RDS (Relational Database Service) managed databases:
    - MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Aurora

23. **RDS Multi-AZ vs Read Replicas**
    - **Multi-AZ**: High availability, synchronous replication, automatic failover
    - **Read Replicas**: Read scaling, asynchronous replication, manual promotion

24. **RDS backups and snapshot restores**
    - **Automated backups**: Point-in-time recovery, 7-35 days retention
    - **Manual snapshots**: Long-term retention, cross-region copying

25. **What is Aurora and its benefits?**
    Aurora is MySQL/PostgreSQL compatible with benefits:
    - Up to 15 read replicas
    - Continuous backup to S3
    - Automatic failover
    - Serverless option

26. **What is DynamoDB and key concepts?**
    DynamoDB is NoSQL database:
    - **Partition Key**: Primary key for data distribution
    - **Sort Key**: Secondary key for sorting within partition
    - **GSI**: Global Secondary Index
    - **LSI**: Local Secondary Index

27. **DynamoDB capacity modes**
    - **Provisioned**: Predictable workloads, manual scaling
    - **On-Demand**: Unpredictable workloads, automatic scaling

## Serverless Computing

28. **What is Lambda and when to use serverless?**
    Lambda runs code without managing servers. Use for: event-driven processing, microservices, data processing.

29. **Lambda memory/timeout and pricing model**
    - **Memory**: 128MB to 10GB
    - **Timeout**: Up to 15 minutes
    - **Pricing**: Pay per request and compute time

30. **Lambda cold start and mitigation strategies**
    Cold start is initialization delay. Mitigation: provisioned concurrency, keep functions warm, optimize initialization.

31. **API Gateway basics**
    API Gateway creates RESTful APIs:
    - **REST API**: HTTP APIs
    - **HTTP API**: Lightweight, faster
    - **WebSocket API**: Real-time communication

## Messaging and Event Services

32. **EventBridge vs SNS vs SQS use cases**
    - **EventBridge**: Event routing, decoupled architectures
    - **SNS**: Pub/sub messaging, notifications
    - **SQS**: Message queuing, decoupling services

33. **SQS standard vs FIFO queues**
    - **Standard**: At-least-once delivery, best effort ordering
    - **FIFO**: Exactly-once delivery, strict ordering

34. **SNS fan-out pattern**
    SNS can deliver messages to multiple subscribers simultaneously, useful for notifications and event distribution.

## Container Services

35. **ECS vs EKS vs Fargate overview**
    - **ECS**: AWS container orchestration
    - **EKS**: Managed Kubernetes
    - **Fargate**: Serverless containers

36. **ECS launch types**
    - **EC2**: Manage EC2 instances
    - **Fargate**: Serverless, no infrastructure management

## Load Balancing and Auto Scaling

37. **ALB vs NLB vs CLB**
    - **ALB**: Application Load Balancer, Layer 7, HTTP/HTTPS
    - **NLB**: Network Load Balancer, Layer 4, TCP/UDP
    - **CLB**: Classic Load Balancer, legacy

38. **Auto Scaling Groups and scaling policies**
    Auto Scaling Groups automatically adjust capacity:
    - **Target Tracking**: Maintain target metric
    - **Simple Scaling**: Scale based on single metric
    - **Step Scaling**: Scale based on multiple thresholds

## DNS and CDN

39. **Route 53 routing policies**
    - **Simple**: Single resource
    - **Weighted**: Traffic distribution
    - **Latency**: Lowest latency
    - **Geolocation**: Geographic routing
    - **Failover**: Active/passive

40. **CloudFront CDN basics**
    CloudFront is global CDN:
    - Edge locations worldwide
    - Caching at edge
    - Origin integration
    - Custom error pages

## Monitoring and Logging

41. **CloudWatch Logs vs Metrics vs Events**
    - **Logs**: Application and system logs
    - **Metrics**: Performance data
    - **Events**: Real-time system events

42. **CloudTrail basics**
    CloudTrail logs API calls for auditing, compliance, and security analysis.

## Security Services

43. **WAF vs Shield vs Security Hub**
    - **WAF**: Web Application Firewall
    - **Shield**: DDoS protection
    - **Security Hub**: Security findings aggregation

44. **GuardDuty and threat detection**
    GuardDuty uses machine learning to detect threats in AWS accounts.

45. **Secrets Manager vs SSM Parameter Store**
    - **Secrets Manager**: Automatic rotation, encryption
    - **Parameter Store**: Hierarchical storage, cost-effective

## Cost Management

46. **Cost Explorer and budgets**
    - **Cost Explorer**: Analyze costs and usage
    - **Budgets**: Set spending limits and alerts

47. **Savings Plans vs Reserved Instances**
    - **Savings Plans**: Flexible compute savings
    - **Reserved Instances**: Specific instance type savings

48. **Spot instances and interruption handling**
    Spot instances offer up to 90% savings but can be interrupted. Use for fault-tolerant workloads.

## Infrastructure as Code

49. **CloudFormation basics**
    CloudFormation creates and manages AWS resources using templates:
    - **Templates**: JSON/YAML resource definitions
    - **Stacks**: Collection of resources
    - **Change Sets**: Preview changes before execution

50. **CDK vs CloudFormation**
    - **CDK**: Use programming languages (TypeScript, Python, etc.)
    - **CloudFormation**: Use JSON/YAML templates

## High Availability and Disaster Recovery

51. **High availability vs fault tolerance**
    - **High Availability**: Minimize downtime
    - **Fault Tolerance**: Continue operating despite failures

52. **Disaster recovery strategies**
    - **Backup/Restore**: RTO: hours, RPO: hours
    - **Pilot Light**: RTO: minutes, RPO: minutes
    - **Warm Standby**: RTO: minutes, RPO: seconds
    - **Multi-Site**: RTO: seconds, RPO: seconds

53. **Multi-AZ vs Multi-Region designs**
    - **Multi-AZ**: High availability within region
    - **Multi-Region**: Disaster recovery across regions

## Best Practices and Architecture

54. **Well-Architected Framework pillars**
    - **Operational Excellence**: Run and monitor systems
    - **Security**: Protect information and systems
    - **Reliability**: Recover from failures
    - **Performance Efficiency**: Use resources efficiently
    - **Cost Optimization**: Avoid unnecessary costs
    - **Sustainability**: Environmental impact

55. **Tagging strategies**
    - **Cost Allocation**: Track spending by project/team
    - **Automation**: Trigger actions based on tags
    - **Compliance**: Meet regulatory requirements

## Common Interview Scenarios

56. **How would you design a highly available web application?**
    - Multi-AZ deployment
    - Load balancers
    - Auto Scaling Groups
    - RDS Multi-AZ
    - CloudFront CDN
    - Route 53 health checks

57. **How would you handle a database migration to AWS?**
    - Use AWS DMS (Database Migration Service)
    - Plan for downtime
    - Test migration process
    - Implement rollback strategy
    - Monitor performance

58. **How would you optimize costs in AWS?**
    - Use Reserved Instances/Savings Plans
    - Implement auto-scaling
    - Use appropriate instance types
    - Implement S3 lifecycle policies
    - Monitor with Cost Explorer

59. **How would you secure an AWS environment?**
    - Enable CloudTrail
    - Use IAM best practices
    - Implement VPC security
    - Use WAF and Shield
    - Enable GuardDuty
    - Regular security audits

60. **How would you implement CI/CD on AWS?**
    - Use CodeCommit for source control
    - CodeBuild for building
    - CodeDeploy for deployment
    - CodePipeline for orchestration
    - Integrate with GitHub/GitLab