---
name: genu.im
description: Brand verification platform - scan codes to view product authenticity proof
colors:
  primary: "#0d8a4f"
  primary-deep: "#078a42"
  primary-bright: "#00e676"
  surface: oklch(0.976 0.008 93)
  paper: oklch(0.992 0.004 97)
  panel: oklch(1 0 0)
  body: oklch(0.258 0.019 256)
  heading: oklch(0.16 0.035 250)
  muted: oklch(0.545 0.02 245)
  proof-bg: oklch(0.165 0.028 236)
  proof-panel: oklch(0.142 0.024 230)
  proof-text: oklch(0.96 0.01 106)
  proof-muted: oklch(0.78 0.022 112)
  proof-green: oklch(0.74 0.18 152)
typography:
  display:
    fontFamily: "Bahnschrift, Aptos Display, Trebuchet MS, Segoe UI, sans-serif"
    fontSize: clamp(2.8rem, 5vw, 5rem)
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: -0.036em
  body:
    fontFamily: "Aptos, Segoe UI Variable, Segoe UI, system-ui, sans-serif"
    fontSize: clamp(0.98rem, 1.15vw, 1.08rem)
    lineHeight: 1.74
rounded:
  pill: 999px
  card: 2.35rem
  card-sm: 1.45rem
  vcard: 1.75rem
spacing:
  2xs: 0.375rem
  xs: 0.625rem
  sm: 0.875rem
  md: 1.125rem
  lg: 1.5rem
  xl: 2rem
  2xl: 2.75rem
  3xl: 4rem
  4xl: 5.5rem
components:
  cta-button:
    backgroundColor: linear-gradient(135deg, var(--color-brand-deep), var(--color-brand-bright))
    textColor: white
    padding: 1rem 1.8rem
    borderRadius: 999px
  card:
    backgroundColor: var(--color-panel)
    borderRadius: 1.45rem
    border: 1px solid --alpha(var(--color-heading) / 10%)
    boxShadow: inset 0 1px 0 --alpha(var(--color-panel) / 72%), 0 16px 38px --alpha(oklch(0 0 0) / 6%)
  proof-card:
    backgroundColor: --alpha(var(--color-proof-text) / 3%)
    borderRadius: 1.75rem
    border: 1px solid --alpha(var(--color-proof-text) / 10%)
    boxShadow: 0 24px 64px --alpha(oklch(0 0 0) / 32%)
---

# Design System: genu.im

## 1. Overview

**Creative North Star: "The Trust Floor"**

Genu.im is a brand verification platform where users scan a product code and receive instant proof of authenticity. The interface must communicate trust, transparency, and brand authority while making the verification process feel effortless and satisfying.

The design rejects cluttered, information-dense dashboards (as specified in PRODUCT.md anti-references). Instead, it uses generous whitespace, clear visual hierarchy, and a distinctive proof card component that makes verification feel like opening a verified document.

**Key Characteristics:**
- Verification-first: Every element serves the trust-building mission
- Proof panels are always dark regardless of theme mode (the "floor" of trust)
- Brand accent is warm green, used sparingly but meaningfully
- Typography is the primary visual differentiator—strong display font, clean body
- Motion is responsive: feedback on interactions, subtle floats on proof cards

## 2. Colors

The palette is restrained: tinted neutrals with one accent color (brand green) used on ≤10% of any screen. The proof panels break this rule intentionally—they're always dark regardless of theme, creating a "floor" of trust.

### Primary
- **Brand Green** (`#0d8a4f` / oklch(0.62 0.17 155)): Primary action buttons, hero accents, trust indicators. This is the single accent—used sparingly on CTAs, brand marks, and verification badges.
- **Brand Deep** (`#078a42` / oklch(0.49 0.15 155)): Hover states, accent text in titles, brand gradients.
- **Brand Bright** (`#00e676` / oklch(0.8 0.13 178)): Dark mode primary, verification success indicators, proof panel highlights.

### Neutral
- **Surface** (oklch(0.976 0.008 93)): Page background, gradient base.
- **Paper** (oklch(0.992 0.004 97)): Card backgrounds, input fields.
- **Panel** (oklch(1 0 0)): Overlays, glass effects, navigation.
- **Body** (oklch(0.258 0.019 256)): Primary text (never pure black).
- **Heading** (oklch(0.16 0.035 250)): Headlines (never pure black).
- **Muted** (oklch(0.545 0.02 245)): Secondary text, labels, meta.

### Proof (always dark)
- **Proof Background** (oklch(0.165 0.028 236)): Verification card backgrounds.
- **Proof Panel** (oklch(0.142 0.024 230)): Inner proof elements.
- **Proof Text** (oklch(0.96 0.106)): High-contrast text in proof panels.
- **Proof Muted** (oklch(0.78 0.022 112)): Secondary text in proof context.
- **Proof Green** (oklch(0.74 0.18 152)): Verification success, checkmarks.

### Named Rules
**The Proof Floor Rule.** Verification panels are always dark regardless of theme mode. Trust is not theme-dependent.

## 3. Typography

**Display Font:** Bahnschrift, Aptos Display, Trebuchet MS, Segoe UI (with fallbacks)
**Body Font:** Aptos, Segoe UI Variable, Segoe UI, system-ui (with fallbacks)
**Mono Font:** Consolas, Liberation Mono (for codes, IDs)

