import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MouseEventHandler } from "react";

type ErrorMessageProps = {
  error: string | undefined;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return error ? (
    <div className="flex items-center justify-center gap-1 overflow-hidden text-ellipsis py-1 text-red-600">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p className="text-sm">{error}</p>
    </div>
  ) : (
    <></>
  );
};

type XButtonProps = {
  onClick: MouseEventHandler;
};

export const XButton = ({ onClick }: XButtonProps) => {
  return (
    <button
      className="group align-middle transition ease-in-out hover:text-red-500"
      type="button"
      onClick={onClick}
    >
      <XMarkIcon className="h-6 w-6 rounded-full transition ease-in-out group-hover:scale-125" />
    </button>
  );
};
