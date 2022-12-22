import { UploadContext } from "lib/contexts";
import { useContext, FormEvent } from "react";
import Form from "./Form";
import TimeInput from "./TimeInput";

const ServingsTime = () => {
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
        <label className="block pb-2 font-bold">Servings</label>
        <input
          className="w-full rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
          name="servings"
          type="number"
          placeholder="e.g. 4"
          value={data.servings}
          onChange={handleChange}
          min={0}
          max={99}
        />
        <TimeInput />
      </>
    </Form>
  );
};
export default ServingsTime;
