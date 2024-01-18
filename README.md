<h1 align="center">Next.js Recipe App</h1>
<h3 align="center">A full-stack recipe web app built with: </h3>
<div align="center">

[![Next JS](https://img.shields.io/badge/Next.js%2012-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338BDF8.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Prisma](https://img.shields.io/badge/prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io)

</div>

<p align="center">
  <a href="#about-this-project">About This Project</a> •
  <a href="#features">Features</a> •
  <a href="#local-development">Local Development</a> •
  <a href="#dependencies">Dependencies</a>
</p>

<div align="center">

![(caption)](resource/showcase.gif)

</div>

## About This Project
This project was my initial attempt at developing a full-stack web application. In early 2024, I revisited the project to apply my latest knowledge to its codebase.

### Roadmap
- [ ] Cleanup
   * [x] Remove deployment references
   * [ ] initial recipes
   * [ ] Fix auth
   * [ ] update references
   * [ ] update eslint rules 

## Features

- Users can sign in using [third party providers](https://next-auth.js.org/v3/configuration/providers) (GitHub, Google)
- Users can search, view, create, delete and save recipes
- Supports mobile screens
- Dark/Light mode

## Local Development

To run this web application follow the instructions listed below:

### Prerequisites

- [Node.js v18.x](https://nodejs.org/en/) (comes with [npm](http://npmjs.com))
- [Docker](https://www.docker.com/)

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/nandortorok/nextjs-recipe-app.git
   ```
2. Install NPM packages
   ```bash
   npm install
   ```

### Auth Setup
1. [Register a new GitHub App](https://github.com/settings/apps)

2. Enter your environment variables

   ```js
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

- [Eslint](https://eslint.org)
- [Formidable](https://github.com/node-formidable/formidable)
- [Framer Motion](https://www.framer.com/motion)
- [Headlessui](https://headlessui.com)
- [Heroicons](https://heroicons.com)
- [Next Themes](https://github.com/pacocoursey/next-themes)
- [Next.js](https://nextjs.org)
- [NextAuth](https://next-auth.js.org)
- [NProgress](https://github.com/rstacruz/nprogress)
- [Prettier](https://prettier.io)
- [Prisma](https://www.prisma.io)
- [React Hook Form](https://react-hook-form.com)
- [React](https://github.com/facebook/react)
- [SWR](https://swr.vercel.app)
- [Tailwind](https://tailwindcss.com)
- [Typescript](https://www.typescriptlang.org)
- [Zod](https://zod.dev)
