/**
 * Minimal analytics helper.
 *
 * Google Analytics is only loaded when BOTH conditions are true:
 *   1. VITE_GA_ID is set in a .env file (e.g. VITE_GA_ID=G-XXXXXXXXXX)
 *   2. The visitor accepts cookies in the consent banner.
 *
 * Track interactions anywhere with:  trackEvent("cta_start_a_project")
 */
export function trackEvent(action, label) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", action, label ? { label } : undefined);
  }
}
