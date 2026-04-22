"use client";

import { Button } from "@heroui/react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useDarkMode } from "usehooks-ts";

export function ModeToggle() {
  const { isDarkMode, set } = useDarkMode({ defaultValue: true });

  const toggleTheme = () => {
    const next = isDarkMode ? "light" : "dark";
    set(!isDarkMode);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("heroui-theme", next);
  };

  return (
    <Button
      variant="ghost"
      type="button"
      aria-label="mode-dark-toggle"
      isIconOnly
      className="px-2"
      onPress={toggleTheme}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  );
}
