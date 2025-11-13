export function track(event: string, data?: Record<string, any>) {
  if (typeof window === "undefined") return;

  // Umami injects a global function when the script loads
  (window as any).umami?.(event, data);
}


