"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { track } from "@/utils/analytics";

export function ViewAllPostsButton() {
    const handleClick = () => {
        track("view_all_posts_click");
    };

    return (
        <Button
            className="ml-auto"
            href="/blog"
            as={Link}
            color="primary"
            size="md"
            radius="full"
            onPress={handleClick}
        >
            View all posts
        </Button>
    );
}


