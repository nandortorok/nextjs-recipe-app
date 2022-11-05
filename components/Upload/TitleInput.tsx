const TitleInput = () => {
  return (
    <div>
      <label className="block pb-2 font-bold">Title</label>
      <input
        className="w-full rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
        name="title"
        type="text"
        placeholder="Recipe title"
      />
    </div>
  );
};
export default TitleInput;
