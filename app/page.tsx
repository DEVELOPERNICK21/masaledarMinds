"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Dish = {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  emoji: string;
  tag: string;
  ingredients: string[];
  highlight: string;
};

const COMPETITION_NAME = "Free Fire Masterchef Competition";
const TAGLINE =
  "Warning: Humari dish addictive hai… zimmedari aapki!";
const MASALEDAR_MINDS_SECTION_ID = "masaledar-minds";
const MASALEDAR_MINDS_TAGLINE =
  "The people adding flavor to every experience";

const dishes: Dish[] = [
  {
    id: "chilled-celebration-platter",
    name: "Chilled Celebration Platter",
    subtitle:
      "A refreshing combination of cheese, fruits, and chilled elements",
    image: "/images/dish-chilled-celebration.jpeg",
    emoji: "🟢",
    tag: "Starter",
    ingredients: ["Cheese", "Fruits", "Chilled Elements"],
    highlight:
      "Perfect balance of sweet, tangy, and creamy flavors.",
  },
  {
    id: "temple-style-bajeel-prasadam",
    name: "Temple-Style Bajeel Prasadam",
    subtitle: "Inspired by traditional temple offerings",
    image: "/images/dish-bajeel-prasadam.png",
    emoji: "🟡",
    tag: "Traditional Sweet",
    ingredients: ["Poha", "Jaggery", "Coconut", "Ghee"],
    highlight:
      "Rich, flavorful experience made entirely without fire.",
  },
  {
    id: "royal-mango-elixir",
    name: "Royal Mango Elixir",
    subtitle: "A smooth blend of mango and lassi with dry fruits",
    image: "/images/dish-royal-mango-elixir.jpeg",
    emoji: "🟠",
    tag: "Beverage",
    ingredients: ["Mango", "Lassi", "Dry Fruits"],
    highlight: "Refreshing, rich, and perfectly balanced.",
  },
  {
    id: "citrus-fusion-bowl",
    name: "Citrus Fusion Bowl",
    subtitle: "A vibrant mix of fruits with subtle seasoning",
    image: "/images/dish-citrus-fusion.jpeg",
    emoji: "🔵",
    tag: "Fresh Bowl",
    ingredients: ["Seasonal Fruits", "Citrus Notes", "Light Seasoning"],
    highlight: "Burst of freshness with layered flavors.",
  },
  {
    id: "power-protein-bites",
    name: "Power Protein Bites",
    subtitle: "A modern, nutritious snack for health and taste",
    image: "/images/dish-power-protein.jpeg",
    emoji: "🟣",
    tag: "Protein Snack",
    ingredients: ["Paneer", "Fresh Greens", "Seasoning"],
    highlight:
      "Designed to deliver nutrition, texture, and flavor.",
  },
];

const scorePillars = [
  "Temple-style inspiration with modern plating",
  "Taste balance across sweet, savory, fresh and protein-rich",
  "Texture layering for better mouthfeel and recall",
  "100% no-fire preparation",
];

const prasadamSteps = [
  "Mix poha, jaggery, and grated coconut evenly.",
  "Fold in ghee and cardamom for aroma and richness.",
  "Add roasted sesame and dry fruits for texture.",
  "Rest briefly and plate neatly with garnish.",
];

const standOutPoints = [
  {
    title: "Complete Themed Experience",
    desc: "A full South Indian themed experience, not just separate dishes.",
    icon: "💡",
  },
  {
    title: "Balanced Menu",
    desc: "Sweet, savory, refreshing, and protein-rich on one table.",
    icon: "⚖️",
  },
  {
    title: "Tradition + Modern Presentation",
    desc: "Traditional inspiration with clean, modern styling.",
    icon: "🏛️",
  },
  {
    title: "100% No-Fire Preparation",
    desc: "No cooking flame, without compromising taste.",
    icon: "🌿",
  },
  {
    title: "Visual + Texture + Nutrition",
    desc: "Appeal, mouthfeel, and nutrition together.",
    icon: "✨",
  },
];

const signatureFocus = [
  "Poha + jaggery + coconut: traditional flavor core",
  "Ghee and cardamom: richness and aroma",
  "Sesame + dry fruits: texture and finish",
];

