# Ember Night Cinema Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the homepage from a card-heavy layout into a bold, cinematic, scene-based experience that communicates the full story in under 30 seconds.

**Architecture:** Keep the existing Next.js page and data model, but restructure rendering into four fullscreen snap scenes with a high-contrast dark visual system and aggressive motion treatment. Move style language from soft cards to dramatic panels, glows, and reveal transitions while preserving content clarity and mobile readability.

**Tech Stack:** Next.js App Router, React state/hooks, Tailwind utility classes, custom CSS in `app/globals.css`

---

### Task 1: Scene-Based Page Structure

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace section layout with four fullscreen scenes**
- [ ] **Step 2: Keep existing dish/story data and spotlight autoplay behavior**
- [ ] **Step 3: Convert dish grid to cinematic spotlight with side rail selectors**
- [ ] **Step 4: Add snap-scroll narrative flow and section anchors**

### Task 2: Ember Night Visual System

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace warm cream theme tokens with dark ember palette**
- [ ] **Step 2: Add animated lights, particles, glow overlays, and panel treatments**
- [ ] **Step 3: Add bold transitions (lift, pulse, reveal, scanline, orbit)**
- [ ] **Step 4: Add responsive motion safeguards for smaller screens**

### Task 3: Verification

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Run lint to verify page and CSS integration**
- [ ] **Step 2: Fix any lints introduced by redesign**
- [ ] **Step 3: Confirm final experience stays readable and fast to scan**
