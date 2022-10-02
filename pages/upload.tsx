import { NextPage } from "next";
import Head from "next/head";

// form components
import {
  TitleImageInput,
  ServingsInput,
  RecipeTimeInput,
} from "../components/Upload/UploadInputElements";

// custom cooking time hook
import HeaderInput from "../components/Upload/HeaderInput";
import IngredientsInput from "../components/Upload/IngredientsInput";
import useCookingTime from "../hooks/useCookingTime";
import useIngredients from "../hooks/useIngredients";
import IngredientListItem from "../components/Upload/IngredientListItem";
import { FormEvent } from "react";

// Page
const Upload: NextPage = () => {
  const { totalTime, handleTimeValueChange } = useCookingTime();
  const {
    ingredients,
    inputState,
    contents,
    headerInput,
    handleInputStateChange,
    handleHeaderInputChange,
    handleChangeIngredient,
    addContent,
    addHeader,
    editIngredient,
  } = useIngredients();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          method="POST"
        >
          <h1 className="pt-5 text-center text-2xl font-bold">
            Upload a recipe
          </h1>

          <TitleImageInput />
          <ServingsInput />
          <RecipeTimeInput totalTime={totalTime} />

          {/* Ingredients */}
          <section className="space-y-4 border-b pb-6">
            <IngredientsInput
              inputStateValue={inputState}
              onInputStateChange={handleInputStateChange}
              onAddContent={addContent}
            />
            <HeaderInput
              headerInputValue={headerInput}
              onHeaderInputChange={handleHeaderInputChange}
              onAddHeader={addHeader}
            />

            {/* Ingredients list */}
            <h1 className="text-md font-bold underline">Ingredients</h1>

            {contents.length > 0 && (
              // if contents state is not empty list items
              <div className="ml-3" key={0}>
                {contents.map((item) => (
                  <IngredientListItem
                    key={item.contentID}
                    contentValue={item}
                    onChangeIngredient={handleChangeIngredient(item)}
                    onEditIngredient={editIngredient(item)}
                  />
                ))}
              </div>
            )}

            {ingredients.map((item) => (
              <div key={item.id}>
                <p className="font-bold">{item.header}</p>
                <div className="ml-3">
                  {item.content.map((subItem) => (
                    <IngredientListItem
                      key={subItem.contentID}
                      contentValue={subItem}
                      onChangeIngredient={handleChangeIngredient(subItem, item)}
                      onEditIngredient={editIngredient(subItem, item)}
                    />
                  ))}
                </div>
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

export default Upload;
