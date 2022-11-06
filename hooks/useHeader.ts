import { useState } from "react";

const useHeader = () => {
  // TODO export back to use ingredients
  const [disabled, setDisabled] = useState(true);

  const disableHeader = () => {
    setDisabled(!disabled);
  };

  return {
    disabled,
    disableHeader,
  };
};

export default useHeader;
