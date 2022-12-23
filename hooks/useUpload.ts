import { ChangeEvent, useState } from "react";
import { SectionProps } from "types";

export type UploadContextProps = ReturnType<typeof useUpload>;

const useUpload = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    title: "",
    imageName: "",
  });

  const [servings, setServings] = useState(0);
  const [timeValues, setTimeValues] = useState({
    prepTime: 0,
    cookTime: 0,
    prepTimeUnit: 1,
    cookTimeUnit: 1,
  });

  const [sections, setSections] = useState<SectionProps[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleDecrement = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleIncrement = () => {
    if (page < 4) {
      setPage(page + 1);
    }
  };

  return {
    page,
    setPage,
    data,
    setData,
    servings,
    setServings,
    timeValues,
    setTimeValues,
    sections,
    setSections,
    handleChange,
    handleDecrement,
    handleIncrement,
  };
};

export default useUpload;