const dishReadGuide = ["Select a dish", "See the plate", "Read key flavors"];

const heroTitleLastSpace = COMPETITION_NAME.lastIndexOf(" ");
const heroTitleLead =
  heroTitleLastSpace > 0
    ? COMPETITION_NAME.slice(0, heroTitleLastSpace)
    : COMPETITION_NAME;
const heroTitleTail =
  heroTitleLastSpace > 0
    ? COMPETITION_NAME.slice(heroTitleLastSpace + 1)
    : "";

function TypewriterTagline() {
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setText(TAGLINE.slice(0, i));
      if (i >= TAGLINE.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="hero-tagline" aria-label={TAGLINE}>
      {text}
      <span className="hero-tagline-cursor" aria-hidden>
        |
      </span>
    </p>
  );
}

const HERO_DISH_INTERVAL_MS = 3200;

function HeroDishPopper() {
  const [index, setIndex] = useState(0);
  const dish = dishes[index];

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % dishes.length);
    }, HERO_DISH_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <aside
      className="hero-dish-stage"
      aria-label="Menu preview, dishes rotate"
      style={
        { "--hero-dish-ms": `${HERO_DISH_INTERVAL_MS}ms` } as React.CSSProperties
      }
    >
      <div className="hero-dish-stage-header">
        <span className="hero-dish-stage-kicker">Live preview</span>
        <span className="hero-dish-stage-title">On the pass</span>
      </div>
      <div key={dish.id} className="hero-dish-floating-card">
        <div className="hero-dish-floating-glow" aria-hidden />
        <div className="hero-dish-floating-frame">
          <div className="hero-dish-floating-media">
            <Image
              src={dish.image}
              alt={dish.name}
              width={640}
              height={360}
              className="hero-dish-floating-image"
              sizes="(min-width: 1280px) 380px, (min-width: 768px) 42vw, 100vw"
              priority={index === 0}
            />
          </div>
          <div className="hero-dish-floating-body">
            <p className="hero-dish-floating-tag">{dish.tag}</p>
            <p className="hero-dish-floating-name">{dish.name}</p>
            <p className="hero-dish-floating-sub">{dish.subtitle}</p>
          </div>
        </div>
        <div className="hero-dish-progress" aria-hidden>
          <div key={dish.id} className="hero-dish-progress-fill" />
        </div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Now showing: {dish.name}
      </p>
      <div className="hero-dish-dots" role="tablist" aria-label="Choose dish">
        {dishes.map((d, i) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${d.name}`}
            className={`hero-dish-dot ${i === index ? "hero-dish-dot--active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </aside>
  );
}

export default function Home() {
  const [selectedDishId, setSelectedDishId] = useState(dishes[0].id);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const selectedDish = useMemo(
    () => dishes.find((dish) => dish.id === selectedDishId) ?? dishes[0],
    [selectedDishId],
  );
  const selectedDishIndex = dishes.findIndex(
    (dish) => dish.id === selectedDish.id,
  );

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      const next = (selectedDishIndex + 1) % dishes.length;
      setSelectedDishId(dishes[next].id);
      setShowAllIngredients(false);
    }, 3200);
    return () => clearInterval(timer);
  }, [isAutoPlay, selectedDishIndex]);

  const visibleIngredients = showAllIngredients
    ? selectedDish.ingredients
    : selectedDish.ingredients.slice(0, 4);

  return (
    <div className="cinema-shell relative min-h-screen overflow-hidden text-[var(--hero-text)]">
      <div className="cinema-noise" aria-hidden />
      <div className="cinema-vignette" aria-hidden />
      <div className="cinema-ambient amber" />
      <div className="cinema-ambient cherry" />
      <div className="cinema-ambient ember" />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="brand-fixed site-brand-pill">
        <Image
          src="/images/company-dark-logo.webp"
          alt="Masaledar Minds"
          width={120}
          height={40}
          className="site-brand-logo"
          priority
        />
        <span className="site-brand-text">Team Masaledar Minds</span>
      </header>

      <nav className="scene-nav section-nav-rail" aria-label="On this page">
        <a href="#hero" className="section-nav-link">
          <span className="section-nav-num">01</span>
          <span className="section-nav-label">Hero</span>
        </a>
        <a
          href={`#${MASALEDAR_MINDS_SECTION_ID}`}
          className="section-nav-link"
        >
          <span className="section-nav-num">02</span>
          <span className="section-nav-label">Masaledar Minds</span>
        </a>
        <a href="#spotlight" className="section-nav-link">
          <span className="section-nav-num">03</span>
          <span className="section-nav-label">Dishes</span>
        </a>
        <a href="#signature" className="section-nav-link">
          <span className="section-nav-num">04</span>
          <span className="section-nav-label">Signature</span>
        </a>
        <a href="#standout" className="section-nav-link">
          <span className="section-nav-num">05</span>
          <span className="section-nav-label">Stand out</span>
        </a>
      </nav>

      <main
        id="main-content"
        tabIndex={-1}
        className="scroll-main relative h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden outline-none"
      >
        <section
          id="hero"
          className="cinema-scene hero-scene section-pad snap-start"
        >
          <div className="cinema-inner hero-experience-grid">
            <div className="hero-copy-panel">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-line" aria-hidden />
                <span>Competition entry</span>
              </div>
              <p className="hero-team-title">Team Masaledar Minds</p>
              <h1 id="page-title" className="hero-competition-title text-balance">
                <span className="hero-competition-primary">{heroTitleLead}</span>
                {heroTitleTail ? (
                  <span className="hero-competition-secondary">
                    {heroTitleTail}
                  </span>
                ) : null}
              </h1>
              <div className="hero-tagline-well">
                <TypewriterTagline />
              </div>
              <p className="hero-lede type-body max-w-[40rem] text-pretty text-[var(--hero-muted)]">
                Five no-fire dishes engineered for clarity, contrast, and judge
                recall—taste, texture, and plating in one cohesive story.
              </p>
              <ul className="hero-stat-row" aria-label="Quick facts">
                <li className="hero-stat-card">
                  <span className="hero-stat-value">5</span>
                  <span className="hero-stat-label">Dishes</span>
                </li>
                <li className="hero-stat-card">
                  <span className="hero-stat-value">0</span>
                  <span className="hero-stat-label">Heat used</span>
                </li>
                <li className="hero-stat-card">
                  <span className="hero-stat-value">100%</span>
                  <span className="hero-stat-label">No-fire</span>
                </li>
              </ul>
              <div className="hero-actions">
                <a
                  href={`#${MASALEDAR_MINDS_SECTION_ID}`}
                  className="hero-cta-primary"
                >
                  Masaledar Minds
                </a>
                <a href="#spotlight" className="hero-cta-secondary">
                  Explore dishes
                </a>
              </div>
            </div>
            <HeroDishPopper />
          </div>
        </section>

        <section
          id={MASALEDAR_MINDS_SECTION_ID}
          className="cinema-scene section-pad snap-start"
          aria-labelledby="masaledar-minds-heading"
        >
          <div className="cinema-inner magic-minds-inner">
            <p className="magic-minds-eyebrow">02 — Masaledar Minds</p>
            <h2
              id="masaledar-minds-heading"
              className="magic-minds-heading type-heading"
            >
              Masaledar Minds
            </h2>
            <p className="magic-minds-tagline">{MASALEDAR_MINDS_TAGLINE}</p>
            <div className="magic-minds-frame">
              <Image
                src="/images/magic-minds-masaledar.jpeg"
                alt="Masaledar Minds"
                width={900}
                height={900}
                className="magic-minds-image"
                sizes="(min-width: 768px) 520px, 88vw"
                priority
              />
            </div>
          </div>
        </section>

        <section id="spotlight" className="cinema-scene section-pad snap-start">
          <div className="cinema-inner space-y-8">
            <header className="section-intro">
              <p className="type-kicker text-xs text-[var(--hero-gold)]">
                03 — Dishes
              </p>
              <h2 className="section-title type-heading text-4xl font-black text-white sm:text-5xl">
                Dish detail explorer
              </h2>
              <div className="clarity-row mt-3">
                {dishReadGuide.map((point) => (
                  <p key={point} className="clarity-chip">
                    {point}
                  </p>
                ))}
              </div>
            </header>
            <div className="spotlight-grid">
              <aside className="spotlight-rail layout-panel !max-w-none">
                <p className="type-kicker text-xs text-[var(--hero-gold)]">
                  Menu
                </p>
                <div className="mt-3 space-y-1">
                  {dishes.map((dish) => (
                    <button
                      key={dish.id}
                      type="button"
                      onClick={() => {
                        setSelectedDishId(dish.id);
                        setIsAutoPlay(false);
                        setShowAllIngredients(false);
                      }}
                      className={`rail-item ${selectedDish.id === dish.id ? "active" : ""}`}
                    >
                      <span>{dish.name}</span>
                      <span>{dish.emoji}</span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setIsAutoPlay((p) => !p)}
                  className="scene-toggle mt-4 w-full"
                >
                  {isAutoPlay ? "Pause rotation" : "Resume rotation"}
                </button>
              </aside>
              <div className="spotlight-image-wrap min-h-0">
                <Image
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  width={1600}
                  height={900}
                  sizes="(min-width: 1280px) 42vw, 90vw"
                  className="spotlight-image"
                />
              </div>
              <article className="scene-block spotlight-copy layout-panel !max-w-none">
                <p className="type-kicker text-xs text-rose-300/90">
                  Spotlight
                </p>
                <h3 className="section-title type-heading mt-1 text-3xl font-black leading-tight text-white sm:text-4xl">
                  {selectedDish.name}
                </h3>
                <p className="type-body mt-2 text-[var(--hero-muted)]">
                  {selectedDish.subtitle}
                </p>
                <p className="type-caption mt-2 text-[var(--hero-gold)]">
                  {selectedDish.highlight}
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <p className="type-kicker text-[10px] text-[var(--hero-muted)]">
                    Key ingredients
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAllIngredients((p) => !p)}
                    className="scene-toggle"
                  >
                    {showAllIngredients ? "Top 4" : "Show all"}
                  </button>
                </div>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {visibleIngredients.map((ingredient) => (
                    <li key={ingredient} className="ingredient-chip">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="signature" className="cinema-scene section-pad snap-start">
          <div className="cinema-inner space-y-8">
            <header className="section-intro">
              <p className="type-kicker text-xs text-[var(--hero-gold)]">
                04 — Signature
              </p>
              <h2 className="section-title type-heading text-4xl font-black text-white sm:text-5xl">
                Temple-style Bajeel Prasadam
              </h2>
              <p className="type-body mt-2 max-w-2xl text-[var(--hero-muted)]">
                The anchor dish: a clear story, strong plating, no flame.
              </p>
            </header>
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <article className="layout-panel space-y-4">
                <div className="overflow-hidden rounded-2xl border border-[var(--hero-card-border)]">
                  <Image
                    src="/images/dish-bajeel-prasadam.png"
                    alt="Temple-Style Bajeel Prasadam"
                    width={1200}
                    height={675}
                    className="h-auto w-full object-cover"
                  />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {scorePillars.map((pillar) => (
                    <p key={pillar} className="info-line text-sm">
                      {pillar}
                    </p>
                  ))}
                </div>
                <div className="grid gap-2">
                  {signatureFocus.map((item) => (
                    <p key={item} className="clarity-note text-sm">
                      {item}
                    </p>
                  ))}
                </div>
              </article>
              <ol className="layout-panel flow-list !max-w-none space-y-0">
                {prasadamSteps.map((step, index) => (
                  <li key={step} className="flow-step">
                    <span className="timeline-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[var(--hero-text)]">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="standout" className="cinema-scene section-pad snap-start pb-16">
          <div className="cinema-inner">
            <header className="section-intro">
              <p className="type-kicker text-xs text-[var(--hero-gold)]">
                05 — Why us
              </p>
              <h2 className="section-title type-heading text-4xl font-black text-white sm:text-5xl">
                Why we stand out
              </h2>
            </header>
            <article className="layout-panel mt-6 !max-w-none">
              <div className="grid gap-0">
                {standOutPoints.map((item) => (
                  <div key={item.title} className="standout-line">
                    <p className="standout-icon">{item.icon}</p>
                    <p className="standout-title">{item.title}</p>
                    <p className="standout-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
