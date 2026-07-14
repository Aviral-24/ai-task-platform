# 🚀 AI Task Platform – GitOps Deployment

## 📌 Project Overview

AI Task Platform is a cloud-native application designed to demonstrate modern DevOps and GitOps practices using Kubernetes, Docker, Argo CD, and GitHub Actions.

The platform consists of a React frontend, Node.js backend API, Python worker service, MongoDB database, and Redis message queue. The application is deployed on Kubernetes and managed through a GitOps workflow powered by Argo CD.

---

# 🔗 Repository Links

## Application Repository

**URL:**
[https://github.com/Aviral-24/ai-task-platform]

## Infrastructure Repository

**URL:**
https://github.com/Aviral-24/ai-task-platform-infra

---

# 🌐 Live Deployment

### Environment

Local Kubernetes Cluster (Docker Desktop)

### Access URL

http://localhost:30080

### Notes

* Docker Desktop Kubernetes must be running.
* Kubernetes resources are managed by Argo CD.
* Application is accessible through NodePort Service.

---

# 🏗️ Solution Architecture

## Components

| Component        | Technology           |
| ---------------- | -------------------- |
| Frontend         | React.js             |
| Backend API      | Node.js + Express.js |
| Worker Service   | Python               |
| Database         | MongoDB              |
| Queue System     | Redis                |
| Containerization | Docker               |
| Orchestration    | Kubernetes           |
| GitOps           | Argo CD              |
| CI/CD            | GitHub Actions       |

---

## Architecture Flow

```text
User
 │
 ▼
React Frontend
 │
 ▼
Node.js Backend API
 │
 ├────────────► MongoDB
 │
 └────────────► Redis Queue
                     │
                     ▼
              Python Worker
                     │
                     ▼
                 MongoDB
```

---

# 🔄 CI/CD Workflow

## Continuous Integration (CI)

Whenever code is pushed to GitHub:

1. GitHub Actions workflow is triggered.
2. Application components are built automatically.
3. Docker images are generated.
4. Images are pushed to Docker Hub.
5. Infrastructure manifests are updated with new image tags.

### Automated Steps

* Source Checkout
* Build Process
* Docker Image Creation
* Docker Hub Push
* Manifest Update

---

# ⚙️ GitOps Continuous Deployment (CD)

Argo CD continuously monitors the Infrastructure Repository.

Whenever a change is detected:

1. Argo CD compares the repository state with the cluster state.
2. Differences are detected automatically.
3. Kubernetes resources are synchronized.
4. Updated containers are deployed.

### Enabled Features

✅ Auto Sync

✅ Self-Healing

✅ Drift Detection

✅ Automated Rollout

---

# ☸️ Kubernetes Deployment

The application is deployed using Kubernetes resources.

### Included Resources

* Namespace
* Deployments
* Services
* ConfigMaps
* Secrets
* Ingress
* Resource Requests
* Resource Limits
* Liveness Probes
* Readiness Probes

---

# 🔐 Security Implementation

The project follows security best practices.

### Security Features

* JWT Authentication
* Password Hashing (bcrypt)
* Helmet Middleware
* API Rate Limiting
* Kubernetes Secrets
* Environment Variables
* Non-Root Containers

---

# 📊 Argo CD Dashboard

### Deployment Status

Healthy ✅

Synced ✅

### Screenshot

Insert Argo CD Dashboard Screenshot Here

```text
docs/argocd-dashboard.png
```

---

# 📝 Additional Notes

### Environment

The application has been deployed and validated on a local Kubernetes cluster using Docker Desktop.

### Assumptions

* Kubernetes Cluster is available.
* kubectl is configured.
* Argo CD is installed and accessible.
* Docker Desktop is running.

### Troubleshooting Performed

During deployment, image pull issues occurred due to placeholder Docker Hub usernames.

The issue was resolved by:

1. Updating image references.
2. Committing changes to the Infrastructure Repository.
3. Allowing Argo CD Auto-Sync to redeploy the updated resources.

### Secrets Management

Sensitive configuration values are not stored in source code.

All credentials are managed through:

* Kubernetes Secrets
* Environment Variables

---

# 🧹 Cleanup Commands

Delete Argo CD Application

```bash
kubectl delete application ai-task-platform -n argocd
```

Delete Kubernetes Resources

```bash
kubectl delete -f base/
```

---

# 👨‍💻 Author

### Aviral Prajapati

MERN Stack Developer

GitHub: https://github.com/Aviral-24

---

## Project Highlights

✅ Dockerized Microservices

✅ Kubernetes Deployment

✅ GitOps with Argo CD

✅ Automated CI/CD Pipeline

✅ Infrastructure as Code

✅ Production-Oriented Architecture

✅ Self-Healing Kubernetes Cluster

✅ Scalable Container-Based Deployment
