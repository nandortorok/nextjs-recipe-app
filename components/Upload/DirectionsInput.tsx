import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ChangeEventHandler, MouseEventHandler } from "react";

import useDirections from "hooks/useDirections";
import Form from "./Form";

const DirectionsInput = () => {
  const {
    sections,
    handleChange,
    handleDelete,
    handleAddDirection,
    handleSubmit,
  } = useDirections();

  return (
    <Form onSubmit={handleSubmit}>
      <>
        <label className="text-md font-bold">Directions</label>

        {sections.map(({ title, directions }, sectionIdx) => (
          <div className="rounded-md border border-gray-300" key={sectionIdx}>
            <table className="w-full text-left">
              <caption className="border-b px-3 py-4 text-left text-lg font-bold">
                <div className="flex justify-between">
                  <input
                    className="border-0 align-middle text-lg focus:ring-0"
                    type="text"
                    placeholder="Title name"
                    name="title"
                    value={title}
                    readOnly={true}
                    // onChange={}
                  />
                  {/* <button
                  className="pr-3 align-middle"
                  type="button"
                  // onClick={() => handleDeleteSection(sectionIdx)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button> */}
                </div>
              </caption>
              <tbody>
                {directions.map((direction, idx) => (
                  <Row
                    key={idx}
                    index={idx}
                    value={direction}
                    onChange={handleChange(sectionIdx, idx)}
                    onClick={() => handleDelete(sectionIdx, idx)}
                  />
                ))}
                {/* add input */}
                <tr>
                  <td colSpan={4} className="p-3 text-center">
                    <button
                      className="align-middle"
                      type="button"
                      onClick={() => handleAddDirection(sectionIdx)}
                    >
                      <PlusIcon className="h-6 w-6" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </>
    </Form>
  );
};

type RowProps = {
  index: number;
  value: string;
  onChange: ChangeEventHandler;
  onClick: MouseEventHandler;
};

const Row = ({ index, value, onChange, onClick }: RowProps) => {
  return (
    <tr className="border-b">
      <td>
        <div className="flex">
          <p className="my-auto pl-6 text-gray-700">{index + 1}</p>
          <input
            className="w-full border-0 focus:ring-0"
            type="text"
            name="amount"
            autoComplete="off"
            value={value}
            onChange={onChange}
          />
        </div>
      </td>
      <td className="py-3 px-6 text-right">
        <button
          className="align-middle transition ease-in-out hover:text-red-600"
          type="button"
          onClick={onClick}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </td>
    </tr>
  );
};

export default DirectionsInput;
