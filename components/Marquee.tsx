import { marquee } from "@/lib/data";

export default function Marquee() {
  const items = [...marquee, ...marquee]; // duplicated for a seamless loop
  return (
    <section className="marquee" aria-label="Technologies">
      <div className="marquee-track">
        {items.map((m, i) => (
          <span key={i} aria-hidden={i >= marquee.length}>
            {m.icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.icon} alt="" className={m.invert ? "invert" : ""} />
            ) : (
              <b className="claude-dot">{m.glyph}</b>
            )}
            {m.label}
          </span>
        ))}
      </div>
    </section>
  );
}
