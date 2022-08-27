import { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, FormEvent, FormEventHandler, FormHTMLAttributes, useEffect, useState } from "react";

const Upload: NextPage = () => {
  const [totalTime, setTotalTime] = useState("");
  const [inputValues, setInputValues] = useState({
    prepTime: 0,
    cookTime: 0,
  });
  const [selectValues, setSelectValues] = useState({
    prepTimeUnit: 1,
    cookTimeUnit: 1,
  });

  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    if (e.target instanceof HTMLInputElement) {
      let name: string = e.target.name;
      let value: number = parseInt(e.target.value);

      setInputValues({
        ...inputValues,
        [name]: value,
      });
    }

    if (e.target instanceof HTMLSelectElement) {
      let name: string = e.target.name;
      let value: number = parseInt(e.target.value);

      setSelectValues({
        ...selectValues,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    const { prepTime, cookTime } = inputValues;
    const { prepTimeUnit, cookTimeUnit } = selectValues;

    const total = prepTime * prepTimeUnit + cookTime * cookTimeUnit;

    if (total < 60) {
      setTotalTime(`${total} ${total > 1 ? "minutes" : "minute"}`);
    } else if (total < 60 * 24) {
      const minutes = total % 60;
      const hours = Math.floor(total / 60);

      setTotalTime(
        `${hours} ${hours > 1 ? "hours" : "hour"} and ${minutes} ${
          minutes > 1 ? "minutes" : "minute"
        }`
      );
    }
  }, [inputValues, selectValues]);

  
  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    const data = event.target.title.value

    console.log(data);
    
  };

  return (
    <>
      <Head>
        <title>Recipe Website | Upload</title>
      </Head>
      <main className="bg-slate-300 px-4 py-12">
        <form
          className="mx-auto mb-0 w-full max-w-2xl space-y-6 bg-white px-10 shadow"
          onChange={handleChange}
          onSubmit={handleSubmit}
        >
          <h1 className="pt-5 text-center text-2xl font-bold">
            Upload a recipe
          </h1>
          {/* Title & Image */}
          <section className="space-y-4 border-b pb-6">
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
          </section>
          {/* Servings */}
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
          {/* Prep & Cook time */}
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

            <div className="flex items-center space-x-4">
              <label className="block w-full flex-1 pb-1 font-bold">
                Total Time
              </label>
              <input
                className="z-[2] w-1/2 border-white"
                name="totalTime"
                type="text"
                value={totalTime}
                disabled={true}
              />
              <select className="invisible w-1/6" name="" id=""></select>
            </div>
          </section>
          {/* Ingredients */}
          <section className="space-y-4 border-b pb-6">
            <h1 className="text-md font-bold">Ingredients</h1>
            <input
              className="w-full"
              name="ingredient"
              placeholder="e.g. egg"
              type="text"
            />
            <input
              className="w-full"
              name="ingredient"
              placeholder="e.g. bacon"
              type="text"
            />
            <input
              className="w-full"
              name="ingredient"
              placeholder="e.g. salt"
              type="text"
            />
          </section>
          {/* Directions */}
          <section className="space-y-4 border-b pb-6">
            <h1 className="text-md font-bold">Directions</h1>
            <div>
              <label className="block pb-2 font-bold">Step 1</label>
              <textarea className="w-full" rows={4} />
            </div>
            <div>
              <label className="block pb-2 font-bold">Step 2</label>
              <textarea className="w-full" rows={4} />
            </div>
            <div>
              <label className="block pb-2 font-bold">Step 3</label>
              <textarea className="w-full" rows={4} />
            </div>
          </section>
          {/* Submit */}
          <div className="pb-4">
            <button
              className="w-full rounded-full bg-slate-500 py-2 font-bold text-white hover:bg-slate-700"
              type="submit"
            >
              Upload recipe
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

// UploadInput
type InputProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  min?: number;
  max?: number;
};

const UploadInput = ({
  label,
  name,
  type,
  placeholder,
  min,
  max,
}: InputProps) => {
  return (
    <div>
      <label className="block pb-2 font-bold">{label}</label>
      <input
        className="w-full border"
        name={name}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
      />
    </div>
  );
};

// UploadSelect
type SelectProps = {
  label: string;
  inputName: string;
  selectName: string;
};

const UploadSelect = ({ label, inputName, selectName }: SelectProps) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="block flex-1 pb-1 font-bold">{label}</label>
      <input
        className="w-1/6"
        name={inputName}
        type="number"
        min={0}
        max={360}
        placeholder="0"
      />
      <select className="w-1/2" name={selectName}>
        <option value={1}>minutes</option>
        <option value={60}>hours</option>
      </select>
    </div>
  );
};

export default Upload;
