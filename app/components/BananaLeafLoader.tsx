"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useState } from "react";

const MIN_VISIBLE_MS = 1100;
const STAGGER_MS = 42;
const EXIT_DURATION_MS = 920;

/** Inline SVG: banana leaf silhouette (reused across canopy). */
function BananaLeafMark({ className }: { className?: string }) {
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
        fill="rgb(32 115 44 / 0.94)"
        stroke="rgb(160 210 120 / 0.4)"
        strokeWidth="0.8"
      />
      <path
        d="M50 18v210"
        stroke="rgb(110 170 80 / 0.5)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M50 48c-12 4-22 12-28 22M50 78c-14 6-26 18-32 32M50 108c-12 8-20 20-24 36M50 48c12 4 22 12 28 22M50 78c14 6 26 18 32 32M50 108c12 8 20 20 24 36"
        stroke="rgb(90 150 65 / 0.4)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

const LEAF_COUNT = 28;

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
    const col = i % 7;
    const row = Math.floor(i / 7);
    const leftPct = 3 + col * 13.8 + (i % 2) * 2.2;
    const topPct = 4 + row * 22 + ((i * 3) % 4) * 3.5;
    const nx = (leftPct / 100 - 0.5) * 2;
    const ny = (topPct / 100 - 0.5) * 2;
    const len = Math.hypot(nx, ny) || 0.35;
    const ux = nx / len;
    const uy = ny / len;
    const burst = 115 + (i % 6) * 12;
    const exitX = `${ux * burst}vw`;
    const exitY = `${uy * burst}vh`;
    out.push({
      leftPct,
      topPct,
      rot: -48 + (i * 19) % 96,
      scale: 0.26 + (i % 5) * 0.065,
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
  const [phase, setPhase] = useState<"show" | "fade" | "done">("show");

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

  if (phase === "done") return null;

  return (
    <div
      className={`banana-leaf-loader ${exiting ? "banana-leaf-loader--exiting" : ""} fixed inset-0 z-[9999]`}
      style={
        { "--leaf-exit-duration": `${EXIT_DURATION_MS}ms` } as CSSProperties
      }
      role="status"
      aria-live="polite"
      aria-busy={phase === "show"}
    >
      <span className="sr-only">Loading Masaledar Minds</span>
      <div className="banana-leaf-loader__bg" aria-hidden />
      <div className="banana-leaf-loader__mist" aria-hidden />

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
            <BananaLeafMark className="banana-leaf-loader__leaf-svg h-[min(28vw,7.5rem)] w-auto min-h-[4.5rem] drop-shadow-[0_6px_18px_rgb(0_0_0/0.5)] sm:h-[min(22vw,9rem)] sm:min-h-[5.5rem]" />
          </div>
        ))}
      </div>

      <div className="banana-leaf-loader__veil" aria-hidden />

      <p className="banana-leaf-loader__title">
        Masaledar Minds
      </p>
    </div>
  );
}
