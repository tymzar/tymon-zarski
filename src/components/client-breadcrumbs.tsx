"use client";

import { BreadcrumbsItem, Breadcrumbs } from "@heroui/react";

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
        <BreadcrumbsItem
          key={`breadcrumb-item-${content.href}-${content.children}`}
          href={content.href}
          className={content.className}
        >
          {content.children}
        </BreadcrumbsItem>
      ))}
    </Breadcrumbs>
  );
}
