<h1 align="center">
   Next.js Recipe App
</h1>

<h4 align="center">A recipe web app built with <a href="http://electron.atom.io" target="_blank">Next.js</a>.</h4>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#local-development">Local Development</a> •
  <a href="#credits">Credits</a>
</p>

## Features

- Users can sign in using [third party providers](https://next-auth.js.org/v3/configuration/providers) like:
  - GitHub
- Users can search for recipes
- Users can create recipes

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

### Credits

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
