const TitleInput = () => {
  return (
    <div>
      <label className="block pb-2 font-bold">Title</label>
      <input
        className="w-full border"
        name="title"
        type="text"
        placeholder="Recipe title"
      />
    </div>
  );
};
export default TitleInput;
