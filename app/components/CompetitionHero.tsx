"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

/** Slim dish shape for hero carousel (no heavy story card). */
export type CompetitionHeroDish = {
  id: string;
  name: string;
  image: string;
  /** Shown on image overlay, e.g. "Signature Dish" */
  heroBadge: string;
};

const HERO_HEADLINE_LEAD = "We Don't Cook.";
const HERO_HEADLINE_TAIL = "We Engineer Taste.";
const HERO_SUBLINE =
  "A no-fire system built for taste, texture, and recall.";

const DIMENSIONS = [
  { icon: "🍽", label: "Taste" },
  { icon: "🧊", label: "Texture" },
  { icon: "🎯", label: "Recall" },
] as const;

const WHY_WE_WIN = [
  "Zero heat. Maximum flavor.",
  "Balanced nutrition + taste",
  "Designed for visual memory",
  "Fast, clean, innovative",
] as const;

/** Keep in sync with `useEffect` interval in `page.tsx` (hero + menu spotlight). */
export const COMPETITION_HERO_AUTO_MS = 4200;

const ctaPrimaryClass =
  "relative inline-flex min-h-[3rem] items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#ffb347] via-[#ff7a1c] to-[#ff5a6a] px-8 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-[#1a0505] shadow-[0_4px_0_rgb(120_30_10/35%),0_14px_36px_rgb(255_100_40/28%)] transition-shadow duration-200";

const ctaSecondaryClass =
  "inline-flex min-h-[3rem] items-center justify-center rounded-full border border-[rgb(255_200_130/40%)] bg-[rgb(255_255_255/6%)] px-7 text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-[rgb(255_240_224/95%)] backdrop-blur-sm transition-colors duration-200 hover:border-[rgb(255_215_150/55%)] hover:bg-[rgb(255_255_255/10%)]";

