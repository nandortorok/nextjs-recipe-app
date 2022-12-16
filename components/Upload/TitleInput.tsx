import { InputProps } from "types/IngredientProps";

const TitleInput = (props: InputProps) => {
  return (
    <div>
      <label className="block pb-2 font-bold">Title</label>
      <input
        className="w-full rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
        name="title"
        type="text"
        placeholder="Recipe title"
        {...props}
      />
    </div>
  );
};
export default TitleInput;
