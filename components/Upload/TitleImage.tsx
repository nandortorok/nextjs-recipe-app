import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { UploadContext } from "lib/contexts";
import { useContext, FormEvent } from "react";
import Form from "./Form";

const TitleImage = () => {
  const { page, setPage, data, handleChange } = useContext(UploadContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (page < 4) {
      setPage(page + 1);
    }
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
            htmlFor="dropzone-file"
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
              type="file"
              value={data.imageName}
              onChange={handleChange}
            />
          </label>
        </div>
      </>
    </Form>
  );
};

export default TitleImage;
