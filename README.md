<h1 align="center">Next.js Recipe App</h1>
<h3 align="center">A full stack recipe web app built with: </h3>
<div align="center">

[![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io)

</div>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#local-development">Local Development</a> •
  <a href="#dependencies">Dependencies</a>
</p>

![(caption)](https://lmwppfmblpohvtuaqneo.supabase.co/storage/v1/object/public/recipe-images/gifs/showcase.gif?t=2023-02-03T20%3A12%3A40.021Z)

## Features

- Users can sign in using [third party providers](https://next-auth.js.org/v3/configuration/providers) (GitHub, Google)
- Users can search, view, create, delete and save recipes
- Supports mobile screens
- Dark/Light mode

## Deployment

- This web application is deployed to [Vercel](https://vercel.com)
  - [Visit live demo app](https://nextjs-recipe-app-omega.vercel.app/)
- The database and file storage is handled by [Supabase](https://supabase.com)

## Local Development

To run this web application follow the instructions listed below:

### Prerequisites

- [Node.js](https://nodejs.org/en/) (comes with [npm](http://npmjs.com))
- [Docker](https://www.docker.com/)

### Installation

1. [Register a new GitHub App](https://github.com/settings/apps)

2. Clone the repo
   ```
   git clone https://github.com/BaconPardner/nextjs-recipe-app.git
   ```
3. Install NPM packages
   ```
   npm install
   ```
4. Enter your environment variables

   ```
   JWT_SECRET=your_secret
   GITHUB_ID=your_github_id
   GITHUB_SECRET=your_github_secret
   ```

### Setup

1. Run docker to setup the database

   ```
   docker compose up
   ```

2. Run the migration and seed:

   ```
   npx prisma migrate dev
   npx prisma db seed
   ```

3. Run the development server:

   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dependencies

This web app uses the following packages:

- [Formidable](https://github.com/node-formidable/formidable)
- [Framer Motion](https://www.framer.com/motion)
- [Headlessui](https://headlessui.com)
- [Heroicons](https://heroicons.com)
- [Next Themes](https://github.com/pacocoursey/next-themes)
- [Next.js](https://nextjs.org)
- [NextAuth](https://next-auth.js.org)
- [NProgress](https://github.com/rstacruz/nprogress)
- [Prisma](https://www.prisma.io)
- [React Hook Form](https://react-hook-form.com)
- [React](https://github.com/facebook/react)
- [Supabase](https://github.com/supabase/supabase-js)
- [SWR](https://swr.vercel.app)
- [Tailwind](https://tailwindcss.com)
- [Typescript](https://www.typescriptlang.org)
- [Zod](https://zod.dev)
