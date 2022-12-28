import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm, Path, FormProvider, useFormContext } from "react-hook-form";
import { z } from "zod";

import { UploadContext } from "lib/contexts";
import Form from "./Form";

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
  prepTimeUnit: z.number().int().min(1).max(60),
  cookTimeUnit: z.number().int().min(1).max(60),
});

type schemaT = z.infer<typeof schema>;

const ServingsTime = () => {
  const { formValue: formState } = useContext(UploadContext);

  const methods = useForm<schemaT>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...formState,
    },
  });

  const { watch } = methods;
  const { prepTime, cookTime, prepTimeUnit, cookTimeUnit } = watch();
  const total = prepTime * prepTimeUnit + cookTime * cookTimeUnit;

  const totalTime = () => {
    if (total < 60) {
      return `${total} ${total > 1 ? "minutes" : "minute"}`;
    } else if (total < 60 * 24) {
      const minutes = total % 60;
      const hours = Math.floor(total / 60);

      return `${hours} ${hours > 1 ? "hours" : "hour"} and ${minutes} ${
        minutes > 1 ? "minutes" : "minute"
      }`;
    }
  };

  return (
    <FormProvider {...methods}>
      <Form>
        <>
          <label className="block pb-2 font-bold">Servings</label>
          <Input name={"servings"} />
          <section className="grid grid-cols-3 grid-rows-3 gap-5">
            <p className="my-auto">Prep Time</p>
            <Input name={"prepTime"} />
            <Select name={"prepTimeUnit"} />
            <p className="my-auto">Cook Time</p>
            <Input name={"cookTime"} />
            <Select name={"cookTimeUnit"} />
            <p className="my-auto">Total</p>
            <p className="col-span-2 my-auto p-4">{totalTime()}</p>
          </section>
        </>
      </Form>
    </FormProvider>
  );
};

type InputProps = {
  name: Path<schemaT>;
};

const Input = ({ name }: InputProps) => {
  const {
    formState: { errors },
    register,
  } = useFormContext<schemaT>();

  return (
    <div>
      <input
        className="w-full rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
        type="number"
        aria-invalid={errors?.[name] ? "true" : "false"}
        {...register(name, { valueAsNumber: true })}
      />
      {errors?.[name] && <p>{errors?.[name]?.message}</p>}
    </div>
  );
};

const Select = ({ name }: InputProps) => {
  const {
    formState: { errors },
    register,
  } = useFormContext<schemaT>();
  return (
    <div>
      <select
        className="w-full rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
        {...register(name, { valueAsNumber: true })}
      >
        <option value={1}>minutes</option>
        <option value={60}>hours</option>
      </select>
      {errors?.[name] && <p>{errors?.[name]?.message}</p>}
    </div>
  );
};

export default ServingsTime;
