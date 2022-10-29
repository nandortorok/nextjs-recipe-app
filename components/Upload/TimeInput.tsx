import { ChangeEventHandler } from "react";
import { TimeInputProps } from "types/IngredientProps";

type Props = {
  label?: string;
  name: string;
  value: number;
  onChange: ChangeEventHandler;
};

const Input = ({ label, name, value, onChange }: Props) => {
  return (
    <>
      <label className="block flex-1 pb-1 font-bold">{label}</label>
      <input
        className="w-1/6"
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min={0}
        max={360}
        placeholder="0"
      />
    </>
  );
};

const Select = ({ name, value, onChange }: Props) => {
  return (
    <select className="w-1/2" name={name} value={value} onChange={onChange}>
      <option value={1}>minutes</option>
      <option value={60}>hours</option>
    </select>
  );
};

const TimeInput = ({
  timeValues,
  onTimeValueChange,
  totalTime,
}: TimeInputProps) => {
  return (
    <>
      <div className="flex items-center space-x-4">
        <Input
          label="PrepTime"
          name={"prepTime"}
          value={timeValues.prepTime}
          onChange={onTimeValueChange}
        />
        <Select
          name={"prepTimeUnit"}
          value={timeValues.prepTimeUnit}
          onChange={onTimeValueChange}
        />
      </div>
      <div className="flex items-center space-x-4">
        <Input
          label="CookTime"
          name={"cookTime"}
          value={timeValues.cookTime}
          onChange={onTimeValueChange}
        />
        <Select
          name={"cookTimeUnit"}
          value={timeValues.cookTimeUnit}
          onChange={onTimeValueChange}
        />
      </div>
      {/* Total time */}
      <div className="flex items-center space-x-4">
        <label className="block w-full flex-1 pb-1 font-bold">Total Time</label>
        <input
          className="w-1/2 border-white"
          name="totalTime"
          type="text"
          value={totalTime}
          disabled={true}
        />
        <select className="invisible w-1/6"></select>
      </div>
    </>
  );
};

export { TimeInput };
