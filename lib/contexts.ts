import { createContext, Dispatch, SetStateAction } from "react";
import { SectionProps, TimeValuesProps } from "types";

type DataProps = {
  title: string;
  imageName: string;
  servings: string;
};

type UploadContextProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  data: DataProps;
  setData: Dispatch<SetStateAction<DataProps>>;
  timeValues: TimeValuesProps;
  setTimeValues: Dispatch<TimeValuesProps>;
  sections: SectionProps[];
  setSections: Dispatch<SectionProps[]>;
};

export const UploadContext = createContext<UploadContextProps>(
  {} as UploadContextProps
);
