import { ChangeEvent, useState, MouseEvent } from "react";
import { IngredientProps, SectionProps } from "types/IngredientProps";

const useIngredients = () => {
  const [inputState, setInputState] = useState<IngredientProps>({
    amount: "",
    unit: "",
    name: "",
    disabled: false,
  });
  const [headerInput, setHeaderInput] = useState<string>("");
  const [sections, setSections] = useState<SectionProps[]>([]);
  const [ingredients, setIngredients] = useState<IngredientProps[]>([]);

  const handleInputStateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const handleInputStateClick = () => {
    const { name } = inputState;

    if (!name.trim()) return;

    setIngredients([
      ...ingredients,
      {
        id: ingredients.length + 1,
        ...inputState,
      },
    ]);

    // Clear inputState
    setInputState({
      amount: "",
      unit: "",
      name: "",
      disabled: false,
    });
  };

  const handleHeaderInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHeaderInput(event.target.value);
  };

  const handleHeaderInputClick = () => {
    if (
      ingredients.length == 0 ||
      headerInput.length == 0 ||
      sections.find((item) => item.title!.name === headerInput)
    )
      return;

    setSections([
      ...sections,
      {
        id: sections.length + 1,
        title: {
          name: headerInput,
          disabled: true,
        },
        content: ingredients,
      },
    ]);

    // clear ingredient state
    setIngredients([]);
    setHeaderInput("");
  };

  const disableHeader =
    ({ title }: SectionProps) =>
    (event: MouseEvent) => {
      const newIngredients = sections.map((item) => {
        if (item.title.name === title.name)
          return {
            ...item,
            title: {
              ...title,
              disabled: !title.disabled,
            },
          };

        return item;
      });

      setSections(newIngredients);
    };

  const editHeader = (event: ChangeEvent<HTMLInputElement>) => {
    let name: string = event.target.name;
    let value: string = event.target.value;

    const newIngredients = sections.map((item) => {
      // if ids matches map ingredient
      if (item.title!.name === name) {
        return {
          ...item,
          title: {
            ...item.title,
            name: value,
          },
        };
      } else {
        return item;
      }
    });

    setSections(newIngredients);
  };

  // TODO make it better
  const editIngredient =
    (content: IngredientProps, ingredient?: SectionProps) =>
    (event: MouseEvent) => {
      if (ingredients.length > 0) {
        const newContents = ingredients.map((item) => {
          if (item.id === content.id)
            return {
              ...item,
              disabled: !content.disabled,
            };

          return item;
        });

        // only execute this code
        return setIngredients(newContents);
      }

      const newIngredients = sections.map((item) => {
        // if ids matches map ingredient
        if (item.id === ingredient?.id) {
          const newContents = item.content.map((subItem) => {
            // if ids matches update isEdited props
            if (subItem.id === content.id) {
              return {
                ...subItem,
                disabled: !content.disabled,
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
          item.content.find((obj) => obj.id === content.id)
        ) {
          setIngredients(
            ingredients.map((obj) => {
              if (obj.id === content.id) {
                return { ...obj, disabled: !content.disabled };
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

      setSections(newIngredients);
    };

  // TODO remove redundant code
  const handleChangeIngredient =
    (content: IngredientProps, ingredient?: SectionProps) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      let name: string = event.target.name;
      let value: string = event.target.value;

      if (ingredients.length > 0) {
        const newContents = ingredients.map((item) => {
          if (item.id === content.id)
            return {
              ...item,
              [name]: value,
            };

          return item;
        });

        // only execute this code
        return setIngredients(newContents);
      }

      const newIngredients = sections.map((item) => {
        // if ids matches map ingredient
        if (item.id === ingredient?.id) {
          const newContents = item.content.map((subItem) => {
            // if ids matches update isEdited props
            if (subItem.id === content.id) {
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
          item.content.find((obj) => obj.id === content.id)
        ) {
          setIngredients(
            ingredients.map((obj) => {
              if (obj.id === content.id) {
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

      setSections(newIngredients);
    };

  return {
    sections,
    inputState,
    ingredients,
    headerInput,
    handleInputStateChange,
    handleHeaderInputChange,
    handleChangeIngredient,
    handleInputStateClick,
    handleHeaderInputClick,
    editIngredient,
    disableHeader,
    editHeader,
  };
};

export default useIngredients;
