# Cloud-Native Turf Booking Application (MERN + Docker + Azure Container Apps)

A full-stack **MERN (MongoDB, Express, React, Node.js)** turf booking platform containerized with multi-stage **Docker** builds, stored in **Azure Container Registry (ACR)**, and deployed on **Azure Container Apps** in Central India.

* **Live Frontend URL:** [https://azurecontainerapps.io](https://azurecontainerapps.io)
* **Live Backend API URL:** [https://azurecontainerapps.io](https://azurecontainerapps.io)

---

## Cloud Architecture

```text
┌───────────────────┐      HTTPS       ┌────────────────────────────────────┐
│  Client Browser   │ ───────────────► │  Azure Container App: Frontend     │
└───────────────────┘                  │  (Nginx Alpine + Vite React Build) │
                                       └─────────────────┬──────────────────┘
                                                         │
                                                         │ HTTPS REST API
                                                         ▼
┌───────────────────┐  secretref URI   ┌────────────────────────────────────┐
│  MongoDB Atlas    │ ◄─────────────── │  Azure Container App: Backend      │
│  (Cloud M0 DB)    │                  │  (Node 20 Alpine + Express + /health)│
└───────────────────┘                  └────────────────────────────────────┘
                                                         ▲
                                                         │ Image Pull
                                       ┌─────────────────┴──────────────────┐
                                       │  Azure Container Registry (ACR)    │
                                       │  (acrtrufjarvis69.azurecr.io)      │
                                       └────────────────────────────────────┘
```

---

## Key Cloud & DevOps Implementations

* **Multi-Stage Containerization:** Packaged the React/Vite frontend using a two-stage `node:20-alpine` → `nginx:alpine` Dockerfile with custom SPA routing (`try_files $uri $uri/ /index.html;`), reducing image footprint to ~94 MB.
* **Build-Time & Runtime Configuration:** Externalized API endpoints (`VITE_API_URL`) via Docker build arguments and injected `MONGO_URI` into the backend container using encrypted **Azure Container Apps Secrets** (`secretref:mongo-uri`).
* **Health Probes:** Implemented a dedicated `GET /health` endpoint in Express reporting service and MongoDB connection readiness.
* **Local Multi-Container Orchestration:** Authored a `docker-compose.yml` bridge network for zero-dependency local testing across frontend, backend, and `mongo:7`.

---

## Troubleshooting & Operations Log

* **Container Networking (`ECONNREFUSED 127.0.0.1:27017`):** Resolved local host isolation inside Docker by routing dev traffic through `host.docker.internal` and Docker Compose service DNS before migrating to MongoDB Atlas.
* **Nginx Internal Redirection Cycle (HTTP 500):** Fixed PowerShell variable expansion stripping `$uri` inside `nginx.conf` by authoring configurations with single-quoted literals.
* **ACR Authentication on Express Environments:** Resolved `ExpressRegistrySystemIdentityNotSupported` during CLI deployment by explicitly binding ACR credentials (`--registry-username` and `--registry-password`).
