import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { HeaderInputProps } from "types/IngredientProps";

const HeaderInput = ({
  isItem,
  name,
  value,
  disabled,
  onChange,
  onClick,
}: HeaderInputProps) => {
  return (
    <div className="flex justify-center">
      <div
        className={
          disabled
            ? "flex rounded-md border border-gray-300 p-2 transition ease-in-out"
            : "flex rounded-md border border-blue-300 p-2 transition ease-in-out focus-within:border-blue-600 focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-600"
        }
      >
        <input
          className={
            disabled
              ? "border-0 text-gray-500 transition ease-in-out"
              : "border-0 text-black transition ease-in-out focus:ring-0"
          }
          placeholder="e.g. Main"
          type="text"
          autoComplete={"off"}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
        />
        <button
          className={
            disabled
              ? "text-gray-400 transition ease-in-out hover:text-blue-500"
              : "text-blue-500 transition ease-in-out hover:text-blue-600"
          }
          title="Add header to ingredients"
          type="button"
          onClick={onClick}
        >
          {isItem ? (
            <PencilIcon className="h-6 w-6" />
          ) : (
            <PlusCircleIcon className="h-6 w-6 " />
          )}
        </button>
      </div>
    </div>
  );
};

export default HeaderInput;
