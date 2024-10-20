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

import { Icon } from "@iconify/react";

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
    <nav className="h-dvh fixed max-w-[inherit] w-full top-0 border-r-small border-divider">
      <div className="h-full p-6 mt-8">
        <div className="flex items-center justify-between gap-2 px-2 mt-10">
          <div className="flex items-center justify-center rounded-full">
            <Avatar isBordered color="primary" src={DATA.avatarUrl} size="lg" />
          </div>
          <span className="text-body font-bold">Tymon Lesław Żarski</span>
        </div>
        <div className="flex items-center justify-center gap-3 px-2 mt-2">
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => (
              <Link key={name} href={social.url} target="_blank">
                <social.icon className="size-5" />
              </Link>
            ))}
          <Button
            className="shadow-lg"
            radius="full"
            variant="shadow"
            color="primary"
            size="sm"
            as={Link}
            href="./Tymon_Żarski_CV_EN.pdf"
            download
            startContent={
              <Icon fontSize={20} icon="material-symbols:download" />
            }
          >
            CV
          </Button>
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
      </div>
    </nav>
  );
}
