import { createContext, Dispatch, SetStateAction } from "react";
import { SectionProps } from "types";

type TimeValuesProps = {
  prepTime: number;
  cookTime: number;
  prepTimeUnit: number;
  cookTimeUnit: number;
};

type UploadContextProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  data: {
    title: string;
    imageName: string;
    servings: string;
  };
  setData: Dispatch<
    SetStateAction<{
      title: string;
      imageName: string;
      servings: string;
    }>
  >;
  timeValues: TimeValuesProps;
  setTimeValues: Dispatch<TimeValuesProps>;
  sections: SectionProps[];
  setSections: Dispatch<SectionProps[]>;
};

export const UploadContext = createContext<UploadContextProps>(
  {} as UploadContextProps
);
