"use client";

import { HeadingItem, useHeadingData } from "@/hooks/use-heading-data";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Link,
  ScrollShadow,
  Spacer,
} from "@nextui-org/react";
import Sidebar, { SidebarItem } from "./sidebar";
import { useIntersectionObserver } from "@/hooks/use-heading-observer";
import { DATA } from "@/data/resume";
import OptimizedImage from "next-export-optimize-images/image";
import { ModeToggle } from "./mode-toggle";

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
  const { nestedHeadings } = useHeadingData();
  const [activeHeading] = useIntersectionObserver();

  return (
    <nav className="h-dvh max-h-dvh fixed max-w-[inherit] w-full top-0 border-r-small border-divider">
      <div className="relative flex h-full flex-1 flex-col border-r-small border-divider p-6">
        <div className="flex items-center justify-between gap-2 px-2 mt-10 pt-8">
          <div className="flex items-center justify-center rounded-full">
            <Avatar
              ImgComponent={OptimizedImage}
              alt="Tymon Lesław Żarski avatar"
              imgProps={{
                width: 56,
                height: 56,
              }}
              isBordered
              color="primary"
              src={DATA.avatarUrl}
              size="lg"
            />
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
          <Spacer y={2} />
          <Card className="mx-2 overflow-visible" shadow="sm">
            <CardBody className="items-center py-5 text-center">
              <h3 className="text-medium font-medium text-default-700">
                Ask about my career
                <span aria-label="rocket-emoji" className="ml-2" role="img">
                  💬
                </span>
              </h3>
              <p className="py-4 px-2 text-small text-default-500">
                Use my custom made RAG connected to industry leading LLM&apos;s
                to get to know my experience and skills.
              </p>
            </CardBody>
            <CardFooter className="absolute -bottom-8 justify-center">
              <Button
                className="px-10 shadow-md"
                color="primary"
                radius="full"
                variant="shadow"
              >
                Work in progress
              </Button>
            </CardFooter>
          </Card>
        </ScrollShadow>

        <Spacer y={8} />

        <div className="mt-auto flex flex-col">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
