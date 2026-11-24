# Laxman Poddar — AI Solution Architect Portfolio

I created this repository to host my resume website.

**Live site:** https://laxman-10198.github.io/Laxman-resume-ai-developer/

A portfolio built with **Next.js (App Router) + React + TypeScript**, exported as a static site and deployed to **GitHub Pages**. It includes:

- An animated, dark-themed portfolio: AI agents, RAG, AI/ML & MLOps, mobile and full-stack work
- An **AI hiring assistant chatbot** that collects a client's requirement step by step (name, company, need, engagement, work mode, budget, timeline, problem statement, contact)
- A private **lead dashboard** at `/admin` to follow up on leads (status, notes, email/WhatsApp/call, CSV export)

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: add Firebase config to save leads
npm run dev                  # http://localhost:3000
```

Edit the site content (projects, skills, contact numbers) in `lib/data.ts`.

## Deploy

Every push to `main` builds the site and deploys it to GitHub Pages via `.github/workflows/deploy.yml`.

The workflow publishes the build to the `gh-pages` branch, which GitHub Pages serves (Settings → Pages → Source: Deploy from a branch → `gh-pages` / root).

## Lead dashboard setup (Firebase)

Until Firebase is connected, the chatbot sends each requirement to WhatsApp and the contact form opens an email, so no lead is lost. To save leads and use `/admin`:

1. Create a free project at https://console.firebase.google.com.
2. **Build → Firestore Database → Create database** (production mode).
3. **Build → Authentication → Get started → Email/Password → Enable.**
   Then **Users → Add user** with your admin email and a strong password. Copy the user's **UID**.
4. **Authentication → Settings → User actions:** turn off "Enable create (sign-up)" so nobody else can register.
5. **Firestore → Rules:** paste the contents of `firestore.rules`, replace `REPLACE_WITH_YOUR_ADMIN_UID` with your UID, and click **Publish**.
6. **Project settings → General → Your apps → Add app → Web.** Copy `apiKey`, `authDomain`, `projectId` and `appId`.
7. **Authentication → Settings → Authorized domains:** add `laxman-10198.github.io`.
8. In this GitHub repo: **Settings → Secrets and variables → Actions → Variables → New repository variable**, and add:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
9. **Actions → Deploy to GitHub Pages → Run workflow.** Leads now save to Firestore, and you can sign in at `/admin/`.

The Firebase web config values are public identifiers, not secrets. Access is enforced by `firestore.rules`: anyone can submit a lead in the expected shape, and only your admin account can read, update or delete leads.

## Profile photo

Add a square photo at `public/assets/profile.jpg`. Until then the site shows an animated "LP" monogram.
