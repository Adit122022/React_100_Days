# Setsuna (刹那)

> _Fleeting moments. Absolute privacy._

**Setsuna** is a modern, high-performance, real-time chat application designed for true anonymity. Like the "moment" its name implies, every conversation is ephemeral.

### 🔒 10-Minute Lifespan

**Your privacy is our priority.** Every chat room has a strict **10-minute lifespan**. Once the time is up, the room creates a self-destruct sequence, and all messages are permanently erased. Your one-to-one chats are always safe because they simply cease to exist.

---

## 🚀 Tech Stack

This project leverages a cutting-edge stack to ensure a seamless developer and user experience:

- **[Bun](https://bun.sh/)**: The all-in-one JavaScript runtime and package manager used for speed and efficiency.
- **[Next.js](https://nextjs.org/)**: The generic React framework handling server-side rendering, routing, and the UI.
- **[ElysiaJS](https://elysiajs.com/)**: A fast, ergonomic, and type-safe web framework for building the backend API.
- **[Elysia Eden](https://elysiajs.com/eden/overview.html)**: Provides end-to-end type safety, allowing the frontend to consume the backend API with full autocompletion and type inference.
- **[TanStack Query](https://tanstack.com/query/latest)**: Manages asynchronous state, caching, and data fetching on the client side.
- **[Upstash Redis](https://upstash.com/)**: Serverless Redis database used for real-time data persistence and state management.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for styling.

---

## 📂 Detailed Project Structure

The project is thoughtfully organized to separate concerns between the application logic (`src/app`), shared utilities (`src/lib`), and UI components (`src/components`).

### `src/app`

The core application routing and logic (App Router).

- **`api/[[...slugs]]/route.ts`**:
  - Hosts the **ElysiaJS** backend server.
  - This file defines the entire API structure using Elysia's method chaining.
  - It acts as the single source of truth for your API schema, which Eden reads to generate types.
- **`room/[roomId]/page.tsx`**:
  - Contains the logic for individual chat rooms.
  - Uses the **Eden client** to send and receive messages in real-time.
  - Fetches initial messages using **TanStack Query**.

- **`layout.tsx`**:
  - The root layout file that wraps the application.
  - It wraps the children in the `Providers` component (imported from `src/components/provider.tsx`) to ensure **TanStack Query** context is available globally.

- **`page.tsx`**:
  - The entry point (landing page).
  - Handles the creation of new rooms and redirects users to unique room URLs.

### `src/lib`

Shared utilities and backend configurations.

- **`client.ts`**:
  - **Elysia Eden** configuration.
  - Initializes the `treaty` client pointing to the local API.
  - Exports the `client` object used by the frontend to make fully type-safe requests to the `src/app/api` backend.
- **`redis.ts`**:
  - **Upstash Redis** configuration.
  - Instantiates the Redis client using `@upstash/redis`.
  - Automatically loads `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from the environment.

### `src/components`

Re-usable UI and Logic components.

- **`provider.tsx`**:
  - Configures the **TanStack Query** `QueryClient`.
  - Wraps the application to enable caching, invalidation, and background updates for server state.

---

## 🛠️ Installation & Setup

Follow these specific commands to install the core technologies used in this project.

### 1. Core Frameworks & Runtime

Make sure you have **Bun** installed, as it is the package manager and runtime for this project.

### 2. Installing Dependencies

Run the following commands to install the specific libraries for the stack:

**ElysiaJS (Backend Framework):**

```bash
bun add elysia
```

**Elysia Eden (End-to-End Type Safety):**

```bash
bun add @elysiajs/eden
```

**TanStack Query (State Management):**

```bash
bun add @tanstack/react-query
```

**Upstash Redis (Database):**

```bash
bun add @upstash/redis
```

**Install Everything from `package.json`:**
If you have just cloned the repo, you can simply run:

```bash
bun install
```

### 3. Environment Setup

Create a `.env` file in the root directory to connect your database:

```env
UPSTASH_REDIS_REST_URL=your_url_here
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

---

## ✨ Features

- **Anonymous Identity**: Users are automatically assigned a unique, anonymous identity (e.g., `anonymous-Panda-x9Yz2`) upon visiting.
- **Ephemeral Rooms**: Every room and its data is hard-deleted after **10 minutes**.
- **End-to-End Type Safety**: Changes in the backend API are immediately reflected in the frontend client, preventing runtime errors.
- **Real-Time Updates**: Fast message delivery and state synchronization.
