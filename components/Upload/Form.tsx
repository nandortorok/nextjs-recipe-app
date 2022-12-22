import { UploadContext } from "lib/contexts";
import { ChangeEvent, useContext } from "react";

import DirectionsInput from "./DirectionsInput";
import ImageInput from "./ImageInput";
import IngredientsInput from "./IngredientsInput";
import ServingsInput from "./ServingsInput";
import TimeInput from "./TimeInput";
import TitleInput from "./TitleInput";

const Form = ({ value }: { value: number }) => {
  const { data, setData } = useContext(UploadContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  switch (value) {
    case 1:
      return (
        <>
          <TitleInput value={data.title} onChange={handleChange} />
          <ImageInput value={data.imageName} onChange={handleChange} />
        </>
      );
    case 2:
      return (
        <>
          <ServingsInput value={data.servings} onChange={handleChange} />
          <TimeInput />
        </>
      );
    case 3:
      return (
        <>
          <IngredientsInput />
        </>
      );
    case 4:
      return (
        <>
          <DirectionsInput />
        </>
      );
    default:
      return <div>Hi</div>;
  }
};

export default Form;
