import { InputProps } from "types/IngredientProps";

const ServingsInput = (props: InputProps) => {
  return (
    <div>
      <label className="block pb-2 font-bold">Servings</label>
      <input
        className="w-full rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
        name="servings"
        type="number"
        placeholder="e.g. 4"
        {...props}
        min={0}
        max={99}
      />
    </div>
  );
};

export default ServingsInput;
