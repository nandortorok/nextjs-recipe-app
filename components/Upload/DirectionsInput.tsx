import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { DirectionsInputProps } from "../../types/IngredientProps";

const DirectionsInput = ({
  directionInputValue,
  onDirectionInputChange,
  onAddDirection,
  directions,
}: DirectionsInputProps) => {
  return (
    <section className="space-y-4 border-b pb-6">
      <label className="text-md font-bold">Directions</label>

      <textarea
        className="w-full rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
        rows={2}
        placeholder={"Step " + (directions.length + 1)}
        value={directionInputValue}
        onChange={onDirectionInputChange}
      />

      <div className="flex items-center justify-end text-blue-500 hover:text-blue-600">
        <button
          className="flex"
          title="Add direction"
          onClick={onAddDirection}
          type="button"
        >
          <p className="pr-2">Add direction</p>
          <PlusCircleIcon className="h-6 w-6" />
        </button>
      </div>
      {/* TODO add editDirection */}
      {directions.length > 0 && (
        <ul className="space-y-4 border-t pt-6">
          {directions.map(({ step, index }) => (
            <li key={index}>
              <textarea
                className="block w-full rounded-md border border-gray-300 p-4 transition ease-in-out"
                rows={1}
                placeholder={`Step ${index}`}
                name={`step-${index}`}
                disabled={true}
                value={`${index}. ${step}`}
                // onChange={onDirectionInputChange}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
export default DirectionsInput;
