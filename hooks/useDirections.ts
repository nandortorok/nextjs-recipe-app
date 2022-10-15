import { ChangeEvent, useState } from "react";
import { DirectionsProps } from "../types/IngredientProps";

const useDirections = () => {
  const [directionState, setDirectionState] = useState<string>("");
  const [directions, setDirections] = useState<DirectionsProps[]>([]);

  const handleDirectionInputChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDirectionState(event.target.value);
  };

  const addDirections = () => {
    if (!directionState.trim()) return;

    setDirections([
      ...directions,
      {
        step: directionState,
        index: directions.length + 1,
      },
    ]);

    setDirectionState("");
  };

  return {
    directions,
    directionState,
    handleDirectionInputChange,
    addDirections,
  };
};

export default useDirections;
