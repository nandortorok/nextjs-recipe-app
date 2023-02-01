import { useState, useEffect, Fragment } from "react";
import { useTheme } from "next-themes";
import { Menu, Transition } from "@headlessui/react";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

const themes = ["light", "dark", "system"];

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const Icon = (themeType?: string) => {
    switch (themeType) {
      case "light":
        return <SunIcon className="h-6 w-6" />;
      case "dark":
        return <MoonIcon className="h-6 w-6" />;
      default:
        return <ComputerDesktopIcon className="h-6 w-6" />;
    }
  };

  return (
    <Menu>
      <Menu.Button className="z-50">
        <div className="rounded-full p-2 transition ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-100/10">
          {Icon(theme)}
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-12 w-40 origin-top-right rounded-md bg-gray-50 py-1 shadow-md dark:bg-zinc-700 md:top-14">
          {themes.map((item, idx) => (
            <Menu.Item key={idx}>
              {({ active }) => (
                <button
                  className={
                    item === theme
                      ? "flex w-full cursor-pointer space-x-4 self-start py-2 px-2 text-blue-500 transition ease-in-out hover:bg-blue-100 dark:hover:bg-blue-100/10"
                      : "flex w-full cursor-pointer space-x-4 self-start py-2 px-2 transition ease-in-out hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-100/10"
                  }
                  onClick={() => setTheme(item)}
                >
                  {Icon(item)}
                  <p className="capitalize">{item}</p>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ThemeSwitch;
