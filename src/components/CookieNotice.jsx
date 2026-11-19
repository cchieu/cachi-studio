import { useState } from "react";

/** Minimal cookie consent banner — required for analytics in many regions. */
export default function CookieNotice() {
  const [choice, setChoice] = useState(() =>
    localStorage.getItem("cachi-cookie-consent")
  );

  if (choice) return null;

  const decide = (value) => {
    localStorage.setItem("cachi-cookie-consent", value);
    setChoice(value);
    window.dispatchEvent(new Event("cachi-consent"));
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-[150] mx-auto flex max-w-3xl flex-col items-start justify-between gap-4 rounded-2xl bg-paper p-5 text-ink shadow-2xl sm:flex-row sm:items-center"
    >
      <p className="text-sm leading-relaxed">
        We use cookies to understand how visitors use this site — no ads, no
        tracking across other websites.
      </p>
      <div className="flex shrink-0 gap-3">
        <button
          onClick={() => decide("declined")}
          className="rounded-full border border-ink/25 px-5 py-2 font-display text-xs font-bold tracking-[0.15em] transition hover:border-ink"
        >
          DECLINE
        </button>
        <button
          onClick={() => decide("accepted")}
          className="rounded-full bg-ink px-5 py-2 font-display text-xs font-bold tracking-[0.15em] text-paper transition hover:bg-ink/80"
        >
          ACCEPT
        </button>
      </div>
    </div>
  );
}
