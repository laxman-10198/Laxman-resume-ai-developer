"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged, signOut, type User } from "firebase/auth";
import { firebaseApp, firebaseEnabled } from "@/lib/firebase";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

/** Client-side admin: Firebase Auth decides who can see leads (enforced by firestore.rules). */
export default function AdminApp() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    if (!firebaseEnabled) return;
    return onAuthStateChanged(getAuth(firebaseApp()), setUser);
  }, []);

  if (!firebaseEnabled) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <div className="brand-mark">LP</div>
          <h1>Connect Firebase</h1>
          <p>
            Lead storage isn&apos;t configured yet. Until it is, the chatbot sends each requirement to your WhatsApp.
            Follow the &ldquo;Lead dashboard setup&rdquo; steps in the README to enable this dashboard.
          </p>
          <Link href="/" className="admin-back">← Back to website</Link>
        </div>
      </div>
    );
  }

  if (user === undefined) return <div className="admin-login"><p className="hb-note">Loading…</p></div>;
  if (!user) return <AdminLogin />;
  return <AdminDashboard email={user.email ?? ""} onLogout={() => signOut(getAuth(firebaseApp()))} />;
}
