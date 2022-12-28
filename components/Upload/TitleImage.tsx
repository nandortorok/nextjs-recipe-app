import { useContext } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Form from "./Form";
import { UploadContext } from "lib/contexts";
import { watch } from "fs";

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
          <label className="block pb-2 font-bold">Title</label>
          <input
            className="w-full rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
            type="text"
            placeholder="Recipe title"
            {...register("title", {
              onBlur: () =>
                setFormValue({ ...formValue, title: watch().title }),
            })}
          />
          {errors?.title && <p>{errors?.title?.message}</p>}

          <label className="block pb-2 font-bold">Image</label>
          <div className="flex w-full items-center justify-center">
            <label
              htmlFor="image"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300 bg-gray-50 transition ease-in-out hover:bg-gray-100"
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
