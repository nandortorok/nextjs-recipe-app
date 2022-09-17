import { PropsWithChildren } from "react";

type InputProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  min?: number;
  max?: number;
};

const UploadInput = ({
  label,
  name,
  type,
  placeholder,
  min,
  max,
}: InputProps) => {
  return (
    <div>
      <label className="block pb-2 font-bold">{label}</label>
      <input
        className="w-full border"
        name={name}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
      />
    </div>
  );
};

type SelectProps = {
  label: string;
  inputName: string;
  selectName: string;
};

const UploadSelect = ({ label, inputName, selectName }: SelectProps) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="block flex-1 pb-1 font-bold">{label}</label>
      <input
        className="w-1/6"
        name={inputName}
        type="number"
        min={0}
        max={360}
        placeholder="0"
      />
      <select className="w-1/2" name={selectName}>
        <option value={1}>minutes</option>
        <option value={60}>hours</option>
      </select>
    </div>
  );
};

const UploadSection = ({ children }: PropsWithChildren) => {
  return <section className="space-y-4 border-b pb-6">{children}</section>;
};

export { UploadInput, UploadSelect, UploadSection };
