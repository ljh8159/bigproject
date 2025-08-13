# BigPro - Event Management Platform

A modern event management platform built with React, TypeScript, and Vite.

## 🚀 Quick Start

### Local Development
```bash
cd front
npm install
npm start  # Opens dev server on port 5173
```

### Environment Variables
Copy `.env.example` to `.env.development` and configure:
```bash
VITE_PORT=5173
VITE_HOST=localhost
VITE_OPEN=true
VITE_API_BASE_URL=http://localhost:3000
```

## 🚀 Deployment

This project is configured for automatic deployment to Google Cloud Run via GitHub Actions.

### Prerequisites
1. Google Cloud Project: `steam-treat-466702-g9`
2. GitHub repository: [bigproject](https://github.com/ljh8159/bigproject)

### Setup Steps

#### 1. Google Cloud Setup
```bash
# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com

# Create service account for GitHub Actions
gcloud iam service-accounts create github-actions \
  --display-name="GitHub Actions Service Account"

# Grant necessary permissions
gcloud projects add-iam-policy-binding steam-treat-466702-g9 \
  --member="serviceAccount:github-actions@steam-treat-466702-g9.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding steam-treat-466702-g9 \
  --member="serviceAccount:github-actions@steam-treat-466702-g9.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.admin"

gcloud projects add-iam-policy-binding steam-treat-466702-g9 \
  --member="serviceAccount:github-actions@steam-treat-466702-g9.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Create and download service account key
gcloud iam service-accounts keys create ~/github-actions-key.json \
  --iam-account=github-actions@steam-treat-466702-g9.iam.gserviceaccount.com
```

#### 2. GitHub Secrets Setup
Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

- `GCP_SA_KEY`: Content of `~/github-actions-key.json`
- `VITE_API_BASE_URL`: Your production API URL (e.g., `https://api.yourdomain.com`)

#### 3. Deploy
Push to `main` or `master` branch to trigger automatic deployment:
```bash
git add .
git commit -m "Initial deployment setup"
git push origin main
```

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **Deployment**: Google Cloud Run + Nginx
- **CI/CD**: GitHub Actions
- **Container Registry**: Google Artifact Registry

## 📁 Project Structure

```
front/
├── src/                 # React source code
├── components/          # UI components
├── pages/              # Page components
├── layouts/            # Layout components
├── .github/workflows/  # GitHub Actions
├── Dockerfile          # Container configuration
├── nginx.conf          # Nginx server config
└── package.json        # Dependencies
```

## 🔧 Customization

### Environment Variables
- `VITE_PORT`: Development server port
- `VITE_HOST`: Development server host
- `VITE_OPEN`: Auto-open browser
- `VITE_API_BASE_URL`: API endpoint URL

### Build Configuration
- Modify `vite.config.ts` for build settings
- Update `nginx.conf` for server configuration
- Adjust `Dockerfile` for container optimization

## 📊 Monitoring

- **Health Check**: `https://your-service-url/health`
- **Logs**: Google Cloud Run logs
- **Metrics**: Cloud Run metrics dashboard

## 🔒 Security

- HTTPS enforced by Cloud Run
- Security headers configured in Nginx
- Service account with minimal required permissions
- No sensitive data in client-side code

## 💰 Cost Optimization

- Cloud Run scales to zero when not in use
- Pay only for actual usage
- Configured with reasonable resource limits (512Mi RAM, 1 CPU)
