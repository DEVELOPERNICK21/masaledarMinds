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

const dishes: Dish[] = [
  {
    id: "chilled-celebration-platter",
    name: "Chilled Celebration Platter",
    subtitle:
      "A refreshing combination of cheese, fruits, and chilled elements",
    image: "/images/dish-ccp.svg",
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
    image: "/images/dish-prasadam.svg",
    emoji: "🟡",
    tag: "Traditional Sweet",
    ingredients: [
      "Poha",
      "Jaggery",
      "Coconut",
      "Ghee",
    ],
    highlight:
      "Rich, flavorful experience made entirely without fire.",
  },
  {
    id: "royal-mango-elixir",
    name: "Royal Mango Elixir",
    subtitle: "A smooth blend of mango and lassi with dry fruits",
    image: "/images/dish-lassi.svg",
    emoji: "🟠",
    tag: "Beverage",
    ingredients: ["Mango", "Lassi", "Dry Fruits"],
    highlight: "Refreshing, rich, and perfectly balanced.",
  },
  {
    id: "citrus-fusion-bowl",
    name: "Citrus Fusion Bowl",
    subtitle: "A vibrant mix of fruits with subtle seasoning",
    image: "/images/dish-fruit-salad.svg",
    emoji: "🔵",
    tag: "Fresh Bowl",
    ingredients: ["Seasonal Fruits", "Citrus Notes", "Light Seasoning"],
    highlight: "Burst of freshness with layered flavors.",
  },
  {
    id: "power-protein-bites",
    name: "Power Protein Bites",
    subtitle: "A modern, nutritious snack for health and taste",
    image: "/images/dish-ccp.svg",
    emoji: "🟣",
    tag: "Protein Snack",
    ingredients: [
      "Paneer",
      "Fresh Greens",
      "Seasoning",
    ],
    highlight:
      "Designed to deliver nutrition, texture, and flavor.",
  },
];

const scorePillars = [
  "Temple-style inspiration with modern plating",
  "Taste balance across sweet, savory, fresh and protein-rich",
  "Texture layering for better mouthfeel and recall",
  "Visual-first presentation without clutter",
  "100% no-fire preparation",
];

const prasadamSteps = [
  "Mix poha, jaggery, and grated coconut evenly.",
  "Fold in ghee and cardamom for aroma and richness.",
  "Add roasted sesame and dry fruits for texture.",
  "Rest briefly and plate neatly with garnish.",
];

const floatingEmojis = ["🟢", "🟡", "🟠", "🔵", "🟣", "🥥", "🍋", "🥭"];

const judgePoints = [
  { label: "Dishes", value: "5" },
  { label: "Heat Used", value: "0" },
  { label: "Theme", value: "South Indian Experience" },
  { label: "Focus", value: "Taste + Visual + Nutrition" },
];

const tablePlan = [
  "Center: Temple-Style Bajeel Prasadam as hero dish",
  "Left: Chilled Celebration Platter for immediate freshness cue",
  "Right: Citrus Fusion Bowl for bright visual contrast",
  "Back: Royal Mango Elixir + Power Protein Bites for balance",
];

const teamHighlights = [
  "A team of five, combining creativity, tradition, and presentation to deliver a complete no-fire culinary experience.",
];

const teamRoles = [
  { role: "Concept & Theme", focus: "Define story, mood, and flow of the full table" },
  { role: "Ingredient Specialist", focus: "Select and prep ingredients for freshness and quality" },
  { role: "Plating & Styling", focus: "Build visual hierarchy and clean presentation" },
  { role: "Beverage & Balance", focus: "Handle drink profile and menu balance" },
  { role: "Presentation Lead", focus: "Deliver concise pitch and sequence for judges" },
];

const teamMembers = [
  { name: "Member 01", role: "Concept & Theme", emoji: "🎯" },
  { name: "Member 02", role: "Ingredient Specialist", emoji: "🥬" },
  { name: "Member 03", role: "Plating & Styling", emoji: "🍽️" },
  { name: "Member 04", role: "Beverage & Balance", emoji: "🥤" },
  { name: "Member 05", role: "Presentation Lead", emoji: "🎤" },
];

const standOutPoints = [
  {
    title: "Complete Themed Experience",
    desc: "A full South Indian themed experience, not just separate dishes.",
    icon: "💡",
  },
  {
    title: "Balanced Menu",
    desc: "Sweet, savory, refreshing, and protein-rich in one coherent table.",
    icon: "⚖️",
  },
  {
    title: "Tradition + Modern Presentation",
    desc: "Traditional inspiration delivered with modern styling.",
    icon: "🏛️",
  },
  {
    title: "100% No-Fire Preparation",
    desc: "No cooking flame, without compromising taste.",
    icon: "🔥",
  },
  {
    title: "Visual + Texture + Nutrition",
    desc: "Built for visual appeal, mouthfeel, and nutrition together.",
    icon: "✨",
  },
];

