import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { IngredientsInputProps } from "types/IngredientProps";

const IngredientsInput = ({
  inputStateValue: { amount, unit, ingredientName },
  onInputStateChange,
  onAddContent,
}: IngredientsInputProps) => {
  return (
    <div className="flex flex-col space-y-4 border-b pb-6 lg:flex-row lg:space-y-0 lg:space-x-4">
      <input
        className="w-full focus:ring-0 lg:w-72"
        value={ingredientName}
        onChange={onInputStateChange}
        placeholder="e.g. bacon"
        name="ingredientName"
        type="text"
      />
      <div className="flex space-x-3">
        <input
          className="w-1/2 border-gray-200 bg-gray-200 focus:border-inherit focus:ring-0"
          value={amount}
          onChange={onInputStateChange}
          placeholder="e.g. 1"
          name="amount"
          type="number"
          min={0}
          max={999}
        />
        <input
          className="w-1/2 border-gray-200 bg-gray-200 focus:border-inherit focus:ring-0"
          value={unit}
          onChange={onInputStateChange}
          placeholder="e.g. kg"
          name="unit"
          type="text"
        />
      </div>
      <div className="group flex justify-end items-center text-gray-500 lg:w-64">
        <button
          className="flex"
          title="Add ingredient"
          onClick={onAddContent}
          type="button"
        >
          <p className="pr-2">Add ingredient</p>
          <PlusCircleIcon className="h-6 w-6 group-hover:text-gray-900" />
        </button>
      </div>
    </div>
  );
};
export default IngredientsInput;
