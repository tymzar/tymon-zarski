import { cn } from "@nextui-org/react";

type MainContentProps = {
  isMobile: boolean;
  children: React.ReactNode;
};

export function MainContent({ isMobile, children }: MainContentProps) {
  return (
    <div className={cn(isMobile ? "" : "w-[calc(100%-288px)]")}>
      {children};
    </div>
  );
}
