"use server";

import { Contact } from "@/components/contact";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText, {
  BLUR_FADE_DELAY,
} from "@/components/magicui/blur-fade-text";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import {
  Publication,
  PublicationAccordion,
} from "@/components/publication-accordion";
import { ResumeCard } from "@/components/resume-card";
import { DATA } from "@/data/resume";
import { getSortedPostsData } from "@/utils/gatherPosts";
import { Chip, ScrollShadow } from "@nextui-org/react";
import { ViewAllPostsButton } from "@/components/view-all-posts-button";
import dynamic from "next/dynamic";

import Markdown from "react-markdown";

const ClientSkillsComponent = dynamic(
  () => import("@/components/skills").then((mod) => mod.Skills),
  {
    ssr: false,
  }
);

export default async function Page() {
  const allPostsData = getSortedPostsData(3);

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-9">
      <section>
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                as="h1"
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 🚀`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 id="tc-about" className="text-xl font-bold">
            About
          </h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 id="tc-work" className="text-xl font-bold">
              Work Experience
            </h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 id="tc-education" className="text-xl font-bold">
              Education
            </h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
              {education.publications && education.publications.length > 0 && (
                <BlurFade delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
                  <PublicationAccordion
                    publications={education.publications as Array<Publication>}
                  />
                </BlurFade>
              )}
            </BlurFade>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 id="tc-blog" className="text-xl font-bold">
              Posts
            </h2>
          </BlurFade>
          <ScrollShadow orientation="horizontal" size={15} hideScrollBar>
            <div className="flex gap-3">
              {allPostsData.map(({ id, ...restProps }) => (
                <PostCard
                  className="min-w-[350px] sm:min-w-[400px] h-[200px] sm:h-[250px]"
                  key={id}
                  id={id}
                  {...restProps}
                />
              ))}
            </div>
          </ScrollShadow>
        </div>
        <ViewAllPostsButton />
      </section>
      <section>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 id="tc-skills" className="text-xl font-bold">
              Skills
            </h2>
          </BlurFade>
          <ClientSkillsComponent />
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Chip color="primary" size="sm" variant="shadow" key={skill}>
                  {skill}
                </Chip>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Chip id="tc-projects" color="primary" variant="shadow">
                  My Projects
                </Chip>
                <h2
                  id="tc-projects"
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                >
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  tags={project.technologies}
                  mockups={project.mockups}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section>
        <Contact />
      </section>
    </main>
  );
}
