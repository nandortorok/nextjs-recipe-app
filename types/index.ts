import { ChangeEventHandler } from "react";

export type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export type IngredientProps = {
  amount?: string | number;
  unit?: string;
  name: string;
};

export type SectionProps = {
  title?: string;
  ingredients: IngredientProps[];
  directions: string[];
};
