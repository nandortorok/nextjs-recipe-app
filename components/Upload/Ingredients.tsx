import { ChangeEvent, ChangeEventHandler, ReactNode, useState } from "react";

const initialState = {
  name: "",
  amount: "",
  unit: "",
};

type SectionProps = {
  title?: string;
  ingredients: typeof initialState[];
};

const Ingredients = () => {
  const [ingredient, setIngredient] = useState(initialState);
  const [sections, setSections] = useState<SectionProps[]>([]);

  const handleChange = () => {
    console.log("hi");
  };

  return (
    <>
      <label className="text-md font-bold">Ingredients</label>
      <div className="grid grid-cols-2 justify-items-stretch gap-4 sm:grid-cols-3">
        <IngredientsInputs
          state={ingredient}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setIngredient({ ...ingredient, [e.target.name]: e.target.value });
          }}
        />
        <div className="col-span-2 justify-self-center sm:col-span-3">
          <button
            className="rounded-md py-2 px-5 text-blue-500 transition ease-in-out hover:text-blue-600"
            onClick={(e) => {
              setSections([...sections, { ingredients: [{ ...ingredient }] }]);
              setIngredient(initialState);
            }}
            type="button"
          >
            Add ingredient
          </button>
        </div>
      </div>

      <List
        items={sections}
        render={({ title, ingredients }) => (
          <div>
            <h3>{title}</h3>
            {ingredients.map((ing, ingIdx) => (
              <div key={ingIdx}>
                <span>{ing.name} </span>
                <span>{ing.amount} </span>
                <span>{ing.unit}</span>
              </div>
            ))}
          </div>
        )}
      />
    </>
  );
};

type ListProps<T> = {
  items: T[];
  render: (item: T) => ReactNode;
};

const List = <T,>({ items, render }: ListProps<T>) => {
  return (
    <ul>
      {items.map((item, idx) => (
        <li key={idx}>{render(item)}</li>
      ))}
    </ul>
  );
};

type InputProps = {
  value: string | number;
  onChange: ChangeEventHandler;
  placeholder: string;
  name: string;
  type: "text" | "number";
};

const Input = (props: InputProps) => {
  return (
    <input
      className="m-0 rounded-md border-gray-300 bg-gray-50 p-4 transition ease-in-out"
      autoComplete={"off"}
      {...props}
      min={0}
      max={999}
    />
  );
};

type IngredientsInputsProps = {
  state: typeof initialState;
  onChange: ChangeEventHandler;
};

const IngredientsInputs = ({ state, onChange }: IngredientsInputsProps) => {
  return (
    <>
      <input
        className="col-span-2 w-full rounded-md border-gray-300 bg-gray-50 p-4 transition ease-in-out sm:col-span-1"
        value={state.name}
        onChange={onChange}
        autoComplete={"off"}
        placeholder="e.g. bacon"
        name="name"
        type="text"
      />
      <Input
        value={state.amount}
        onChange={onChange}
        placeholder="e.g. 1"
        name="amount"
        type="number"
      />
      <Input
        value={state.unit}
        onChange={onChange}
        placeholder="e.g. kg"
        name="unit"
        type="text"
      />
    </>
  );
};

export default Ingredients;
