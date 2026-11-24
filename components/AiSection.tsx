"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { aiCaps, aiLayers, chatScript, type ChatStep } from "@/lib/data";

type Msg = { id: number; who: ChatStep["who"]; html: string; typing?: boolean };

function ChatDemo() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);

  useEffect(() => {
    let cancelled = false;
    let started = false;
    let id = 0;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));

    const push = (m: Omit<Msg, "id">) => {
      const msg = { ...m, id: ++id };
      setMsgs((prev) => [...prev, msg]);
      return msg.id;
    };
    const update = (mid: number, html: string) =>
      setMsgs((prev) => prev.map((m) => (m.id === mid ? { ...m, html, typing: false } : m)));

    const run = async () => {
      while (!cancelled) {
        setMsgs([]);
        for (const step of chatScript) {
          if (cancelled) return;
          if (step.who === "user") { await sleep(500); push({ who: "user", html: step.text }); await sleep(700); }
          else if (step.who === "tool") { push({ who: "tool", html: step.text }); await sleep(650); }
          else {
            const mid = push({ who: "bot", html: "", typing: true });
            await sleep(900);
            // stream word by word, keeping HTML tags intact
            const parts = step.text.split(/(<[^>]+>)/).filter(Boolean);
            let out = "";
            for (const p of parts) {
              if (p.startsWith("<")) { out += p; continue; }
              for (const w of p.split(/(\s+)/)) {
                if (cancelled) return;
                out += w; update(mid, out); await sleep(28);
              }
            }
            await sleep(1200);
          }
        }
        await sleep(4000);
        if (reduce) return;
      }
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { started = true; run(); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(bodyRef.current!);
    return () => { cancelled = true; io.disconnect(); };
  }, []);

  // keep the newest messages visible
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  return (
    <Reveal className="ai-demo">
      <div className="demo-head">
        <span className="dots"><i /><i /><i /></span>
        <span className="mono">rwm-assistant · claude</span>
        <span className="live"><span className="pulse" />live</span>
      </div>
      <div className="demo-body" ref={bodyRef} aria-live="polite">
        {msgs.map((m) =>
          m.typing ? (
            <div key={m.id} className="msg bot"><span className="typing-dots"><span /><span /><span /></span></div>
          ) : (
            <div key={m.id} className={`msg ${m.who}`} dangerouslySetInnerHTML={{ __html: m.html }} />
          )
        )}
      </div>
      <div className="demo-foot mono">Sample flow: tool use → MongoDB → streamed summary</div>
    </Reveal>
  );
}

export default function AiSection() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % aiLayers.length), 2600);
    return () => clearInterval(t);
  }, [hovering]);

  return (
    <section className="section" id="ai">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">01 · AI-First Engineering</span>
          <h2>AI in every layer of your product</h2>
          <p>I don&apos;t add AI as an afterthought. I build it into the architecture, from the app on your users&apos; phones down to the database, so it is reliable, fast and cost-efficient in production.</p>
        </Reveal>

        <div className="ai-layout">
          <Reveal className="ai-layers">
            {aiLayers.map((l, i) => (
              <div
                key={l.title}
                className={`layer ${active === i ? "active" : ""}`}
                onMouseEnter={() => { setHovering(true); setActive(i); }}
                onMouseLeave={() => setHovering(false)}
              >
                <div className="layer-icon">{l.icon}</div>
                <div>
                  <h3>{l.title} <small>{l.sub}</small></h3>
                  <p>{l.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
          <ChatDemo />
        </div>

        <Reveal className="ai-caps">
          {aiCaps.map((c) => (
            <div className="cap" key={c.title}><b>{c.title}</b><span>{c.text}</span></div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
