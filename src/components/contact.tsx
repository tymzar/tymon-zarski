"use client";

import { BLUR_FADE_DELAY } from "@/app/page";
import BlurFade from "./magicui/blur-fade";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { DATA } from "@/data/resume";

type ContactFormInputs = {
  name: string;
  topic: string;
  message: string;
};

export function Contact() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    const { name, topic, message } = data;

    const templateMailToString = (
      name: string,
      topic: string,
      message: string
    ) => {
      return `mailto:${DATA.contact.email}?subject=Inquire - ${topic} - ${name}&body=${message}`;
    };

    void router.push(templateMailToString(name, topic, message));
  };

  return (
    <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
      <BlurFade delay={BLUR_FADE_DELAY * 16}>
        <div className="space-y-3">
          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
            Contact
          </div>
          <h2
            id="tc-contact"
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
          >
            Get in Touch
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Want to chat? Have a question? Feel free to reach out to me using
            the form below. I&apos;ll get back to you as soon as I can.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Input
                  type="text"
                  label="Name"
                  isRequired
                  {...register("name", { required: true })}
                  //   errorMessage={errors.name && "Name is required"}
                  isInvalid={!!errors.name}
                />
                <Input
                  type="text"
                  label="Topic"
                  isRequired
                  {...register("topic", { required: true })}
                  //   errorMessage={errors.topic && "Topic is required"}
                  isInvalid={!!errors.topic}
                />
              </div>
              <Textarea
                label="Description"
                className="w-full"
                isRequired
                {...register("message", { required: true })}
                // errorMessage={errors.message && "Message is required"}
                isInvalid={!!errors.message}
              />
              <Button fullWidth color="primary" type="submit" variant="shadow">
                Send message
              </Button>
            </div>
          </form>
        </div>
      </BlurFade>
    </div>
  );
}