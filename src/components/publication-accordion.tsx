"use client";

import { Accordion, AccordionItem, Button, Chip, cn } from "@heroui/react";
import OptimizedImage from "next/image";
import Link from "next/link";

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
      <Accordion variant="surface">
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
              id={title}
              isDisabled={!Boolean(href)}
            >
              <Accordion.Heading>
                <Accordion.Trigger className="font-normal text-small">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn(["shrink-0", !Boolean(href) ? "blur-sm" : ""])}>
                      <OptimizedImage
                        className="rounded-lg"
                        src={publisher}
                        alt={`publisher-${title}`}
                        width={50}
                        height={50}
                      />
                    </div>
                    {title}
                  </div>
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>
                  <OptimizedImage
                    src={graphicalAbstractSrc}
                    alt={title}
                    width={440}
                    height={211}
                    className="mx-auto mb-1 w-full"
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-medium">{authors}</p>
                    <Chip size="md" color="accent">
                      {date}
                    </Chip>
                  </div>
                  <h5 className="text-medium font-bold mt-3">Abstract</h5>
                  <Markdown className="text-small text-justify">
                    {abstract}
                  </Markdown>
                  <div className="flex justify-end mt-2">
                    {href ? (
                      <Link href={href} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" size="sm" className="mb-1">
                          Read more
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="primary" size="sm" isDisabled className="mb-1">
                        Under review
                      </Button>
                    )}
                  </div></Accordion.Body>
              </Accordion.Panel>
            </AccordionItem>
          )
        )}
      </Accordion>
    </div>
  );
}
