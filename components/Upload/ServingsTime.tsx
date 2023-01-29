import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import {
  useForm,
  Path,
  FormProvider,
  useFormContext,
  FieldErrorsImpl,
} from "react-hook-form";
import { z } from "zod";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { UploadContext } from "lib/contexts";
import Form from "./Form";

const schema = z.object({
  servings: z
    .number()
    .int()
    .min(1, "Servings must be greater than or equal to 1")
    .max(64, "Servings must be less than or equal to 60"),
  prepTime: z
    .number()
    .int()
    .min(1, "Prep time must be greater than or equal to 1")
    .max(60, "Prep time must be less than or equal to 60"),
  cookTime: z
    .number()
    .int()
    .min(1, "Cook time must be greater than or equal to 1")
    .max(60, "Cook time must be less than or equal to 60"),
  prepTimeUnit: z.number().int().min(1).max(60),
  cookTimeUnit: z.number().int().min(1).max(60),
});

type schemaT = z.infer<typeof schema>;

const ServingsTime = () => {
  const { formValue } = useContext(UploadContext);

  const methods = useForm<schemaT>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...formValue,
    },
  });

  const {
    watch,
    formState: { errors },
  } = methods;
  const { prepTime, cookTime, prepTimeUnit, cookTimeUnit } = watch();
  const total = prepTime * prepTimeUnit + cookTime * cookTimeUnit;

  const totalTime = () => {
    if (!(total / 1)) return null;

    if (total < 60) return `${total} ${total > 1 ? "minutes" : "minute"}`;

    const minutes = total % 60;
    const hours = Math.floor(total / 60);

    return `${hours} ${hours > 1 ? "hours" : "hour"} and ${minutes} ${
      minutes > 1 ? "minutes" : "minute"
    }`;
  };

  return (
    <FormProvider {...methods}>
      <Form>
        <>
          <label className="block pt-5 pb-2 font-medium">Servings</label>
          <Input name={"servings"} />
          <ErrorMessage name={"servings"} errors={errors} />

          <section className="grid grid-cols-2 gap-x-5 md:grid-cols-3">
            <p className="bold my-auto pb-1 max-md:col-span-2">Prep Time</p>
            <Input name={"prepTime"} />
            <Select name={"prepTimeUnit"} />
            <ErrorMessage name={"prepTime"} errors={errors} />
            <p className="bold my-auto pb-1 max-md:col-span-2">Cook Time</p>
            <Input name={"cookTime"} />
            <Select name={"cookTimeUnit"} />
            <ErrorMessage name={"cookTime"} errors={errors} />
            <p className="bold my-auto pb-1 text-center max-sm:col-span-2 md:text-left">
              Total
            </p>
            <p className="my-auto text-center max-sm:col-span-2 md:p-4 md:text-left">
              {totalTime()}
            </p>
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
  const { formValue, setFormValue } = useContext(UploadContext);
  const {
    formState: { errors },
    register,
    watch,
  } = useFormContext<schemaT>();

  return (
    <input
      className={
        errors?.[name]
          ? "rounded-md border-red-500 p-4 transition-colors ease-in-out focus:border-red-500 focus:ring-red-500 md:w-full"
          : "rounded-md border-gray-300 p-4 transition-colors ease-in-out md:w-full"
      }
      type="number"
      min={0}
      max={99}
      {...register(name, {
        valueAsNumber: true,
        onChange: () => setFormValue({ ...formValue, [name]: watch()[name] }),
      })}
    />
  );
};

const Select = ({ name }: InputProps) => {
  const { formValue, setFormValue } = useContext(UploadContext);
  const { register, watch } = useFormContext<schemaT>();
  return (
    <select
      className="rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0 md:w-full"
      {...register(name, {
        valueAsNumber: true,
        onChange: () => setFormValue({ ...formValue, [name]: watch()[name] }),
      })}
    >
      <option value={1}>minutes</option>
      <option value={60}>hours</option>
    </select>
  );
};

type ErrorMessageProps = {
  errors: Partial<FieldErrorsImpl<schemaT>>;
  name: "servings" | "prepTime" | "cookTime";
};

const ErrorMessage = ({ errors, name }: ErrorMessageProps) => {
  return errors?.[name] ? (
    <div className="col-span-2 flex w-full items-center gap-1 pt-2 pb-5 text-red-600 md:col-start-2">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p className="w-full text-sm">{errors?.[name]?.message}</p>
    </div>
  ) : (
    <div className="col-span-full pt-2 pb-5"></div>
  );
};

export default ServingsTime;
