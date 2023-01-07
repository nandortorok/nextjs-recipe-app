import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const RecipeElement = ({
  title,
  href,
  userName,
  imagePath,
}: {
  title: string;
  href: string;
  userName: string;
  imagePath: string;
}) => {
  return (
    <section className="relative max-w-md">
      <Link
        className="inline-block cursor-pointer overflow-hidden rounded-xl"
        href={href}
        passHref
      >
        <Image
          src={`/img/${imagePath}`}
          alt="recipe image"
          className="block object-none brightness-50 transition ease-in-out hover:scale-110"
          width={800}
          height={250}
        />
      </Link>
      <p className="absolute top-6 px-4 text-white">{userName}</p>
      <div className="absolute top-6 right-6 flex text-white">
        <StarIcon className="h-6 w-6 align-middle" />
        <p className="pl-2 align-middle">4.8</p>
      </div>
      <footer className="absolute bottom-6 px-4 text-white">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm font-bold">12 ingredients | 40 min</p>
      </footer>
    </section>
  );
};

export default RecipeElement;
