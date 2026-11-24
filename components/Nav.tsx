"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#ai", label: "AI Solutions" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      let current = "";
      document.querySelectorAll<HTMLElement>("main section[id]").forEach((s) => {
        if (y + 140 >= s.offsetTop) current = s.id;
      });
      setActive(current);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand" aria-label="Laxman Poddar home">
          <span className="brand-mark">LP</span>
          <span className="brand-text">Laxman<span className="dot">.</span>ai</span>
        </a>
        <nav className={`nav-links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href.slice(1) ? "active" : ""}>{l.label}</a>
          ))}
          <a href="#contact" className="btn btn-sm btn-primary">Hire Me</a>
        </nav>
        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
