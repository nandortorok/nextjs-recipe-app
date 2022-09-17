import { PlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import { NextPage } from "next";
import Head from "next/head";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useState,
  MouseEvent,
} from "react";

// form components
import {
  UploadRecipeDetails,
  UploadRecipeServings,
  UploadRecipeTime,
} from "../components/Upload/UploadInputElements";

// custom cooking time hook
import useCookingTime from "../components/Upload/useCookingTime";

// Page
const Upload: NextPage = () => {
  const { totalTime, handleTimeValueChange } = useCookingTime();

  // Ingredient types
  type IngredientContentProps = {
    amount: number | string;
    unit: string;
    ingredientName: string;
  };

  type IngredientsProps = {
    id: number;
    content: IngredientContentProps;
    isEdited: boolean;
  };

  type RecipeHeaderProps = {
    id: number;
    subRecipe: string;
    subRecipeIngredients: IngredientsProps[];
  };

  // Ingredient inputs handler
  const [newIngredient, setNewIngredient] = useState<IngredientContentProps>({
    amount: "",
    unit: "",
    ingredientName: "",
  });
  const [ingredients, setIngredients] = useState<IngredientsProps[]>([]);
  const [recipeHeader, setRecipeHeader] = useState<RecipeHeaderProps[]>([]);

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
  const onAddNewIngredient = useCallback(() => {
    const { amount, unit, ingredientName } = newIngredient;

    if (!amount.toString().trim() || !unit.trim() || !ingredientName.trim())
      return;

    setIngredients([
      ...ingredients,
      {
        id: ingredients.length + 1,
        content: newIngredient,
        isEdited: false,
      },
    ]);

    setNewIngredient({
      amount: "",
      unit: "",
      ingredientName: "",
    });
  }, [newIngredient, ingredients]);

  // sets ingredients isEdited prop true/false
  const onEditIngredient =
    (ingredeint: IngredientsProps) => (e: MouseEvent) => {
      const newIngredients = ingredients.map((obj) => {
        // if id equals update ingredient
        if (obj.id === ingredeint.id)
          return {
            ...obj,
            isEdited: !ingredeint.isEdited,
          };

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
        if (obj.id === ingredeint.id)
          return {
            ...obj,
            content: {
              ...obj.content,
              [name]: value,
            },
          };

        // if not return ingredient
        return obj;
      });

      setIngredients(newIngredients);
    };

  const onAddHeader = (event: MouseEvent) => {
    const newRecipeHeader = () => [
      ...recipeHeader,
      {
        id: recipeHeader.length + 1,
        subRecipe: "Main",
        subRecipeIngredients: ingredients,
      },
    ];

    setRecipeHeader(newRecipeHeader);
    console.log(recipeHeader);
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
                  <PlusIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
            </div>

            <button
              className="w-full rounded-full bg-slate-500 py-2 font-bold text-white hover:bg-slate-700"
              onClick={onAddHeader}
            >
              Add header
            </button>

            {recipeHeader.map(
              ({ id, subRecipe, subRecipeIngredients }: RecipeHeaderProps) => (
                <section key={id}>
                  <h1>{subRecipe}</h1>
                  {Object.values(subRecipeIngredients).map(
                    (ingredient: IngredientsProps) => (
                      <div
                        className={
                          (ingredient.isEdited
                            ? "border-gray-500"
                            : "border-white") + " group flex space-x-4 border"
                        }
                        key={ingredient.id}
                      >
                        <input
                          className="w-1/2 border-0 focus:ring-0"
                          value={ingredient.content.amount}
                          onChange={onChangeIngredient(ingredient)}
                          name="amount"
                          type={ingredient.isEdited ? "number" : "text"}
                          min={0}
                          max={999}
                          disabled={!ingredient.isEdited}
                        />
                        <input
                          className="w-1/2 border-0 focus:ring-0"
                          value={ingredient.content.unit}
                          onChange={onChangeIngredient(ingredient)}
                          name="unit"
                          type="text"
                          disabled={!ingredient.isEdited}
                        />
                        <div className="flex">
                          <input
                            className="border-0 focus:ring-0"
                            value={ingredient.content.ingredientName}
                            onChange={onChangeIngredient(ingredient)}
                            name="ingredientName"
                            type="text"
                            disabled={!ingredient.isEdited}
                          />
                          <button
                            className="mr-3 inline-block h-full w-full"
                            title="Edit ingredient"
                            onClick={onEditIngredient(ingredient)}
                          >
                            <PencilIcon
                              className={
                                (ingredient.isEdited
                                  ? "text-gray-500"
                                  : "text-white") +
                                " h-6 w-6 group-hover:text-gray-700"
                              }
                            />
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </section>
              )
            )}
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

export default Upload;
