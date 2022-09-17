import { UploadInput, UploadSelect, UploadSection } from "./UploadForms";

const UploadRecipeDetails = () => {
  return (
    <UploadSection>
      <UploadInput
        label="Title"
        name="title"
        type="text"
        placeholder="Recipe title"
      />
      <UploadInput
        label="Image"
        name="image"
        type="file"
        placeholder="Recipe image"
      />
    </UploadSection>
  );
};

const UploadRecipeServings = () => {
  return (
    <section className="space-y-4 border-b pb-6">
      <UploadInput
        label="Servings"
        name="servings"
        type="number"
        placeholder="e.g. 4"
        min={0}
        max={99}
      />
    </section>
  );
};

type UploadRecipeTimeProps = {
  totalTime: string;
};

const UploadRecipeTime = ({ totalTime }: UploadRecipeTimeProps) => {
  return (
    <section className="space-y-4 border-b pb-6">
      <UploadSelect
        label="Prep Time"
        inputName="prepTime"
        selectName="prepTimeUnit"
      />
      <UploadSelect
        label="Cook Time"
        inputName="cookTime"
        selectName="cookTimeUnit"
      />
      {/* Total time */}
      <div className="flex items-center space-x-4">
        <label className="block w-full flex-1 pb-1 font-bold">Total Time</label>
        <input
          className="w-1/2 border-white"
          name="totalTime"
          type="text"
          value={totalTime}
          disabled={true}
        />
        <select className="invisible w-1/6"></select>
      </div>
    </section>
  );
};

export { UploadRecipeDetails, UploadRecipeServings, UploadRecipeTime };
