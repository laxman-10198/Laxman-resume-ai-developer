"use client";

import { useEffect, useRef } from "react";

/** Background neural-network canvas, cursor glow and scroll progress bar. */
export default function Effects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = matchMedia("(pointer: fine)").matches;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const LINK = 140 * dpr;
    let W = 0, H = 0, raf = 0;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      W = canvas.width = innerWidth * dpr;
      H = canvas.height = innerHeight * dpr;
      const count = Math.min(90, Math.floor((innerWidth * innerHeight) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35 * dpr, vy: (Math.random() - 0.5) * 0.35 * dpr,
        r: (Math.random() * 1.6 + 0.6) * dpr,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(52,124,148,${(1 - d / LINK) * 0.45})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < LINK * 1.4) {
          ctx.strokeStyle = `rgba(63,182,217,${(1 - md / (LINK * 1.4)) * 0.6})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = "rgba(63,182,217,.8)";
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr;
      if (finePointer && !reduce && glowRef.current) {
        glowRef.current.style.left = e.clientX + "px";
        glowRef.current.style.top = e.clientY + "px";
      }
    };
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (progressRef.current) progressRef.current.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
    };

    resize(); draw(); onScroll();
    addEventListener("resize", resize);
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <canvas id="network-bg" ref={canvasRef} aria-hidden="true" />
      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
    </>
  );
}
