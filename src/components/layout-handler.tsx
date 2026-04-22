"use client";

import { useDarkMode, useMediaQuery } from "usehooks-ts";
import { cn } from "@heroui/react";
import { useEffect, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { UmamiIdentifier } from "./umami-identifier";

type MainContentProps = {
  children: React.ReactNode;
};

const DynamicNavbar = dynamic(() => import("./navbar"));
const DynamicTableOfContents = dynamic(() =>
  import("./table-of-contents").then((mod) => mod.TableOfContents)
);

export function LayoutHandler({ children }: MainContentProps) {
  const matches = useMediaQuery("(min-width: 1024px)", { defaultValue: true });
  const { isDarkMode } = useDarkMode({
    defaultValue: true,
  });

  const applyTheme = useCallback((theme: string) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("heroui-theme", theme);
  }, []);

  useEffect(() => {
    applyTheme(isDarkMode ? "dark" : "light");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Suspense fallback={null}><UmamiIdentifier /></Suspense>
      <div className="grid grid-cols-8 gap-4">
        {!matches ? <DynamicNavbar /> : null}
        {matches ? (
          <div className="col-span-3 max-w-[300px]">
            <DynamicTableOfContents />
          </div>
        ) : null}
        <div
          className={cn(
            matches ? "col-span-5" : "col-span-8",
            "py-8 sm:py-24"
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}
