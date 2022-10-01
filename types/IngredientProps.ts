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
