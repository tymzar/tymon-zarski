"use client";

import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import Markdown from "react-markdown";

type PublicationAccordionProps = {
  publications: Array<Publication>;
};

type Publication = {
  title: string;
  graphicalAbstractSrc: string;
  authors: string;
  status: string;
  date: string;
  publisher: string;
  abstract: string;
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
        {publications.map((publication, id) => (
          <AccordionItem
            key={publication.title}
            title={publication.title}
            startContent={<Image src={publication.publisher} width="50px" />}
          >
            <Image
              src={publication.graphicalAbstractSrc}
              alt={publication.title}
              width="100%"
            />
            <div className="flex justify-between">
              <p>{publication.authors}</p>
              <p>{publication.date}</p>
            </div>
            <h5 className="text-small font-bold mt-3">Abstract</h5>
            <Markdown className="text-small text-justify">
              {publication.abstract}
            </Markdown>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
