import { useContext } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { UploadContext } from "lib/contexts";

import DirectionRow from "./DirectionRow";
import { schemaT, schema } from "./schema";
import TableHead from "./TableHead";
import { ErrorMessage } from "../Elements";
import Form from "../Form";

const DirectionsInput = () => {
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
  const { fields, update, remove } = useFieldArray({
    control,
    name: "sections",
  });

  return (
    <FormProvider {...methods}>
      <Form>
        <section className="space-y-5 pt-5">
          <label className="text-md font-medium">Directions</label>
          {fields.map((field, idx) => (
            <div
              key={field.id}
              className="rounded-md border border-gray-300 dark:border-black/20"
            >
              <table className="w-full text-left">
                <TableHead idx={idx} fields={fields} remove={remove} />
                <tbody>
                  <DirectionRow sectionIndex={idx} />
                  <tr>
                    <td colSpan={4} className="p-3 text-center ">
                      <button
                        className="align-middle text-sm font-medium uppercase hover:text-blue-700"
                        type="button"
                        onClick={() => {
                          clearErrors(`sections.${idx}.directions`);
                          update(idx, {
                            ...watch().sections[idx],
                            directions: [
                              ...watch().sections[idx].directions,
                              { direction: "" },
                            ],
                          });
                          setFormValue({
                            ...formValue,
                            sections: [...watch().sections],
                          });
                        }}
                      >
                        Add direction
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

          {errors?.sections && <ErrorMessage error={errors.sections.message} />}
        </section>
      </Form>
    </FormProvider>
  );
};

export default DirectionsInput;
