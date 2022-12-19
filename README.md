# Next.js Recipe App

<!-- ## About The Project -->

### Built With

- Typescript
- Prisma
- Next.js
- React
- Tailwind
- Headlessui
- Heroicons

## Getting Started

### Prerequisites

- Node.js
  - npm
- Docker

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/BaconPardner/nextjs-recipe-app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Setup

1. Run docker to setup the database

   ```
   docker compose up
   ```

2. Run the migration and seed:

   ```sh
   npx prisma migrate dev
   npx prisma db seed
   ```

3. Run the development server:

   ```sh
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
