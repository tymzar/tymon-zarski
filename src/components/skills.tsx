import { DATA } from "@/data/resume";
import { IconCloud } from "./magicui/icon-cloud";
import { useIsClient } from "usehooks-ts";

const slugs = DATA.skills.map((skill) =>
  skill.replace(".", "dot").replaceAll(" ", "").toLowerCase()
);

export function Skills() {
  const isClient = useIsClient();

  return isClient ? (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8">
      <IconCloud iconSlugs={slugs} />
    </div>
  ) : null;
}
