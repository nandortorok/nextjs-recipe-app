import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

const TimeInput = () => {
  const [totalTime, setTotalTime] = useState("");
  const [timeValues, setTimeValues] = useState({
    prepTime: 0,
    cookTime: 0,
    prepTimeUnit: 1,
    cookTimeUnit: 1,
  });

  const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = event.target;

    setTimeValues({
      ...timeValues,
      [name]: value,
    });
  };

  useEffect(() => {
    const { prepTime, cookTime, prepTimeUnit, cookTimeUnit } = timeValues;
    const total = prepTime * prepTimeUnit + cookTime * cookTimeUnit;

    if (total < 60) {
      setTotalTime(`${total} ${total > 1 ? "minutes" : "minute"}`);
    } else if (total < 60 * 24) {
      const minutes = total % 60;
      const hours = Math.floor(total / 60);

      setTotalTime(
        `${hours} ${hours > 1 ? "hours" : "hour"} and ${minutes} ${
          minutes > 1 ? "minutes" : "minute"
        }`
      );
    }
  }, [timeValues]);

  return (
    <>
      <Section labelText="Prep Time">
        <>
          <Input
            name={"prepTime"}
            value={timeValues.prepTime}
            onChange={handleChange}
          />
          <Select
            name={"prepTimeUnit"}
            value={timeValues.prepTimeUnit}
            onChange={handleChange}
          />
        </>
      </Section>
      <Section labelText="Cook Time">
        <>
          <Input
            name={"cookTime"}
            value={timeValues.cookTime}
            onChange={handleChange}
          />
          <Select
            name={"cookTimeUnit"}
            value={timeValues.cookTimeUnit}
            onChange={handleChange}
          />
        </>
      </Section>
      <Section labelText="Total">
        <>
          <p className="my-auto p-4">{totalTime}</p>
        </>
      </Section>
    </>
  );
};

type Props = {
  name: string;
  value: number;
  onChange: ChangeEventHandler;
};

const Input = (props: Props) => {
  return (
    <input
      className="rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
      type="number"
      {...props}
      min={0}
      max={360}
      placeholder="0"
    />
  );
};

const Select = (props: Props) => {
  return (
    <select
      className="rounded-md border-gray-300 p-4 transition ease-in-out focus:border-opacity-0"
      {...props}
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
const Section = ({ labelText, children }: SectionProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <p className="my-auto font-bold">{labelText}</p>
      {children}
    </div>
  );
};

export default TimeInput;
