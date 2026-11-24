export const profile = {
  name: "Laxman Poddar",
  email: "laxman.developer10198@gmail.com",
  phone: "+91 83198 06408",
  phoneRaw: "+918319806408",
  whatsapp: "918085431665",
  whatsappDisplay: "+91 80854 31665",
  linkedin: "https://www.linkedin.com/in/laxman-poddar-3a7644150/",
  github: "https://github.com/laxman-10198",
};

export const roles = [
  "AI Solution Architect · Agents & RAG",
  "AI/ML & MLOps Engineer",
  "Mobile Architect · Android, iOS & Cross-platform",
  "Full-Stack Engineer · Any stack, any database",
  "End-to-end product builder",
];

/** Business outcomes shown in the hero. */
export const impact = [
  { value: "Up to 60%", label: "lower maintenance cost" },
  { value: "Faster", label: "load times & smoother UX" },
  { value: "Scalable", label: "architecture that grows with you" },
  { value: "Quicker", label: "time to market" },
];

export const stats = [
  { value: 6, suffix: "+", label: "Years of core development" },
  { value: 15, suffix: "+", label: "App Store & Play releases" },
  { value: 1000, suffix: "+", label: "REST APIs integrated" },
  { value: 9, suffix: "", label: "Industries served" },
];

const dev = (name: string, file = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${file}.svg`;

export const marquee: { label: string; icon?: string; glyph?: string; invert?: boolean }[] = [
  { label: "Android", icon: dev("android") },
  { label: "Kotlin", icon: dev("kotlin") },
  { label: "Flutter", icon: dev("flutter") },
  { label: "Dart", icon: dev("dart") },
  { label: "React Native", icon: dev("react") },
  { label: "TypeScript", icon: dev("typescript") },
  { label: "Next.js", icon: dev("nextjs"), invert: true },
  { label: "Node.js", icon: dev("nodejs") },
  { label: "MongoDB", icon: dev("mongodb") },
  { label: "Firebase", icon: dev("firebase") },
  { label: "C++ / JNI", icon: dev("cplusplus") },
  { label: "Tailwind", icon: dev("tailwindcss") },
  { label: "Redux", icon: dev("redux") },
  { label: "Python", icon: dev("python") },
  { label: "TensorFlow", icon: dev("tensorflow") },
  { label: "PyTorch", icon: dev("pytorch") },
  { label: "Docker", icon: dev("docker") },
  { label: "Claude API", glyph: "✦" },
  { label: "AI Agents", glyph: "◎" },
  { label: "MCP", glyph: "◈" },
  { label: "RAG", glyph: "⌘" },
  { label: "MLOps", glyph: "∞" },
];

export const orbitOuter = [
  { alt: "Android", icon: dev("android") },
  { alt: "Flutter", icon: dev("flutter") },
  { alt: "React Native", icon: dev("react") },
  { alt: "Kotlin", icon: dev("kotlin") },
];
export const orbitInner: { alt: string; icon?: string; invert?: boolean }[] = [
  { alt: "Node.js", icon: dev("nodejs") },
  { alt: "MongoDB", icon: dev("mongodb") },
  { alt: "AI" },
  { alt: "Next.js", icon: dev("nextjs"), invert: true },
  { alt: "Firebase", icon: dev("firebase") },
];

export const aiLayers = [
  { icon: "📱", title: "Mobile Apps", sub: "Android · Flutter · React Native",
    text: "In-app AI assistants, voice and chat interfaces, smart forms, document and image understanding, and streamed responses rendered natively." },
  { icon: "🖥️", title: "Web Portals", sub: "Next.js · React",
    text: "AI copilots inside dashboards: natural-language reports, auto-summaries and agents that act on your data through server components and route handlers." },
  { icon: "⚙️", title: "Backend & Data", sub: "Any backend · SQL, NoSQL & vector databases",
    text: "RAG pipelines over your documents, embeddings, tool-use APIs that query live data, and guardrails with JSON-schema outputs." },
  { icon: "🧠", title: "AI Agents, ML & MLOps", sub: "Agents · RAG · TensorFlow Lite · MLflow",
    text: "Multi-step AI agents that plan and act with tools, on-device ML models in your apps, and MLOps pipelines to train, deploy, version and monitor models in production." },
  { icon: "🤖", title: "Engineering Workflow", sub: "Claude Code · MCP · Agents",
    text: "Agentic dev pipelines with subagents, skills, hooks and MCP servers (GitHub, Jira, Figma) to automate scaffolding, tests and PR review, so your team ships faster." },
];

export const aiCaps = [
  { title: "AI Agents", text: "Plan, decide & act with tools" },
  { title: "RAG", text: "Answers grounded in your docs" },
  { title: "AI / ML", text: "Custom & on-device models" },
  { title: "MLOps", text: "Train, deploy, monitor models" },
  { title: "Tool Use", text: "LLM calls your APIs & DB" },
  { title: "Streaming", text: "Real-time token UI" },
  { title: "Prompt Caching", text: "Lower latency & cost" },
  { title: "Structured Output", text: "Typed JSON, guardrails" },
  { title: "Evals", text: "Measured, reliable behaviour" },
];

export type ChatStep = { who: "user" | "tool" | "bot"; text: string };
export const chatScript: ChatStep[] = [
  { who: "user", text: "Which field tasks are overdue in the North zone today?" },
  { who: "tool", text: '⚙ tool_use → query_tasks({ zone: "North", status: "overdue", date: "today" })' },
  { who: "tool", text: "<span class='ok'>✓</span> MongoDB · 7 documents · 42ms" },
  { who: "bot", text: "<b>7 overdue tasks</b> in North zone:\n• 4 asset inspections (Team B)\n• 2 meter readings (Team D)\n• 1 site audit, worker offline since 10:40\n\nSuggest reassigning Team D's tasks to Ravi (2.1 km away)?" },
  { who: "user", text: "Yes, and check the SOP for offline workers." },
  { who: "tool", text: '⚙ rag_search → "offline worker escalation" · Atlas Vector Search' },
  { who: "bot", text: "Done ✓ Tasks reassigned.\nPer <b>SOP-12 §3</b>: try a call after 30 min offline, then notify the supervisor. I've drafted the alert." },
];

export const services = [
  { icon: "layers", title: "Solution Architecture",
    text: "System design, API contracts, MongoDB data modelling, security and a deployment strategy, documented before a line of code is written.",
    points: ["Mobile + Web + Backend blueprint", "Scalability & cost planning"] },
  { icon: "phone", title: "Native Android",
    text: "Kotlin, Jetpack Compose, MVVM/MVI and Clean Architecture. Performance, ANR and crash work, Media3/ExoPlayer, BLE, GPS and JNI/NDK.",
    points: ["Platform & system-level depth", "Android TV & OTT players"] },
  { icon: "flutter", title: "Cross-Platform Apps",
    text: "Flutter (BLoC, Riverpod) and React Native (TypeScript, Redux Toolkit): one codebase for Android and iOS, offline-first and real-time.",
    points: ["App Store & Play releases", "Native modules & platform channels"] },
  { icon: "monitor", title: "Web & Admin Portals",
    text: "Fast, SEO-ready web apps and admin portals in modern frameworks (Next.js, React and more). Live dashboards, task management, reporting and role-based access.",
    points: ["SEO-ready, fast, responsive", "Deployed on any cloud"] },
  { icon: "db", title: "Backend & APIs",
    text: "Secure, scalable APIs on the stack that fits your product, with any database: SQL, NoSQL or vector. Schema design, auth, role-based access, real-time and push notifications.",
    points: ["Any database: SQL, NoSQL, vector", "Secure, indexed, observable"] },
  { icon: "ai", title: "AI / LLM Integration", ai: true,
    text: "AI agents, RAG, LLM assistants (Claude, OpenAI, Gemini), custom AI/ML models and MLOps pipelines, plus Claude Code workflows for your team. AI that is grounded, safe and measurable.",
    points: ["AI Agents · RAG · Evals", "AI/ML models & MLOps", "MCP servers & agentic workflows"] },
];

export const process = [
  { title: "Discover", text: "Requirements, edge cases, success metrics" },
  { title: "Architect", text: "System design, AI strategy, estimates" },
  { title: "Build", text: "Sprints, demos, code reviews, tests" },
  { title: "Launch", text: "CI/CD, store releases, cloud deploy" },
  { title: "Scale", text: "Monitoring, RCA, iteration & support" },
];

export type Project = {
  id: "ai" | "rwm" | "vcloud" | "drlive" | "rpay";
  title: string;
  meta: [string, string];
  tags: string[];
  featured?: boolean;
  problem: string;
  solved: string[];
  stack: string[];
};

export const projects: Project[] = [
  { id: "ai", featured: true, title: "RWM AI Assistant & Agentic Engineering",
    meta: ["Enterprise AI", "Claude API + Claude Code"], tags: ["ai", "web", "realtime"],
    problem: "Managers spent hours digging through field data, SOPs and reports to answer simple operational questions.",
    solved: [
      "Built an AI assistant for the RWM portal and app on the Claude API. It uses tool calls to query MongoDB, generate reports and summarise field activity, with responses streamed live.",
      "Built RAG over SOPs and product documents with embeddings and MongoDB Atlas Vector Search.",
      "Wrote system prompts, few-shot examples and JSON output schemas with guardrails. Prompt caching cut latency and token cost.",
      "Set up Claude Code for the team: CLAUDE.md conventions, subagents, slash commands, hooks and MCP servers (GitHub, Jira, Figma).",
    ],
    stack: ["Claude API", "Anthropic SDK", "Tool Use", "Streaming", "Prompt Caching", "RAG", "Atlas Vector Search", "MCP", "Next.js", "Node.js"] },
  { id: "rwm", title: "RWM — Remote Workforce Management",
    meta: ["Enterprise / Field Ops", "Binary Semantics"], tags: ["mobile", "web", "realtime"],
    problem: "Field teams need task, location and status updates to stay reliable when connectivity drops and Android restricts background work.",
    solved: [
      "Offline-first data layer (Room / Hive / WatermelonDB) synced through WorkManager, so field data is never lost.",
      "Real-time channels over WebSocket/Socket.io and FCM, kept alive with Foreground Services.",
      "Modular MVVM + Clean Architecture, delivered as Android, Flutter and React Native clients, with a Next.js admin portal.",
      "Crash and ANR root-cause analysis with Crashlytics, unit tests and a CI/CD pipeline.",
    ],
    stack: ["Kotlin", "Flutter", "React Native", "Next.js", "Node.js", "MongoDB", "Socket.io", "FCM", "WorkManager"] },
  { id: "vcloud", title: "VCloud — Vehicle Tracking Platform",
    meta: ["Fleet / Telematics", "Binary Semantics"], tags: ["mobile", "realtime", "web"],
    problem: "Fleet operators need live vehicle positions, boundary alerts and historical trip replay in one dependable app.",
    solved: [
      "Real-time GPS tracking with live updates streamed over WebSocket.",
      "Geofencing to flag vehicles entering or leaving defined zones, plus BLE device integration.",
      "Trip playback that rebuilds historical routes, with a React.js fleet dashboard.",
    ],
    stack: ["React Native", "TypeScript", "Redux Saga", "GPS", "Geofencing", "WebSocket", "react-native-maps"] },
  { id: "drlive", title: "Dr.Live — Telemedicine Platform",
    meta: ["Healthcare", "Mobulous"], tags: ["mobile"],
    problem: "Doctor–patient consultations must keep audio and video stable through permission prompts, calls and other interruptions.",
    solved: [
      "Secure in-app video consultations (Agora SDK) with careful camera and microphone permission handling.",
      "Audio session lifecycle and interruption handling, so calls recover cleanly.",
      "Appointment scheduling and digital prescriptions, with Node.js/Express + MongoDB APIs.",
    ],
    stack: ["Flutter", "React Native", "Agora SDK", "Riverpod", "Firebase", "Node.js", "MongoDB"] },
  { id: "rpay", title: "RPay — Wallet, Recharge & Payments",
    meta: ["Fintech", "Mobulous"], tags: ["mobile", "realtime"],
    problem: "Wallet users expect recharges and bill payments to be instant, consistent and secure.",
    solved: [
      "Digital wallet with mobile recharge and bill payment flows.",
      "Real-time transaction updates and payment gateway integration (Razorpay, PayU, Paytm).",
      "Secure on-device storage for sensitive data.",
    ],
    stack: ["Flutter", "React Native", "Razorpay", "PayU", "Paytm", "Secure Storage"] },
];

export const filters = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web & Backend" },
  { id: "realtime", label: "Real-time" },
];

export const domains = ["E-commerce", "Healthcare", "CRM", "Job Portal", "Logistics", "Food Delivery", "GPS Tracking", "Social Media", "Fintech"];

export const skills = [
  { label: "LLM Engineering", note: "Production LLM features and agentic developer workflows.",
    items: ["Claude API", "Anthropic SDK", "Tool Use / Function Calling", "Streaming", "Structured JSON Outputs", "Prompt Caching", "RAG", "Embeddings", "MongoDB Atlas Vector Search", "AI Agents", "Claude Code", "MCP Servers", "Subagents & Skills", "Hooks", "Prompt Engineering", "Few-shot & XML Prompts", "Guardrails", "Prompt Evals", "GitHub Copilot", "Gemini", "Cursor"] },
  { label: "AI Agents & RAG", note: "Autonomous, tool-using agents and retrieval systems grounded in your data.",
    items: ["AI Agents", "Multi-agent Systems", "Agentic Workflows", "Tool Use / Function Calling", "MCP Servers", "LangChain", "LangGraph", "LlamaIndex", "RAG Pipelines", "Hybrid Search", "Chunking & Re-ranking", "Embeddings", "Vector DBs (Atlas, Pinecone, pgvector)", "Claude API", "OpenAI API", "Gemini API", "Guardrails", "Agent Evals"] },
  { label: "AI / ML & MLOps", note: "Models from experiment to production, monitored and versioned.",
    items: ["Python", "NumPy / Pandas", "scikit-learn", "TensorFlow", "TensorFlow Lite", "PyTorch", "ML Kit (on-device)", "Hugging Face", "Fine-tuning", "Model Serving (FastAPI)", "MLflow", "Docker", "Kubernetes", "CI/CD for ML", "Model Monitoring & Drift", "Data Pipelines", "AWS SageMaker", "Experiment Tracking"] },
  { label: "Native Android", note: "Platform-level Android, from Compose UI down to native C++.",
    items: ["Kotlin", "Java", "Jetpack Compose", "XML", "Coroutines", "Flow / StateFlow", "ViewModel", "Room", "WorkManager", "Navigation", "Paging", "DataStore", "Hilt / Dagger 2", "Binder / IPC", "AIDL", "Media3 / ExoPlayer", "Audio Focus", "MediaSession", "Android TV", "JNI / NDK", "C / C++", "BLE", "Google Maps"] },
  { label: "Flutter", note: "Scalable cross-platform apps from a single Dart codebase.",
    items: ["Flutter SDK", "Dart", "BLoC / Cubit", "Riverpod", "Provider", "GetX", "GoRouter", "Navigator 2.0", "Dio", "Retrofit (Dart)", "Hive", "Drift", "Freezed", "json_serializable", "get_it / injectable", "Platform Channels", "dart:ffi", "Isolates", "Custom Painters", "Animations", "Flavors"] },
  { label: "React Native", note: "TypeScript mobile apps on the New Architecture.",
    items: ["React Native CLI", "Expo", "TypeScript", "Redux Toolkit", "RTK Query", "Redux Saga / Thunk", "Zustand", "TanStack Query", "React Navigation", "Reanimated", "Hermes", "Fabric & TurboModules", "WatermelonDB", "MMKV", "Notifee", "react-native-maps", "react-native-ble-plx", "Kotlin Native Modules"] },
  { label: "Web & Backend", note: "Full-stack web portals and APIs.",
    items: ["Next.js App Router", "SSR / SSG", "React Server Components", "React.js", "Tailwind CSS", "Zod", "Node.js", "Express.js", "REST API Design", "JWT / OAuth", "RBAC", "Socket.io", "WebSocket", "MongoDB", "Mongoose", "Aggregation Pipelines", "Indexing", "MongoDB Atlas", "Vercel"] },
  { label: "Architecture", note: "Codebases that stay maintainable as teams and features grow.",
    items: ["Clean Architecture", "MVVM", "MVI", "MVP", "BLoC Pattern", "Repository Pattern", "SOLID", "Design Patterns", "Modularization", "System Design", "Offline-first Sync", "Real-time Systems", "Dependency Injection"] },
  { label: "Quality & Delivery", note: "Testing, CI/CD, and shipping signed builds to the stores.",
    items: ["JUnit", "MockK", "Espresso", "flutter_test", "bloc_test", "mocktail", "Golden Tests", "Jest", "RN Testing Library", "Detox", "Crashlytics", "LeakCanary", "Perfetto", "Android Profiler", "GitHub Actions", "Codemagic", "Fastlane", "EAS Build", "R8 / ProGuard", "Play Console", "App Store Connect"] },
  { label: "Cloud & Integrations", note: "Messaging, payments, media, and location services.",
    items: ["Firebase Auth", "Firestore", "FCM", "Remote Config", "Analytics", "Deep Linking", "Push & Local Notifications", "Agora SDK", "HLS", "Razorpay", "PayU", "Paytm", "GPS", "Geofencing", "Geolocator", "Google Maps SDK"] },
];

export const timeline = [
  { period: "01/2024 — Present", role: "Senior Software Engineer · Tech Lead", company: "Binary Semantics Limited",
    text: "I lead mobile architecture and AI integration for the RWM and VCloud platforms across Android, Flutter, React Native and a Next.js portal. I own architecture decisions and code reviews, mentor developers, and work with BA, QA and product teams on grooming, estimation and production issues.",
    tags: ["Tech Lead", "AI / Claude API", "Android", "Flutter", "React Native", "Next.js", "Node.js"] },
  { period: "06/2021 — 12/2023", role: "Software Engineer — Mobile", company: "Mobulous Technologies Pvt. Ltd.",
    text: "Built production healthcare and fintech apps (Dr.Live, RPay): video consultations, payment gateways, real-time transactions and modular, testable codebases.",
    tags: ["Kotlin", "Flutter", "React Native", "Agora", "Payments"] },
  { period: "01/2020 — 06/2021", role: "Software Trainee", company: "Ajath Infotech Pvt. Ltd.",
    text: "Learned the foundations of native Android, Flutter/Dart and React component UIs, and the full app development lifecycle.",
    tags: ["Java", "Android SDK", "Dart"] },
  { period: "2016 — 2020", role: "B.E. Computer Science Engineering", company: "SISTec, Bhopal", edu: true, tags: [] as string[], text: "" },
];

export const whyMe = [
  { title: "🧭 End-to-end ownership", text: "6+ years of core development. Requirements, architecture, build, release and production support, with one accountable owner." },
  { title: "✦ AI that works in production", text: "Grounded RAG, tool use, guardrails and evals, not demos that break with real users." },
  { title: "🔍 Production debugging", text: "Crashes, ANRs, threading and lifecycle issues traced to root cause and properly fixed." },
  { title: "⚡ Real-time systems", text: "WebSocket, FCM, GPS and fleet tracking, offline-first sync that never loses data." },
  { title: "👥 Team leadership", text: "Mentoring, code reviews, sprint planning, and clear communication with stakeholders." },
];

export const needs = [
  { value: "AI / LLM features", label: "AI / LLM", checked: true },
  { value: "AI agents / RAG", label: "AI Agents / RAG" },
  { value: "AI/ML & MLOps", label: "ML / MLOps" },
  { value: "Android app", label: "Android" },
  { value: "Flutter / React Native app", label: "Cross-platform" },
  { value: "Web portal", label: "Web" },
  { value: "Backend / APIs", label: "Backend" },
  { value: "Full solution", label: "Full solution" },
];
