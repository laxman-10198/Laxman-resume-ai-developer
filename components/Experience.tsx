import Reveal from "./Reveal";
import { timeline, whyMe } from "@/lib/data";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">05 · Experience</span>
          <h2>6+ years: from app developer to AI solution architect</h2>
        </Reveal>

        <div className="exp-grid">
          <ol className="timeline">
            {timeline.map((t) => (
              <Reveal as="li" key={t.role}>
                <span className={`tl-dot ${t.edu ? "edu" : ""}`} />
                <div className="tl-period">{t.period}</div>
                <h3>{t.role}</h3>
                <div className="tl-company">{t.company}</div>
                {t.text && <p>{t.text}</p>}
                {t.tags.length > 0 && <div className="tags">{t.tags.map((g) => <span key={g}>{g}</span>)}</div>}
              </Reveal>
            ))}
          </ol>

          <div className="why">
            <Reveal as="h3">Why clients choose me</Reveal>
            {whyMe.map((w, i) => (
              <Reveal key={w.title} className="why-card" delay={i * 70}>
                <b>{w.title}</b>
                <p>{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
