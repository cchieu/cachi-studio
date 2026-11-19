/**
 * CACHI logo.
 *
 * NOTE: This is a code recreation of the described brand mark (lowercase
 * wordmark + electric-yellow circular symbol). To use the official logo file,
 * drop it into public/images/ (e.g. cachi-logo.svg) and replace the markup
 * below with an <img src="/images/cachi-logo.svg" alt="CACHI" />.
 */
export default function Logo({ className = "", invert = false }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="13" cy="13" r="11" fill="#F1ED28" />
        <circle cx="16.5" cy="9.5" r="3.5" fill={invert ? "#101010" : "#101010"} />
      </svg>
      <span className="font-display text-[22px] font-bold lowercase leading-none tracking-tight">
        cachi
      </span>
    </span>
  );
}
