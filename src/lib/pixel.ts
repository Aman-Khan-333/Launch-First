/**
 * Meta (Facebook) pixel. The base code is loaded by <MetaPixel /> in the root layout; these helpers send
 * events through it, and do nothing when the pixel is blocked or not loaded yet (fbq queues calls made
 * before its script arrives).
 */
export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1682833620170599";

type Params = Record<string, string | number | boolean | undefined>;
type Fbq = (command: "track" | "trackCustom", event: string, params?: Params) => void;

const fbq = (): Fbq | undefined =>
  typeof window === "undefined" ? undefined : (window as Window & { fbq?: Fbq }).fbq;

/** One of Meta's standard events: PageView, ViewContent, Lead, Schedule, Contact, ... */
export function track(event: string, params?: Params) {
  try {
    fbq()?.("track", event, params);
  } catch {
    // a broken or blocked pixel never breaks the page
  }
}

/** An event of our own, such as a button click. */
export function trackCustom(event: string, params?: Params) {
  try {
    fbq()?.("trackCustom", event, params);
  } catch {
    // a broken or blocked pixel never breaks the page
  }
}
