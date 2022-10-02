import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { HeaderInputProps } from "../../types/IngredientProps";

const HeaderInput = ({
  headerInputValue,
  onAddHeader,
  onHeaderInputChange,
}: HeaderInputProps) => {
  return (
    <div className="flex space-x-4 border border-white">
      <div className="flex">
        <button
          className=""
          title="Add header to ingredients"
          type="button"
          onClick={onAddHeader}
        >
          <PlusCircleIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </button>
        <input
          className="border-0 focus:ring-0"
          placeholder="Ingredient header"
          name="ingredientName"
          type="text"
          value={headerInputValue}
          onChange={onHeaderInputChange}
        />
      </div>
    </div>
  );
};

export default HeaderInput;
