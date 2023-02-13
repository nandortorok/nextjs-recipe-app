import Image from "next/image";
import Link from "next/link";

import GitHubDarkLogo from "../../public/github-mark-white.svg";
import GitHubLogo from "../../public/github-mark.svg";

const Footer = () => {
  return (
    <footer className="pt-40 pb-20 text-center dark:bg-zinc-800">
      <div className="flex flex-col space-y-2">
        <p>
          Created by <strong>Nándor Török</strong>
        </p>
        <p>
          Email
          <a className="ml-1 font-bold" href="mailto:nandortorok2002@gmail.com">
            nandortorok2002@gmail.com
          </a>
        </p>
        <div className="mx-auto">
          <Link href="https://github.com/BaconPardner" target={"_blank"}>
            <Image
              src={GitHubLogo}
              alt="GitHub"
              className="h-6 w-6 hover:text-slate-900 dark:hidden"
            />
            <Image
              src={GitHubDarkLogo}
              alt="GitHub"
              className="hidden h-6 w-6 hover:text-slate-900 dark:block"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
