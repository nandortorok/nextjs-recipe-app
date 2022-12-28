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
  } = methods;
  const { fields, update, remove } = useFieldArray({
    control,
    name: "sections",
  });

  return (
    <FormProvider {...methods}>
      <Form>
        <>
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
                        onClick={() =>
                          update(idx, {
                            ...field,
                            directions: [
                              ...field.directions,
                              { direction: "" },
                            ],
                          })
                        }
                      >
                        Add direction
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {errors?.sections && <p>{errors?.sections?.message}</p>}
              {errors?.sections &&
                errors?.sections?.map &&
                errors?.sections?.map((section, sectionIdx) => (
                  <div key={sectionIdx}>
                    <p>{section?.message}</p>
                    <p>{section?.directions?.message}</p>
                    {section?.directions?.map &&
                      section?.directions?.map((dic, dicIdx) => (
                        <div key={dicIdx}>
                          <p>{dic?.message}</p>
                          <p>Direction: {dic?.direction?.message}</p>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          ))}
        </>
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

export default DirectionsInput;
