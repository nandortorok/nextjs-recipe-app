import { ChangeEvent, useState } from "react";
import { SectionProps } from "types";

export type UploadContextProps = ReturnType<typeof useUpload>;

const useUpload = () => {
  const [page, setPage] = useState(1);
  const [titleImage, setTitleImage] = useState({
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
    titleImage,
    setTitleImage,
    servings,
    setServings,
    timeValues,
    setTimeValues,
    sections,
    setSections,
    handleDecrement,
    handleIncrement,
  };
};

export default useUpload;
