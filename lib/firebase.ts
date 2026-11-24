import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";

/**
 * Firebase web config. These values are public by design (they identify the
 * project, they don't grant access). Access is controlled by firestore.rules.
 * Set them in .env.local for local dev and as GitHub repo variables for Pages.
 */
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseEnabled = Boolean(config.apiKey && config.projectId && config.appId);

export function firebaseApp(): FirebaseApp {
  if (!firebaseEnabled) throw new Error("Firebase is not configured");
  return getApps().length ? getApp() : initializeApp(config);
}
