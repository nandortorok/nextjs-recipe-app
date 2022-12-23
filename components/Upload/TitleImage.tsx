import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { UploadContext } from "lib/contexts";
import { useContext, FormEvent, ChangeEvent } from "react";
import { z } from "zod";
import Form from "./Form";

const TitleImage = () => {
  const { data, setData, handleChange, handleIncrement } =
    useContext(UploadContext);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      setData({ ...data, imageName: files[0].name });
    }
  };

  const schema = z.object({
    title: z.string().min(3).max(64),
    imageName: z.string().min(3).max(64),
  });

  const handleSubmit = (e: FormEvent) => {
    const { title, imageName } = data;
    const valid = schema.safeParse({ title, imageName });

    if (valid.success) {
      handleIncrement();
    }

    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <>
        <label className="block pb-2 font-bold">Title</label>
        <input
          className="w-full rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
          name="title"
          type="text"
          placeholder="Recipe title"
          value={data.title}
          onChange={handleChange}
        />

        <label className="block pb-2 font-bold">Image</label>
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="imageUpload"
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
            <input
              className="hidden"
              id="imageUpload"
              type="file"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </>
    </Form>
  );
};

export default TitleImage;
