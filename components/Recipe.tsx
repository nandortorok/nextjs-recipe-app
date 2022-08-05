import { StarIcon as StarIconSolid } from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import Image from "next/image";

const Recipe = () => {
  return (
    <article className="border shadow relative bg-white">
      <header className="">
        <Image
          src="/test-image.png"
          width={1600}
          height={900}
          objectFit="cover"
        />
      </header>

      <main className="p-2">
        <h1 className="pl-1 pt-1 text-xl cursor-pointer font-bold hover:underline">Test Recipe</h1> 
        
        <section className="pt-3 inline-flex justify-start">
          <StarIconSolid className="h-6 w-6 text-yellow-400" />
          <StarIconSolid className="h-6 w-6 text-yellow-400" />
          <StarIconSolid className="h-6 w-6 text-yellow-400" />
          <StarIconSolid className="h-6 w-6 text-yellow-400" />
          <StarIconSolid className="h-6 w-6 text-gray-300" />
          <p className="pl-1 text-zinc-700 hover:text-yellow-400">108</p>
        </section>
        
      </main>
      <footer className="pl-3 pb-3 flex justify-between">
      <p>By <span className="font-bold hover:underline text-black">Bacon Pardner</span></p>
      </footer>
    </article>
  );
};
export default Recipe;
