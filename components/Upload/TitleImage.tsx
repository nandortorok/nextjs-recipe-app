import { useContext, useEffect } from "react";
import {
  CloudArrowUpIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Form from "./Form";
import { UploadContext } from "lib/contexts";

const schema = z.object({
  title: z.string().min(3).max(64),
});

type schemaT = z.infer<typeof schema>;

const TitleImage = () => {
  const { formValue, setFormValue } = useContext(UploadContext);

  const methods = useForm<schemaT>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...formValue,
    },
  });

  const {
    register,
    formState: { errors },
    watch,
  } = methods;

  return (
    <FormProvider {...methods}>
      <Form>
        <>
          <label className="block pt-5 pb-2 font-bold">Title</label>
          <input
            className={
              errors.title
                ? "w-full rounded-md border-red-500 p-4 transition-colors ease-in-out focus:border-red-500 focus:ring-red-500"
                : "w-full rounded-md border-gray-300 p-4 transition-colors ease-in-out"
            }
            type="text"
            placeholder="Recipe title"
            autoComplete="off"
            {...register("title", {
              onBlur: () =>
                setFormValue({ ...formValue, title: watch().title }),
            })}
          />
          {errors?.title && (
            <div className="flex items-center gap-1 p-1 text-red-600">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <p className="text-sm">{errors?.title?.message}</p>
            </div>
          )}

          <label className="block pt-5 pb-2 font-bold">Image</label>
          <div className="flex h-full w-full items-center justify-center">
            <label
              htmlFor="image"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300 bg-gray-50 transition ease-in-out hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <CloudArrowUpIcon className="h-10 w-10 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500 ">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 ">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input className="hidden" id="image" type="file" />
            </label>
          </div>
        </>
      </Form>
    </FormProvider>
  );
};

export default TitleImage;
