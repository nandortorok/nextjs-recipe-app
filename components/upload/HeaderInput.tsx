import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { HeaderInputProps } from "../../types/IngredientProps";

const HeaderInput = ({
  headerInputValue,
  onAddHeader,
  onHeaderInputChange,
}: HeaderInputProps) => {
  return (
    <div className="group flex border border-white text-blue-500 transition ease-in-out hover:text-blue-600">
      <button
        className=""
        title="Add header to ingredients"
        type="button"
        onClick={onAddHeader}
      >
        <PlusCircleIcon className="h-6 w-6 " />
      </button>
      <input
        className="border-0 focus:ring-0 text-black"
        placeholder="e.g. Main"
        // name="ingredientName"
        type="text"
        value={headerInputValue}
        onChange={onHeaderInputChange}
      />
    </div>
  );
};

export default HeaderInput;
