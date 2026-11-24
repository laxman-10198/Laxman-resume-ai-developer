"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { skills } from "@/lib/data";

export default function Skills() {
  const [active, setActive] = useState(0);
  const s = skills[active];

  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">04 · Toolbox</span>
          <h2>Full-stack depth, AI-native</h2>
          <p>Choose a domain to see the tools I use in production.</p>
        </Reveal>

        <Reveal className="skills">
          <div className="skill-tabs" role="tablist">
            {skills.map((sk, i) => (
              <button
                key={sk.label}
                role="tab"
                aria-selected={active === i}
                className={`skill-tab ${active === i ? "active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="code">{String(i + 1).padStart(2, "0")}</span>
                {sk.label}
              </button>
            ))}
          </div>
          <div className="skill-panel" key={active}>
            <h3>{s.label}</h3>
            <p>{s.note}</p>
            <div className="skill-items">
              {s.items.map((it, k) => (
                <span key={it} className="skill-item" style={{ animationDelay: `${k * 25}ms` }}>{it}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
