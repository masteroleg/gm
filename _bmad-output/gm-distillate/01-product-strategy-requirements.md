This section covers product model, business model/pricing, user personas, journeys, functional requirements, non-functional requirements, epic structure, funnel analytics, and SEO architecture. Part 1 of 4.

## Product & Business Model
- genu.im: B2B proof-first lander for genu.mark; not consumer service, not certification/legal confirmation
- genu.mark = manufacturer/brand proof layer (marking on Domino/Markem-Imaje/Omron equipment); Дія = official consumer акциз check — two separate trust layers
- Two customer sources: (1) regulatory-mandatory eАкциз/xtrace contour; (2) voluntary brand protection (e.g., Ukravit)
- Platform epics: Epic 1 Landing (/), Epic 2 Verification (/v/{code}), Epic 3 B2B Portal (/portal/)
- Pricing (Jan 2026): Print/Marking $2.00/1K codes; Storage $0.43/1K codes; Verification $7.00/1K scans
- Ukravit Jan 2026: 278,441 codes printed (~$2.88/1K UAH); 867,094 stored (~$0.45/1K); only 5 verification scans (negligible revenue); confirms need for consumer-facing verticals
- Marked volume: 25M+ units in Ukraine; Ukravit is reference client (approached proactively)
- Competitor Сайтекс (sytecs.com.ua / xtrace.com.ua): $250–500/month per line, print+analytics only, no consumer verification, mimics government aesthetic; key gap = consumer-facing verification layer
- Target customers (priority): (1) alcohol manufacturers — compliance + consumer-facing; (2) tobacco; (3) food/beverage — emerging compliance; NOT target: B2B-only products (agricultural chemicals, industrial)
- API: TraceAvit (traceavit-api.azurewebsites.net/api/Code/{code}) — closed, auth-gated; fields: batch, prodLine, articleEAN13, articleText, shift, productionDate, isProduced, isWasted, nbChecks, actions[]; action codes: P=printed, V=verified by system, C=checked by consumer, W=wasted; SUSPICIOUS_CHECK_THRESHOLD = 5; Phase 2+ only
- Verification passports: /v/genuim (platform showcase), /v/genuim-alco/-tobacco/-food — static demos via JSON + CSS data-theme-vertical; real API Epic 2+

## Problem Context
- /v/genuim was 404; no bridge section; no trust-floor destinations; CTA went to mailto without context capture; narrative order wrong (use cases before verification)
- Landing was generic slogan-based; B2B brands/producers didn't understand value → no demo requests
- Decision: build landing as "Quiet Strength / Platform Protocol", not marketing page
- "Безальтернативність" for eАкциз: never stated directly; conveyed through protocol language: "готово для eАкциз контура / перевірено практикою / без сюрпризів"

## User Personas & Journeys
- Олег (COO/compliance): eАкциз-2026 readiness; fears line stoppage, data chaos, regulatory fines; language = "protocol, not promises"
- Андрій (engineer/IT): line stability, no manual fixes; success = "doesn't break"
- Ірина (brand manager): public trust artifact for partners/retail
- Сергій (procurement/audit): quick legality confirmation via link; skeptical of overclaiming
- Journey 1 (eАкциз): search → homepage → bridge → /v/genuim → eАкциз branch → form
- Journey 2 (brand): search → homepage → bridge → proof → brand branch → form
- Journey 3 (auditor): receives /v/genuim link → VERIFIED → source disclosure → trust floor → optional CTA
- Journey 4 (integrator): receives sample QR in presentation → future-phase /v/genu.alko → /v/genuim → partner CTA
- Journey 5 (consumer intercept): search → intercept page → redirect to Дія; separate B2B CTA visible

## Functional Requirements (29 active Phase 1)
- FR1–FR4: language (UK/EN) and theme (light/dark) switchable + persistent via localStorage
- FR5: homepage explains genu.im as proof-first surface, not generic QR landing
- FR6: explicit Дія vs genu.mark separation on homepage branches, /v/genuim, no-data state, intercept page
- FR7: primary homepage CTA opens /v/genuim
- FR8: homepage exposes eАкциз entry point + responsible-manufacturer entry point, each with branch-specific CTA
- FR9: trust-floor destinations (About, Contact, Proof & Cases, Privacy, Terms, FAQ) reachable
- FR10–FR13: /v/genuim displays approved proof-example state; source-labeled facts; persistent demo-mode notice; valid-state example
- FR14–FR15: no-data state neutral; no authenticity/legality/state-approval claims; explains what proof could appear; business CTA separate from Дія
- FR16–FR19: empty proof sections hidden; facts labeled by source; NDA-safe evidence links; sustainability content gated on evidence
- FR21–FR22: consumer-intent intercept → Дія; separate B2B CTA
- FR23–FR24: request form captures qualification fields + scenario + source-path metadata
- FR25: shareable proof/demo links open same state without login
- FR26–FR27: trust-floor destinations live; knowledge-base IA slot reserved in nav
- FR29–FR31: funnel review — homepage-to-proof distinguishable; requests by scenario/source; full funnel reviewable
- Roadmap-only (not Phase 1): FR20 proof extensions, FR28 knowledge-to-CTA, FR32 live lookup abuse controls