const dishReadGuide = [
  "Select dish",
  "See composition",
  "Read key flavors",
];

const signatureFocus = [
  "Poha + jaggery + coconut provide traditional flavor core",
  "Ghee and cardamom add richness and aroma",
  "Sesame + dry fruits elevate texture and finish",
];

const finalTakeaways = [
  "Five dishes, one cohesive no-fire story",
  "Clear role ownership across a team of five",
  "Strong South Indian theme with modern presentation",
];

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
    }, 2600);
    return () => clearInterval(timer);
  }, [isAutoPlay, selectedDishIndex]);

  const visibleIngredients = showAllIngredients
    ? selectedDish.ingredients
    : selectedDish.ingredients.slice(0, 4);

  return (
    <div className='cinema-shell relative min-h-screen overflow-hidden text-white'>
      <div className='cinema-ambient amber' />
      <div className='cinema-ambient cherry' />
      <div className='cinema-ambient ember' />
      <div className='brand-fixed'>
        <Image
          src='/images/company-logo.png'
          alt='Company logo'
          width={28}
          height={28}
          className='h-7 w-7 rounded-full object-cover'
        />
        <span>Team Masaledar Minds</span>
      </div>
      <nav className='scene-nav' aria-label='Section navigation'>
        <a href='#hero' className='scene-nav-item'>
          Hero
        </a>
        <a href='#team' className='scene-nav-item'>
          Team
        </a>
        <a href='#spotlight' className='scene-nav-item'>
          Dishes
        </a>
        <a href='#signature' className='scene-nav-item'>
          Signature
        </a>
        <a href='#standout' className='scene-nav-item'>
          Stand Out
        </a>
        <a href='#finale' className='scene-nav-item'>
          Pitch
        </a>
      </nav>

      <main className='relative h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden'>
        <section id='hero' className='cinema-scene snap-start'>
          <div className='cinema-inner grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]'>
            <div className='relative z-10'>
              <div className='scene-pill'>
                <Image
                  src='/images/company-logo.png'
                  alt='Company logo'
                  width={34}
                  height={34}
                  className='h-[34px] w-[34px] rounded-full object-cover bg-white p-1'
                />
                <span>Free Fire Master Chef Competition</span>
              </div>
              <h1 className='cinema-title type-display mt-5'>
                Fresh, Festive
                <br />& Flavorful
              </h1>
              <p className='type-body mt-4 max-w-xl text-base text-white/75 sm:text-lg'>
                Team Masaledar Minds presents a focused no-cook table with four
                dishes designed for taste, balance, and fast judge recall.
              </p>
              <div className='mt-7 flex flex-wrap gap-3'>
                <a href='#team' className='scene-cta'>
                  Meet Team
                </a>
                <span className='scene-chip'>4 Dishes</span>
                <span className='scene-chip'>0 Heat Used</span>
              </div>
            </div>
            <div className='hero-metrics'>
              <p className='type-kicker text-xs uppercase tracking-[0.25em] text-amber-300/90'>
                Quick Facts
              </p>
              <div className='mt-4 grid grid-cols-2 gap-3'>
                {judgePoints.map((point) => (
                  <div key={point.label} className='metric-tile'>
                    <p className='type-caption text-[11px] uppercase tracking-[0.13em] text-white/60'>
                      {point.label}
                    </p>
                    <p className='section-title type-heading mt-1 text-xl font-bold text-amber-200'>
                      {point.value}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsAutoPlay((prev) => !prev)}
                className='scene-toggle mt-5'
              >
                {isAutoPlay ? "Pause Spotlight" : "Resume Spotlight"}
              </button>
            </div>
            {floatingEmojis.map((emoji, index) => (
              <span
                key={emoji + index}
                className='floating-emoji'
                style={
                  {
                    "--i": index,
                    left: `${8 + (index % 4) * 22}%`,
                    top: `${6 + Math.floor(index / 2) * 18}%`,
                  } as React.CSSProperties
                }
              >
                {emoji}
              </span>
            ))}
          </div>
        </section>

        <section id='team' className='cinema-scene snap-start'>
          <div className='cinema-inner section-header'>
            <p className='type-kicker text-xs uppercase tracking-[0.24em] text-amber-300'>
              Section 01
            </p>
              <h2 className='section-title type-heading mt-2 text-4xl font-black text-white sm:text-5xl'>
                The Team Behind the Experience
            </h2>
            <p className='type-body section-summary mt-2 text-white/75'>
                A team of five, combining creativity, tradition, and presentation
                to deliver a complete no-fire culinary experience.
            </p>
          </div>
          <div className='cinema-inner grid items-center gap-8 lg:grid-cols-[1fr_1fr]'>
            <article className='scene-block'>
              <p className='type-kicker text-xs uppercase tracking-[0.25em] text-amber-300'>
                Team Summary
              </p>
              <h2 className='section-title type-heading mt-2 text-4xl font-black text-white sm:text-5xl'>
                Team Masaledar Minds
              </h2>
              <p className='type-body mt-3 text-sm text-white/75 sm:text-base'>
                Our entry is designed around one clear goal: make judges
                understand the full concept in under 30 seconds while keeping
                every dish fully no-cook and visually memorable.
              </p>
              <ul className='mt-5 grid gap-2'>
                {teamHighlights.map((point) => (
                  <li key={point} className='info-line'>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
            <article className='scene-block'>
              <p className='type-kicker text-xs uppercase tracking-[0.25em] text-rose-300'>
                Roles and Ownership
              </p>
              <div className='mt-3 grid gap-2'>
                {teamRoles.map((item) => (
                  <div key={item.role} className='flow-step'>
                    <span className='timeline-number'>•</span>
                    <p>
                      <strong>{item.role}:</strong> {item.focus}
                    </p>
                  </div>
                ))}
              </div>
              <a href='#spotlight' className='scene-cta mt-5 inline-block'>
                View Dishes
              </a>
            </article>
          </div>
          <div className='cinema-inner mt-7'>
            <article className='scene-block'>
              <p className='type-kicker text-xs uppercase tracking-[0.25em] text-amber-300'>
                Team Photos
              </p>
              <h3 className='section-title type-heading mt-2 text-3xl font-black text-white sm:text-4xl'>
                Meet The Faces
              </h3>
              <div className='team-strip mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                {teamMembers.map((member) => (
                  <div key={member.name} className='team-member-item'>
                    <div className='team-photo-avatar'>{member.emoji}</div>
                    <p className='team-member-name'>{member.name}</p>
                    <p className='team-member-role'>{member.role}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id='spotlight' className='cinema-scene snap-start'>
          <div className='cinema-inner section-header'>
            <p className='type-kicker text-xs uppercase tracking-[0.24em] text-amber-300'>
              Section 02
            </p>
            <h2 className='section-title type-heading mt-2 text-4xl font-black text-white sm:text-5xl'>
              Dish Detail Explorer
            </h2>
            <div className='clarity-row mt-3'>
              {dishReadGuide.map((point) => (
                <p key={point} className='clarity-chip'>
                  {point}
                </p>
              ))}
            </div>
          </div>
          <div className='cinema-inner grid items-center gap-7 xl:grid-cols-[220px_1fr_1fr]'>
            <aside className='spotlight-rail'>
              <p className='type-kicker text-xs uppercase tracking-[0.25em] text-amber-300'>
                Menu
              </p>
              <div className='mt-3 space-y-2'>
                {dishes.map((dish) => (
                  <button
                    key={dish.id}
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
            </aside>

            <div className='spotlight-image-wrap'>
              <Image
                src={selectedDish.image}
                alt={selectedDish.name}
                width={760}
                height={960}
                className='spotlight-image'
              />
            </div>

            <article className='scene-block spotlight-copy'>
              <p className='type-kicker text-xs uppercase tracking-[0.25em] text-rose-300'>
                Dish Spotlight
              </p>
              <h2 className='section-title type-heading mt-2 text-4xl font-black leading-tight text-white sm:text-5xl'>
                {selectedDish.name}
              </h2>
              <p className='type-body mt-3 text-base text-white/75'>
                {selectedDish.subtitle}
              </p>
              <p className='type-caption mt-3 text-sm text-amber-200/90'>
                {selectedDish.highlight}
              </p>
              <div className='mt-5 flex items-center justify-between gap-3'>
                <p className='type-kicker text-xs uppercase tracking-[0.2em] text-white/70'>
                  Key Ingredients
                </p>
                <button
                  onClick={() => setShowAllIngredients((prev) => !prev)}
                  className='scene-toggle'
                >
                  {showAllIngredients ? "Show Top 4" : "Show All"}
                </button>
              </div>
              <ul className='mt-6 grid gap-2 sm:grid-cols-2'>
                {visibleIngredients.map((ingredient) => (
                  <li key={ingredient} className='ingredient-chip'>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id='signature' className='cinema-scene snap-start'>
          <div className='cinema-inner section-header'>
            <p className='type-kicker text-xs uppercase tracking-[0.24em] text-amber-300'>
              Section 03
            </p>
            <h2 className='section-title type-heading mt-2 text-4xl font-black text-white sm:text-5xl'>
              Signature Dish Breakdown
            </h2>
            <p className='type-body section-summary mt-2 text-white/75'>
              The key narrative dish explained through ingredients, sequence,
              and plating intent.
            </p>
          </div>
          <div className='cinema-inner grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]'>
            <article className='scene-block'>
              <p className='type-kicker text-xs uppercase tracking-[0.25em] text-amber-300'>
                Signature Dish
              </p>
              <h3 className='section-title type-heading mt-2 text-5xl font-black leading-[0.95] text-white'>
                Bajeel
                <br />
                Prasadam
              </h3>
              <p className='type-body mt-4 text-sm text-white/70 sm:text-base'>
                A centuries-old Karnataka tradition transformed into a quick
                visual story for competitive judging. No flame, all finesse.
              </p>
              <div className='mt-5 grid gap-2 sm:grid-cols-2'>
                {scorePillars.map((pillar) => (
                  <p key={pillar} className='info-line'>
                    {pillar}
                  </p>
                ))}
              </div>
              <div className='mt-5 grid gap-2'>
                {signatureFocus.map((item) => (
                  <p key={item} className='clarity-note'>
                    {item}
                  </p>
                ))}
              </div>
            </article>
            <ol className='scene-block flow-list'>
              {prasadamSteps.map((step, index) => (
                <li key={step} className='flow-step'>
                  <span className='timeline-number'>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id='standout' className='cinema-scene snap-start'>
          <div className='cinema-inner'>
            <article className='scene-block'>
              <p className='type-kicker text-xs uppercase tracking-[0.24em] text-rose-300'>
                Section 04
              </p>
              <h3 className='section-title type-heading mt-2 text-4xl font-black text-white sm:text-5xl'>
                Why We Stand Out
              </h3>
              <p className='type-body section-summary mt-2 text-white/75'>
                Core design principles that make the table memorable and easy to
                evaluate quickly.
              </p>
              <div className='mt-6 grid gap-2'>
                {standOutPoints.map((item) => (
                  <div key={item.title} className='standout-line'>
                    <p className='standout-icon'>{item.icon}</p>
                    <p className='standout-title'>{item.title}</p>
                    <p className='standout-desc'>{item.desc}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id='finale' className='cinema-scene snap-start'>
          <div className='cinema-inner section-header'>
            <p className='type-kicker text-xs uppercase tracking-[0.24em] text-amber-300'>
              Section 05
            </p>
            <h2 className='section-title type-heading mt-2 text-4xl font-black text-white sm:text-5xl'>
              Final Presentation Script
            </h2>
            <p className='type-body section-summary mt-2 text-white/75'>
              Use this closing frame to communicate concept, structure, and
              impact in under 30 seconds.
            </p>
          </div>
          <div className='cinema-inner grid items-center gap-8 lg:grid-cols-2'>
            <article className='scene-block'>
              <p className='type-kicker text-xs uppercase tracking-[0.24em] text-rose-300'>
                One-Table Strategy
              </p>
              <h3 className='section-title type-heading mt-2 text-3xl font-black text-white sm:text-4xl'>
                20-Second Judge Recall
              </h3>
              <ul className='mt-4 space-y-2'>
                {tablePlan.map((point) => (
                  <li key={point} className='info-line'>
                    {point}
                  </li>
                ))}
              </ul>
              <p className='type-body mt-5 text-sm text-white/75'>
                Good afternoon judges. Our concept is Sacred Summer Symphony:
                four no-cook dishes designed for color contrast, texture
                balance, cultural meaning, and strong presentation memory.
              </p>
            </article>
            <article className='scene-block'>
              <p className='type-kicker text-xs uppercase tracking-[0.24em] text-amber-300'>
                Team Signature
              </p>
              <h3 className='section-title type-heading mt-2 text-3xl font-black text-white sm:text-4xl'>
                Team Masaledar Minds
              </h3>
              <p className='type-body mt-4 text-base text-white/80'>
                Fresh concept, strong plating, and no-cook authenticity. Our
                table is built for instant understanding and lasting impression.
              </p>
              <div className='mt-7 rounded-2xl border border-amber-400/40 bg-amber-300/10 p-4'>
                <p className='section-title text-xl font-bold text-amber-200'>
                  Team Masaledar Minds
                </p>
                <p className='mt-1 text-sm text-white/70'>
                  No Cook. Maximum Visual Impact. Unforgettable Flavor Story.
                </p>
              </div>
              <div className='mt-5 grid gap-2'>
                {finalTakeaways.map((item) => (
                  <p key={item} className='clarity-note'>
                    {item}
                  </p>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
