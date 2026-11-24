import {
  addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, updateDoc,
} from "firebase/firestore";
import { firebaseApp, firebaseEnabled } from "./firebase";

export type LeadStatus = "new" | "contacted" | "in-discussion" | "won" | "closed";

export type Lead = {
  id: string;
  createdAt: string;
  updatedAt: string;
  source: "chatbot" | "contact-form";
  status: LeadStatus;
  score: "HOT" | "WARM" | "COLD";
  name: string;
  company: string;
  role: string;          // what they want to hire for / build
  hiringType: string;    // Full-time, Freelance, Contract...
  workMode: string;      // Remote / Hybrid / On-site
  location: string;
  budget: string;
  timeline: string;
  problem: string;       // problem statement
  email: string;
  phone: string;
  notes: string;         // private admin notes
};

export const LEAD_FIELDS = [
  "name", "company", "role", "hiringType", "workMode", "location",
  "budget", "timeline", "problem", "email", "phone",
] as const;
type LeadInput = Partial<Record<(typeof LEAD_FIELDS)[number], string>>;

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function scoreLead(l: LeadInput): Lead["score"] {
  const hasBudget = !!l.budget && !/not sure|discuss/i.test(l.budget);
  if ((l.company && (l.phone || hasBudget)) || (hasBudget && (l.problem?.length ?? 0) > 40)) return "HOT";
  if (l.email || l.phone) return "WARM";
  return "COLD";
}

export { firebaseEnabled };

const leadsCol = () => collection(getFirestore(firebaseApp()), "leads");

/** Public: save a lead from the chatbot or contact form. */
export async function submitLead(input: LeadInput, source: Lead["source"]) {
  const data = Object.fromEntries(
    LEAD_FIELDS.map((k) => [k, clean(input[k], k === "problem" ? 4000 : 200)])
  ) as Record<(typeof LEAD_FIELDS)[number], string>;
  if (!data.name) throw new Error("Name is required");
  if (!data.email && !data.phone) throw new Error("Email or phone is required");
  const now = new Date().toISOString();
  await addDoc(leadsCol(), {
    ...data, source, status: "new", notes: "", score: scoreLead(data), createdAt: now, updatedAt: now,
  });
}

/* ---------- Admin (requires signed-in admin, enforced by firestore.rules) ---------- */

export async function listLeads(): Promise<Lead[]> {
  const snap = await getDocs(query(leadsCol(), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ ...(d.data() as Omit<Lead, "id">), id: d.id }));
}

export async function updateLead(id: string, patch: Partial<Pick<Lead, "status" | "notes">>) {
  const updatedAt = new Date().toISOString();
  await updateDoc(doc(leadsCol(), id), { ...patch, updatedAt });
  return updatedAt;
}

export async function deleteLead(id: string) {
  await deleteDoc(doc(leadsCol(), id));
}
