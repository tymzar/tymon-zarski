"use server";

import { getPostBySlug, getSortedPostsData } from "@/utils/gatherPosts";
import { Chip, Divider } from "@nextui-org/react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Icon } from "@iconify/react";
import { Fragment } from "react";
import Link from "next/link";
import OptimizedImage from "next-export-optimize-images/image";

import type { Metadata, ResolvingMetadata } from "next";
import { DATA } from "@/data/resume";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = (await params).slug;

  // fetch data
  const post = getPostBySlug(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    openGraph: {
      images: [post.coverImage, ...previousImages],
    },
    keywords: post.keywords,
    description: post.description,
    twitter: {
      images: [post.coverImage],
      card: "summary_large_image",
      creator: `@${DATA.nick}`,
      description: post.description,
      title: post.title,
    },

    authors: [
      {
        name: DATA.name,
        url: DATA.url,
      },
    ],
  };
}

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;

  const postContent = getPostBySlug(slug);

  const nextPost = getSortedPostsData().find((post) => {
    if (
      !post.project &&
      !postContent.project &&
      !post.part &&
      !postContent.part
    ) {
      return false;
    }

    return (
      post.project === postContent.project &&
      post.part === (postContent.part ?? -1) + 1
    );
  });

  const prevPost = getSortedPostsData().find((post) => {
    if (
      !post.project &&
      !postContent.project &&
      !post.part &&
      !postContent.part
    ) {
      return false;
    }

    return (
      post.project === postContent.project &&
      post.part === (postContent.part ?? 1) - 1
    );
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">{postContent.title}</h1>
      <h2 className="text-xl font-medium text-muted-foreground">
        {postContent.project}
      </h2>
      <div className="flex items-center relative w-fit my-3">
        <OptimizedImage
          src={postContent.coverImage}
          alt={postContent.title}
          width={600}
          height={340}
          className="rounded-[24px] object-cover"
        />
        <Chip
          color="primary"
          size="sm"
          variant="shadow"
          className="absolute top-3 left-3 z-50  "
        >
          Published on {postContent.date.toLocaleDateString()}
        </Chip>
        {postContent.part && (
          <Chip
            color="primary"
            size="sm"
            variant="shadow"
            className="absolute top-3 right-3 z-50"
          >
            Part #{postContent.part}
          </Chip>
        )}
      </div>

      <Markdown
        rehypePlugins={[rehypeRaw]}
        className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert"
      >
        {postContent.content}
      </Markdown>

      <section className="mt-8">
        <Divider />

        <div className="flex justify-between mt-4">
          <div className="flex flex-col items-start gap-1 w-1/2">
            {prevPost && (
              <Fragment>
                <span className="text-muted-foreground text-tiny">
                  {prevPost.title}
                </span>
                <Chip
                  color="primary"
                  size="sm"
                  variant="shadow"
                  startContent={<Icon icon="akar-icons:arrow-left" />}
                  as={Link}
                  href={`/blog/${prevPost.id}`}
                >
                  Previous Part
                </Chip>
              </Fragment>
            )}
          </div>
          <div className="flex flex-col items-end gap-1 w-1/2">
            {nextPost && (
              <Fragment>
                <span className="text-muted-foreground text-tiny text-right">
                  {nextPost.title}
                </span>
                <Chip
                  color="primary"
                  size="sm"
                  variant="shadow"
                  endContent={<Icon icon="akar-icons:arrow-right" />}
                  as="a"
                  href={`/blog/${nextPost.id}`}
                >
                  Next Part
                </Chip>
              </Fragment>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
