import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadContext } from "lib/contexts";
import { useContext } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";

import Form from "./Form";

const schema = z.object({
  sections: z
    .object({
      title: z.string().min(3).max(64),
      directions: z
        .object({
          direction: z.string().min(8).max(256),
        })
        .array()
        .min(1),
    })
    .array()
    .min(1),
});

type schemaT = z.infer<typeof schema>;

const DirectionsInput = () => {
  const { formValue } = useContext(UploadContext);
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
        <section className="space-y-5">
          <label className="text-md font-bold">Directions</label>
          {fields.map((field, idx) => (
            <div key={field.id} className="rounded-md border border-gray-300">
              <table className="w-full text-left">
                <caption className="border-b px-3 py-4 text-left text-lg font-bold">
                  <div className="flex justify-between">
                    <input
                      className="border-0 align-middle text-lg focus:ring-0"
                      type="text"
                      placeholder="Title name"
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
                <tbody>
                  <Direction sectionIndex={idx} />
                  <tr>
                    <td colSpan={4} className="p-3 text-center ">
                      <button
                        className="align-middle text-sm font-bold uppercase hover:text-blue-700"
                        type="button"
                        onClick={() => {
                          clearErrors(`sections.${idx}.directions`);
                          update(idx, {
                            title: watch().sections[idx].title,
                            directions: [
                              ...watch().sections[idx].directions,
                              { direction: "" },
                            ],
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
          <section>
            {errors?.sections && (
              <ErrorMessage error={errors?.sections?.message} />
            )}
            {errors?.sections &&
              errors?.sections?.map &&
              errors?.sections?.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <ErrorMessage error={section?.message} />
                  <ErrorMessage error={section?.directions?.message} />
                  {section?.directions?.map &&
                    section?.directions?.map((dic, dicIdx) => (
                      <div key={dicIdx}>
                        <ErrorMessage error={dic?.message} />
                        <ErrorMessage
                          name={`${dicIdx + 1}. Direction`}
                          error={dic?.direction?.message}
                        />
                      </div>
                    ))}
                </div>
              ))}
          </section>
        </section>
      </Form>
    </FormProvider>
  );
};

const Direction = ({ sectionIndex }: { sectionIndex: number }) => {
  const { register, control, watch } = useFormContext();
  const { remove, fields } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.directions`,
  });

  return (
    <>
      {fields.map((field, idx) => (
        <tr className="border-b" key={field.id}>
          <td>
            <div className="flex">
              <p className="my-auto pl-6 text-gray-700">{idx + 1}</p>
              <input
                className="w-full border-0 focus:ring-0"
                type="text"
                autoComplete="off"
                {...register(
                  `sections.${sectionIndex}.directions.${idx}.direction`
                )}
              />
            </div>
          </td>
          <td className="py-3 px-6 text-right">
            <button
              className="align-middle transition ease-in-out hover:text-red-600"
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

type ErrorMessageProps = {
  error: string | undefined;
  name?: string;
};

const ErrorMessage = ({ error, name }: ErrorMessageProps) => {
  return error ? (
    <div className="col-span-3 flex w-full items-center gap-1 py-1 text-red-600">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p className="w-full text-sm">
        {name && <span>{name}: </span>}
        {error}
      </p>
    </div>
  ) : (
    <></>
  );
};

export default DirectionsInput;
