const ServingsInput = () => {
  return (
    <div>
      <label className="block pb-2 font-bold">Servings</label>
      <input
        className="w-full border"
        name="servings"
        type="number"
        placeholder="e.g. 4"
      />
    </div>
  );
};

export default ServingsInput;
