"use client";

import { createElement, useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from "react";

type RevealProps = {
  as?: ElementType;
  className?: string;
  delay?: number;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
};

/** Fades + slides its content in the first time it scrolls into view. */
export default function Reveal({ as = "div", className = "", delay = 0, style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `reveal ${visible ? "in" : ""} ${className}`.trim(),
      style: { transitionDelay: `${delay}ms`, ...style },
      ...rest,
    },
    children
  );
}
