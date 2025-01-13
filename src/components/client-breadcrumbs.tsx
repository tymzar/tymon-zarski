"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

type BreadcrumbItemProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

type ClientBreadcrumbsProps = {
  contents: Array<BreadcrumbItemProps>;
};

export function ClientBreadcrumbs({ contents }: ClientBreadcrumbsProps) {
  return (
    <Breadcrumbs>
      {contents.map((content) => (
        <BreadcrumbItem
          key={`breadcrumb-item-${content.href}-${content.children}`}
          href={content.href}
          className={content.className}
        >
          {content.children}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
