"use client";

import { PostData } from "@/utils/gatherPosts";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  cn,
} from "@nextui-org/react";
import OptimizedImage from "next-export-optimize-images/image";

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
  return (
    <Card
      isPressable={thumbnail}
      as={thumbnail ? "a" : undefined}
      href={thumbnail ? `/blog/${id}` : undefined}
      isFooterBlurred
      className={cn(className, "relative")}
      isHoverable
    >
      <CardHeader
        className={cn(
          thumbnail
            ? "w-full h-full justify-between items-start"
            : "items-start",
          "absolute z-10 top-1 flex-col gap-1"
        )}
      >
        {project && (
          <div className="flex justify-between w-full">
            <Chip color="primary" size="sm" variant="faded">
              {project}
            </Chip>
            <Chip color="primary" size="sm" variant="shadow">
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
      </CardHeader>
      <OptimizedImage
        width={400}
        height={250}
        alt="Card example background"
        className="z-0 w-full h-full scale-125 object-cover"
        src={coverImage}
      />
      {!thumbnail && (
        <CardFooter className=" p-2 absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-tiny">
              Published on {date.toLocaleDateString("en-US")}
            </p>
          </div>
          <Button
            as={Link}
            className="text-tiny"
            color="primary"
            radius="full"
            size="sm"
            href={`/blog/${id}`}
            onClick={() => track("blog_read_more_click", { id })}
          >
            Read More
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
