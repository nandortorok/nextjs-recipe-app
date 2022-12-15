import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { DirectionsInputProps } from "../../types/IngredientProps";

const DirectionsInput = () => {
  return (
    <>
      <label className="text-md font-bold">Directions</label>

      <textarea
        className="w-full rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
        rows={2}
        // placeholder={"Step " + (directions.length + 1)}
        // value={directionInputValue}
        // onChange={onDirectionInputChange}
      />

      <div className="flex items-center justify-end text-blue-500 hover:text-blue-600">
        <button
          className="flex"
          title="Add direction"
          // onClick={onAddDirection}
          type="button"
        >
          <p className="pr-2">Add direction</p>
          <PlusCircleIcon className="h-6 w-6" />
        </button>
      </div>
      {/* TODO add editDirection */}
      {/* {directions.length > 0 && ( */}
      <ul className="">
        {/* {directions.map(({ step, index }) => ( */}
        {/* <li key={index}>
              <div className="relative">
                <textarea
                  className="box-border block h-full min-h-[58px] w-full rounded-md border border-gray-300 p-4 transition ease-in-out"
                  rows={1}
                  placeholder={`Step ${index}`}
                  name={`step-${index}`}
                  disabled={true}
                  value={`${index}. ${step}`}
                  // onChange={onDirectionInputChange}
                />
                <button
                  className="text-gray-400 transition ease-in-out hover:text-blue-500"
                  type="button"
                  title="Edit direction"
                >
                  <PencilIcon className="absolute top-4 right-4 h-6 w-6 " />
                </button>
              </div>
            </li> */}
        {/* ))} */}
      </ul>
      {/* )} */}
    </>
  );
};
export default DirectionsInput;
