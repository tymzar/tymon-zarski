"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Reads the `source` query parameter (e.g. ?source=CV-APPL)
 * and uses it as the identifier for Umami analytics.
 */
export function UmamiIdentifier() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const source = searchParams.get("source");

        if (!source) return;

        // Umami Cloud exposes an `identify` API in addition to event tracking.
        // First argument: user identifier, second: optional traits.
        (window as any).umami?.identify?.(source, { source });
    }, [searchParams]);

    return null;
}


