import { ChangeEventHandler } from "react";
import { TimeInputProps } from "types/IngredientProps";

type Props = {
  name: string;
  value: number;
  onChange: ChangeEventHandler;
};

const Input = ({ name, value, onChange }: Props) => {
  return (
    <input
      className="rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      min={0}
      max={360}
      placeholder="0"
    />
  );
};

const Select = ({ name, value, onChange }: Props) => {
  return (
    <select
      className="rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value={1}>minutes</option>
      <option value={60}>hours</option>
    </select>
  );
};

type SectionProps = {
  labelText: string;
  children: JSX.Element;
};
const TimeInputSection = ({ labelText, children }: SectionProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <p className="my-auto font-bold">{labelText}</p>
      {children}
    </div>
  );
};

const TimeInput = ({
  timeValues,
  onTimeValueChange,
  totalTime,
}: TimeInputProps) => {
  return (
    <>
      <TimeInputSection labelText="Prep Time">
        <>
          <Input
            name={"prepTime"}
            value={timeValues.prepTime}
            onChange={onTimeValueChange}
          />
          <Select
            name={"prepTimeUnit"}
            value={timeValues.prepTimeUnit}
            onChange={onTimeValueChange}
          />
        </>
      </TimeInputSection>
      <TimeInputSection labelText="Cook Time">
        <>
          <Input
            name={"cookTime"}
            value={timeValues.cookTime}
            onChange={onTimeValueChange}
          />
          <Select
            name={"cookTimeUnit"}
            value={timeValues.cookTimeUnit}
            onChange={onTimeValueChange}
          />
        </>
      </TimeInputSection>
      <TimeInputSection labelText="Total">
        <>
          <p className="my-auto p-4">{totalTime}</p>
        </>
      </TimeInputSection>
    </>
  );
};

export { TimeInput };
