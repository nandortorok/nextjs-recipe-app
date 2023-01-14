import {
  ArrowUpOnSquareIcon,
  BookmarkSquareIcon,
  DocumentTextIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Upload from "components/Upload";
import { NavButton, NavLink } from "./NavElements";

const links = [
  {
    icon: <BookmarkSquareIcon className="h-6 w-6" />,
    href: "/library",
    name: "Saved recipes",
  },
  {
    icon: <DocumentTextIcon className="h-6 w-6" />,
    href: "/reviews",
    name: "Reviews",
  },
  {
    icon: <RectangleStackIcon className="h-6 w-6" />,
    href: "/user/recipes",
    name: "My recipes",
  },
];

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar = ({ isOpen }: SidebarProps) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const dynamicRoute = useRouter().asPath;

  useEffect(() => setIsUploadOpen(false), [dynamicRoute]);

  return (
    <>
      <Upload isOpen={isUploadOpen} setIsOpen={setIsUploadOpen} />

      <nav
        className={
          isOpen
            ? "fixed top-0 z-50 md:mt-[60px] mt-12 h-full w-60 translate-x-0 overflow-auto border-r bg-white/75 backdrop-blur-lg transition-transform duration-300 ease-in motion-reduce:transition-none"
            : "fixed top-0 z-50 md:mt-[60px] mt-12 h-full w-60 -translate-x-full overflow-auto border-r bg-white/75 backdrop-blur-lg transition-transform duration-300 ease-in motion-reduce:transition-none"
        }
      >
        <section className="flex flex-col space-y-3 pt-3">
          <NavButton onClick={() => setIsUploadOpen(!isUploadOpen)}>
            <ArrowUpOnSquareIcon className="h-6 w-6" />
            <p>Upload</p>
          </NavButton>
          {links.map(({ icon, href, name }, index) => (
            <NavLink key={index} href={href}>
              {icon}
              <p>{name}</p>
            </NavLink>
          ))}
        </section>
      </nav>
    </>
  );
};

export default Sidebar;
