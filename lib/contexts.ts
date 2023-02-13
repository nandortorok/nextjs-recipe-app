import { createContext } from "react";

import { UploadContextProps } from "hooks/useUpload";

export const UploadContext = createContext<UploadContextProps>(
  {} as UploadContextProps
);