type CompetitionHeroProps = {
  dishes: CompetitionHeroDish[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  spotlightId?: string;
};

function HeroAmbientMotion() {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[min(70%,28rem)] w-[min(90%,42rem)] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(255_140_60/0.22),transparent_68%)] blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[min(60%,24rem)] w-[min(85%,36rem)] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(255_90_120/0.14),transparent_70%)] blur-3xl" />
      </div>
    );
  }
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute -left-1/4 top-0 h-[min(70%,28rem)] w-[min(90%,42rem)] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(255_140_60/0.26),transparent_68%)] blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, 12, 0], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[min(60%,24rem)] w-[min(85%,36rem)] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(255_90_120/0.18),transparent_70%)] blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, -10, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-[min(50%,18rem)] w-[min(70%,28rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(255_200_100/0.12),transparent_72%)] blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function CompetitionHero({
  dishes,
  activeIndex,
  onSelectIndex,
  autoRotate,
  onToggleAutoRotate,
  spotlightId = "spotlight",
}: CompetitionHeroProps) {
  const reduce = useReducedMotion();
  const dish = dishes[activeIndex];
  const indexLabel = `${String(activeIndex + 1).padStart(2, "0")} / ${String(dishes.length).padStart(2, "0")}`;

  return (
    <div className="relative w-full">
      <HeroAmbientMotion />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 pb-6 pt-2 sm:px-5 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:gap-y-6 lg:px-6">
        {/* Copy: first on mobile (order-1), right column on desktop */}
        <div className="order-1 flex flex-col gap-4 lg:order-2 lg:col-span-7 lg:gap-5">
          <div className="flex items-center gap-2">
            <span
              className="h-px w-8 bg-gradient-to-r from-[#ffc14a] to-transparent"
              aria-hidden
            />
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[rgb(255_210_150/0.78)]">
              Masaledar Minds · No-fire
            </p>
          </div>

          <h1
            id="page-title"
            className="font-[family-name:var(--font-playfair)] text-balance text-[clamp(2.1rem,5.2vw+0.2rem,3.85rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#fff9f2] drop-shadow-[0_2px_0_rgb(0_0_0/0.35)]"
          >
            <span className="block">{HERO_HEADLINE_LEAD}</span>
            <span className="mt-1 block bg-gradient-to-r from-[#ffd875] via-[#ffb347] to-[#ff9a6c] bg-clip-text font-[family-name:var(--font-playfair)] text-[clamp(1.45rem,3.8vw+0.15rem,2.75rem)] text-transparent drop-shadow-none">
              {HERO_HEADLINE_TAIL}
            </span>
          </h1>

          <p className="max-w-xl text-[0.95rem] font-semibold leading-snug tracking-[-0.01em] text-[rgb(255_236_220/0.92)] sm:text-base">
            {HERO_SUBLINE}
          </p>

          <ul
            className="flex flex-wrap gap-2"
            aria-label="Engineering dimensions"
          >
            {DIMENSIONS.map((dim) => (
              <li
                key={dim.label}
                className="inline-flex items-center gap-2 rounded-full border border-[rgb(255_200_130/0.28)] bg-[rgb(12_4_4/0.72)] px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[rgb(255_244_230/0.96)]"
              >
                <span className="text-base leading-none" aria-hidden>
                  {dim.icon}
                </span>
                {dim.label}
              </li>
            ))}
          </ul>

          <div
            className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-y border-[rgb(255_200_120/0.2)] py-4 font-[family-name:var(--font-playfair)] sm:gap-x-5"
            aria-label="Competition stats"
          >
            <span className="text-[clamp(1.75rem,3.5vw,2.35rem)] font-black tabular-nums tracking-tight text-[#ffc14a]">
              5
              <span className="ml-1.5 text-[0.55rem] font-bold uppercase tracking-[0.14em] text-[rgb(232_210_198/0.75)] sm:text-[0.62rem]">
                Dishes
              </span>
            </span>
            <span
              className="hidden text-[rgb(255_200_130/0.35)] sm:inline"
              aria-hidden
            >
              |
            </span>
            <span className="text-[clamp(1.75rem,3.5vw,2.35rem)] font-black tabular-nums tracking-tight text-[#ffc14a]">
              0
              <span className="ml-1.5 text-[0.55rem] font-bold uppercase tracking-[0.14em] text-[rgb(232_210_198/0.75)] sm:text-[0.62rem]">
                Heat
              </span>
            </span>
            <span
              className="hidden text-[rgb(255_200_130/0.35)] sm:inline"
              aria-hidden
            >
              |
            </span>
            <span className="text-[clamp(1.75rem,3.5vw,2.35rem)] font-black tabular-nums tracking-tight text-[#ffc14a]">
              3
              <span className="ml-1.5 text-[0.55rem] font-bold uppercase tracking-[0.14em] text-[rgb(232_210_198/0.75)] sm:text-[0.62rem]">
                Dimensions
              </span>
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <motion.a
              href={`#${spotlightId}`}
              className={ctaPrimaryClass}
              whileHover={
                reduce
                  ? undefined
                  : { scale: 1.03, boxShadow: "0 6px 0 rgb(120 30 10 / 35%), 0 20px 48px rgb(255 120 50 / 38%)" }
              }
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              Judge Our Craft
            </motion.a>
            <motion.a
              href={`#${spotlightId}`}
              className={ctaSecondaryClass}
              whileHover={reduce ? undefined : { scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              Experience The Menu
            </motion.a>
          </div>

          <button
            type="button"
            onClick={onToggleAutoRotate}
            className="self-start text-left text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[rgb(255_200_150/0.5)] underline decoration-[rgb(255_200_150/0.35)] underline-offset-[5px] transition-colors hover:text-[rgb(255_220_180/0.88)]"
          >
            {autoRotate ? "Pause dish rotation" : "Resume dish rotation"}
          </button>
        </div>

        {/* Image column: second on mobile, left on desktop */}
        <div className="order-2 w-full max-w-md shrink-0 justify-self-center lg:order-1 lg:col-span-5 lg:max-w-none lg:justify-self-stretch">
          <motion.div
            className="relative mx-auto w-full max-w-[20rem] lg:max-w-none"
            animate={reduce ? { y: 0 } : { y: [0, -7, 0] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <div className="relative overflow-hidden rounded-2xl border border-[rgb(255_210_150/0.28)] bg-[#0a0404] shadow-[0_24px_56px_rgb(0_0_0/0.48)]">
              <div className="relative aspect-[4/5] w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={dish.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.35 }}
                  >
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 38vw, 88vw"
                      priority={activeIndex === 0}
                    />
                  </motion.div>
                </AnimatePresence>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(5_1_1/0.92)] via-[rgb(5_1_1/0.15)] to-transparent"
                  aria-hidden
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-[rgb(255_210_150/0.85)]">
                    {indexLabel}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-playfair)] text-[clamp(1.05rem,2.4vw,1.35rem)] font-extrabold leading-tight tracking-[-0.02em] text-[#fff9f2]">
                    {dish.name}
                  </p>
                  <p className="mt-2 inline-flex rounded-full border border-[rgb(255_200_130/0.45)] bg-[rgb(8_2_2/0.65)] px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#ffd875] backdrop-blur-sm">
                    {dish.heroBadge}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div
            className="mt-3 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Select a dish"
          >
            {dishes.map((d, i) => (
              <motion.button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Show ${d.name}`}
                onClick={() => onSelectIndex(i)}
                className={`relative h-14 w-14 overflow-hidden rounded-xl border-2 transition-colors sm:h-16 sm:w-16 ${
                  i === activeIndex
                    ? "border-[#ffc14a] shadow-[0_0_0_1px_rgb(255_200_100/0.35)]"
                    : "border-[rgb(255_255_255/0.12)] hover:border-[rgb(255_200_120/0.45)]"
                }`}
                whileHover={reduce ? undefined : { scale: 1.06 }}
                whileTap={reduce ? undefined : { scale: 0.95 }}
              >
                <Image
                  src={d.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-2 w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <div
          className="rounded-2xl border border-[rgb(255_200_120/0.22)] bg-[linear-gradient(120deg,rgb(22_8_8/0.88),rgb(10_3_3/0.72))] px-4 py-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]"
          aria-labelledby="why-we-win-heading"
        >
          <p
            id="why-we-win-heading"
            className="mb-2 text-[0.62rem] font-extrabold uppercase tracking-[0.28em] text-[#ffd875]"
          >
            Why we win
          </p>
          <ul className="flex flex-nowrap gap-0 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1">
            {WHY_WE_WIN.map((line, i) => (
              <li
                key={line}
                className={`shrink-0 whitespace-nowrap px-3 text-[0.78rem] font-semibold text-[rgb(255_244_235/0.92)] first:pl-0 ${
                  i > 0 ? "border-l border-[rgb(255_200_130/0.22)]" : ""
                }`}
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
