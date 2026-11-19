/** Infinite marquee strip with the Cachi circular separator. */
export default function Marquee({ items, className = "" }) {
  return (
    <div className={`overflow-hidden py-5 ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((text, i) => (
              <span
                key={i}
                className="flex items-center whitespace-nowrap font-display text-2xl font-bold uppercase tracking-tight md:text-4xl"
              >
                {text}
                <span className="mx-7 inline-block h-3.5 w-3.5 shrink-0 rounded-full bg-volt" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
