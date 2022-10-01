import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEventHandler, MouseEventHandler } from "react";

type Props = {
  onClick: MouseEventHandler;
  onChange: ChangeEventHandler;
};
const HeaderInput = ({ onClick, onChange }: Props) => {
  return (
    <div className="flex space-x-4 border border-white">
      <div className="flex">
        <button
          className=""
          title="Add header to ingredients"
          type="button"
          onClick={onClick}
        >
          <PlusCircleIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </button>
        <input
          className="border-0 focus:ring-0"
          placeholder="Ingredient header"
          name="ingredientName"
          type="text"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default HeaderInput;
