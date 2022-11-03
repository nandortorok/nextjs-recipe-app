import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const RecipeElement = ({
  title,
  href,
  userName,
}: {
  title: string;
  href: string;
  userName: string;
}) => {
  return (
    <article className="relative border bg-white shadow">
      <header className="">
        <Image
          alt="recipe image"
          src="/test-image.png"
          className="object-cover"
          width={800}
          height={250}
        />
      </header>

      <main className="p-2">
        <h1 className="cursor-pointer pl-1 pt-1 text-xl font-bold hover:underline">
          <Link href={href}>{title}</Link>
        </h1>

        <section className="inline-flex justify-start pt-3">
          <StarIconSolid className="h-6 w-6 text-yellow-400" />
          <StarIconSolid className="h-6 w-6 text-yellow-400" />
          <StarIconSolid className="h-6 w-6 text-yellow-400" />
          <StarIconSolid className="h-6 w-6 text-yellow-400" />
          <StarIconSolid className="h-6 w-6 text-gray-300" />
          <p className="pl-1 text-zinc-700 hover:text-yellow-400">108</p>
        </section>
      </main>
      <footer className="flex justify-between pl-3 pb-3">
        <p>
          By{" "}
          <span className="font-bold text-black hover:underline">
            {userName}
          </span>
        </p>
      </footer>
    </article>
  );
};

export default RecipeElement;
