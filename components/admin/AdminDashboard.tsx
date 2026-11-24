"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { deleteLead, listLeads, updateLead, type Lead, type LeadStatus } from "@/lib/leads";

const STATUSES: { id: LeadStatus; label: string }[] = [
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "in-discussion", label: "In discussion" },
  { id: "won", label: "Won" },
  { id: "closed", label: "Closed" },
];

const fmt = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const digits = (p: string) => p.replace(/\D/g, "");

function toCSV(leads: Lead[]) {
  const cols: (keyof Lead)[] = ["createdAt", "status", "score", "source", "name", "company", "role", "hiringType", "workMode", "location", "budget", "timeline", "problem", "email", "phone", "notes"];
  const esc = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [cols.join(","), ...leads.map((l) => cols.map((c) => esc(l[c] as string)).join(","))].join("\n");
}

export default function AdminDashboard({ email, onLogout }: { email: string; onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: leads.length, hot: leads.filter((l) => l.score === "HOT").length };
    STATUSES.forEach((s) => (c[s.id] = leads.filter((l) => l.status === s.id).length));
    return c;
  }, [leads]);

  const shown = leads.filter((l) => {
    if (filter !== "all" && l.status !== filter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return [l.name, l.company, l.email, l.role, l.problem, l.phone].some((v) => v?.toLowerCase().includes(q));
  });

  const refresh = useCallback(async () => {
    setLoading(true); setLoadError("");
    try {
      const all = await listLeads();
      setLeads(all);
      setOpenId((id) => id ?? all[0]?.id ?? null);
    } catch (err) {
      const code = (err as { code?: string }).code;
      setLoadError(code === "permission-denied"
        ? "This account isn't the admin. Check ADMIN_UID in firestore.rules."
        : "Could not load leads. Check your connection and Firebase setup.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const patch = async (id: string, body: Partial<Pick<Lead, "status" | "notes">>) => {
    setSavingId(id);
    try {
      const updatedAt = await updateLead(id, body);
      setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, ...body, updatedAt } : l)));
    } catch {
      alert("Could not save the change. Please try again.");
    } finally {
      setSavingId(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    try {
      await deleteLead(id);
      setLeads((ls) => ls.filter((l) => l.id !== id));
    } catch {
      alert("Could not delete. Please try again.");
    }
  };

  const exportCSV = () => {
    const blob = new Blob([toCSV(shown)], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="admin">
      <header className="admin-top">
        <div className="brand"><span className="brand-mark">LP</span><span>Lead Dashboard</span></div>
        <div className="admin-top-actions">
          <span className="admin-storage" title="Signed in">● {email}</span>
          <button className="btn btn-ghost btn-sm" onClick={refresh}>↻ Refresh</button>
          <button className="btn btn-ghost btn-sm" onClick={exportCSV} disabled={!shown.length}>Export CSV</button>
          <Link className="btn btn-ghost btn-sm" href="/" target="_blank">View site</Link>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <section className="admin-stats">
        <div><b>{counts.all}</b><span>Total leads</span></div>
        <div><b>{counts.new}</b><span>New</span></div>
        <div className="hot"><b>{counts.hot}</b><span>Hot leads</span></div>
        <div><b>{counts["in-discussion"]}</b><span>In discussion</span></div>
        <div><b>{counts.won}</b><span>Won</span></div>
      </section>

      <div className="admin-toolbar">
        <div className="admin-tabs">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All <i>{counts.all}</i></button>
          {STATUSES.map((s) => (
            <button key={s.id} className={filter === s.id ? "active" : ""} onClick={() => setFilter(s.id)}>{s.label} <i>{counts[s.id]}</i></button>
          ))}
        </div>
        <input className="admin-search" placeholder="Search name, company, email, problem…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {loadError && <div className="admin-empty"><b>Something went wrong</b><p>{loadError}</p></div>}
      {loading && !leads.length ? (
        <div className="admin-empty"><p>Loading leads…</p></div>
      ) : shown.length === 0 ? (
        <div className="admin-empty">
          <b>No leads yet</b>
          <p>When someone completes the hiring chatbot or the contact form on your site, they&apos;ll appear here.</p>
        </div>
      ) : (
        <ul className="lead-list">
          {shown.map((l) => {
            const open = openId === l.id;
            return (
              <li key={l.id} className={`lead ${open ? "open" : ""} st-${l.status}`}>
                <button className="lead-row" onClick={() => setOpenId(open ? null : l.id)}>
                  <span className={`score ${l.score.toLowerCase()}`}>{l.score}</span>
                  <span className="lead-who"><b>{l.name}</b><small>{l.company || "—"}</small></span>
                  <span className="lead-need">{l.role || "—"}</span>
                  <span className="lead-meta">{[l.hiringType, l.workMode].filter(Boolean).join(" · ") || "—"}</span>
                  <span className="lead-budget">{l.budget || "—"}</span>
                  <span className={`status-pill ${l.status}`}>{STATUSES.find((s) => s.id === l.status)?.label}</span>
                  <span className="lead-date">{fmt(l.createdAt)}</span>
                </button>

                {open && (
                  <div className="lead-detail">
                    <div className="lead-problem">
                      <span>Problem statement</span>
                      <p>{l.problem || "—"}</p>
                    </div>
                    <dl className="lead-grid">
                      <div><dt>Email</dt><dd>{l.email ? <a href={`mailto:${l.email}`}>{l.email}</a> : "—"}</dd></div>
                      <div><dt>Phone</dt><dd>{l.phone ? <a href={`tel:${l.phone}`}>{l.phone}</a> : "—"}</dd></div>
                      <div><dt>Engagement</dt><dd>{l.hiringType || "—"}</dd></div>
                      <div><dt>Work mode</dt><dd>{l.workMode || "—"}{l.location ? ` · ${l.location}` : ""}</dd></div>
                      <div><dt>Budget</dt><dd>{l.budget || "—"}</dd></div>
                      <div><dt>Start</dt><dd>{l.timeline || "—"}</dd></div>
                      <div><dt>Source</dt><dd>{l.source === "chatbot" ? "AI chatbot" : "Contact form"}</dd></div>
                      <div><dt>Received</dt><dd>{fmt(l.createdAt)}</dd></div>
                    </dl>

                    <div className="lead-actions">
                      {l.email && (
                        <a className="btn btn-primary btn-sm"
                          href={`mailto:${l.email}?subject=${encodeURIComponent("Re: your requirement — Laxman Poddar")}&body=${encodeURIComponent(`Hi ${l.name.split(" ")[0]},\n\nThanks for reaching out about "${l.role}". `)}`}>
                          ✉ Reply by email
                        </a>
                      )}
                      {l.phone && (
                        <a className="btn btn-ghost btn-sm" target="_blank" rel="noopener"
                          href={`https://wa.me/${digits(l.phone)}?text=${encodeURIComponent(`Hi ${l.name.split(" ")[0]}, this is Laxman Poddar. Thanks for your requirement about ${l.role}.`)}`}>
                          WhatsApp
                        </a>
                      )}
                      {l.phone && <a className="btn btn-ghost btn-sm" href={`tel:${l.phone}`}>Call</a>}
                      <label className="lead-status">
                        Status
                        <select value={l.status} onChange={(e) => patch(l.id, { status: e.target.value as LeadStatus })}>
                          {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                        </select>
                      </label>
                      <button className="btn btn-ghost btn-sm danger" onClick={() => remove(l.id)}>Delete</button>
                    </div>

                    <label className="lead-notes">
                      Private notes {savingId === l.id && <em>saving…</em>}
                      <textarea
                        rows={3}
                        defaultValue={l.notes}
                        placeholder="Call notes, next steps, quoted price…"
                        onBlur={(e) => e.target.value !== l.notes && patch(l.id, { notes: e.target.value })}
                      />
                    </label>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
