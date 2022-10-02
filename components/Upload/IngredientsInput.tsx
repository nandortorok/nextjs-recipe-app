import { PlusIcon } from "@heroicons/react/24/solid";
import { IngredientsInputProps } from "../../types/IngredientProps";

const IngredientsInput = ({
  inputStateValue: { amount, unit, ingredientName },
  onInputStateChange,
  onAddContent,
}: IngredientsInputProps) => {
  return (
    <div className="flex space-x-4 border border-gray-500">
      <input
        className="w-1/2 border-0 focus:ring-0"
        value={amount}
        onChange={onInputStateChange}
        placeholder="e.g. 1"
        name="amount"
        type="number"
        min={0}
        max={999}
      />
      <input
        className="w-1/2 border-0 focus:ring-0"
        value={unit}
        onChange={onInputStateChange}
        placeholder="e.g. kg"
        name="unit"
        type="text"
      />
      <div className="flex">
        <input
          className="border-0 focus:ring-0"
          value={ingredientName}
          onChange={onInputStateChange}
          placeholder="e.g. bacon"
          name="ingredientName"
          type="text"
        />
        <button
          className="mr-3"
          title="Add ingredient"
          onClick={onAddContent}
          type="button"
        >
          <PlusIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </button>
      </div>
    </div>
  );
};
export default IngredientsInput;
