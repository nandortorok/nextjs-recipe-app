import { ChangeEventHandler, MouseEventHandler } from "react";

// TODO export use Ingredient type

export type ContentProps = {
  contentID?: number;
  amount: number | string;
  unit: string;
  ingredientName: string;
  isEdited: boolean;
};

export type HeaderStateProps = {
  title: string;
  disabled: boolean;
};

export type IngredientsProps = {
  id: number;
  header: HeaderStateProps;
  content: ContentProps[];
};

export type IngredientListItemProps = {
  id?: number;
  contentValue: ContentProps;
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
  inputStateValue: ContentProps;
  onInputStateChange: ChangeEventHandler;
  onAddContent: MouseEventHandler;
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
  onTimeValueChange: ChangeEventHandler;
  timeValues: TimeValueProps;
};
