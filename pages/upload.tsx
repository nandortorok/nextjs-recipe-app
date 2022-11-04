import { NextPage } from "next";
import { FormEvent } from "react";
import Head from "next/head";

// components
import DirectionsInput from "@uploadComps/DirectionsInput";
import HeaderInput from "@uploadComps/HeaderInput";
import ImageInput from "@uploadComps/ImageInput";
import IngredientListItem from "@uploadComps/IngredientListItem";
import IngredientsInput from "@uploadComps/IngredientsInput";
import ServingsInput from "@uploadComps/ServingsInput";
import { TimeInput } from "@uploadComps/TimeInput";
import TitleInput from "@uploadComps/TitleInput";

// custom hooks
// import useCookingTime from "@hooks/useCookingTime_HTMLFORM";
import useCookingTime from "@hooks/useCookingTime";
import useIngredients from "@hooks/useIngredients";
import useDirections from "@hooks/useDirections";

// Page
const Upload: NextPage = () => {
  // const { totalTime, handleTimeValueChange } = useCookingTime();
  const { timeValues, handleTimeValueChange, totalTime } = useCookingTime();
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
  const {
    directions,
    directionState,
    handleDirectionInputChange,
    addDirections,
  } = useDirections();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const formData = new FormData();
  };

  return (
    <>
      <Head>
        <title>Recipe Website | Upload</title>
      </Head>

      <main className="bg-slate-300 px-4 py-12">
        <form
          className="mx-auto mb-0 w-full max-w-4xl space-y-6 bg-white px-10 shadow"
          onSubmit={handleSubmit}
          method="POST"
        >
          <h1 className="pt-5 text-center text-2xl font-bold">
            Upload a recipe
          </h1>

          <section className="space-y-4 border-b pb-6">
            <TitleInput />
            <ImageInput />
          </section>

          <section className="space-y-4 border-b pb-6">
            <ServingsInput />
          </section>

          <section className="space-y-4 border-b pb-6">
            <TimeInput
              timeValues={timeValues}
              onTimeValueChange={handleTimeValueChange}
              totalTime={totalTime}
            />
          </section>

          <section className="space-y-4 border-b pb-6">
            <h1 className="text-md font-bold">Ingredients</h1>

            <IngredientsInput
              inputStateValue={inputState}
              onInputStateChange={handleInputStateChange}
              onAddContent={addContent}
            />

            {contents.length > 0 && (
              <HeaderInput
                headerInputValue={headerInput}
                onHeaderInputChange={handleHeaderInputChange}
                onAddHeader={addHeader}
              />
            )}

            {/* TODO addEditHeader */}
            {/* Ingredients list */}
            {contents.length > 0 && (
              // if contents state is not empty list items
              <div key={0}>
                {contents.map((subItem) => (
                  <IngredientListItem
                    key={subItem.contentID}
                    contentValue={subItem}
                    onChangeIngredient={handleChangeIngredient(subItem)}
                    onEditIngredient={editIngredient(subItem)}
                  />
                ))}
              </div>
            )}

            {ingredients.map((item) => (
              <div key={item.id}>
                <p className="pb-3 underline">{item.header}</p>

                {item.content.map((subItem) => (
                  <IngredientListItem
                    key={subItem.contentID}
                    id={item.id}
                    contentValue={subItem}
                    onChangeIngredient={handleChangeIngredient(subItem, item)}
                    onEditIngredient={editIngredient(subItem, item)}
                  />
                ))}
              </div>
            ))}
          </section>

          {/* Directions */}
          <DirectionsInput
            directionInputValue={directionState}
            onDirectionInputChange={handleDirectionInputChange}
            onAddDirection={addDirections}
            directions={directions}
          />
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
