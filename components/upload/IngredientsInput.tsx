import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEventHandler } from "react";
import { IngredientsInputProps } from "types/IngredientProps";

const IngredientsInput = ({
  value: { amount, unit, name },
  onChange,
  onClick,
}: IngredientsInputProps) => {
  return (
    <div className="grid grid-cols-2 justify-items-stretch gap-4 border-b pb-6 sm:grid-cols-3">
      <input
        className="col-span-2 w-full rounded-md border-gray-300 bg-gray-50 p-4 transition ease-in-out sm:col-span-1"
        value={name}
        onChange={onChange}
        autoComplete={"off"}
        placeholder="e.g. bacon"
        name="name"
        type="text"
      />
      <Input
        value={amount}
        onChange={onChange}
        placeholder="e.g. 1"
        name="amount"
        type="number"
      />
      <Input
        value={unit}
        onChange={onChange}
        placeholder="e.g. kg"
        name="unit"
        type="text"
      />
      <div className="col-span-2 justify-self-center sm:col-span-3">
        <button
          className="rounded-md py-2 px-5 text-blue-500 transition ease-in-out hover:text-blue-600"
          onClick={onClick}
          type="button"
        >
          Add ingredient
        </button>
      </div>
    </div>
  );
};

type Props = {
  value: string | number;
  onChange: ChangeEventHandler;
  placeholder: string;
  name: string;
  type: "text" | "number";
};

export const Input = ({ value, onChange, placeholder, name, type }: Props) => {
  return (
    <input
      className="m-0 rounded-md border-gray-300 bg-gray-50 p-4 transition ease-in-out"
      value={value}
      onChange={onChange}
      autoComplete={"off"}
      placeholder={placeholder}
      name={name}
      type={type}
      min={0}
      max={999}
    />
  );
};

export default IngredientsInput;
