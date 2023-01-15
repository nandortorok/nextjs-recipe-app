import Image from "next/image";
import Link from "next/link";

import GitHubLogo from "../../public/github-mark.svg";

const Footer = () => {
  return (
    <footer className="py-10 text-center">
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
              className="h-6 w-6 hover:text-slate-900"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
