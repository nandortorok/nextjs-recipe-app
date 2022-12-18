import { UploadContext } from "lib/contexts";
import { useState, ChangeEvent, useContext } from "react";

const useIngredients = () => {
  const [sectionTitle, setSectionTitle] = useState("");
  const { sections, setSections } = useContext(UploadContext);

  const handleChange =
    (sectionId: number, ingredientId?: number) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      const newSections = sections.map((section, sectionIDx) => {
        if (sectionIDx === sectionId) {
          if (name === "title") {
            return {
              ...section,
              title: value,
            };
          } else {
            // filter items
            const newIngredients = section.ingredients.map(
              (ingredient, ingredientIdx) => {
                if (ingredientIdx === ingredientId) {
                  return {
                    ...ingredient,
                    [name]: value,
                  };
                } else {
                  return ingredient;
                }
              }
            );

            // return changed ones
            return {
              ...section,
              ingredients: newIngredients,
            };
          }
        } else {
          return section;
        }
      });

      setSections(newSections);
    };

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        title: sectionTitle,
        ingredients: [
          {
            amount: "",
            unit: "",
            name: "",
          },
        ],
        directions: [""],
      },
    ]);

    setSectionTitle("");
  };

  const handleAddIngredient = (sectionId: number) => {
    const newSections = sections.map((section, sectionIDx) => {
      if (sectionIDx === sectionId) {
        return {
          ...section,
          ingredients: [
            ...section.ingredients,
            {
              amount: "",
              unit: "",
              name: "",
            },
          ],
        };
      } else {
        return section;
      }
    });

    setSections(newSections);
  };

  const handleDeleteSection = (sectionIdx: number) => {
    const newSections = sections.filter((section, idx) => {
      return sectionIdx !== idx;
    });

    setSections(newSections);
  };

  const handleDeleteIngredient = (sectionId: number, ingredientId?: number) => {
    const newSections = sections.map((section, sectionIdx) => {
      if (sectionIdx === sectionId) {
        // filter items
        const newIngredients = section.ingredients.filter((ingredient, idx) => {
          return idx !== ingredientId;
        });

        return {
          ...section,
          ingredients: newIngredients,
        };
      } else {
        return section;
      }
    });

    setSections(newSections);
  };

  return {
    sections,
    sectionTitle,
    setSectionTitle,
    handleChange,
    handleAddSection,
    handleAddIngredient,
    handleDeleteSection,
    handleDeleteIngredient,
  };
};

export default useIngredients;
