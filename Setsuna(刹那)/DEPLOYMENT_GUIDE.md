# Deployment Guide

This guide covers how to containerize the application using Docker and how to deploy it to Vercel.

---

## Part 1: Dockerization

To run this application in a Docker container, follow these steps.

### 1. Create a `Dockerfile`

Create a file named `Dockerfile` in the root of your project with the following content. This configuration uses the official Bun image.

```dockerfile
# Use the official Bun image
FROM oven/bun:latest AS base

WORKDIR /app

# 1. Install dependencies
# We copy package.json and bun.lock first to leverage Docker cache
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# 2. Copy the rest of the application code
COPY . .

# 3. Build the Next.js application
# Note: Next.js builds run better in a Node environment typically, but can work with Bun.
# If you run into build issues, you might need a multi-stage build using Node for building.
RUN bun run build

# 4. Expose the port Next.js runs on (3000 by default)
EXPOSE 3000

# 5. Start the application
CMD ["bun", "start"]
```

### 2. Create a `.dockerignore`

Create a `.dockerignore` file to prevent unnecessary files from being copied into the image.

```text
node_modules
.next
.git
.env
README.md
Dockerfile
.dockerignore
```

### 3. Build the Docker Image

Run the following command in your terminal. Replace `setsuna-app` with your desired image name.

```bash
docker build -t setsuna-app .
```

### 4. Run the Docker Container

You need to pass your environment variables (Redis credentials) when running the container.

```bash
docker run -p 3000:3000 \
  -e UPSTASH_REDIS_REST_URL=your_actual_url \
  -e UPSTASH_REDIS_REST_TOKEN=your_actual_token \
  setsuna-app
```

Open [http://localhost:3000](http://localhost:3000) to verify it works.

---

## Part 2: Deploying to Vercel

Vercel is the creators of Next.js and provides the easiest deployment flow.

### Option A: Using the Vercel Dashboard (Recommended)

1.  **Push to GitHub**: Ensure your project is pushed to a GitHub repository.
2.  **Log in to Vercel**: Go to [vercel.com](https://vercel.com) and sign in.
3.  **Add New Project**:
    - Click "Add New..." -> "Project".
    - Import your `Setsuna` repository.
4.  **Configure Project**:
    - **Framework Preset**: It should auto-detect "Next.js".
    - **Root Directory**: `./` (default).
    - **Build Command**: `bun run build` (Vercel usually auto-detects, but good to verify).
    - **Install Command**: `bun install`.
5.  **Environment Variables**:
    - Expand the "Environment Variables" section.
    - Add the following keys and values from your `.env` file:
      - `UPSTASH_REDIS_REST_URL`
      - `UPSTASH_REDIS_REST_TOKEN`
6.  **Deploy**: Click "Deploy". Vercel will build your app and verify it.

### Option B: Using Vercel CLI

If you prefer the command line:

1.  **Install Vercel CLI**:
    ```bash
    npm i -g vercel
    ```
2.  **Login**:
    ```bash
    vercel login
    ```
3.  **Deploy**:
    Run the command inside your project folder:
    ```bash
    vercel
    ```
4.  **Follow Prompts**:
    - Set up and deploy? `Y`
    - Which scope? (Select your account)
    - Link to existing project? `N`
    - Project name? `setsuna`
    - In which directory? `./`
5.  **Environment Variables**:
    You can set these via the dashboard after the first deployment or use:
    ```bash
    vercel env add UPSTASH_REDIS_REST_URL
    vercel env add UPSTASH_REDIS_REST_TOKEN
    ```
    Then redeploy with `vercel --prod`.

### Notes on Bun & Vercel

Vercel supports Bun. If you find that the build fails, ensure that within the Vercel Project Settings > **Git** section, the "Corepack" is enabled, or simply ensure your `package.json` lockfile is `bun.lock`. Vercel automatically detects Bun when it sees `bun.lock`.
