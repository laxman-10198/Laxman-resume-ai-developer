"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { profile } from "@/lib/data";
import { firebaseEnabled, submitLead } from "@/lib/leads";

type Answers = {
  name: string; company: string; role: string; hiringType: string; workMode: string;
  location: string; budget: string; timeline: string; problem: string; email: string; phone: string;
};
type Key = keyof Answers;

type Step = {
  key: Key;
  ask: (a: Answers) => string;
  options?: (a: Answers) => string[];
  input?: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  optional?: boolean;          // shows a "Skip" chip
  allowText?: boolean;         // options + free text
  when?: (a: Answers) => boolean;
  validate?: (v: string) => string | null;
};

const isSalaried = (a: Answers) => /full|part/i.test(a.hiringType);

const STEPS: Step[] = [
  { key: "name", input: "text", placeholder: "Your full name",
    ask: () => "Hi 👋 I'm Laxman's AI hiring assistant. I'll take your requirement in about a minute and send it straight to him.\n\nWhat's your name?",
    validate: (v) => (v.length < 2 ? "Please enter your name." : null) },
  { key: "company", input: "text", placeholder: "Company name", optional: true,
    ask: (a) => `Nice to meet you, ${a.name.split(" ")[0]}! Which company are you with?` },
  { key: "role", allowText: true, input: "text", placeholder: "Or type what you need…",
    ask: () => "What do you need help with?",
    options: () => ["AI Agents / RAG", "AI/ML & MLOps", "LLM chatbot / assistant", "Android app", "Flutter / React Native app", "Web portal (Next.js)", "Backend / APIs", "Complete product, end to end"] },
  { key: "hiringType", ask: () => "What type of engagement are you looking for?",
    options: () => ["Full-time", "Part-time", "Freelance", "Contract", "Consulting"] },
  { key: "workMode", ask: () => "What's the work mode?", options: () => ["Remote", "Hybrid", "On-site"] },
  { key: "location", input: "text", placeholder: "City, country", optional: true,
    when: (a) => a.workMode !== "Remote", ask: () => "Where is the office located?" },
  { key: "budget", allowText: true, input: "text", placeholder: "Or type an amount…",
    ask: (a) => (isSalaried(a) ? "What's the salary range (CTC) for this role?" : "What's the budget for this project?"),
    options: (a) => isSalaried(a)
      ? ["₹15–25 LPA", "₹25–40 LPA", "₹40 LPA+", "Let's discuss"]
      : ["Under $2k", "$2k – $5k", "$5k – $15k", "$15k+", "Monthly retainer", "Let's discuss"] },
  { key: "timeline", ask: () => "When would you like to start?", options: () => ["ASAP", "Within 1 month", "1–3 months", "Flexible"] },
  { key: "problem", input: "textarea", placeholder: "Describe the problem, the product, and what success looks like…",
    ask: () => "Now the most important part: what's the problem statement?\n\nWhat are you building, and what challenge do you need solved?",
    validate: (v) => (v.length < 15 ? "Please add a little more detail (at least a sentence)." : null) },
  { key: "email", input: "email", placeholder: "you@company.com",
    ask: () => "What's the best email to reach you?",
    validate: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : "That email doesn't look right.") },
  { key: "phone", input: "tel", placeholder: "+91 98xxxxxxx", optional: true,
    ask: () => "And a phone / WhatsApp number? (optional, but it gets you a faster reply)" },
];

const LABELS: Record<Key, string> = {
  name: "Name", company: "Company", role: "Need", hiringType: "Engagement", workMode: "Work mode",
  location: "Location", budget: "Budget", timeline: "Start", problem: "Problem", email: "Email", phone: "Phone",
};

const EMPTY: Answers = { name: "", company: "", role: "", hiringType: "", workMode: "", location: "", budget: "", timeline: "", problem: "", email: "", phone: "" };

