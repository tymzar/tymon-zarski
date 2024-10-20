import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(): [string] {
  const [activeId, setActiveId] = useState<string>("");
  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>(
    {}
  );

  useEffect(() => {
    const callback = (headings: Array<IntersectionObserverEntry>) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings: Array<IntersectionObserverEntry> = [];

      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) {
          visibleHeadings.push(headingElement);
        }
      });

      const getIndexFromId = (id: string) => {
        return headingElements.findIndex((element) => element.id === id);
      };

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );

        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px 20% 0px",
    });

    const headingElements = Array.from(document.querySelectorAll("h2")).filter(
      (element) => element.id
    );
    headingElements.forEach((element) => {
      if (element.id.startsWith("tc-")) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return [activeId];
}
