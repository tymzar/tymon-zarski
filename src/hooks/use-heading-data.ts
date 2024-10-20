import { useEffect, useState } from "react";

export type HeadingItem = {
  id: string;
  title: string;
  items?: Array<HeadingItem>;
};

function getNestedHeadings(headingElements: NodeListOf<HTMLElement>) {
  const nestedHeadings: Array<HeadingItem> = [];

  headingElements.forEach((headingElement) => {
    const { innerText, tagName, id } = headingElement;

    if (tagName === "H2" && id.startsWith("tc-")) {
      nestedHeadings.push({
        id,
        title: innerText,
        items: [],
      });
    }
  });

  return nestedHeadings;
}

export function useHeadingData() {
  const [nestedHeadings, setNestedHeadings] = useState<Array<HeadingItem>>([]);

  useEffect(() => {
    const headingElements = document.querySelectorAll<HTMLElement>("h2");

    const newNestedHeadings = getNestedHeadings(headingElements);

    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
}
