"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      await signInWithEmailAndPassword(getAuth(firebaseApp()), email.trim(), password);
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      setError(/invalid|wrong|not-found|credential/.test(code) ? "Wrong email or password" :
        code === "auth/too-many-requests" ? "Too many attempts. Try again later." : "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={onSubmit}>
        <div className="brand-mark">LP</div>
        <h1>Lead Dashboard</h1>
        <p>Sign in to see hiring requests from your website.</p>
        <input type="email" autoFocus placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary" disabled={busy || !email || !password}>{busy ? "Signing in…" : "Sign in"}</button>
        {error && <p className="admin-error">{error}</p>}
        <Link href="/" className="admin-back">← Back to website</Link>
      </form>
    </div>
  );
}
