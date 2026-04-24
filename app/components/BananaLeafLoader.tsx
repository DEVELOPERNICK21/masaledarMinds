"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const MIN_VISIBLE_MS = 1100;
const STAGGER_MS = 38;
const EXIT_DURATION_MS = 920;

/** Background canopy leaf — bold silhouette, no defs (many instances). */
function CanopyLeafMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M50 4c18 8 32 28 38 52 6 28 4 58-8 88-8 22-20 42-38 58-18-16-30-36-38-58-12-30-14-60-8-88C12 32 26 12 50 4Z"
        fill="rgb(28 105 42 / 0.92)"
        stroke="rgb(140 200 95 / 0.45)"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <path
        d="M50 18v210"
        stroke="rgb(110 170 80 / 0.5)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M50 48c-12 4-22 12-28 22M50 78c-14 6-26 18-32 32M50 108c-12 8-20 20-24 36M50 48c12 4 22 12 28 22M50 78c14 6 26 18 32 32M50 108c12 8 20 20 24 36"
        stroke="rgb(85 150 70 / 0.4)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Large center leaf — proven silhouette + gradients (single instance). */
function HeroBananaLeafSvg({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gMain = `${uid}-leaf-main`;
  const gHi = `${uid}-leaf-hi`;
  const gVein = `${uid}-vein`;
  const leafD =
    "M50 4c18 8 32 28 38 52 6 28 4 58-8 88-8 22-20 42-38 58-18-16-30-36-38-58-12-30-14-60-8-88C12 32 26 12 50 4Z";

  return (
    <svg
      className={className}
      viewBox="0 0 100 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={gMain} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#143d22" />
          <stop offset="40%" stopColor="#1f6b34" />
          <stop offset="78%" stopColor="#2a8f42" />
          <stop offset="100%" stopColor="#164a28" />
        </linearGradient>
        <radialGradient id={gHi} cx="38%" cy="22%" r="62%">
          <stop offset="0%" stopColor="rgb(130 235 155 / 0.42)" />
          <stop offset="50%" stopColor="rgb(45 115 58 / 0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id={gVein} x1="50%" y1="8%" x2="50%" y2="92%">
          <stop offset="0%" stopColor="rgb(210 255 195 / 0.55)" />
          <stop offset="40%" stopColor="rgb(95 165 78 / 0.3)" />
          <stop offset="100%" stopColor="rgb(35 85 48 / 0.4)" />
        </linearGradient>
      </defs>
      <path
        d={leafD}
        fill={`url(#${gMain})`}
        stroke="rgb(160 215 120 / 0.55)"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path d={leafD} fill={`url(#${gHi})`} />
      <path
        d="M50 48c-12 4-22 12-28 22M50 78c-14 6-26 18-32 32M50 108c-12 8-20 20-24 36M50 48c12 4 22 12 28 22M50 78c14 6 26 18 32 32M50 108c12 8 20 20 24 36"
        stroke={`url(#${gVein})`}
        strokeWidth="0.95"
        strokeLinecap="round"
      />
      <path
        d="M50 18v210"
        stroke="rgb(210 255 195 / 0.4)"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="banana-leaf-loader__hero-midrib"
      />
    </svg>
  );
}

const LEAF_COUNT = 32;

type LeafSpec = {
  leftPct: number;
  topPct: number;
  rot: number;
  scale: number;
  delayMs: number;
  exitX: string;
  exitY: string;
};

function buildCanopy(): LeafSpec[] {
  const out: LeafSpec[] = [];
  for (let i = 0; i < LEAF_COUNT; i += 1) {
    const col = i % 8;
    const row = Math.floor(i / 8);
    const leftPct = 2 + col * 11.5 + (i % 2) * 2.8;
    const topPct = 2 + row * 18 + ((i * 3) % 4) * 3.2;
    const nx = leftPct / 100 - 0.5;
    const ny = topPct / 100 - 0.5;
    const len = Math.hypot(nx, ny) || 0.35;
    const ux = nx / len;
    const uy = ny / len;
    const burst = 118 + (i % 7) * 11;
    const exitX = `${ux * burst}vw`;
    const exitY = `${uy * burst}vh`;
    out.push({
      leftPct,
      topPct,
      rot: -52 + (i * 17) % 104,
      scale: 0.36 + (i % 6) * 0.08,
      delayMs: i * STAGGER_MS,
      exitX,
      exitY,
    });
  }
  return out;
}

const CANOPY = buildCanopy();
const UNMOUNT_MS =
  (LEAF_COUNT - 1) * STAGGER_MS + EXIT_DURATION_MS + 120;

export function BananaLeafLoader() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"show" | "fade" | "done">("show");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const beginFade = useCallback(() => {
    setPhase((p) => (p === "done" ? p : "fade"));
  }, []);

  useEffect(() => {
    const started = performance.now();

    const scheduleFade = () => {
      const elapsed = performance.now() - started;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => beginFade(), wait);
    };

    if (document.readyState === "complete") {
      scheduleFade();
      return;
    }

    window.addEventListener("load", scheduleFade, { once: true });
    return () => window.removeEventListener("load", scheduleFade);
  }, [beginFade]);

  useEffect(() => {
    if (phase !== "fade") return;
    const id = window.setTimeout(() => setPhase("done"), UNMOUNT_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  const exiting = phase === "fade";

  const onOverlayPointerMove = (e: React.PointerEvent) => {
    if (reduce || exiting) return;
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const nx = e.clientX / w - 0.5;
    const ny = e.clientY / h - 0.5;
    setTilt({ x: ny * -20, y: nx * 26 });
  };

  const onOverlayPointerLeave = () => {
    if (reduce) return;
    setTilt({ x: 0, y: 0 });
  };

  if (phase === "done") return null;

  return (
    <div
      className={`banana-leaf-loader ${exiting ? "banana-leaf-loader--exiting" : ""} fixed inset-0 z-[9999] flex h-[100dvh] max-h-[100dvh] min-h-[100dvh] w-full min-w-0 max-w-none flex-col overflow-hidden overscroll-none`}
      style={
        {
          "--leaf-exit-duration": `${EXIT_DURATION_MS}ms`,
        } as CSSProperties
      }
      role="status"
      aria-live="polite"
      aria-busy={phase === "show"}
      onPointerMove={onOverlayPointerMove}
      onPointerLeave={onOverlayPointerLeave}
      onPointerCancel={onOverlayPointerLeave}
    >
      <span className="sr-only">Loading Masaledar Minds</span>
      <div className="banana-leaf-loader__bg" aria-hidden />
      <div className="banana-leaf-loader__mist" aria-hidden />
      <div className="banana-leaf-loader__mist banana-leaf-loader__mist--drift" aria-hidden />
      <div className="banana-leaf-loader__aurora" aria-hidden />

      <div className="banana-leaf-loader__canopy" aria-hidden>
        {CANOPY.map((leaf, i) => (
          <div
            key={i}
            className="banana-leaf-loader__leaf-wrap"
            style={
              {
                left: `${leaf.leftPct}%`,
                top: `${leaf.topPct}%`,
                "--leaf-rot": `${leaf.rot}deg`,
                "--leaf-sc": String(leaf.scale),
                "--leaf-exit-x": leaf.exitX,
                "--leaf-exit-y": leaf.exitY,
                "--leaf-delay": `${leaf.delayMs}ms`,
              } as CSSProperties
            }
          >
            <CanopyLeafMark className="banana-leaf-loader__leaf-svg h-[min(42vw,11rem)] w-auto min-h-[5.5rem] drop-shadow-[0_8px_22px_rgb(0_0_0/0.55)] sm:h-[min(36vw,13rem)] sm:min-h-[6.5rem]" />
          </div>
        ))}
      </div>

      <div className="banana-leaf-loader__hero-stage">
        <motion.div
          className="banana-leaf-loader__hero-ring"
          animate={
            reduce
              ? {}
              : {
                  scale: [1, 1.03, 1],
                  opacity: [0.45, 0.7, 0.45],
                }
          }
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden
        />
        <motion.div
          className="banana-leaf-loader__hero-hit"
          aria-hidden
          style={{ perspective: 560 }}
          animate={
            reduce
              ? { rotateX: 0, rotateY: 0, scale: 1 }
              : { rotateX: tilt.x, rotateY: tilt.y, scale: 1 }
          }
          transition={
            reduce
              ? { duration: 0.2 }
              : {
                  type: "spring",
                  stiffness: 88,
                  damping: 16,
                  mass: 0.85,
                }
          }
          whileTap={reduce ? undefined : { scale: 0.94 }}
        >
          <HeroBananaLeafSvg className="banana-leaf-loader__hero-svg pointer-events-none h-[min(68vh,28rem)] w-[min(92vw,24rem)] max-w-[96vw] select-none sm:h-[min(64vh,32rem)] sm:w-[min(78vw,28rem)]" />
        </motion.div>
      </div>

      <div className="banana-leaf-loader__veil" aria-hidden />

      <p className="banana-leaf-loader__title mt-auto">Masaledar Minds</p>
    </div>
  );
}
