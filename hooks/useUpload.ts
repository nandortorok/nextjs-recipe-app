import { useState } from "react";
import { SectionProps } from "types";

export type UploadContextProps = typeof useUpload;

const useUpload = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    title: "",
    imageName: "",
    servings: "",
  });

  const [timeValues, setTimeValues] = useState({
    prepTime: 0,
    cookTime: 0,
    prepTimeUnit: 1,
    cookTimeUnit: 1,
  });

  const [sections, setSections] = useState<SectionProps[]>([]);

  return {
    page,
    setPage,
    data,
    setData,
    timeValues,
    setTimeValues,
    sections,
    setSections,
  };
};

export default useUpload;
