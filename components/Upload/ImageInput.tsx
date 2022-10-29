const ImageInput = () => {
  return (
    <div>
      <label className="block pb-2 font-bold">Image</label>
      <input
        className="w-full border"
        name="image"
        type="file"
        placeholder="Recipe image"
      />
    </div>
  );
};
export default ImageInput;