## Non-Functional Requirements (16)
- NFR1: Lighthouse Performance ≥97 mobile + desktop
- NFR2: LCP <2.5s, CLS <0.1, INP <200ms
- NFR3: ≤150KB compressed deferred JS per key page; first-screen content renders without deferred JS
- NFR4: above-the-fold media/containers reserve space; CLS <0.1
- NFR5–NFR7: WCAG 2.1 AA; Accessibility ≥97; 0 blocked tasks, 0 unlabeled controls, keyboard accessible, visible focus
- NFR8: 0 mixed-language fragments, 0 contradictory proof-state labels
- NFR9: 100% indexable pages have unique title, description, canonical, hreflang, OG tags, JSON-LD
- NFR10: consumer pages direct to Дія; 0 state-status claims for genu.im
- NFR11: proof pages 0 unsupported claims; fallback to no-data state if evidence missing
- NFR12: request form ≤5 user-entered fields: business contact name, email/phone, company, scenario, context
- NFR13: 0 raw codes, 0 personal data in public analytics; share only count-by-scenario-label and count-by-source-path
- NFR14: HTTPS all public pages; GitHub Pages Phase 1 = documented header limitations + meta http-equiv CSP fallback; full headers after Azure migration
- NFR15: Chrome/Edge/Firefox current stable; unsupported browsers fail gracefully
- NFR16: flows usable at 360px/768px/1280px; 0 horizontal scrolling; 0 hidden primary CTAs

## Epic Structure (Release 2.1)
- Epic 1 (Trust-First Homepage Foundation): FR1–FR9, FR26–FR27; stories 1.1–1.5; homepage, branches, lang/theme persistence, trust-floor pages, knowledge IA
- Epic 2 (Public Proof Experience): FR10–FR19, FR25; stories 2.1–2.4; /v/genuim, no-data state, demo input, supported-only content
- Epic 3 (Audience Routing and Qualified Conversion): FR21–FR24; stories 3.1–3.4; Дія intercept, B2B CTA, request form, metadata capture
- Epic 4 (Funnel Visibility and Review): FR29–FR31; stories 4.1–4.3; UTM-based funnel review
- Epic 5 (Site Remediation): stories 5-1 through 5-5 — all completed 2026-03-21

## Phase 1 Funnel & Analytics
- Funnel: Homepage/Entry → Proof Visibility → Proof Engagement → Request Handoff
- All Phase 1 signals passive + manual; no backend, no live dashboard, no analytics library
- GSC proxy for /v/genuim/ (organic search only); utm_campaign=proof_entry on hero CTA NOT measurable without client-side analytics
- mailto: server has zero visibility; delivery not guaranteed; never quote count as definitive
- Request scenarios: brand-proof, eaktsyz; source paths: /perevir-product/, /request/, /v/genuim/
- Phase 2: client-side analytics, server-side form submission, real-time dashboard

## SEO Architecture
- Per-page: unique title, meta description 150–160 chars, canonical, hreflang uk+en+x-default (single URL JS i18n pattern), og:title/description/type/url/image, og:locale uk_UA + alternate en_US, html lang="uk" static
- JSON-LD: Homepage = Organization + WebSite; /v/genuim/ = ItemPage + BreadcrumbList; knowledge articles = Article + FAQPage + BreadcrumbList; /v/ = noindex, no JSON-LD
- robots.txt: Allow / for all; Disallow /v/ for *; explicit Allow for GPTBot, ClaudeBot, PerplexityBot
- /knowledge/{slug}/ and /news/ reserved Phase 2+; article-template.html = Phase 1 IA placeholder
- Known limitation: AI crawlers without JS rendering see only lang="uk" (static attribute)
- OG image: static og-default.png 1200×630; per-page OG images deferred Phase 2
