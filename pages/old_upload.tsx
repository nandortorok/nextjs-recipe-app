import { PlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import { NextPage } from "next";
import Head from "next/head";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useState,
  MouseEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
} from "react";

// form components
import {
  UploadRecipeDetails,
  UploadRecipeServings,
  UploadRecipeTime,
} from "../components/Upload/UploadInputElements";

// custom cooking time hook
import useCookingTime from "../hooks/useCookingTime";

// Page
const Upload: NextPage = () => {
  const { totalTime, handleTimeValueChange } = useCookingTime();

  // Ingredient types
  type IngredientContentProps = {
    amount: number | string;
    unit: string;
    ingredientName: string;
  };

  type SubIngredientsProps = {
    id: number;
    content: IngredientContentProps;
    isEdited: boolean;
  };

  type IngredientsProps = {
    header?: string;
    subIngredients: SubIngredientsProps[];
  };

  // Ingredient inputs handler
  const [newIngredient, setNewIngredient] = useState<IngredientContentProps>({
    amount: "",
    unit: "",
    ingredientName: "",
  });
  const [subIngredientState, setSubIngredientState] = useState<
    SubIngredientsProps[]
  >([]);
  const [ingredients, setIngredients] = useState<IngredientsProps[]>([]);

  const [headerInput, setHeaderInput] = useState<string>("");

  // sets amount, unit, ingredientName into newIngredient state
  const onNewIngredientChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let name: string = event.target.name;
      let value: string = event.target.value;

      setNewIngredient((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  // sets newIngredients into ingredients array state
  const onAddNewIngredient = useCallback(
    (e: MouseEvent) => {
      const { amount, unit, ingredientName } = newIngredient;

      if (!amount.toString().trim() || !unit.trim() || !ingredientName.trim())
        return;

      setSubIngredientState([
        ...subIngredientState,
        {
          id: subIngredientState.length + 1,
          content: newIngredient,
          isEdited: false,
        },
      ]);

      setIngredients([
        {
          header: "",
          subIngredients: subIngredientState,
        },
      ]);

      setNewIngredient({
        amount: "",
        unit: "",
        ingredientName: "",
      });
    },
    [newIngredient, ingredients, subIngredientState]
  );

  useEffect(() => {
    console.log(subIngredientState);
  }, [subIngredientState]);

  // sets ingredients isEdited prop true/false
  const onEditIngredient =
    (ingredeint: IngredientsProps) => (e: MouseEvent) => {
      const newIngredients = ingredients.map((obj) => {
        // if id equals update ingredient
        if (obj.subIngredients[0] === ingredeint.subIngredients[0])
          return {
            ...obj,
            isEdited: !ingredeint.subIngredients[2],
          };
        console.log("obj", obj);
        console.log("ing", ingredeint.subIngredients);
        console.log("newIng", subIngredientState);
        

        // if not return ingredient
        return obj;
      });

      setIngredients(newIngredients);
    };

  // handles ingredient content prop change
  const onChangeIngredient =
    (ingredeint: IngredientsProps) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      let name: string = event.target.name;
      let value: string = event.target.value;

      const newIngredients = ingredients.map((obj) => {
        // if id equals update ingredient
        if (obj.subIngredients[0] === ingredeint.subIngredients[0])
          return {
            ...obj,
            content: {
              ...obj.subIngredients[1],
              [name]: value,
            },
          };

        // if not return ingredient
        return obj;
      });

      setIngredients(newIngredients);
    };

  const onAddHeader = (event: MouseEvent) => {
    setIngredients([
      ...ingredients,
      {
        header: headerInput,
        subIngredients: subIngredientState,
      },
    ]);

    setHeaderInput("");
    setSubIngredientState([]);

    console.log(ingredients);
  };

  // Subimt data
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const [
      title,
      image,
      servings,
      prepTime,
      prepTimeUnit,
      cookTime,
      cookTimeUnit,
    ] = formData;
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
          <UploadRecipeDetails />
          <UploadRecipeServings />
          <UploadRecipeTime totalTime={totalTime} />
          {/* Ingredients */}
          <section className="space-y-4 border-b pb-6">
            <IngredientUploadInput
              newIngredient={newIngredient}
              onChange={onNewIngredientChange}
              onClick={onAddNewIngredient}
            />
            {/* Add header function */}
            <div className="flex space-x-4">
              <input
                className=""
                type="text"
                value={headerInput}
                onChange={(e) => setHeaderInput(e.target.value)}
              />
              <button
                className="w-full rounded-full bg-slate-500 py-2 font-bold text-white hover:bg-slate-700"
                onClick={onAddHeader}
              >
                Add header
              </button>
            </div>

            {/* Ingredients list */}
            {ingredients.map((obj: IngredientsProps) => (
              <div key={obj.header}>
                <h1>{obj.header}</h1>
                {obj.subIngredients.map((ingredient: SubIngredientsProps) => (
                  <IngredientItem
                    key={ingredient.id}
                    ingredient={ingredient}
                    onChange={onChangeIngredient(obj)}
                    onClick={onEditIngredient(obj)}
                  />
                ))}
              </div>
            ))}
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

type IngredientUploadInputProps = {
  newIngredient: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
};
const IngredientUploadInput = ({
  newIngredient,
  onChange,
  onClick,
}: IngredientUploadInputProps) => {
  return (
    <div className="flex space-x-4 border border-gray-500">
      <input
        className="w-1/2 border-0 focus:ring-0"
        value={newIngredient.amount}
        onChange={onChange}
        placeholder="e.g. 1"
        name="amount"
        type="number"
        min={0}
        max={999}
      />
      <input
        className="w-1/2 border-0 focus:ring-0"
        value={newIngredient.unit}
        onChange={onChange}
        placeholder="e.g. kg"
        name="unit"
        type="text"
      />
      <div className="flex">
        <input
          className="border-0 focus:ring-0"
          value={newIngredient.ingredientName}
          onChange={onChange}
          placeholder="e.g. bacon"
          name="ingredientName"
          type="text"
        />
        <button className="mr-3" title="Add ingredient" onClick={onClick}>
          <PlusIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </button>
      </div>
    </div>
  );
};

type IngredientInputProps = {
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  type: string;
  disabled: boolean;
};

const IngredientInput = ({
  value,
  onChange,
  name,
  type,
  disabled,
}: IngredientInputProps) => {
  return (
    <input
      className="w-1/2 border-0 focus:ring-0"
      value={value}
      onChange={onChange}
      name={name}
      type={type}
      min={0}
      max={999}
      disabled={!disabled}
    />
  );
};

type IngredientItemProps = {
  ingredient: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
};
const IngredientItem = ({
  ingredient,
  onChange,
  onClick,
}: IngredientItemProps) => {
  return (
    <div
      className={
        (ingredient.isEdited ? "border-gray-500" : "border-white") +
        " group flex space-x-4 border"
      }
    >
      <IngredientInput
        value={ingredient.content.amount}
        onChange={onChange}
        name="amount"
        type={ingredient.isEdited ? "number" : "text"}
        disabled={ingredient.isEdited}
      />
      <IngredientInput
        value={ingredient.content.unit}
        onChange={onChange}
        name="unit"
        type="text"
        disabled={ingredient.isEdited}
      />
      <div className="flex">
        <input
          className="border-0 focus:ring-0"
          value={ingredient.content.ingredientName}
          onChange={onChange}
          name="ingredientName"
          type="text"
          disabled={!ingredient.isEdited}
        />
        <button
          className="mr-3 inline-block h-full w-full"
          title="Edit ingredient"
          onClick={onClick}
        >
          <PencilIcon
            className={
              (ingredient.isEdited ? "text-gray-500" : "text-white") +
              " h-6 w-6 group-hover:text-gray-700"
            }
          />
        </button>
      </div>
    </div>
  );
};

export default Upload;
