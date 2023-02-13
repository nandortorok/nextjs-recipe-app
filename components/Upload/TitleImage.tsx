import { ChangeEvent, useContext } from "react";

import {
  CloudArrowUpIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { UploadContext } from "lib/contexts";

import Form from "./Form";

const maxImageSize = 5 * 1024 * 1024;
const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z.object({
  title: z
    .string()
    .min(12, "Title must contain at least 12 character")
    .max(32, "Title must contain at most 32 character"),
  image: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= maxImageSize,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => validImageTypes.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

type schemaT = z.infer<typeof schema>;

const TitleImage = () => {
  const { formValue, setFormValue, preview, setPreview } =
    useContext(UploadContext);

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
    clearErrors,
    setValue,
    trigger,
  } = methods;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      const { type, size } = files[0];
      setValue("image", files);
      setPreview(URL.createObjectURL(files[0]));
    }

    setFormValue({ ...formValue, image: e.target.files });

    if (schema.safeParse(watch())) {
      clearErrors("image");
      trigger("image");
    }
  };

  return (
    <FormProvider {...methods}>
      <Form>
        <>
          <label className="block pt-5 pb-2 font-medium">Title</label>
          <input
            className={
              errors.title
                ? "w-full rounded-md border-red-500 p-4 transition-colors ease-in-out focus:border-red-500 focus:ring-red-500 dark:bg-zinc-900"
                : "w-full rounded-md border-gray-300 p-4 transition-colors ease-in-out dark:border-black/20 dark:bg-zinc-900"
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

          <label className="block pt-5 pb-2 font-medium">Image</label>
          <div className="flex h-full w-full items-center justify-center">
            <label
              htmlFor="image"
              className={
                errors.image
                  ? "relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-red-500 bg-gray-50 text-red-500 transition ease-in-out hover:bg-gray-100 dark:bg-zinc-900 dark:hover:bg-black/20"
                  : formValue.image && !errors.image
                  ? "group relative z-10 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300 text-white transition ease-in-out dark:border-black/20 dark:bg-zinc-900"
                  : "relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300 bg-gray-50 text-gray-500 transition ease-in-out hover:bg-gray-100 dark:border-black/20 dark:bg-zinc-900"
              }
            >
              {formValue.image && !errors.image && (
                <Image
                  src={preview}
                  alt={"preview-image"}
                  className="absolute -z-10 rounded-md object-cover"
                  fill={true}
                />
              )}
              <div
                className={
                  formValue.image && !errors.image
                    ? "flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-black/20 via-black/40 to-black/20 pt-5 pb-6 transition-transform ease-in-out group-hover:text-gray-200"
                    : "flex h-full w-full flex-col items-center justify-center pt-5 pb-6 transition-transform ease-in-out group-hover:text-gray-600"
                }
              >
                <CloudArrowUpIcon className="h-10 w-10" />
                <p className="mb-2 text-sm font-bold">Click to upload</p>
                <p className="text-xs">PNG, JPEG</p>
                <p className="text-xs">MAX 5 MB</p>
              </div>
              <input
                className="hidden"
                id="image"
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </label>
          </div>
          {errors?.image && (
            <div className="flex items-center gap-1 p-1 text-red-600">
              <ExclamationTriangleIcon className="h-4 w-4" />
              {errors.image.message && (
                <p className="text-sm">{errors.image.message.toString()}</p>
              )}
            </div>
          )}
        </>
      </Form>
    </FormProvider>
  );
};

export default TitleImage;
