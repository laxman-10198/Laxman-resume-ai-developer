"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Reveal from "./Reveal";
import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "./Icons";
import { impact, orbitInner, orbitOuter, profile, roles, stats } from "@/lib/data";

function useTyped(words: string[]) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(words[0]); return; }
    let r = 0, c = 0, deleting = false, t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[r];
      setText(word.slice(0, c));
      if (!deleting && c === word.length) { deleting = true; t = setTimeout(tick, 1800); return; }
      if (deleting && c === 0) { deleting = false; r = (r + 1) % words.length; }
      c += deleting ? -1 : 1;
      t = setTimeout(tick, deleting ? 28 : 55);
    };
    tick();
    return () => clearTimeout(t);
  }, [words]);
  return text;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current!;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dur = reduce ? 1 : 1600, t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min((t - t0) / dur, 1);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <b ref={ref}>{n.toLocaleString()}{suffix}</b>;
}

function Avatar() {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // the image may fail before React hydrates and attaches onError, so check on mount too
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <div className="avatar">
      <div className="avatar-ring" />
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img ref={imgRef} src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/assets/profile.jpg`} alt="Laxman Poddar" className="avatar-img" onError={() => setFailed(true)} />
      ) : (
        <div className="avatar-fallback" style={{ display: "grid" }}>LP</div>
      )}
    </div>
  );
}

export default function Hero() {
  const typed = useTyped(roles);

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <Reveal className="pill"><span className="pulse" /> Available for freelance, contract &amp; full-time</Reveal>
          <Reveal as="h1">
            I turn ideas into <span className="grad-text">AI-powered products</span><br />— mobile, web &amp; backend.
          </Reveal>
          <Reveal as="p" className="hero-role">
            <span className="mono">&gt;</span> <span className="typed">{typed}</span><span className="caret">|</span>
          </Reveal>
          <Reveal as="p" className="hero-sub">
            I&apos;m <strong>Laxman Poddar</strong>, a senior engineer and solution architect with <strong>6+ years of core development</strong>.
            I build <strong>AI agents, RAG systems, AI/ML models and MLOps pipelines</strong>, and ship them inside mobile and web
            products on the stack that fits your business: <strong>any language, any framework, any database</strong>, from architecture to launch.
          </Reveal>
          <Reveal className="impact">
            {impact.map((m) => (
              <div key={m.label} className="impact-item">
                <b>{m.value}</b>
                <span>{m.label}</span>
              </div>
            ))}
          </Reveal>
          <Reveal className="trend-chips">
            {["AI Agents", "RAG", "AI / ML", "MLOps", "LLM Apps", "Mobile", "Full Stack"].map((t) => <span key={t}>{t}</span>)}
          </Reveal>
          <Reveal className="hero-cta">
            <a href="#contact" className="btn btn-primary">Start a Project <span className="arrow">→</span></a>
            <button type="button" className="btn btn-ghost" onClick={() => window.dispatchEvent(new Event("open-hirebot"))}>✦ Talk to AI Assistant</button>
            <a href="#work" className="btn btn-ghost">See My Work</a>
          </Reveal>
          <Reveal className="hero-social">
            <a href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href={profile.github} target="_blank" rel="noopener" aria-label="GitHub"><GitHubIcon /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><MailIcon /></a>
            <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener" aria-label="WhatsApp"><WhatsAppIcon /></a>
          </Reveal>
        </div>

        <Reveal className="hero-visual">
          <div className="orbit-wrap">
            <div className="orbit orbit-1">
              {orbitOuter.map((o, i) => (
                <span key={o.alt} className="orbit-icon" style={{ "--i": i } as CSSProperties}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.icon} alt={o.alt} />
                </span>
              ))}
            </div>
            <div className="orbit orbit-2">
              {orbitInner.map((o, i) => (
                <span key={o.alt} className={`orbit-icon ${o.icon ? "" : "ai-chip"}`} style={{ "--i": i } as CSSProperties}>
                  {o.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={o.icon} alt={o.alt} className={o.invert ? "invert" : ""} />
                  ) : (
                    <em>AI</em>
                  )}
                </span>
              ))}
            </div>
            <Avatar />
            <div className="float-card fc-1">
              <span className="fc-dot green" />
              <div><b>15+</b><small>Production releases</small></div>
            </div>
            <div className="float-card fc-2">
              <span className="fc-icon">✦</span>
              <div><b>AI Agents · RAG</b><small>AI/ML · MLOps · LLM Apps</small></div>
            </div>
            <div className="float-card fc-3">
              <span className="fc-icon">⚡</span>
              <div><b>1000+</b><small>REST APIs integrated</small></div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="container stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <Counter value={s.value} suffix={s.suffix} />
            <span>{s.label}</span>
          </div>
        ))}
      </Reveal>

      <a href="#ai" className="scroll-hint" aria-label="Scroll down"><span /></a>
    </section>
  );
}