**Character:** The display font has architectural weight—bold (800), tight tracking (-0.036em), tall line-height (0.96). It commands attention on headlines and hero titles without being aggressive. The body font is clean and legible with generous line-height (1.74) for readability.

### Hierarchy
- **Display** (800, clamp(2.8rem, 5vw, 5rem), 0.96): Hero titles only—first impression, brand statement.
- **Headline** (750, clamp(1.7rem, 2.4vw, 2.6rem), 1.08): Section titles—clear but not shouting.
- **Title** (700, 1.2rem, 1.15): Card titles, component headings.
- **Body** (400, clamp(0.98rem, 1.15vw, 1.08rem), 1.74): Primary content—max-width 65ch for readability.
- **Label** (600-700, 0.66-0.82rem, 1.15): Tags, pills, meta—uppercase with letter-spacing.

### Named Rules
**The Display Dominance Rule.** Display font appears only on titles—hero, section, page. Never on body text. It commands, body conveys.

## 4. Elevation

The system uses shadows with restraint. Surfaces are flat at rest; shadows appear only as response to state (hover, elevation, focus) or for specific purposes (proof cards, hero card).

### Shadow Vocabulary
- **Soft** (0 18px 44px oklch(0 0 0 / 10%)): Content sections, standard cards at rest.
- **Card** (0 34px 96px oklch(0 0 0 / 14%)): Hero card, primary containers—substantial but not heavy.
- **Chip** (0 12px 30px oklch(0 0 0 / 8%)): Signal pills, small interactive elements.
- **Brand** (0 20px 48px oklch(var(--color-brand) / 30%)): CTA buttons, primary actions—accent-colored glow.
- **Brand Hover** (0 26px 62px oklch(var(--color-brand) / 38%)): CTA hover state—elevated and glowing.
- **QR** (0 14px 38px oklch(var(--color-brand) / 22%)): QR code container—subtle brand accent.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only on hover, focus, proof cards, and primary CTAs. No decorative shadows.

## 5. Components

### Buttons
- **Shape:** Full rounded (pill), border-radius: 999px.
- **Primary CTA:** Gradient from brand-deep to brand-bright, white text, brand shadow. Hover: translateY(-2px), shadow-brand-hover.
- **Secondary/Link:** Text only, color: heading, opacity transition on hover.
- **Size:** min-height 3.5rem (56px) for CTAs, min-height 44px for general buttons (WCAG touch target).

### Cards (Content Cards)
- **Shape:** border-radius: 1.45rem (card-sm).
- **Background:** Gradient from panel to paper (tonal, not flat).
- **Border:** 1px solid --alpha(var(--color-heading) / 10%).
- **Shadow:** Inset highlight + subtle drop shadow.
- **Hover:** translateY(-2px), enhanced shadow.
- **Padding:** var(--space-lg) = 1.5rem.

### Navigation
- **Style:** Pill-shaped container (border-radius: 999px), glass backdrop, blur(22px).
- **Links:** Pill buttons inside container, 2.35rem height, 0.8rem font, 600 weight.
- **States:** Opacity transition—0.72 default, 1 on hover/focus.

### Proof Cards (Verification Panel)
- **Shape:** border-radius: 1.75rem (vcard).
- **Background:** Always dark (proof-bg), never adapts to theme.
- **Border:** 1px solid --alpha(var(--color-proof-text) / 10%).
- **Inner elements:** qr code row, field key-value pairs, badge pills.
- **Animation:** Float animation (8s ease-in-out infinite) on hero proof card.

### Inputs / Fields
- **Style:** 1px border (16% opacity), 0.6rem radius, paper background.
- **Focus:** Border shifts to brand color, 3px brand glow box-shadow.
- **Mono:** Demo input field uses font-mono for code entry.

### Chips / Pills
- **Style:** Min-height 1.8rem, 0.66rem font, 700 weight, uppercase, letter-spacing 0.14em.
- **Variants:** accent (brand bg), default (heading/muted), proof (proof-panel variants).

## 6. Do's and Don'ts

### Do:
- **Do** use the proof card as the signature component—it's what makes verification feel real.
- **Do** keep brand green to ≤10% of any screen surface (Restrained rule).
- **Do** use display font on headlines only—never on body text.
- **Do** make proof panels always dark regardless of light/dark theme.
- **Do** ensure touch targets are min-height 44px for accessibility.
- **Do** use --alpha() for transparency—it maintains OKLCH color space.

### Don't:
- **Don't** use border-left or border-right as colored accent stripes (side-stripe bans).
- **Don't** use gradient text for decoration—use solid colors.
- **Don't** create identical card grids with same icon + heading + text pattern.
- **Don't** use modals as first thought—prefer inline/progressive disclosure.
- **Don't** create "hero metric" templates (big number + small label + gradient accent).
- **Don't** use glassmorphism decoratively—only purposeful (nav pill backdrop).
- **Don't** exceed 65ch line length on body text.
- **Don't** use pure #000000 or #ffffff—tint toward brand hue.

### From PRODUCT.md Anti-References:
- **Don't** create cluttered, information-dense dashboards.
- **Don't** make the interface feel like a generic verification tool.