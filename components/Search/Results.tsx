import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useState,
  ChangeEvent,
  useEffect,
} from "react";

type ResultsProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Results = ({ setIsOpen }: ResultsProps) => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const getRecipesList = async (params: string) => {
      const req = await fetch(`api/search?title=${params}`);
      const data = await req.json();

      setRecipes(data);
    };

    getRecipesList(query);
  }, [query]);

  return (
    <>
      <header className="flex p-4">
        <form className="flex flex-auto">
          <label htmlFor="searchInput">
            <MagnifyingGlassIcon className="mr-3 h-6 w-6 text-slate-700" />
          </label>
          <input
            className="w-full outline-none"
            value={query}
            onChange={handleChange}
            placeholder="Search recipes"
            autoComplete="off"
          />
        </form>
        <button
          className="text-slate-400 hover:text-slate-700"
          onClick={() => setIsOpen(false)}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </header>
      <main className="overflow-auto">
        {recipes.length > 0 ? (
          <>
            <h3 className="border-b p-4 font-bold">Recipes</h3>
            <ul className="divide-y">
              {/* TODO give proper type */}
              {recipes.map((item: any) => (
                <Link key={item.id} href={`recipe/${item.id}`} passHref>
                  <li className="p-4 hover:bg-blue-50">{item.title}</li>
                </Link>
              ))}
            </ul>
          </>
        ) : (
          <ul className="divide-y">
            <li className="hover:bg-slate-10 py-10 text-center text-gray-400">
              No recipes found
            </li>
          </ul>
        )}
      </main>

      <footer className="p-4 text-center text-sm text-gray-400">
        Recipe App
      </footer>
    </>
  );
};

export default Results;
