"use client";

import type { PointerEvent } from "react";
import Reveal from "./Reveal";
import { ServiceIcon } from "./Icons";
import { process, services } from "@/lib/data";

const canTilt = () =>
  typeof window !== "undefined" &&
  matchMedia("(pointer: fine)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches;

function onTilt(e: PointerEvent<HTMLElement>) {
  if (!canTilt()) return;
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
  card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
  card.style.setProperty("--mx", x * 100 + "%");
  card.style.setProperty("--my", y * 100 + "%");
}

export default function Services() {
  return (
    <section className="section section-alt" id="services">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">02 · What I Deliver</span>
          <h2>One partner for the complete solution</h2>
          <p>Hire one engineer who owns the whole stack, instead of coordinating five vendors. I design the system, build every client, ship it, and keep it healthy.</p>
        </Reveal>

        <div className="services-grid">
          {services.map((s, i) => (
            <Reveal
              as="article"
              key={s.title}
              delay={(i % 3) * 90}
              className={`service tilt ${s.ai ? "service-ai" : ""}`}
              onPointerMove={onTilt}
              onPointerLeave={(e: PointerEvent<HTMLElement>) => { e.currentTarget.style.transform = ""; }}
            >
              <div className="service-icon"><ServiceIcon name={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="process">
          <h3 className="process-title">How we&apos;ll work together</h3>
          <ol className="process-steps">
            {process.map((p, i) => (
              <li key={p.title}><span>{String(i + 1).padStart(2, "0")}</span><b>{p.title}</b><p>{p.text}</p></li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
