import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Form from "./Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadContext } from "lib/contexts";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  sections: z
    .object({
      title: z.string().min(3).max(64),
      ingredients: z
        .object({
          amount: z.number().min(1).max(999),
          unit: z.string().max(16).optional(),
          name: z.string().min(3).max(32),
        })
        .array()
        .min(1),
    })
    .array()
    .min(1),
});

type schemaT = z.infer<typeof schema>;

const IngredientsInput = () => {
  const { formValue, setFormValue } = useContext(UploadContext);
  const methods = useForm<schemaT>({
    resolver: zodResolver(schema),
    defaultValues: {
      sections: formValue.sections,
    },
  });

  const {
    control,
    register,
    formState: { errors },
    watch,
  } = methods;
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "sections",
  });

  return (
    <FormProvider {...methods}>
      <Form>
        <>
          <label className="text-md font-bold">Ingredients</label>
          {fields.map((field, idx) => (
            <div className="rounded-md border border-gray-300" key={field.id}>
              <table className="w-full text-left">
                <caption className="px-3 py-4 text-left text-lg font-bold">
                  <div className="flex justify-between">
                    <input
                      className="border-0 align-middle text-lg focus:ring-0"
                      type="text"
                      placeholder="Title name"
                      autoComplete="off"
                      {...register(`sections.${idx}.title`)}
                    />
                    <button
                      className="pr-3 align-middle"
                      type="button"
                      onClick={() => remove(idx)}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </caption>
                <thead className="bg-gray-100 text-sm uppercase text-gray-700">
                  <tr>
                    <th className="w-1/3 py-3 pl-6">Amount</th>
                    <th className="w-1/3 py-3 pl-3">Unit</th>
                    <th className="w-1/3 py-3 pl-3">Name</th>
                    <th className="py-3 pl-10">
                      <span className="invisible">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <Ingredient sectionIndex={idx} />
                  <tr>
                    <td colSpan={4} className="p-3 text-center">
                      <button
                        className="align-middle text-sm font-bold uppercase hover:text-blue-700"
                        type="button"
                        onClick={() => {
                          setFormValue({
                            ...formValue,
                            ...watch().sections,
                          });

                          console.log(field);

                          update(idx, {
                            ...field,
                            ingredients: [
                              ...field.ingredients,
                              { amount: idx, unit: "", name: "" },
                            ],
                          });
                        }}
                      >
                        Add ingredient
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
          {errors?.sections && <p>{errors?.sections?.message}</p>}
          {errors?.sections &&
            errors?.sections?.map &&
            errors?.sections?.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <p>{section?.message}</p>
                <p>{section?.ingredients?.message}</p>
                {section?.ingredients &&
                  section?.ingredients.map &&
                  section?.ingredients?.map((ing, ingIdx) => (
                    <div key={ingIdx}>
                      <p>{ing?.message}</p>
                      <p>Amount: {ing?.amount?.message}</p>
                      <p>Unit: {ing?.unit?.message}</p>
                      <p>Name: {ing?.name?.message}</p>
                    </div>
                  ))}
              </div>
            ))}

          <div className="flex justify-center">
            <button
              className="rounded-md bg-blue-500 py-3 px-5 text-sm font-bold uppercase text-white transition ease-in-out hover:bg-blue-600 active:ring"
              type="button"
              onClick={() =>
                append({
                  title: "",
                  ingredients: [{ amount: 0, unit: "", name: "" }],
                })
              }
            >
              Add section
            </button>
          </div>
        </>
      </Form>
    </FormProvider>
  );
};

const Ingredient = ({ sectionIndex }: { sectionIndex: number }) => {
  const { register, control } = useFormContext();
  const { remove, fields } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.ingredients`,
  });

  return (
    <>
      {fields.map((field, idx) => (
        <tr className="border-b" key={field.id}>
          <td className="pl-3">
            <input
              className="w-full border-0 align-middle focus:ring-0"
              type="number"
              autoComplete="off"
              {...register(
                `sections.${sectionIndex}.ingredients.${idx}.amount`,
                {
                  valueAsNumber: true,
                }
              )}
            />
          </td>
          <td>
            <input
              className="w-full border-0 align-middle focus:ring-0"
              type="text"
              autoComplete="off"
              {...register(`sections.${sectionIndex}.ingredients.${idx}.unit`)}
            />
          </td>
          <td>
            <input
              className="w-full border-0 align-middle focus:ring-0"
              type="text"
              autoComplete="off"
              {...register(`sections.${sectionIndex}.ingredients.${idx}.name`)}
            />
          </td>
          <td className="py-3 px-6 text-right">
            <button
              className="align-middle"
              type="button"
              onClick={() => remove(idx)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default IngredientsInput;
