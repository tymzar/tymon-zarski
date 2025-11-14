export function track(event: string, data?: Record<string, any>) {
  if (typeof window === "undefined") return;

  const umami = (window as any).umami;

  if (!umami) return;

  // Newer Umami exposes an object with a `track` method
  if (typeof umami.track === "function") {
    umami.track(event, data);
    return;
  }

  // Older Umami exposed a callable function
  if (typeof umami === "function") {
    umami(event, data);
  }
}


