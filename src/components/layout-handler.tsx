"use client";

import { useDarkMode, useMediaQuery } from "usehooks-ts";
import Navbar from "./navbar";
import { TableOfContents } from "./table-of-contents";
import { cn } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

type MainContentProps = {
  children: React.ReactNode;
};

export function LayoutHandler({ children }: MainContentProps) {
  const matches = useMediaQuery("(min-width: 1024px)", { defaultValue: true });
  const { setTheme } = useTheme();
  const { isDarkMode } = useDarkMode({
    defaultValue: true,
  });

  useEffect(() => {
    setTheme(isDarkMode ? "dark" : "light");
  }, []);

  return (
    <div className="grid grid-cols-8 gap-4">
      {!matches ? (
        <Navbar />
      ) : (
        <div className="col-span-3 max-w-[300px]">
          <TableOfContents />
        </div>
      )}
      {
        <div className={cn(matches ? "col-span-5" : "col-span-8")}>
          {children}
        </div>
      }
    </div>
  );
}
