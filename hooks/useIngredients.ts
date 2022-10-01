import { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { ContentProps, IngredientsProps } from "../types/IngredientProps";

const useIngredients = () => {
  const [inputState, setInputState] = useState<ContentProps>({
    amount: "",
    unit: "",
    ingredientName: "",
    isEdited: false,
  });

  const [headerInput, setHeaderInput] = useState<string>("");

  const [contents, setContents] = useState<ContentProps[]>([]);
  const [ingredients, setIngredients] = useState<IngredientsProps[]>([]);

  const handleInputStateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const addContent = () => {
    const { amount, unit, ingredientName } = inputState;

    if (!ingredientName.trim()) return;

    // Add input values to 'contents' state with an id
    setContents([
      ...contents,
      {
        contentID: contents.length + 1,
        ...inputState,
      },
    ]);

    // Clear inputs
    setInputState({
      amount: "",
      unit: "",
      ingredientName: "",
      isEdited: false,
    });
  };

  const handleHeaderInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHeaderInput(event.target.value);
  };

  const addHeader = () => {
    if (contents.length == 0 || headerInput.length == 0) return;

    setIngredients([
      ...ingredients,
      {
        id: ingredients.length + 1,
        header: headerInput,
        content: contents,
      },
    ]);

    // clear contents state
    setContents([]);
  };

  const editIngredient =
    (content: ContentProps, ingredient?: IngredientsProps) =>
    (event: MouseEvent<HTMLButtonElement>) => {
      const newIngredients = ingredients.map((item) => {
        // if ids matches map ingredient
        if (item.id === ingredient?.id) {
          const newContents = item.content.map((subItem) => {
            // if ids matches update isEdited props
            if (subItem.contentID === content.contentID) {
              return {
                ...subItem,
                isEdited: !content.isEdited,
              };
            } else {
              return subItem;
            }
          });

          // if ids matches return update contents in ingredients
          return {
            ...item,
            content: newContents,
          };
        } else if (
          ingredient == undefined &&
          item.content.find((obj) => obj.contentID === content.contentID)
        ) {
          setContents(
            contents.map((obj) => {
              if (obj.contentID === content.contentID) {
                return { ...obj, isEdited: !content.isEdited };
              } else {
                return obj;
              }
            })
          );

          return item;
        } else {
          return item;
        }
      });

      setIngredients(newIngredients);
    };

  const onChangeIngredient =
    (content: ContentProps, ingredient?: IngredientsProps) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      let name: string = event.target.name;
      let value: string = event.target.value;

      const newIngredients = ingredients.map((item) => {
        // if ids matches map ingredient
        if (item.id === ingredient?.id) {
          const newContents = item.content.map((subItem) => {
            // if ids matches update isEdited props
            if (subItem.contentID === content.contentID) {
              return {
                ...subItem,
                [name]: value,
              };
            } else {
              return subItem;
            }
          });

          // if ids matches return update contents in ingredients
          return {
            ...item,
            content: newContents,
          };
        } else if (
          ingredient == undefined &&
          item.content.find((obj) => obj.contentID === content.contentID)
        ) {
          setContents(
            contents.map((obj) => {
              if (obj.contentID === content.contentID) {
                return { ...obj, [name]: value };
              } else {
                return obj;
              }
            })
          );

          return item;
        } else {
          return item;
        }
      });

      setIngredients(newIngredients);
    };

  return {
    ingredients,
    inputState,
    contents,
    headerInput,
    handleInputStateChange,
    handleHeaderInputChange,
    addContent,
    addHeader,
    editIngredient,
    onChangeIngredient,
  };
};

export default useIngredients;
