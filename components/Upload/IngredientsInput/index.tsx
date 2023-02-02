import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { UploadContext } from "lib/contexts";
import Form from "../Form";
import { ErrorMessage } from "../Elements";
import { schemaT, schema } from "./schema";
import IngredientRow from "./IngredientRow";
import TableHead from "./TableHead";
import SectionErrorMessage from "./ErrorMessage";

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
    clearErrors,
  } = methods;
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "sections",
  });

  return (
    <FormProvider {...methods}>
      <Form>
        <section className="space-y-5 pt-5">
          <label className="text-md font-medium">Ingredients</label>
          {fields.map((field, idx) => (
            <div key={field.id}>
              <div className="rounded-md border border-gray-300 dark:border-black/20">
                <table className="w-full text-left">
                  <TableHead idx={idx} fields={fields} remove={remove} />
                  <tbody>
                    <IngredientRow sectionIndex={idx} />
                    <tr>
                      <td colSpan={4} className="p-3 text-center">
                        {errors.sections && (
                          <ErrorMessage
                            error={errors.sections[idx]?.ingredients?.message}
                          />
                        )}
                        <button
                          className="align-middle text-sm font-medium uppercase hover:text-blue-700"
                          type="button"
                          onClick={() => {
                            clearErrors(`sections.${idx}.ingredients`);

                            update(idx, {
                              title: watch().sections[idx].title,
                              ingredients: [
                                ...watch().sections[idx].ingredients,
                                { amount: 0, unit: "", name: "" },
                              ],
                              directions: [{ direction: "" }],
                            });

                            setFormValue({
                              ...formValue,
                              sections: [...watch().sections],
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
              <SectionErrorMessage errors={errors} idx={idx} />
            </div>
          ))}

          <div className="flex justify-center">
            <button
              className="rounded-md bg-blue-500 py-3 px-5 text-sm font-medium uppercase text-white transition ease-in-out hover:bg-blue-600 active:ring"
              type="button"
              onClick={() => {
                clearErrors(`sections`);

                append({
                  title: "",
                  ingredients: [{ amount: 0, unit: "", name: "" }],
                  directions: [{ direction: "" }],
                });
                setFormValue({
                  ...formValue,
                  sections: [...watch().sections],
                });
              }}
            >
              Add section
            </button>
          </div>
          {errors.sections && <ErrorMessage error={errors.sections.message} />}
        </section>
      </Form>
    </FormProvider>
  );
};

export default IngredientsInput;
