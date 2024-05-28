"use client";
import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { useState } from "react";

function Toggle() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="flex w-full items-center  py-2 px-0 gap-2  mr-0">
      <MoonIcon className=" h-[1.5rem] w-[1.5rem]  mr-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <Switch
        checked={isDarkMode}
        onChange={handleChange}
        className={`${
          isDarkMode ? "bg-[#744597]" : "bg-[#744597]"
        } relative inline-flex h-5 w-10  items-center shadow-2xl rounded-full `}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            isDarkMode ? "translate-x-5" : "translate-x-0"
          } inline-block h-5 w-5  transform rounded-full bg-[#f4f6fa] transition`}
        />
      </Switch>
      <SunIcon className="h-[1.5rem] w-[1.5rem]  rotate-0 scale-100 mr-2 transition-all dark:-rotate-90 dark:scale-0" />
    </div>
  );
}

export default Toggle;
