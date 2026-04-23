"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  CompetitionHero,
  COMPETITION_HERO_AUTO_MS,
} from "./components/CompetitionHero";

type Dish = {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  emoji: string;
  tag: string;
  ingredients: string[];
  /** One-line hook for hero story card */
  hook: string;
  /** Short ingredient badges with emoji for hero (e.g. "🧀 Cheese") */
  ingredientBadges: string[];
  /** Overlay label on hero dish frame */
  heroBadge: string;
  highlight: string;
};

const MASALEDAR_MINDS_SECTION_ID = "masaledar-minds";
const MASALEDAR_MINDS_TAGLINE = "Where Flavor Meets Strategy";

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
    hook: "Cold-built layers—cheese, fruit, chill—engineered for contrast.",
    ingredientBadges: ["🧀 Cheese", "🍇 Fruits", "❄️ Chill"],
    heroBadge: "Opening play",
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
    hook: "Temple-sweet soul, zero flame—texture judges remember.",
    ingredientBadges: ["🌾 Poha", "🍯 Jaggery", "🥥 Coconut"],
    heroBadge: "Signature Dish",
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
    hook: "Lassi meets mango royalty—smooth, rich, built to linger.",
    ingredientBadges: ["🥭 Mango", "🥛 Lassi", "🌰 Dry fruits"],
    heroBadge: "House pour",
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
    hook: "Brightness stacked—flavor architecture in a bowl.",
    ingredientBadges: ["🍊 Citrus", "🥗 Seasonal fruit", "✨ Light spice"],
    heroBadge: "Fresh cut",
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
    hook: "High-protein, no-fire, crunch balance in every bite.",
    ingredientBadges: ["🧀 Paneer", "🥬 Greens", "🧂 Seasoning"],
    heroBadge: "Power lane",
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

  const selectDishByIndex = (index: number) => {
    const i = ((index % dishes.length) + dishes.length) % dishes.length;
    setSelectedDishId(dishes[i].id);
    setIsAutoPlay(false);
    setShowAllIngredients(false);
  };

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      const next = (selectedDishIndex + 1) % dishes.length;
      setSelectedDishId(dishes[next].id);
      setShowAllIngredients(false);
    }, COMPETITION_HERO_AUTO_MS);
    return () => clearInterval(timer);
  }, [isAutoPlay, selectedDishIndex]);

  const visibleIngredients = showAllIngredients
    ? selectedDish.ingredients
    : selectedDish.ingredients.slice(0, 4);

  return (
    <div className="cinema-shell relative min-h-dvh min-w-0 flex-1 overflow-x-clip text-[var(--hero-text)]">
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
        <div className="site-brand-copy">
          <span className="site-brand-text">Masaledar Minds</span>
          <span className="site-brand-strategy">{MASALEDAR_MINDS_TAGLINE}</span>
        </div>
      </header>

      <nav className="scene-nav section-nav-rail" aria-label="On this page">
        <a href="#hero" className="section-nav-link">
          <span className="section-nav-num">01</span>
          <span className="section-nav-label">Intro</span>
        </a>
        <a
          href={`#${MASALEDAR_MINDS_SECTION_ID}`}
          className="section-nav-link"
        >
          <span className="section-nav-num">02</span>
          <span className="section-nav-label">Team</span>
        </a>
        <a href="#spotlight" className="section-nav-link">
          <span className="section-nav-num">03</span>
          <span className="section-nav-label">Menu</span>
        </a>
        <a href="#signature" className="section-nav-link">
          <span className="section-nav-num">04</span>
          <span className="section-nav-label">Anchor</span>
        </a>
        <a href="#standout" className="section-nav-link">
          <span className="section-nav-num">05</span>
          <span className="section-nav-label">Edge</span>
        </a>
      </nav>

      <main
        id="main-content"
        tabIndex={-1}
        className="scroll-main relative h-[100dvh] max-h-[100dvh] min-h-0 min-w-0 snap-y snap-mandatory overflow-y-auto overflow-x-clip outline-none"
      >
        <section
          id="hero"
          className="cinema-scene hero-scene section-pad snap-start"
        >
          <div className="cinema-inner">
            <CompetitionHero
              dishes={dishes}
              activeIndex={selectedDishIndex}
              onSelectIndex={selectDishByIndex}
              autoRotate={isAutoPlay}
              onToggleAutoRotate={() => setIsAutoPlay((p) => !p)}
            />
          </div>
        </section>

        <section
          id={MASALEDAR_MINDS_SECTION_ID}
          className="cinema-scene section-pad snap-start"
          aria-labelledby="masaledar-minds-heading"
        >
          <div className="cinema-inner magic-minds-inner">
            <p className="magic-minds-eyebrow">02 — The team</p>
            <h2
              id="masaledar-minds-heading"
              className="magic-minds-heading type-heading"
            >
              Masaledar Minds
            </h2>
            <p className="magic-minds-tagline">
              The crew behind the plates—same discipline, louder story.
            </p>
            <div className="magic-minds-frame">
              <Image
                src="/images/magic-minds-masaledar.jpeg"
                alt="Masaledar Minds"
                width={900}
                height={900}
                className="magic-minds-image"
                sizes="(min-width: 768px) 520px, 88vw"
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
                Experience the menu
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
