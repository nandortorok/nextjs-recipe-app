import type { NextPage } from "next";
import Head from "next/head";
import Recipe from "../components/Recipe";
import SearchSection from "../components/SearchSection";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Recipe website</title>
        <meta name="description" content="Recipe website by Bacon Pardner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchSection />

      <main className="bg-zinc-100">

        <h2 className="py-10 text-center text-4xl font-bold">Recipes</h2>

        <section className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-2">
            <Recipe />
            <Recipe />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <Recipe />
            <Recipe />
            <Recipe />
          </div>

          <div className="py-6">
            <Recipe />
          </div>

        </section>
        
      </main>
    </>
  );
};

export default Home;
