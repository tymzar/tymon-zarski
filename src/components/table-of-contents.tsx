"use client";

import { HeadingItem, useHeadingData } from "@/hooks/use-heading-data";
import { Avatar, Link, ScrollShadow } from "@heroui/react";
import Sidebar, { SidebarItem } from "./sidebar";
import { useIntersectionObserver } from "@/hooks/use-heading-observer";
import { DATA } from "@/data/resume";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";

function headingToSidebarItem(heading: Array<HeadingItem>): Array<SidebarItem> {
  return heading.flatMap((item) => {
    return {
      key: item.id,
      title: item.title,
      href: `#${item.id}`,
    };
  });
}

export function TableOfContents() {
  const pathname = usePathname();
  const { nestedHeadings } = useHeadingData(pathname);
  const [activeHeading] = useIntersectionObserver();

  return (
    <nav className="h-dvh max-h-dvh fixed max-w-[inherit] w-full top-0 border-r-small border-divider">
      <div className="relative flex h-full flex-1 flex-col border-r-small border-divider p-6">
        <div className="flex items-center justify-between gap-2 px-2 mt-10 pt-8">
          <div className="flex items-center justify-center rounded-full">
            <Avatar color="accent" size="lg" className="ring-2 ring-accent/30">
              <Avatar.Image src={DATA.avatarUrl} alt="Tymon Lesław Żarski avatar" />
              <Avatar.Fallback>TŻ</Avatar.Fallback>
            </Avatar>
          </div>
          <span className="text-body font-bold">Tymon Lesław Żarski</span>
        </div>
        <div className="flex items-center justify-center gap-3 px-2 mt-2">
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => (
              <Link
                key={name}
                aria-label={`Visit my profile on ${name}`}
                href={social.url}
                target="_blank"
              >
                <social.icon className="size-5" />
              </Link>
            ))}
        </div>

        <ScrollShadow className="-mr-6 h-full max-h-full py-[5vh] pr-6">
          <Sidebar
            selectedKeys={[activeHeading]}
            defaultSelectedKey="home"
            items={headingToSidebarItem(nestedHeadings)}
          />
        </ScrollShadow>

        <div className="h-8" />

        <div className="mt-auto flex flex-col">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
