import { ChangeEventHandler, MouseEventHandler } from "react";

export type ContentProps = {
  contentID?: number;
  amount: number | string;
  unit: string;
  ingredientName: string;
  isEdited: boolean;
};

export type IngredientsProps = {
  id: number;
  header?: string;
  content: ContentProps[];
};

export type IngredientListItemProps = {
  contentValue: ContentProps;
  onChangeIngredient: ChangeEventHandler;
  onEditIngredient: MouseEventHandler<HTMLButtonElement>;
};

export type HeaderInputProps = {
  headerInputValue: string;
  onHeaderInputChange: ChangeEventHandler<HTMLInputElement>;
  onAddHeader: MouseEventHandler;
};

export type IngredientsInputProps = {
  inputStateValue: ContentProps;
  onInputStateChange: ChangeEventHandler;
  onAddContent: MouseEventHandler;
};
