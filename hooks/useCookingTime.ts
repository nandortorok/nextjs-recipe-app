import { ChangeEvent, useEffect, useState } from "react";
import { TimeValueProps } from "types/IngredientProps";

const useCookingTime = () => {
  const [totalTime, setTotalTime] = useState("");
  const [timeValues, setTimeValues] = useState<TimeValueProps>({
    prepTime: 0,
    cookTime: 0,
    prepTimeUnit: 1,
    cookTimeUnit: 1,
  });

  // Total cooking time handler
  const handleTimeValueChange = (event: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = event.target;

    setTimeValues({
      ...timeValues,
      [name]: value,
    });
  };

  useEffect(() => {
    const { prepTime, cookTime, prepTimeUnit, cookTimeUnit } = timeValues;
    const total = prepTime * prepTimeUnit + cookTime * cookTimeUnit;

    if (total < 60) {
      setTotalTime(`${total} ${total > 1 ? "minutes" : "minute"}`);
    } else if (total < 60 * 24) {
      const minutes = total % 60;
      const hours = Math.floor(total / 60);

      setTotalTime(
        `${hours} ${hours > 1 ? "hours" : "hour"} and ${minutes} ${
          minutes > 1 ? "minutes" : "minute"
        }`
      );
    }
  }, [timeValues]);

  return { timeValues, handleTimeValueChange, totalTime };
};
export default useCookingTime;
