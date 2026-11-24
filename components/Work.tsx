"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import ProjectMock from "./ProjectMock";
import { domains, filters, projects } from "@/lib/data";

export default function Work() {
  const [filter, setFilter] = useState("all");
  const visible = projects.filter((p) => filter === "all" || p.tags.includes(filter));

  return (
    <section className="section" id="work">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">03 · Selected Work</span>
          <h2>Production systems, real problems solved</h2>
          <p>Enterprise, fleet telematics, healthcare and fintech products used in the field every day.</p>
        </Reveal>

        <Reveal className="filters" role="tablist">
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={`filter ${filter === f.id ? "active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        <div className="projects">
          {visible.map((p, i) => (
            <Reveal as="article" key={`${filter}-${p.id}`} delay={(i % 2) * 90} className={`project ${p.featured ? "featured" : ""}`}>
              <div className="project-visual">
                <ProjectMock id={p.id} />
                {p.id === "ai" && <span className="badge-ai">✦ AI</span>}
              </div>
              <div className="project-body">
                <div className="project-meta">{p.meta.map((m) => <span key={m}>{m}</span>)}</div>
                <h3>{p.title}</h3>
                <p className="problem"><b>Problem:</b> {p.problem}</p>
                <ul className="solved">{p.solved.map((s) => <li key={s}>{s}</li>)}</ul>
                <div className="stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="domains">
          <span className="domains-label">Industries I&apos;ve built for</span>
          <div className="domain-chips">{domains.map((d) => <span key={d}>{d}</span>)}</div>
        </Reveal>
      </div>
    </section>
  );
}
