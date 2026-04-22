"use client";

import { PostData } from "@/utils/gatherPosts";
import { Button, Card, Chip, cn } from "@heroui/react";
import OptimizedImage from "next/image";

import Link from "next/link";
import { track } from "@/utils/analytics";

type PostCardProps = {
  className?: string;
  thumbnail?: boolean;
};

export function PostCard({
  id,
  project,
  coverImage,
  part,
  title,
  date,
  className,
  thumbnail = false,
}: PostData & PostCardProps) {
  const card = (
    <Card className={cn(className, "p-0 overflow-hidden")}>
      <Card.Content>
        <div
          className={cn(
            "absolute z-10 top-2 left-2 right-2 flex flex-col gap-1",
            thumbnail ? "h-[calc(100%-16px)] justify-between items-start" : "items-start"
          )}
        >
          {project && (
            <div className="flex justify-between w-full p-2">
              <Chip className="text-sm" color="accent" size="sm" variant="primary">
                {project}
              </Chip>
              <Chip className="text-sm" color="accent" size="sm" variant="primary">
                Part #{part}
              </Chip>
            </div>
          )}
          <h4
            className={cn(
              thumbnail ? "text-medium" : "text-2xl font-medium",
              "text-black bg-white/30 backdrop-blur-sm py-1 px-2 rounded-lg"
            )}
          >
            {title}
          </h4>
        </div>
        <OptimizedImage
          width={400}
          height={250}
          alt="Card example background"
          className="z-0 w-full h-full scale-125 object-cover"
          src={coverImage}
        />
        {!thumbnail && (
          <div className="p-4 rounded-b-3xl absolute bg-white/70 backdrop-blur-md bottom-0 left-0 right-0 border-t border-zinc-100/50 z-10 flex justify-between items-center gap-2">
            <p className="text-black text-sm">
              Published on {date.toLocaleDateString("en-US")}
            </p>
            <Link href={`/blog/${id}`} onClick={() => track("blog_read_more_click", { id })}>
              <Button
                className="text-sm rounded-full"
                variant="primary"
                size="sm"
              >
                Read More
              </Button>
            </Link>
          </div>
        )}
      </Card.Content>
    </Card >
  );

  return thumbnail ? (
    <Link href={`/blog/${id}`}>{card}</Link>
  ) : (
    card
  );
}
