"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, Chip, cn } from "@heroui/react";
import { motion } from "framer-motion";

// framer-motion 11.x types are incompatible with React 19 — cast to avoid build errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MotionDiv = motion.div as React.ComponentType<any>;
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
    >
      <Card className="flex">
        <div className="flex-none">
          <Avatar color="accent" className="bg-white ring-2 ring-accent/30">
            <Avatar.Image
              src={logoUrl}
              alt={altText}
              className="object-contain"
            />
            <Avatar.Fallback>{altText[0]}</Avatar.Fallback>
          </Avatar>
        </div>
        <div className="flex-grow ml-4 items-center flex-col group">
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm gap-2">
                {title}
                {badges && (
                  <span className="inline-flex gap-x-2">
                    {badges.map((badge, index) => (
                      <Chip
                        variant="primary"
                        size="sm"
                        color="default"
                        className="text-xs"
                        key={index}
                      >
                        {badge}
                      </Chip>
                    ))}
                  </span>
                )}
                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h3>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                {period}
              </div>
            </div>
            {subtitle && (
              <div
                className={cn("font-sans text-xs", badges ? "mt-[2px]" : "")}
              >
                {subtitle}
              </div>
            )}
          </CardHeader>
          {description && (
            <MotionDiv
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,

                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-2 text-xs sm:text-sm"
            >
              {description}
            </MotionDiv>
          )}
        </div>
      </Card>
    </Link>
  );
};
