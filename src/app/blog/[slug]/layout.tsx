"use server";

import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { getPostBySlug, getSortedPostsData } from "@/utils/gatherPosts";
import { ClientBreadcrumbs } from "@/components/client-breadcrumbs";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const postDetails = getPostBySlug(slug);

  return (
    <div>
      <header className="flex justify-between items-center">
        {/* current breadcrubs */}
        <div className="flex items-center">
          <ClientBreadcrumbs
            contents={[
              { href: "/", children: "Home" },
              { href: "/blog", children: "Blog" },
              {
                href: `/blog/${slug}`,
                children: postDetails.title,
                className:
                  "max-w-[200px] sm:max-w-[300px] [&>span]:truncate [&>span]:overflow-hidden [&>span]:inline-block",
              },
            ]}
          />
        </div>
        {/* return to blogs */}
        <Button
          as={Link}
          className="text-tiny"
          color="primary"
          radius="full"
          size="sm"
          startContent={<Icon icon="akar-icons:arrow-left" />}
          href="/blog"
        >
          All blog posts
        </Button>
      </header>
      <main className="flex flex-col h-full w-full py-8">{children}</main>
    </div>
  );
}
