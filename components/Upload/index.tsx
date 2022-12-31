import Link from "next/link";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

import { UploadContext } from "lib/contexts";
import DirectionsInput from "./DirectionsInput";
import IngredientsInput from "./IngredientsInput";
import TitleImage from "./TitleImage";
import Modal from "./Modal";
import ServingsTime from "./ServingsTime";

const UploadForm = () => {
  const { page } = useContext(UploadContext);

  switch (page) {
    case 1:
      return <TitleImage />;
    case 2:
      return <ServingsTime />;
    case 3:
      return <IngredientsInput />;
    case 4:
      return <DirectionsInput />;
    default:
      return <div>Hi</div>;
  }
};

export const LogIn = () => {
  return (
    <section className="flex h-screen">
      <div className="m-auto flex flex-col justify-center">
        <ArrowUpOnSquareIcon className="mx-auto h-24 w-24" />
        <p className="p-10">Log in to upload your favorite recipes</p>
        <Link
          className="mx-auto rounded-xl bg-blue-500 py-2 px-5 text-white transition ease-in-out hover:bg-blue-600 active:ring"
          href="/login"
          passHref
        >
          Log in
        </Link>
      </div>
    </section>
  );
};

type UploadProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Upload = ({ isOpen, setIsOpen }: UploadProps) => {
  const { data: session } = useSession();

  return (
    <Modal value={isOpen} onClose={setIsOpen}>
      <main className="flex h-full w-full flex-col overflow-auto">
        <button
          className="absolute top-0 right-0 p-4 text-slate-400 hover:text-slate-700"
          onClick={() => setIsOpen(false)}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        {session ? <UploadForm /> : <LogIn />}
      </main>
    </Modal>
  );
};

export default Upload;
