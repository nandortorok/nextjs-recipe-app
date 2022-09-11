import { PlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState} from "react";

const Upload: NextPage = () => {

  // Total cooking time handler 
  const [totalTime, setTotalTime] = useState("");
  const [timeValues, setTimeValues] = useState({
    prepTime: 0,
    cookTime: 0,
    prepTimeUnit: 1,
    cookTimeUnit: 1,
  });

  const handleTimeValueChange = (event: ChangeEvent<HTMLFormElement>) => {
    let name: string = event.target.name;
    let value: number = parseInt(event.target.value);

    setTimeValues({
      ...timeValues,
      [name]: value,
    });

  };

  useEffect(() => {
    const { prepTime, cookTime, prepTimeUnit, cookTimeUnit } = timeValues;
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

  }, [timeValues]);

  // Ingredient inputs handler
  const [newIngredient, setNewIngredient] = useState({
    amount: '',
    unit: '',
    ingredientName: '',
  })
  const [ingredients, setIngredients] = useState<any>([])

  const onNewIngredientChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    let name: string = event.target.name;
    let value: string = event.target.value;

    setNewIngredient(prevState => ({
      ...prevState,
      [name]: value
    }))
  }, [])

  // button cilck event
  const onAddNewIngredient = useCallback((event: any) => {
    setIngredients([
      ...ingredients,
      {
        id: ingredients.length + 1,
        content: newIngredient,
        // recipeHeader:
      }
    ])
    
    setNewIngredient({
      amount: '',
      unit: '',
      ingredientName: '',
    })

  }, [newIngredient, ingredients])
  
  // Subimt data
  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget);
    const [ title, image, servings, prepTime, prepTimeUnit, cookTime, cookTimeUnit ] = formData

  };

  return (
    <>
      <Head>
        <title>Recipe Website | Upload</title>
      </Head>
      <main className="bg-slate-300 px-4 py-12">
        <form
          className="mx-auto mb-0 w-full max-w-2xl space-y-6 bg-white px-10 shadow"
          onChange={handleTimeValueChange}
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
          <div className="flex space-x-4 border border-gray-500">
            <input 
              className="w-1/2 border-0 focus:ring-0"
              value={newIngredient.amount}
              onChange={onNewIngredientChange}
              placeholder="e.g. 1"
              name="amount"
              type="number"
              min={0}
              max={999}
              />
            <input 
              className="w-1/2 border-0 focus:ring-0"
              value={newIngredient.unit}
              onChange={onNewIngredientChange}
              placeholder="e.g. kg"
              name="unit"
              type="text"
             />
            <div className="flex">
              <input
                className="border-0 focus:ring-0"
                value={newIngredient.ingredientName}
                onChange={onNewIngredientChange}
                placeholder="e.g. bacon"
                name="ingredientName"
                type="text"
              />
              <button 
                className="mr-3"
                title="Add ingredient"
                onClick={onAddNewIngredient}
              >
                <PlusIcon className="h-6 w-6 text-gray-500 hover:text-gray-700"/>
              </button>
            </div>
          </div>
          <table className="w-full">
            {ingredients.map((item:any) => (
              <tr key={item.id}>
                <td className="w-1/4">{item.content.amount}</td>
                <td className="w-1/4">{item.content.unit}</td>
                <td className="">{item.content.ingredientName}</td>
              </tr>
            ))}
          </table>

          <div className="flex space-x-4 group">
            <input 
              className="w-1/2 border-0 focus:ring-0 appearance-none"
              value={newIngredient.amount}
              onChange={onNewIngredientChange}
              name="amount"
              type="number"
              min={0}
              max={999}
              disabled={true}
              />
            <input 
              className="w-1/2 border-0 focus:ring-0"
              value={newIngredient.unit}
              onChange={onNewIngredientChange}
              name="unit"
              type="text"
              disabled={true}
             />
            <div className="flex">
              <input
                className="border-0 focus:ring-0"
                value={newIngredient.ingredientName}
                onChange={onNewIngredientChange}
                name="ingredientName"
                type="text"
                disabled={true}
              />
              <button 
                className="mr-3 inline-block w-full h-full"
                title="Edit ingredient"
                onClick={onAddNewIngredient}
              >
                <PencilIcon className="h-6 w-6 text-white group-hover:text-gray-700"/>
              </button>
            </div>
          </div>

          {/* <button 
            className="w-full rounded-full bg-slate-500 py-2 font-bold text-white hover:bg-slate-700"
            // onClick={}
          >
            Add header
          </button> */}
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
