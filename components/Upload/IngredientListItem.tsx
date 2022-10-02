import { PencilIcon } from "@heroicons/react/24/solid";
import { IngredientListItemProps } from "../../types/IngredientProps";

const IngredientListItem = ({
  contentValue: { amount, unit, ingredientName, isEdited },
  onChangeIngredient,
  onEditIngredient,
}: IngredientListItemProps) => {
  return (
    <div
      className={
        (isEdited ? "border-gray-500" : "border-white") +
        " group flex space-x-4 border"
      }
    >
      <input
        className="w-1/2 border-0 focus:ring-0"
        value={amount}
        onChange={onChangeIngredient}
        name="amount"
        type={isEdited ? "number" : "text"}
        min={0}
        max={999}
        disabled={!isEdited}
      />
      <input
        className="w-1/2 border-0 focus:ring-0"
        value={unit}
        onChange={onChangeIngredient}
        name="unit"
        type="text"
        disabled={!isEdited}
      />
      <div className="flex">
        <input
          className="border-0 focus:ring-0"
          value={ingredientName}
          onChange={onChangeIngredient}
          name="ingredientName"
          type="text"
          disabled={!isEdited}
        />
        <button
          className="mr-3 inline-block h-full w-full"
          title="Edit ingredient"
          type="button"
          onClick={onEditIngredient}
        >
          <PencilIcon
            className={
              (isEdited ? "text-gray-500" : "text-white") +
              " h-6 w-6 group-hover:text-gray-700"
            }
          />
        </button>
      </div>
    </div>
  );
};
export default IngredientListItem;
