import { UploadContext } from "lib/contexts";
import { useContext, FormEvent } from "react";
import { z } from "zod";
import Form from "./Form";
import TimeInput from "./TimeInput";

const ServingsTime = () => {
  const { servings, setServings, timeValues, handleIncrement } =
    useContext(UploadContext);

  const schema = z.object({
    servings: z.number().int().min(1).max(64),
    prepTime: z
      .number()
      .int()
      .min(1)
      .max(60 * 24),
    cookTime: z
      .number()
      .int()
      .min(1)
      .max(60 * 24),
  });

  const handleSubmit = (e: FormEvent) => {
    const { prepTime, cookTime } = timeValues;

    const valid = schema.safeParse({ servings, prepTime, cookTime });

    if (valid.success) {
      handleIncrement();
    }

    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <>
        <label className="block pb-2 font-bold">Servings</label>
        <input
          className="w-full rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
          name="servings"
          type="number"
          placeholder="e.g. 4"
          value={servings}
          onChange={(e) => setServings(e.target.valueAsNumber)}
          min={0}
          max={99}
        />
        <TimeInput />
      </>
    </Form>
  );
};
export default ServingsTime;
