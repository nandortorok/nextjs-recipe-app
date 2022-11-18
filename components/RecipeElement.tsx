import { StarIcon } from "@heroicons/react/24/solid";
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
    <article className="group relative cursor-pointer border bg-white shadow ">
      <header>
        <Link href={href}>
          <Image
            alt="recipe image"
            src="/test-image.png"
            className="object-cover"
            width={800}
            height={250}
          />
        </Link>
      </header>

      <main className="p-5">
        <h1 className="pl-1 pt-1 text-xl font-bold group-hover:underline">
          <Link href={href}>{title}</Link>
        </h1>

        <section className="flex pt-3">
          <StarIcon className="h-6 w-6 text-yellow-400" />
          <p className="pl-1">4.83 (108)</p>
        </section>
      </main>
      <footer className="px-5 pb-5 text-gray-500">
        <p>
          By <span className="font-bold">{userName}</span>
        </p>
      </footer>
    </article>
  );
};

export default RecipeElement;
