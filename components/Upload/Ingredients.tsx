import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

type ingredientsProps = {
  amount?: string | number;
  unit?: string;
  name: string;
};
type SectionProps = {
  title?: string;
  ingredients: ingredientsProps[];
};

const Ingredients = () => {
  const [sections, setSections] = useState<SectionProps[]>([]);
  const [sectionTitle, setSectionTitle] = useState("");

  const handleChange =
    (sectionId: number, ingredientId?: number) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      const newSections = sections.map((section, sectionIDx) => {
        if (sectionIDx === sectionId) {
          if (name === "title") {
            return {
              ...section,
              title: value,
            };
          } else {
            // filter items
            const newIngredients = section.ingredients.map(
              (ingredient, ingredientIdx) => {
                if (ingredientIdx === ingredientId) {
                  return {
                    ...ingredient,
                    [name]: value,
                  };
                } else {
                  return ingredient;
                }
              }
            );

            // return changed ones
            return {
              ...section,
              ingredients: newIngredients,
            };
          }
        } else {
          return section;
        }
      });

      setSections(newSections);
    };

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        title: sectionTitle,
        ingredients: [
          {
            amount: "",
            unit: "",
            name: "",
          },
        ],
      },
    ]);

    setSectionTitle("");
  };

  const handleAddIngredient = (sectionId: number) => {
    const newSections = sections.map((section, sectionIDx) => {
      if (sectionIDx === sectionId) {
        return {
          ...section,
          ingredients: [
            ...section.ingredients,
            {
              amount: "",
              unit: "",
              name: "",
            },
          ],
        };
      } else {
        return section;
      }
    });

    setSections(newSections);
  };

  return (
    <>
      <label className="text-md font-bold">Ingredients</label>
      {sections.map(({ title, ingredients }, sectionIdx) => (
        <div className="rounded-md border border-gray-300" key={sectionIdx}>
          <table className="w-full text-left">
            <caption className="px-3 py-4 text-left text-lg font-bold">
              <input
                className="border-0 align-middle text-lg focus:ring-0"
                type="text"
                placeholder="Title name"
                name="title"
                value={title}
                onChange={handleChange(sectionIdx)}
              />
            </caption>
            <thead className="bg-gray-100 text-sm uppercase text-gray-700">
              <tr>
                <th className="py-3 pl-6">Amount</th>
                <th className="py-3 pl-3">Unit</th>
                <th className="py-3 pl-3">Name</th>
                <th className="py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, idx) => (
                <Row
                  key={idx}
                  values={ingredient}
                  onChange={handleChange(sectionIdx, idx)}
                  onClick={() => console.log("DELETE")}
                />
              ))}
              {/* add input */}
              <tr>
                <td colSpan={4} className="p-3 text-center">
                  <button
                    className="align-middle"
                    type="button"
                    onClick={() => handleAddIngredient(sectionIdx)}
                  >
                    <PlusIcon className="h-6 w-6" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <div className="rounded-md border border-gray-300">
        <table className="w-full text-left">
          <caption className="px-3 py-4 text-left text-lg font-bold">
            <input
              className="border-0 align-middle text-lg focus:ring-0"
              type="text"
              placeholder="Title name"
              name="title"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
            />
          </caption>
          <tbody>
            {/* add input */}
            <tr>
              <td colSpan={4} className="p-3 text-center">
                <button
                  className="align-middle"
                  type="button"
                  onClick={handleAddSection}
                >
                  <PlusIcon className="h-6 w-6" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

type RowProps = {
  values: ingredientsProps;
  onChange: ChangeEventHandler;
  onClick: MouseEventHandler;
};

const Row = ({ values, onChange, onClick }: RowProps) => {
  return (
    <tr className="border-b">
      <td className="pl-3">
        <input
          className="w-1/3 border-0 align-middle focus:ring-0"
          type="text"
          name="amount"
          autoComplete="off"
          value={values.amount}
          onChange={onChange}
        />
      </td>
      <td className="">
        <input
          className="w-1/2 border-0 align-middle focus:ring-0"
          type="text"
          name="unit"
          autoComplete="off"
          value={values.unit}
          onChange={onChange}
        />
      </td>
      <td className="">
        <input
          className="w-2/3 border-0 align-middle focus:ring-0"
          type="text"
          name="name"
          autoComplete="off"
          value={values.name}
          onChange={onChange}
        />
      </td>
      <td className="py-3 px-6 text-right">
        <button className="align-middle" type="button" onClick={onClick}>
          <XMarkIcon className="h-6 w-6" />
        </button>
      </td>
    </tr>
  );
};

export default Ingredients;
