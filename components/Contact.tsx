"use client";

import { useRef, useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { WhatsAppIcon } from "./Icons";
import { needs, profile } from "@/lib/data";
import { firebaseEnabled, submitLead } from "@/lib/leads";

type Field = "name" | "email" | "message";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [invalid, setInvalid] = useState<Set<Field>>(new Set());
  const [note, setNote] = useState<{ text: string; err?: boolean }>({ text: "" });

  const validate = () => {
    const f = formRef.current!;
    const bad = new Set<Field>();
    (["name", "email", "message"] as Field[]).forEach((n) => {
      const v = (f.elements.namedItem(n) as HTMLInputElement).value.trim();
      if (!v || (n === "email" && !/^\S+@\S+\.\S+$/.test(v))) bad.add(n);
    });
    setInvalid(bad);
    setNote(bad.size ? { text: "Please fill in your name, a valid email and project details.", err: true } : { text: "" });
    return bad.size === 0;
  };

  const buildMessage = () => {
    const d = new FormData(formRef.current!);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    const need = d.getAll("need").join(", ") || "Not specified";
    const subject = `Project enquiry: ${get("type")}${get("company") ? " · " + get("company") : ""}`;
    const body = `Hi Laxman,\n\n${get("message")}\n\nNeeds: ${need}\nEngagement: ${get("type")}\nCompany: ${get("company") || "-"}\n\n— ${get("name")} (${get("email")})`;
    return { subject, body };
  };

  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const d = new FormData(formRef.current!);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    if (get("website")) return; // honeypot: bots fill hidden fields
    if (!firebaseEnabled) {
      const { subject, body } = buildMessage();
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setNote({ text: "Opening your email app… Thanks! I'll reply within 24 hours." });
      return;
    }
    setSending(true);
    try {
      await submitLead({
        name: get("name"), email: get("email"), company: get("company"),
        hiringType: get("type"), role: d.getAll("need").join(", "), problem: get("message"),
      }, "contact-form");
      formRef.current!.reset();
      setNote({ text: "✅ Thanks! Your requirement reached Laxman. Expect a reply within 24 hours." });
    } catch (err) {
      setNote({ text: `Couldn't send right now. Please email ${profile.email} directly.`, err: true });
    } finally {
      setSending(false);
    }
  };

  const onWhatsApp = () => {
    if (!validate()) return;
    const { subject, body } = buildMessage();
    window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(subject + "\n\n" + body)}`, "_blank", "noopener");
  };

  const cls = (n: Field) => (invalid.has(n) ? "invalid" : undefined);

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <Reveal className="contact-card">
          <div className="contact-copy">
            <span className="eyebrow">06 · Let&apos;s Build</span>
            <h2>Have a product idea or a hard problem?</h2>
            <p>Tell me what you&apos;re building. I&apos;ll reply with a clear technical approach, how AI can help, and a realistic estimate, usually within 24 hours.</p>
            <div className="engage">
              {["Freelance", "Contract", "Consulting", "Full-time", "Remote · Hybrid"].map((e) => <span key={e}>{e}</span>)}
            </div>
            <button type="button" className="btn btn-primary bot-cta" onClick={() => window.dispatchEvent(new Event("open-hirebot"))}>
              ✦ Chat with my AI hiring assistant
            </button>
            <ul className="contact-list">
              <li><span>✉</span><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li><span>☎</span><a href={`tel:${profile.phoneRaw}`}>{profile.phone}</a><small className="contact-tag">Call</small></li>
              <li>
                <span className="wa-icon"><WhatsAppIcon /></span>
                <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener">{profile.whatsappDisplay}</a>
                <small className="contact-tag">WhatsApp</small>
              </li>
              <li><span>in</span><a href={profile.linkedin} target="_blank" rel="noopener">linkedin.com/in/laxman-poddar</a></li>
              <li><span>⌥</span><a href={profile.github} target="_blank" rel="noopener">github.com/laxman-10198</a></li>
            </ul>
          </div>

          <form className="contact-form" ref={formRef} onSubmit={onSubmit} noValidate>
            <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
            <div className="row">
              <label>Your name<input name="name" className={cls("name")} placeholder="Jane Doe" /></label>
              <label>Email<input name="email" type="email" className={cls("email")} placeholder="jane@company.com" /></label>
            </div>
            <div className="row">
              <label>Company<input name="company" placeholder="Acme Inc." /></label>
              <label>Engagement
                <select name="type" defaultValue="Freelance project">
                  <option>Freelance project</option>
                  <option>Contract</option>
                  <option>Consulting</option>
                  <option>Full-time role</option>
                </select>
              </label>
            </div>
            <fieldset className="needs">
              <legend>What do you need?</legend>
              {needs.map((n) => (
                <label className="chip" key={n.value}>
                  <input type="checkbox" name="need" value={n.value} defaultChecked={n.checked} />
                  <span>{n.label}</span>
                </label>
              ))}
            </fieldset>
            <label>Project details
              <textarea name="message" rows={4} className={cls("message")} placeholder="What are you building, and what's the timeline?" />
            </label>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={sending}>{sending ? "Sending…" : "Send Requirement"} <span className="arrow">→</span></button>
              <button type="button" className="btn btn-ghost" onClick={onWhatsApp}>WhatsApp</button>
            </div>
            <p className={`form-note ${note.err ? "err" : ""}`}>{note.text}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
