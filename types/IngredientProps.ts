import { ChangeEventHandler, MouseEventHandler } from "react";

// TODO export use Ingredient type
export type SectionProps = {
  id: number;
  title: {
    name: string;
    disabled: boolean;
  };
  content: IngredientProps[];
};

export type IngredientProps = {
  id?: number;
  amount: number | string;
  unit: string;
  name: string;
  disabled: boolean;
};

export type IngredientListItemProps = {
  id?: number;
  contentValue: IngredientProps;
  onChange: ChangeEventHandler;
  onClick: MouseEventHandler;
};

export type HeaderInputProps = {
  isItem: boolean;
  name?: string;
  value: string;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: MouseEventHandler;
};

export type IngredientsInputProps = {
  // value: IngredientProps;
  // onChange: ChangeEventHandler;
  onClick: MouseEventHandler;
};

// TODO export useDirections types

export type DirectionsProps = {
  step: string;
  index: number;
};

export type DirectionsInputProps = {
  directionInputValue: string;
  onDirectionInputChange: ChangeEventHandler<HTMLTextAreaElement>;
  onAddDirection: MouseEventHandler;
  directions: DirectionsProps[];
};

// TODO export useCookingTime types

export type TimeValueProps = {
  prepTime: number;
  cookTime: number;
  prepTimeUnit: number;
  cookTimeUnit: number;
};

export type TimeInputProps = {
  totalTime: string;
  // onChange: ChangeEventHandler;
  timeValues: TimeValueProps;
};
