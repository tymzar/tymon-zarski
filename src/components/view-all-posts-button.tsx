"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { track } from "@/utils/analytics";

export function ViewAllPostsButton() {
    const handleClick = () => {
        track("view_all_posts_click");
    };

    return (
        <Link href="/blog">
            <Button
                className="ml-auto rounded-full"
                variant="primary"
                size="md"
                onPress={handleClick}
            >
                View all posts
            </Button>
        </Link>
    );
}


