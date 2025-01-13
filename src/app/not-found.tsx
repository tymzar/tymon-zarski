import BlurFadeText, {
  BLUR_FADE_DELAY,
} from "@/components/magicui/blur-fade-text";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <div className="gap-2 flex justify-between">
          <div className="flex-col flex flex-1 space-y-1.5">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-2xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              yOffset={8}
              text={`Hi, 404 here! This page doesn't exist.`}
            />
            <BlurFadeText
              className="max-w-[600px] md:text-xl mt-4"
              delay={BLUR_FADE_DELAY}
              text={
                "It seems you've lost your way. Let's get you back on track."
              }
            />
            <Button
              className="max-w-[300px]"
              color="primary"
              variant="shadow"
              href="/"
              as={Link}
            >
              Return to home page
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
