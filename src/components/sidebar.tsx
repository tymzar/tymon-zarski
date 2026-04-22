"use client";

import {
  Accordion,
  AccordionItem,
  type ListBoxRootProps,
  type Selection,
} from "@heroui/react";
import React from "react";
import {
  ListBox,
  Tooltip,
  ListBoxItem,
  ListBoxSection,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";

export enum SidebarItemType {
  Nest = "nest",
}

export type SidebarItem = {
  key: string;
  title: string;
  icon?: string;
  href?: string;
  type?: SidebarItemType.Nest;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  items?: SidebarItem[];
  className?: string;
};

export type SidebarProps = Omit<ListBoxRootProps<SidebarItem>, "children"> & {
  items: SidebarItem[];
  isCompact?: boolean;
  hideEndContent?: boolean;
  iconClassName?: string;
  sectionClasses?: Record<string, string>;
  classNames?: Record<string, string>;
  defaultSelectedKey: string;
  onSelect?: (key: string) => void;
};

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      items,
      isCompact,
      defaultSelectedKey,
      onSelect,
      hideEndContent,
      sectionClasses: sectionClassesProp = {},
      iconClassName,
      classNames,
      className,
      ...props
    },
    ref
  ) => {
    const [selected, setSelected] =
      React.useState<React.Key>(defaultSelectedKey);

    const sectionClasses = {
      ...sectionClassesProp,
      base: cn(sectionClassesProp?.base, "w-full", {
        "p-0 max-w-[44px]": isCompact,
      }),
      group: cn(sectionClassesProp?.group, {
        "flex flex-col gap-1": isCompact,
      }),
      heading: cn(sectionClassesProp?.heading, {
        hidden: isCompact,
      }),
    };

    const itemBaseClass = cn(
      "px-3 min-h-11 rounded-large h-[44px] data-[selected=true]:bg-default-100",
      {
        "w-11 h-11 gap-0 p-0": isCompact,
      }
    );

    const renderNestItem = React.useCallback(
      (item: SidebarItem) => {
        const isNestType =
          item.items &&
          item.items?.length > 0 &&
          item?.type === SidebarItemType.Nest;

        if (isNestType) {
          delete item.href;
        }

        return (
          <ListBoxItem
            key={item.key}
            id={item.key}
            className={cn(itemBaseClass, {
              "h-auto p-0": !isCompact && isNestType,
              "inline-block w-11": isCompact && isNestType,
            })}
            textValue={item.title}
          >
            {isCompact ? (
              <Tooltip>
                <Tooltip.Trigger>
                  <div className="flex w-full items-center justify-center">
                    {item.icon ? (
                      <Icon
                        className={cn(
                          "text-default-500 group-data-[selected=true]:text-foreground",
                          iconClassName
                        )}
                        icon={item.icon}
                        width={24}
                      />
                    ) : (
                      item.startContent ?? null
                    )}
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content placement="right">
                  {item.title}
                </Tooltip.Content>
              </Tooltip>
            ) : (
              !isNestType && (
                <div className="flex items-center gap-2">
                  {item.icon ? (
                    <Icon
                      className={cn(
                        "text-default-500 group-data-[selected=true]:text-foreground",
                        iconClassName
                      )}
                      icon={item.icon}
                      width={24}
                    />
                  ) : (
                    item.startContent ?? null
                  )}
                  <span className="text-small font-medium text-default-500 group-data-[selected=true]:text-foreground">
                    {item.title}
                  </span>
                  {!hideEndContent && item.endContent ? (
                    <span className="ml-auto">{item.endContent}</span>
                  ) : null}
                </div>
              )
            )}
            {!isCompact && isNestType ? (
              <Accordion className={"p-0"}>
                <AccordionItem
                  key={item.key}
                  id={item.key}
                  aria-label={item.title}
                >
                  <Accordion.Heading className="pr-3">
                    <Accordion.Trigger className="p-0">
                      {item.icon ? (
                        <div
                          className={"flex h-11 items-center gap-2 px-2 py-1.5"}
                        >
                          <Icon
                            className={cn(
                              "text-default-500 group-data-[selected=true]:text-foreground",
                              iconClassName
                            )}
                            icon={item.icon}
                            width={24}
                          />
                          <span className="text-small font-medium text-default-500 group-data-[selected=true]:text-foreground">
                            {item.title}
                          </span>
                        </div>
                      ) : (
                        item.startContent ?? null
                      )}
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel className="py-0 pl-4">
                    {item.items && item.items?.length > 0 ? (
                      <ListBox
                        className={"mt-0.5 [&>ul]:border-l [&>ul]:border-default-200 [&>ul]:pl-4"}
                        items={item.items}
                      >
                        {item.items.map(renderItem)}
                      </ListBox>
                    ) : (
                      renderItem(item)
                    )}
                  </Accordion.Panel>
                </AccordionItem>
              </Accordion>
            ) : null}
          </ListBoxItem>
        );
      },

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isCompact, hideEndContent, iconClassName, items]
    );

    const renderItem = React.useCallback(
      (item: SidebarItem) => {
        const isNestType =
          item.items &&
          item.items?.length > 0 &&
          item?.type === SidebarItemType.Nest;

        if (isNestType) {
          return renderNestItem(item);
        }

        return (
          <ListBoxItem
            key={item.key}
            id={item.key}
            className={itemBaseClass}
            onPress={() => {
              document.querySelector(item.href!)?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            textValue={item.title}
          >
            {isCompact ? (
              <Tooltip>
                <Tooltip.Trigger>
                  <div className="flex w-full items-center justify-center">
                    {item.icon ? (
                      <Icon
                        className={cn(
                          "text-default-500 group-data-[selected=true]:text-foreground",
                          iconClassName
                        )}
                        icon={item.icon}
                        width={24}
                      />
                    ) : (
                      item.startContent ?? null
                    )}
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content placement="right">
                  {item.title}
                </Tooltip.Content>
              </Tooltip>
            ) : (
              <div className="flex items-center gap-2">
                {item.icon ? (
                  <Icon
                    className={cn(
                      "text-default-500 group-data-[selected=true]:text-foreground",
                      iconClassName
                    )}
                    icon={item.icon}
                    width={24}
                  />
                ) : (
                  item.startContent ?? null
                )}
                <span className="text-small font-medium text-default-500 group-data-[selected=true]:text-foreground">
                  {item.title}
                </span>
                {!hideEndContent && item.endContent ? (
                  <span className="ml-auto">{item.endContent}</span>
                ) : null}
              </div>
            )}
          </ListBoxItem>
        );
      },

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isCompact, hideEndContent, iconClassName, itemBaseClass]
    );

    return (
      <ListBox
        key={isCompact ? "compact" : "default"}
        ref={ref}
        aria-label="Navigation sidebar"
        className={cn("list-none", className)}
        items={items}
        selectedKeys={[selected] as unknown as Selection}
        selectionMode="single"
        variant="default"
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0];

          setSelected(key as React.Key);
          onSelect?.(key as string);
        }}
      >
        {(item) => {
          return item.items &&
            item.items?.length > 0 &&
            item?.type === SidebarItemType.Nest ? (
            renderNestItem(item)
          ) : item.items && item.items?.length > 0 ? (
            <ListBoxSection key={item.key} className={cn(sectionClasses.base)}>
              <span className={cn(sectionClasses.heading, "text-xs font-semibold text-default-500 px-3")}>
                {item.title}
              </span>
              {item.items.map(renderItem)}
            </ListBoxSection>
          ) : (
            renderItem(item)
          );
        }}
      </ListBox>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
