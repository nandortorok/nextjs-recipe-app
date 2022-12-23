import { UploadContext } from "lib/contexts";
import { useState, ChangeEvent, useContext, FormEvent } from "react";
import { z } from "zod";

const useIngredients = () => {
  const [sectionTitle, setSectionTitle] = useState("");
  const { sections, setSections, handleIncrement } = useContext(UploadContext);

  const handleChange =
    (sectionId: number, ingredientId?: number) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value, valueAsNumber } = e.target;

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
                if (name === "amount") {
                  return {
                    ...ingredient,
                    [name]: valueAsNumber,
                  };
                } else if (ingredientIdx === ingredientId) {
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
            amount: 0,
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
              amount: 0,
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

  const schema = z
    .object({
      title: z.string().min(3).max(64).optional(),
      ingredients: z
        .object({
          amount: z.number().min(1).max(999).optional(),
          unit: z.string().max(16).optional(),
          name: z.string().min(3).max(32),
        })
        .array()
        .min(1),
    })
    .array()
    .min(1);

  const handleSubmit = (e: FormEvent) => {
    const valid = schema.safeParse(sections);

    if (valid.success) {
      handleIncrement();
    }

    e.preventDefault();
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
    handleSubmit,
  };
};

export default useIngredients;
