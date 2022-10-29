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
      <h1 className="text-md font-bold">Directions</h1>

      <textarea
        className="w-full"
        rows={2}
        placeholder={"Step " + (directions.length + 1)}
        value={directionInputValue}
        onChange={onDirectionInputChange}
      />

      <div className="group flex items-center justify-end text-gray-500">
        <button
          className="flex"
          title="Add direction"
          onClick={onAddDirection}
          type="button"
        >
          <p className="pr-2">Add direction</p>
          <PlusCircleIcon className="h-6 w-6 group-hover:text-gray-900" />
        </button>
      </div>
      {/* TODO add editDirection */}
      <div className="">
        {directions.map(({ step, index }) => (
          <div className="border-gray-300 bg-gray-300" key={index}>
            <textarea
              className="turncate block w-full border-0"
              rows={1}
              placeholder={"Step " + index}
              value={step}
              disabled={true}
              // onChange={onDirectionInputChange}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default DirectionsInput;
