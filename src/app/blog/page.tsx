import { ClientBreadcrumbs } from "@/components/client-breadcrumbs";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText, {
  BLUR_FADE_DELAY,
} from "@/components/magicui/blur-fade-text";
import { PostCard } from "@/components/post-card";
import { getSortedPostsData, PostData } from "@/utils/gatherPosts";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";
import Link from "next/link";
import { Fragment } from "react";
import { Icon } from "@iconify/react";

type BlogContent = {
  projects: Record<string, Array<PostData>>;
  posts: Array<PostData>;
};

function prepareBLogContent(posts: Array<PostData>): BlogContent {
  const projects: Record<string, Array<PostData>> = {};
  const independentPosts: Array<PostData> = [];

  posts.forEach((post) => {
    if (post.project) {
      if (!projects[post.project]) {
        projects[post.project] = [];
      }
      projects[post.project].push(post);
    } else {
      independentPosts.push(post);
    }
  });

  return {
    projects,
    posts: independentPosts,
  };
}

export default async function Page() {
  const allPostsData = getSortedPostsData();

  const blogContent = prepareBLogContent(allPostsData);

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        {/* current breadcrubs */}
        <div className="flex items-center">
          <ClientBreadcrumbs
            contents={[
              { href: "/", children: "Home" },
              { href: "/blog", children: "Blog" },
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
          href="/"
        >
          Home
        </Button>
      </header>
      <main className="flex flex-col space-y-5">
        <section>
          <div className="mx-auto w-full max-w-2xl">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-2xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none"
                yOffset={8}
                text="Discover my work 📖"
              />
              <BlurFadeText
                className="max-w-[600px] md:text-lg"
                delay={BLUR_FADE_DELAY}
                text={`Here you can find a collection of my thoughts, projects, and other things I find interesting. Enjoy!`}
              />
            </div>
          </div>
        </section>
        {Object.keys(blogContent.projects).length > 0 && (
          <section>
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 id="tc-project-posts" className="text-xl font-bold">
                Project oriented posts
              </h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 10}>
              <p>
                Here you can find a collection of posts that are part of a
                project. The projects are oriented around a specific topic and
                technologies.
              </p>
            </BlurFade>

            <div className="flex flex-col space-y-3 my-3">
              {Object.keys(blogContent.projects).map((project, index) => (
                <Fragment key={project}>
                  <Card className="rounded-[26px]" fullWidth>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                      <small className="text-default-500 mt-1">
                        {blogContent.projects[
                          project
                        ][0].date.toLocaleDateString()}{" "}
                        -{" "}
                        {blogContent.projects[project]
                          .at(-1)!
                          .date.toLocaleDateString()}
                      </small>
                      <h4 className="font-bold text-large">
                        {blogContent.projects[
                          project
                        ][0].project?.toUpperCase()}
                      </h4>
                    </CardHeader>
                    <CardBody className="overflow-visible space-y-3">
                      {blogContent.projects[project].length >= 1 && (
                        <PostCard
                          className="min-w-full sm:min-w-[400px] h-[200px] sm:h-[250px]"
                          key={blogContent.projects[project][0].id}
                          {...blogContent.projects[project][0]}
                        />
                      )}
                      {blogContent.projects[project].length > 1 && (
                        <ScrollShadow
                          orientation="horizontal"
                          size={15}
                          hideScrollBar
                        >
                          <div className="flex gap-3">
                            {blogContent.projects[project]
                              .slice(1)
                              .map(({ id, ...restProps }) => (
                                <PostCard
                                  thumbnail
                                  className="min-w-[300px] sm:min-w-[350px] h-[100px] sm:h-[150px]"
                                  key={id}
                                  id={id}
                                  {...restProps}
                                />
                              ))}
                          </div>
                        </ScrollShadow>
                      )}
                    </CardBody>
                  </Card>
                  {index < Object.keys(blogContent.projects).length - 1 && (
                    <Divider />
                  )}
                </Fragment>
              ))}
            </div>
          </section>
        )}
        {blogContent.posts.length > 0 && (
          <section>
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 id="tc-posts" className="text-xl font-bold">
                Other posts
              </h2>
            </BlurFade>
            <div className="grid grid-cols-1 gap-3">
              {blogContent.posts.map(({ id, ...restProps }) => (
                <PostCard
                  className="h-[200px] sm:h-[250px]"
                  key={id}
                  id={id}
                  {...restProps}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
