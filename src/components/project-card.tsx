"use client";

import Link from "next/link";
import Markdown from "react-markdown";
import { DesktopMockup } from "./magicui/desktop-mockup";
import {
  Card,
  Chip,
  cn,
  Separator,
} from "@heroui/react";
import { MobileMockup } from "./magicui/mobile-mockup";
import { track } from "@/utils/analytics";

interface Props {
  title: string;
  href: string;
  description: string;
  tags: readonly string[];
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    disabled?: boolean;
    href: string;
  }[];
  mockups: Record<string, string>;
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  tags,
  links,
  className,
  mockups: { desktop, mobile },
}: Props) {
  return (
    <Card className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]">
      <Card.Header className="flex gap-3">
        <div className="">
          <h3 className="mt-1 text-lg">{title}</h3>
          <div className="hidden font-sans text-xs underline print:visible">
            {href.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Link
            href={href || "#"}
            aria-label={`Visit my project ${title} on ${href}`}
            className={cn("block cursor-pointer", className)}
            onClick={() => track("project_click", { title, href })}
          >
            <div className="relative w-full mt-2">
              <DesktopMockup
                url={href}
                src={desktop}
                title={title}
                className="size-full"
              />
              <MobileMockup
                title={title}
                src={mobile}
                className="absolute top-5 right-1 h-full w-auto"
              />
            </div>
          </Link>
          <Markdown className="prose mt-6 max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </Card.Header>
      <Separator />
      <Card.Content>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <Chip variant="primary" size="sm" color="accent" key={tag}>
                {tag}
              </Chip>
            ))}
          </div>
        )}
      </Card.Content>
      <Separator />
      <Card.Footer className="flex justify-end px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <a
                key={idx}
                href={link?.href}
                target={link.href.startsWith("https") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                onClick={() =>
                  track("project_link_click", { type: link.type, href: link.href })
                }
              >
                <Chip
                  variant="primary"
                  color="accent"
                  className="px-2"
                >
                  {link.icon}
                  {link.type}
                </Chip>
              </a>
            ))}
          </div>
        )}
      </Card.Footer>
    </Card>
  );
}
