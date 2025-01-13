import { DATA } from "@/data/resume";
import dynamic from "next/dynamic";

const slugs = DATA.skills.map((skill) =>
  skill.replace(".", "dot").replaceAll(" ", "").toLowerCase()
);

const ClientIconCloud = dynamic(
  () => import("./magicui/icon-cloud").then((mod) => mod.IconCloud),
  {
    ssr: false,
  }
);

export function Skills() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8">
      <ClientIconCloud iconSlugs={slugs} />
    </div>
  );
}
