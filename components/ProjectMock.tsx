import type { Project } from "@/lib/data";

/** Animated SVG illustration for each project card. */
export default function ProjectMock({ id }: { id: Project["id"] }) {
  switch (id) {
    case "ai":
      return (
        <svg viewBox="0 0 320 200" className="mock">
          <rect x="10" y="10" width="300" height="180" rx="12" className="m-frame" />
          <rect x="10" y="10" width="300" height="24" rx="12" className="m-bar" />
          <circle cx="26" cy="22" r="4" fill="#ff5f56" /><circle cx="40" cy="22" r="4" fill="#ffbd2e" /><circle cx="54" cy="22" r="4" fill="#27c93f" />
          <rect x="160" y="46" width="135" height="22" rx="10" className="m-user" />
          <rect x="25" y="78" width="170" height="16" rx="8" className="m-tool" />
          <text x="35" y="90" className="m-mono">⚙ query_mongodb()</text>
          <rect x="25" y="102" width="220" height="50" rx="10" className="m-bot" />
          <rect x="37" y="114" width="150" height="6" rx="3" className="m-line" />
          <rect x="37" y="126" width="190" height="6" rx="3" className="m-line" />
          <rect x="37" y="138" width="110" height="6" rx="3" className="m-line shimmer" />
          <rect x="25" y="162" width="270" height="18" rx="9" className="m-input" />
        </svg>
      );
    case "rwm":
      return (
        <svg viewBox="0 0 320 200" className="mock">
          <rect x="40" y="12" width="96" height="176" rx="14" className="m-frame" />
          <rect x="52" y="30" width="72" height="10" rx="5" className="m-accent" />
          <rect x="52" y="50" width="72" height="26" rx="6" className="m-bot" /><circle cx="62" cy="63" r="5" className="m-ok" />
          <rect x="52" y="82" width="72" height="26" rx="6" className="m-bot" /><circle cx="62" cy="95" r="5" className="m-ok" />
          <rect x="52" y="114" width="72" height="26" rx="6" className="m-bot" /><circle cx="62" cy="127" r="5" className="m-warn" />
          <rect x="160" y="30" width="140" height="140" rx="10" className="m-frame" />
          <rect x="172" y="44" width="60" height="8" rx="4" className="m-line" />
          <rect x="172" y="120" width="16" height="36" rx="3" className="m-accent bar-grow" />
          <rect x="194" y="100" width="16" height="56" rx="3" className="m-accent bar-grow" />
          <rect x="216" y="86" width="16" height="70" rx="3" className="m-accent bar-grow" />
          <rect x="238" y="72" width="16" height="84" rx="3" className="m-accent bar-grow" />
          <rect x="260" y="64" width="16" height="92" rx="3" className="m-accent bar-grow" />
          <path d="M136 100 C 146 100, 150 100, 160 100" className="m-sync" />
        </svg>
      );
    case "vcloud":
      return (
        <svg viewBox="0 0 320 200" className="mock">
          <rect x="10" y="10" width="300" height="180" rx="12" className="m-map" />
          <g className="m-grid"><path d="M10 60 H310 M10 110 H310 M10 160 H310 M80 10 V190 M160 10 V190 M240 10 V190" /></g>
          <circle cx="210" cy="80" r="40" className="m-fence" />
          <path id="vc-route" d="M40 165 C 90 150, 100 90, 150 105 S 220 60, 280 45" className="m-route" />
          <circle r="7" className="m-car">
            <animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#vc-route" /></animateMotion>
          </circle>
          <circle cx="40" cy="165" r="5" className="m-ok" />
          <circle cx="280" cy="45" r="5" className="m-warn" />
        </svg>
      );
    case "drlive":
      return (
        <svg viewBox="0 0 320 200" className="mock">
          <rect x="20" y="16" width="180" height="168" rx="12" className="m-frame" />
          <circle cx="110" cy="80" r="28" className="m-accent" />
          <rect x="70" y="118" width="80" height="8" rx="4" className="m-line" />
          <rect x="140" y="130" width="50" height="44" rx="8" className="m-bot" />
          <circle cx="80" cy="160" r="10" fill="#e5484d" /><circle cx="110" cy="160" r="10" className="m-ok" />
          <rect x="215" y="16" width="90" height="168" rx="12" className="m-frame" />
          <rect x="227" y="32" width="66" height="8" rx="4" className="m-accent" />
          <rect x="227" y="50" width="66" height="5" rx="2.5" className="m-line" />
          <rect x="227" y="62" width="50" height="5" rx="2.5" className="m-line" />
          <rect x="227" y="74" width="58" height="5" rx="2.5" className="m-line" />
          <text x="232" y="120" className="m-rx">Rx</text>
          <path d="M110 60 v40 M90 80 h40" className="m-pulse-line" />
        </svg>
      );
    case "rpay":
      return (
        <svg viewBox="0 0 320 200" className="mock">
          <defs>
            <linearGradient id="rp-card" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#10799c" /><stop offset="1" stopColor="#0a4457" />
            </linearGradient>
          </defs>
          <rect x="30" y="30" width="170" height="104" rx="14" fill="url(#rp-card)" className="m-card" />
          <rect x="46" y="50" width="26" height="18" rx="4" fill="#e8c46a" />
          <rect x="46" y="96" width="110" height="8" rx="4" fill="rgba(255,255,255,.6)" />
          <rect x="46" y="112" width="60" height="6" rx="3" fill="rgba(255,255,255,.35)" />
          <rect x="215" y="30" width="85" height="30" rx="8" className="m-bot" /><circle cx="230" cy="45" r="6" className="m-ok" />
          <rect x="215" y="68" width="85" height="30" rx="8" className="m-bot" /><circle cx="230" cy="83" r="6" className="m-ok" />
          <rect x="215" y="106" width="85" height="30" rx="8" className="m-bot" /><circle cx="230" cy="121" r="6" className="m-warn" />
          <rect x="30" y="148" width="270" height="34" rx="10" className="m-frame" />
          <rect x="44" y="160" width="80" height="10" rx="5" className="m-accent" />
        </svg>
      );
  }
}
