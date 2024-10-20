"use client";

import { Button } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useDarkMode } from "usehooks-ts";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const { set } = useDarkMode({
    defaultValue: true,
  });

  return (
    <Button
      variant="light"
      type="button"
      isIconOnly
      className="px-2"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
        set(theme === "dark");
      }}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  );
}
