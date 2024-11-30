"use client";

import { Accordion, AccordionItem, Button, cn, Image } from "@nextui-org/react";
import OptimizedImage from "next-export-optimize-images/image";

import Markdown from "react-markdown";

type PublicationAccordionProps = {
  publications: Array<Publication>;
};

export type Publication = {
  title: string;
  graphicalAbstractSrc: string;
  authors: string;
  date: string;
  publisher: string;
  abstract: string;
  href?: string;
};

export function PublicationAccordion({
  publications,
}: PublicationAccordionProps) {
  return (
    <div className="mt-[24px]">
      <h3 className="mb-2 font-bold">Publications</h3>
      <Accordion
        variant="splitted"
        selectionMode="multiple"
        isCompact
        itemClasses={{
          title: "font-normal text-small",
        }}
      >
        {publications.map(
          ({
            title,
            publisher,
            graphicalAbstractSrc,
            authors,
            date,
            abstract,
            href,
          }) => (
            <AccordionItem
              key={title}
              title={title}
              // isDisabled
              startContent={
                <div className={cn([!Boolean(href) ? "blur-sm" : ""])}>
                  <Image
                    as={OptimizedImage}
                    src={publisher}
                    alt={`publisher-${title}`}
                    width={50}
                    height={50}
                  />
                </div>
              }
            >
              <Image
                as={OptimizedImage}
                src={graphicalAbstractSrc}
                alt={title}
                width="100%"
              />
              <div className="flex justify-between">
                <p>{authors}</p>
                <p>{date}</p>
              </div>
              <h5 className="text-small font-bold mt-3">Abstract</h5>
              <Markdown className="text-small text-justify">
                {abstract}
              </Markdown>
              <div className="flex justify-end mt-2">
                <Button
                  href={href}
                  target="_blank"
                  size="sm"
                  isDisabled={!Boolean(href)}
                  className="mb-1"
                >
                  {Boolean(href) ? "Read more" : "Under review"}
                </Button>
              </div>
            </AccordionItem>
          )
        )}
      </Accordion>
    </div>
  );
}
