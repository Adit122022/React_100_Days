# Complete Real-Time Chat

A modern, real-time private chat application built with performance and type-safety in mind. This project leverages the speed of Bun, the flexibility of Next.js, and the power of ElysiaJS.

## 🚀 Tech Stack

This project uses a cutting-edge stack to ensure a seamless developer and user experience:

- **[Bun](https://bun.sh/)**: A fast all-in-one JavaScript runtime and package manager. used as the core runtime for this project.
- **[Next.js](https://nextjs.org/)**: The React framework for the web, handling frontend rendering and routing.
- **[ElysiaJS](https://elysiajs.com/)**: A fast, and type-safe web framework for Bun. We use this to build our backend API.
- **[Elysia Eden](https://elysiajs.com/eden/overview.html)**: An end-to-end type-safe client for Elysia. It allows our frontend to communicate with the backend with full type inference, eliminating the need for manual type declarations for API responses.
- **[TanStack Query](https://tanstack.com/query/latest)**: Powerful asynchronous state management for React. We use this to handle data fetching, caching, and synchronization with the server.

## ✨ Features

- **Anonymous Identity**: Users are automatically assigned a unique, anonymous identity (e.g., `anonymous-Panda-x9Yz2`) upon visiting.
- **Room Creation**: Users can create private, self-destructing chat rooms.
- **Type-Safe API**: Full end-to-end type safety from the backend creation to the frontend consumption using Eden.

## 🛠️ Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have **Bun** installed. If not, install it by running:

```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

### Installation

Install the dependencies:

```bash
bun install
```

### Running the Development Server

Start the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📚 key Concepts

### Elysia & Eden

This project defines API routes using Elysia in `src/app/api/[[...slugs]]/route.ts`. The `treaty` client from Eden is then initialized in `src/lib/client.ts`. This client is used in frontend components to make type-safe API calls.

### TanStack Query

We wrap our application in a `QueryClientProvider` (see `src/components/provider.tsx`) to enable TanStack Query features throughout the app. This allows for efficient data fetching and mutation handling, as seen in `src/app/page.tsx`.