type Msg = { from: "bot" | "user"; text: string };
type Phase = "asking" | "review" | "sending" | "done" | "error";

export default function HireBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [stepIdx, setStepIdx] = useState(-1);
  const [phase, setPhase] = useState<Phase>("asking");
  const [typing, setTyping] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const started = useRef(false);

  const botSay = useCallback(async (text: string) => {
    setTyping(true);
    await new Promise((r) => setTimeout(r, 550));
    setTyping(false);
    setMsgs((m) => [...m, { from: "bot", text }]);
  }, []);

  const nextStep = useCallback(async (from: number, a: Answers) => {
    let i = from + 1;
    while (i < STEPS.length && STEPS[i].when && !STEPS[i].when!(a)) i++;
    if (i >= STEPS.length) {
      setStepIdx(STEPS.length);
      setPhase("review");
      await botSay("Perfect, here's a summary of your requirement. Shall I send it to Laxman?");
      return;
    }
    setStepIdx(i);
    await botSay(STEPS[i].ask(a));
  }, [botSay]);

  const start = useCallback(() => {
    setMsgs([]); setAnswers(EMPTY); setPhase("asking"); setValue(""); setError(null);
    nextStep(-1, EMPTY);
  }, [nextStep]);

  // open from anywhere: window.dispatchEvent(new Event("open-hirebot"))
  useEffect(() => {
    const h = () => setOpen(true);
    addEventListener("open-hirebot", h);
    return () => removeEventListener("open-hirebot", h);
  }, []);

  useEffect(() => {
    if (open && !started.current) { started.current = true; start(); }
  }, [open, start]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, phase]);

  useEffect(() => {
    if (open && !typing) inputRef.current?.focus();
  }, [open, typing, stepIdx]);

  const step = phase === "asking" ? STEPS[stepIdx] : undefined;

  const answer = async (raw: string) => {
    if (!step || typing) return;
    const v = raw.trim();
    if (v) {
      const err = step.validate?.(v) ?? null;
      if (err) { setError(err); return; }
    } else if (!step.optional) {
      setError("Please answer or choose an option."); return;
    }
    setError(null);
    setValue("");
    const a = { ...answers, [step.key]: v };
    setAnswers(a);
    setMsgs((m) => [...m, { from: "user", text: v || "Skip" }]);
    await nextStep(stepIdx, a);
  };

  const onSubmit = (e: FormEvent) => { e.preventDefault(); answer(value); };

  const send = async () => {
    // Without a database configured (e.g. before Firebase setup), hand the lead off via WhatsApp.
    if (!firebaseEnabled) {
      window.open(`https://wa.me/${profile.whatsapp}?text=${fullWaText()}`, "_blank", "noopener");
      setPhase("done");
      await botSay(`📲 I've opened WhatsApp with your requirement ready to send. Just tap send, ${answers.name.split(" ")[0]}, and Laxman will reply within 24 hours.`);
      return;
    }
    setPhase("sending");
    try {
      await submitLead(answers, "chatbot");
      setPhase("done");
      await botSay(`✅ Done, ${answers.name.split(" ")[0]}! Laxman has your requirement and will get back to you within 24 hours${answers.email ? ` at ${answers.email}` : ""}.`);
    } catch (err) {
      setPhase("error");
      const msg = (err as { code?: string }).code ? "Couldn't save your requirement" : (err as Error).message;
      await botSay(`⚠️ ${msg}. You can retry, or reach Laxman directly on WhatsApp or email.`);
    }
  };

  const fullWaText = () => encodeURIComponent(
    "Hi Laxman, here's my requirement:\n\n" +
    (Object.keys(LABELS) as Key[]).filter((k) => answers[k]).map((k) => `${LABELS[k]}: ${answers[k]}`).join("\n")
  );

  const waText = encodeURIComponent(
    `Hi Laxman, I'm ${answers.name}${answers.company ? " from " + answers.company : ""}. ` +
    `Need: ${answers.role}. ${answers.hiringType}, ${answers.workMode}. Budget: ${answers.budget}.\n\n${answers.problem}`
  );

  const options = step?.options?.(answers) ?? [];
  const showInput = !!step && (step.input || step.allowText);

  return (
    <>
      <button className={`hb-launcher ${open ? "hidden" : ""}`} onClick={() => setOpen(true)} aria-label="Open hiring assistant">
        <span className="hb-launcher-icon">✦</span>
        <span className="hb-launcher-text">Hire Laxman<small>AI hiring assistant</small></span>
        <span className="hb-ping" />
      </button>

      <div className={`hb-panel ${open ? "open" : ""}`} role="dialog" aria-label="Hiring assistant" aria-hidden={!open}>
        <div className="hb-head">
          <div className="hb-avatar">LP<span /></div>
          <div className="hb-title"><b>Laxman&apos;s Hiring Assistant</b><small>Typically replies within 24h</small></div>
          <button className="hb-icon-btn" onClick={start} title="Start over" aria-label="Start over">↺</button>
          <button className="hb-icon-btn" onClick={() => setOpen(false)} title="Close" aria-label="Close">✕</button>
        </div>

        {phase === "asking" && stepIdx >= 0 && (
          <div className="hb-progress"><span style={{ width: `${(stepIdx / STEPS.length) * 100}%` }} /></div>
        )}

        <div className="hb-body" ref={bodyRef}>
          {msgs.map((m, i) => <div key={i} className={`hb-msg ${m.from}`}>{m.text}</div>)}
          {typing && <div className="hb-msg bot"><span className="typing-dots"><span /><span /><span /></span></div>}

          {(phase === "review" || phase === "sending" || phase === "error") && !typing && (
            <div className="hb-summary">
              {(Object.keys(LABELS) as Key[]).filter((k) => answers[k]).map((k) => (
                <div key={k} className={k === "problem" ? "full" : ""}><span>{LABELS[k]}</span><b>{answers[k]}</b></div>
              ))}
            </div>
          )}
        </div>

        <div className="hb-foot">
          {step && !typing && (options.length > 0 || step.optional) && (
            <div className="hb-chips">
              {options.map((o) => <button key={o} onClick={() => answer(o)}>{o}</button>)}
              {step.optional && <button className="ghost" onClick={() => answer("")}>Skip</button>}
            </div>
          )}

          {showInput && !typing && (
            <form className="hb-input" onSubmit={onSubmit}>
              {step!.input === "textarea" ? (
                <textarea
                  ref={inputRef} rows={3} value={value} placeholder={step!.placeholder}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) answer(value); }}
                />
              ) : (
                <input
                  ref={inputRef} value={value} placeholder={step!.placeholder}
                  type={step!.input === "email" ? "email" : step!.input === "tel" ? "tel" : "text"}
                  onChange={(e) => setValue(e.target.value)}
                />
              )}
              <button type="submit" aria-label="Send">➤</button>
            </form>
          )}
          {error && <p className="hb-error">{error}</p>}

          {(phase === "review" || phase === "error") && !typing && (
            <div className="hb-actions">
              <button className="btn btn-primary btn-sm" onClick={send}>{phase === "error" ? "Retry" : firebaseEnabled ? "Send to Laxman ✓" : "Send via WhatsApp ✓"}</button>
              <button className="btn btn-ghost btn-sm" onClick={start}>Start over</button>
            </div>
          )}
          {phase === "sending" && <p className="hb-note">Sending…</p>}
          {(phase === "done" || phase === "error") && !typing && (
            <div className="hb-actions">
              <a className="btn btn-ghost btn-sm" href={`https://wa.me/${profile.whatsapp}?text=${waText}`} target="_blank" rel="noopener">WhatsApp Laxman</a>
              <a className="btn btn-ghost btn-sm" href={`mailto:${profile.email}`}>Email</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
