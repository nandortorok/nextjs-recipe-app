import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MouseEventHandler, useContext } from "react";

import { UploadContext } from "lib/contexts";

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

type ButtonGroupProps = {
  isLoading: boolean;
};

export const ButtonGroup = ({ isLoading }: ButtonGroupProps) => {
  const { page, setPage } = useContext(UploadContext);

  const handleBack = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleBackButtonDisabled = () => {
    if (page <= 1) return true;
    if (isLoading) return true;

    return false;
  };

  return (
    <>
      {isLoading && (
        <div className="absolute z-50 -ml-10 h-full w-full rounded-xl bg-black/10 transition ease-in-out" />
      )}
      <section className="mt-auto flex justify-between px-5 pt-5 text-sm font-medium">
        <button
          className="rounded-lg bg-white py-2.5 px-5 text-blue-500 transition ease-in-out hover:bg-blue-50 active:ring disabled:invisible dark:bg-gray-400/10 dark:text-white hover:dark:bg-blue-50/10"
          type="button"
          disabled={handleBackButtonDisabled()}
          onClick={handleBack}
        >
          Back
        </button>
        {isLoading ? (
          <button
            disabled
            type="button"
            className="inline-flex cursor-wait items-center rounded-lg bg-blue-500 px-5 py-2.5 text-center text-white transition ease-in-out hover:bg-blue-600 active:ring"
          >
            <ButtonSpinner />
            Loading...
          </button>
        ) : (
          <button
            className="rounded-lg bg-blue-500 py-2.5 px-5 text-white transition ease-in-out hover:bg-blue-600 active:ring"
            type="submit"
          >
            {page < 4 ? "Next" : "Submit"}
          </button>
        )}
      </section>
    </>
  );
};

const ButtonSpinner = () => {
  return (
    <svg
      aria-hidden="true"
      role="status"
      className="mr-3 inline h-4 w-4 animate-spin text-white"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  );
};
