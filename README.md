# Next.js Enterprise Boilerplate </br>

## Features

With this template, you get all the awesomeness you need:

- 🏎️ **[Next.js](https://nextjs.org/)** - Fast by default, with config optimized for performance (with **App Directory**)
- 💅 **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework for rapid UI development
- ✨ **[ESlint](https://eslint.org/)** and **[Prettier](https://prettier.io/)** - For clean, consistent, and error-free code
- 🛠️ **[Extremely strict TypeScript](https://www.typescriptlang.org/)** - With [`ts-reset`](https://github.com/total-typescript/ts-reset) library for ultimate type safety
- 🚀 **[GitHub Actions](https://github.com/features/actions)** - Pre-configured actions for smooth workflows, including Bundle Size and performance stats
- 💯 **Perfect Lighthouse score** - Because performance matters
- **[Bundle analyzer plugin](https://www.npmjs.com/package/@next/bundle-analyzer)** - Keep an eye on your bundle size
- **[Vitest](https://vitest.dev/)** and **[React Testing Library](https://testing-library.com/react)** - For rock-solid unit and integration tests
- **Smoke Testing** and **Acceptance Tests** - For confidence in your deployments
- **[Conventional commits git hook](https://www.conventionalcommits.org/)** - Keep your commit history neat and tidy
- **[Absolute imports](https://nextjs.org/docs/advanced-features/module-path-aliases)** - No more spaghetti imports
- **[Health checks](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)** - Kubernetes-compatible for robust deployments
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components for endless customization
- **[CVA](http://cva.style/)** - Create a consistent, reusable, and atomic design system
- **[Renovate BOT](https://www.whitesourcesoftware.com/free-developer-tools/renovate)** - Auto-updating dependencies, so you can focus on coding
- **[Next Auth](https://authjs.dev)** - Authentication and Authorization System



## Table of Contents

- [Next.js Enterprise Boilerplate](#nextjs-enterprise-boilerplate)
    - [Features](#features)
    - [Table of Contents](#table-of-contents)
    - [Getting Started](#-getting-started)
    - [Deployment](#-deployment)
    - [Scripts Overview](#-scripts-overview)
    - [Testing](#-testing)
        - [Running Tests](#running-tests)
    - [Styling and Design System](#-styling-and-design-system)
        - [CVA - A New Approach to Variants](#cva---a-new-approach-to-variants)
    - [State Management](#-state-management)
        - [Zustand](#zustand)
        - [Jotai](#jotai)
        - [Recoil](#recoil)
    - [Environment Variables handling](#-environment-variables-handling)


## 🎯 Getting Started

To get started with this boilerplate, follow these steps:

1. Fork & clone repository:

```bash
## Don't forget to ⭐ star and fork it first :)
git clone https://github.com/<your_username)/next-enterprise.git
```

2. Install the dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

5. This project uses a git hook to enforce [conventional commits](https://github.com/qoomon/git-conventional-commits). To install the git hook, run the following command in the root directory of the project:

```sh
brew install pre-commit
pre-commit install -t commit-msg
```

## 🚀 Deployment

Easily deploy your Next.js app with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=github&utm_campaign=next-enterprise) by clicking the button below:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/Blazity/next-enterprise)

## 📃 Scripts Overview

The following scripts are available in the `package.json`:

- `dev`: Starts the development server with colorized output
- `build`: Builds the app for production
- `start`: Starts the production server
- `lint`: Lints the code using ESLint
- `lint:fix`: Automatically fixes linting errors
- `format`: Checks the code for proper formatting
- `format:fix`: Automatically fixes formatting issues
- `analyze`: Analyzes the bundle sizes for Client, Server and Edge environments
- `test`: Runs unit and integration tests the components**

## 🧪 Testing

This boilerplate comes with various testing setups to ensure your application's reliability and robustness.

### Running Tests

- **Unit and integration tests**: Run Vitest tests using `npm run test`


## 🎨 Styling and Design System

This boilerplate uses Tailwind CSS for styling and CVA for creating a powerful, easy-to-use design system. If you want to learn more about the setup, check out this fantastic video by Vercel:

### CVA - A New Approach to Variants

While CSS-in-TS libraries such as [Stitches](https://stitches.dev/) and [Vanilla Extract](https://vanilla-extract.style/) are great for building type-safe UI components, they might not be the perfect fit for everyone. You may prefer more control over your stylesheets, need to use a framework like Tailwind CSS, or simply enjoy writing your own CSS.

Creating variants using traditional CSS can be a tedious task, requiring you to manually match classes to props and add types. CVA is here to take that pain away, allowing you to focus on the enjoyable aspects of UI development. By providing an easy and type-safe way to create variants, CVA simplifies the process and helps you create powerful design systems without compromising on the flexibility and control of CSS.

## 💾 State Management

While this boilerplate doesn't include a specific state management library, we believe it's essential for you to choose the one that best suits your project's needs. Here are some libraries we recommend for state management:

### Zustand

[Zustand](https://github.com/pmndrs/zustand) is a small, fast, and scalable state management library. It's designed to be simple and intuitive, making it a great choice for small to medium-sized projects. It's also optimized for bundle size, ensuring minimal impact on your app's performance.

### Jotai

[Jotai](https://github.com/pmndrs/jotai) is an atom-based state management library for React that focuses on providing a minimal and straightforward API. Its atom-based approach allows you to manage your state in a granular way while still being highly optimized for bundle size.

### Recoil

[Recoil](https://recoiljs.org/) is a state management library developed by Facebook, specifically designed for React applications. By utilizing atoms and selectors, Recoil allows you to efficiently manage state and derived state. Its key benefit is the ability to update components only when the state they're subscribed to changes, reducing unnecessary re-renders and keeping your application fast and efficient. Recoil also offers great developer experience with built-in debugging tools.

Choose the library that best fits your requirements and project structure to ensure an efficient state management solution for your application.


## 💻 Environment Variables handling
```ts
import { z } from 'zod';
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  AUTH_URL: z.string().url(),
  AUTH_SECRET: z.string(),
});
const env = () => {
  const { error, data } = envSchema.safeParse(process.env);
  if (error) throw new Error('Invalid environment variable');
  return data;
};

export default env;
```

If the required environment variables are not set, you'll get an error message:

```sh
  ❌ Invalid environment variables: { SECRET_KEY: [ 'Required' ] }
```

### Authentication Setup
- Credentials Login with Next Auth v5
- Custom Session, User and Jwt type for next-auth

`types.d.ts`

```ts
import 'next-auth';
type Role = 'User' | 'Admin' | 'SuperAdmin';

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string;
    name: string;
    role: Role;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    dateOfBirth?: Date | null;
    address?: string | null;
    jwt: string;
  }
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: User;
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule

declare module '@auth/core/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    id: string;
    name: string;
    role: Role;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    dateOfBirth?: Date | null;
    address?: string | null;
    jwt: string;
  }
}
```

### Type safe data fetching with zod

```ts
import env from '@/lib/env';
import z, { ZodSchema } from 'zod';

const safeFetch = async <T extends ZodSchema<any>>(
  schema: T,
  url: URL | RequestInfo,
  init?: RequestInit,
): Promise<{ error: any | null; data: z.TypeOf<T> }> => {
  const { NEXT_PUBLIC_API_URL } = env();
  const response = await fetch(`${NEXT_PUBLIC_API_URL}${url}`, init);
  const res = await response.json();
  if (!response.ok) return { error: res, data: null };
  const validateFields = schema.safeParse(res);
  if (!validateFields.success) {
    return {
      error: validateFields.error.message,
      data: null,
    };
  }
  return {
    data: validateFields.data,
    error: null,
  };
};
export default safeFetch;

```