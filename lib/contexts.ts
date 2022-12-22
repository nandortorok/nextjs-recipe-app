import { UploadContextProps } from "hooks/useUpload";
import { createContext } from "react";

export const UploadContext = createContext<UploadContextProps>(
  {} as UploadContextProps
);
