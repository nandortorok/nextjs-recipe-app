import { PencilIcon } from "@heroicons/react/24/solid";
import { ChangeEventHandler } from "react";
import { IngredientListItemProps } from "../../types/IngredientProps";

const IngredientListItem = ({
  id,
  contentValue: { contentID, amount, unit, ingredientName, isEdited },
  onChangeIngredient,
  onEditIngredient,
}: IngredientListItemProps) => {
  return (
    <div className="group flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
      <div
        className={
          !isEdited
            ? "flex justify-between rounded-md border border-gray-300 transition ease-in-out"
            : "flex justify-between rounded-md border border-blue-300 transition ease-in-out focus-within:border-blue-600 focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-600"
        }
      >
        <input
          className={
            !isEdited
              ? "w-full rounded-md border-0 p-4 text-gray-600 transition ease-in-out focus:border-opacity-0 focus:ring-0 lg:w-72"
              : "w-full rounded-md border-0 p-4 transition ease-in-out focus:border-opacity-0 focus:ring-0 lg:w-72"
          }
          value={ingredientName}
          onChange={onChangeIngredient}
          name={"ingredientName"}
          type="text"
          disabled={!isEdited}
          autoComplete={"off"}
        />
        <button
          className={
            !isEdited
              ? "cursor-pointer pr-3 text-gray-400 transition ease-in-out hover:text-blue-500"
              : "cursor-pointer pr-3 text-blue-500 transition ease-in-out"
          }
          title="Edit ingredient"
          type="button"
          onClick={onEditIngredient}
        >
          <PencilIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex space-x-3">
        <ListItem
          edited={isEdited}
          value={amount}
          onChange={onChangeIngredient}
          name={"amount"}
          type={isEdited ? "number" : "text"}
        />
        <ListItem
          edited={isEdited}
          value={unit}
          onChange={onChangeIngredient}
          name={"unit"}
          type={"text"}
        />
      </div>
    </div>
  );
};

type ListItemProps = {
  edited: boolean;
  value: string | number;
  onChange: ChangeEventHandler;
  name: string;
  type: "text" | "number";
};

export const ListItem = ({
  edited,
  value,
  onChange,
  name,
  type,
}: ListItemProps) => {
  return (
    <input
      className={
        !edited
          ? "w-1/2 rounded-md border-gray-200 bg-gray-100 p-4 text-gray-600 transition ease-in-out"
          : "w-1/2 rounded-md border-blue-200 bg-blue-50 p-4 transition ease-in-out"
      }
      value={value}
      onChange={onChange}
      name={name}
      type={type}
      min={0}
      max={999}
      disabled={!edited}
      autoComplete={"off"}
    />
  );
};

export default IngredientListItem;
