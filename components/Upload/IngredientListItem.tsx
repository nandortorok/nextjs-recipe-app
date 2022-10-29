import { PencilIcon } from "@heroicons/react/24/solid";
import { IngredientListItemProps } from "../../types/IngredientProps";

const IngredientListItem = ({
  contentValue: { amount, unit, ingredientName, isEdited },
  onChangeIngredient,
  onEditIngredient,
}: IngredientListItemProps) => {
  return (
    <div className="group flex flex-col space-y-4 pb-6 lg:flex-row lg:space-y-0 lg:space-x-4">
      <input
        className={
          (!isEdited && "border-white ") + "w-full focus:ring-0 lg:w-72"
        }
        value={ingredientName}
        onChange={onChangeIngredient}
        name="ingredientName"
        type="text"
        disabled={!isEdited}
      />

      <div className="flex space-x-3">
        <input
          className="w-1/2 border-gray-200 bg-gray-200 focus:border-inherit focus:ring-0"
          value={amount}
          onChange={onChangeIngredient}
          name="amount"
          type={isEdited ? "number" : "text"}
          min={0}
          max={999}
          disabled={!isEdited}
        />
        <input
          className="w-1/2 border-gray-200 bg-gray-200 focus:border-inherit focus:ring-0"
          value={unit}
          onChange={onChangeIngredient}
          name="unit"
          type="text"
          disabled={!isEdited}
        />
      </div>
      <div
        className={
          (isEdited ? "text-gray-600" : "text-gray-400 sm:text-white") +
          " flex items-center justify-end lg:w-64"
        }
      >
        <button
          className="flex group-hover:text-gray-700"
          title="Edit ingredient"
          type="button"
          onClick={onEditIngredient}
        >
          <p className="invisible pr-2 sm:visible">Edit ingredient</p>
          <PencilIcon className="h-6 w-6 " />
        </button>
      </div>
    </div>
  );
};
export default IngredientListItem;
