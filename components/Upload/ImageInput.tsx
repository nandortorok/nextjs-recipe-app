import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { InputProps } from "types/IngredientProps";

const ImageInput = (props: InputProps) => {
  return (
    <div>
      <label className="block pb-2 font-bold">Image</label>
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300 bg-gray-50 transition ease-in-out hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudArrowUpIcon className="h-10 w-10 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500 ">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 ">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input className="hidden" type="file" {...props} />
        </label>
      </div>
    </div>
  );
};
export default ImageInput;
