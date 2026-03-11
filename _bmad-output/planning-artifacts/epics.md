---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - docs/genu-im-homepage-master-plan.md
---

# gm - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for gm, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Users can switch the public site between UK and EN across the homepage, proof example, demo input, and trust-floor destinations.
FR2: The system can persist the selected language for returning visits on supported browsers.
FR3: Users can switch the public site between light and dark theme across the homepage, proof example, demo input, and trust-floor destinations.
FR4: The system can persist the selected theme for returning visits on supported browsers.
FR5: Visitors can identify from the homepage that `genu.im` is a proof-first surface for marked products rather than a generic QR landing page.
FR6: Visitors can see explicit role separation between official consumer checking in `Дія` and manufacturer/brand proof in `genu.mark`.
FR7: Visitors can open the canonical verification example from the primary homepage CTA.
FR8: Visitors can identify two distinct homepage paths: `еАкциз` readiness and responsible-manufacturer proof.
FR9: Visitors can reach trust-floor destinations from the public site.
FR10: Visitors can open the canonical verification example and view a canonical valid proof example.
FR11: Visitors can open the Phase 1 demo input surface and submit a pasted code or use an example-code action to view a demo result.
FR12: The system can display a persistent demo-mode notice on every non-live verification surface.
FR13: The system can present a valid-state example for a product inside the `genu.mark` public proof contour.
FR14: The system can present a neutral no-data state for products without public proof in `genu.im`.
FR15: The system can explain what public proof could appear in the no-data state and offer a next-step CTA.
FR16: The system can hide empty proof sections instead of rendering placeholder content.
FR17: The system can label each displayed public proof fact by source category.
FR18: The system can show supporting evidence links or documents when they exist for a displayed public claim.
FR19: The system can suppress sustainability content when required evidence is missing.
FR20: Phase 2+ only: approved public proof extensions can add new content fields within the existing public proof structure without requiring a new page type.
FR21: Consumer-intent visitors can open a dedicated intercept page that points them to `Дія` for official consumer checking.
FR22: Consumer-intent visitors can also see a separate B2B CTA for marking, proof, or transparency services.
FR23: Visitors can submit a qualified request with contact data, scenario, and business context.
FR24: The system can attach scenario and source-path metadata to each qualified request.
FR25: Partners can share a public proof or demo link that opens the same intended public state and CTA destination without requiring login.
FR26: Visitors can open trust-floor destinations for About, Contact, Proof & Cases, Privacy, Terms, and FAQ from the public site.
FR27: Visitors can see reserved navigation and IA for the future knowledge base without requiring full Phase 1 knowledge content.
FR28: Phase 2 only: when knowledge content is enabled, visitors can open a knowledge entry and continue to a relevant CTA.
FR29: The product team can distinguish visits that move from the homepage into the proof example path.
FR30: The product team can distinguish qualified requests by scenario and entry source.
FR31: The product team can review a proof-first funnel consisting of homepage, proof example, and request steps.
FR32: Phase 3 only: when live public lookup is enabled, the system can apply bounded abuse controls to reduce repeated enumeration-style requests against the public proof endpoint.

### NonFunctional Requirements

NFR1: Key Phase 1 pages shall achieve Performance >= 97 in the agreed mobile and desktop release validation run.
NFR2: Key Phase 1 pages shall meet `LCP < 2.5s`, `CLS < 0.1`, and `INP < 200ms` at the release validation stage.
NFR3: Deferred client-side code for each key Phase 1 public page shall stay within a `<= 150 KB` compressed delivery budget and shall not be required to render first-screen explanatory content.
NFR4: Above-the-fold media and layout containers shall reserve space so no key Phase 1 page exceeds `CLS 0.1`.
NFR5: Key Phase 1 flows shall conform to WCAG 2.1 AA.
NFR6: Key Phase 1 flows shall achieve Accessibility >= 97 in the agreed release validation run.
NFR7: All key Phase 1 controls shall be keyboard accessible, visibly focusable, and screen-reader labeled, with `0` blocked tasks and `0` unlabeled interactive controls in release review.
NFR8: Language, theme, proof-state labels, and no-data messaging shall remain consistent across UK and EN public pages, with `0` mixed-language UI fragments and `0` contradictory proof-state labels in release review.
NFR9: Every indexable Phase 1 page shall include unique title, description, canonical, hreflang, social-preview metadata, and structured search metadata.
NFR10: Consumer-intent public pages shall direct official checking to `Дія` and shall contain zero claims of official state status for `genu.im`.
NFR11: Public proof pages shall present `0` unsupported claims in release review; if required evidence or approved proof data is missing, the page shall fall back to the neutral no-data state instead.
NFR12: Public request capture shall require no more than `5` user-entered fields and shall not require personal data beyond business contact name, business email or phone, company name, scenario, and short context.
NFR13: Public measurement and reporting shall exclude full raw codes and personal data from public analytics outputs.
NFR14: Public pages shall be served over HTTPS and, in deployed review, shall expose at minimum `Content-Security-Policy`, `X-Content-Type-Options`, and `Referrer-Policy` headers appropriate for a static public site.
NFR15: Phase 1 public flows shall work on current stable Chrome, Edge, and Firefox, and unsupported browsers shall fail gracefully without blocking core comprehension or contact.
NFR16: Phase 1 public flows shall remain usable at 360px, 768px, and 1280px widths without horizontal scrolling on key content or hidden primary CTAs.

### Additional Requirements

- No new starter template is required; implementation extends the existing brownfield static-site stack.
- The published application surface remains `site/`; delivery is static HTML, CSS, and DOM-first JavaScript with no SPA runtime, SSR layer, or deploy-time app build.
- `site/assets/css/output.css` is a committed production artifact and must remain tracked in git.
- New public routes are expected to use static directory/index routing, including `/v/genuim`, `/v/`, trust-floor destinations, and a reserved knowledge surface.
- Proof pages in Phase 1 should use static HTML content rather than live lookup or API-backed rendering.
- Demo/sample labeling is mandatory on non-live proof surfaces; no-data states must be neutral, factual, and non-alarmist.
- Every public proof fact must carry source disclosure; unsupported claims, especially sustainability claims, must be hidden when evidence is missing.
- Language and theme behavior must apply early in `<head>` to avoid FOUC and mixed-language first paint; persistence remains local-first via `localStorage` with try/catch safeguards.
- Responsive quality is first-class: key flows must work cleanly on mobile, tablet, and desktop, with branch cards, proof pages, and request flows usable from 360px upward.
- Accessibility requirements from UX and architecture must be built into the story set: keyboard access, visible focus, screen-reader labels, `aria-*` sync, reduced-motion fallback, and semantic page structure.
- SEO implementation requires full per-page metadata, canonical/hreflang handling, JSON-LD in `<head>`, static `sitemap.xml`, `robots.txt`, and an OG image baseline.
- Phase 1 request capture is expected to use a lightweight `mailto:` fallback with scenario and source-path metadata capture, while keeping within the PRD privacy limits.
- Architecture expects self-hosted Manrope Variable with preload and `font-display: swap` to protect performance and CLS.
- New controllers and flows must be decomposed so they can be covered with Jest unit tests plus Playwright smoke/E2E coverage for persisted or browser-visible behavior.
- Homepage decomposition must preserve the narrative order from the master plan: category framing -> bridge "not just a QR" -> mandatory verification preview -> branch split -> conversion -> trust floor.
- Terminology discipline is mandatory: keep `еАкциз` and `Дія` in Ukrainian, remove false bilingualism, and avoid internal-looking all-caps labels or unsupported trust claims.
- Trust placeholders must exist now for About, Contact, Proof & Cases, Privacy, Terms, and FAQ, even if some are starter/placeholder content in Phase 1.

### FR Coverage Map

FR1: Epic 1 - language switching across public surfaces
FR2: Epic 1 - persisted language preference
FR3: Epic 1 - theme switching across public surfaces
FR4: Epic 1 - persisted theme preference
FR5: Epic 1 - homepage proof-first category clarity
FR6: Epic 1 - `Дія` vs `genu.mark` role separation
FR7: Epic 1 - homepage CTA into proof path
FR8: Epic 1 - homepage branch recognition
FR9: Epic 1 - reachability of trust-floor destinations
FR10: Epic 2 - canonical verification example
FR11: Epic 2 - demo input and example-code entry flow
FR12: Epic 2 - persistent demo-mode notice on non-live surfaces
FR13: Epic 2 - valid proof-state example
FR14: Epic 2 - neutral no-data proof state
FR15: Epic 2 - explanatory no-data next step
FR16: Epic 2 - hidden empty proof sections
FR17: Epic 2 - source-labeled public proof facts
FR18: Epic 2 - supporting evidence links/documents
FR19: Epic 2 - suppression of unsupported sustainability content
FR20: Epic 2 - future-ready proof model extension seam
FR21: Epic 3 - consumer-intent intercept to `Дія`
FR22: Epic 3 - separate B2B CTA on consumer/B2B routing paths
FR23: Epic 3 - qualified request submission flow
FR24: Epic 3 - scenario and source-path metadata capture
FR25: Epic 2 - shareable public proof/demo states without login
FR26: Epic 1 - trust-floor destination access from the public site
FR27: Epic 1 - reserved knowledge navigation and IA
FR28: Epic 4 - future knowledge entry to CTA flow
FR29: Epic 4 - visibility into homepage-to-proof movement
FR30: Epic 4 - reporting by scenario and entry source
FR31: Epic 4 - reviewable proof-first funnel
FR32: Epic 4 - future abuse controls for live lookup

## Epic List

### Epic 1: Trust-First Homepage Foundation
Users understand `genu.im` from the first screen, see clear separation between `Дія` and `genu.mark`, can enter the proof path, and can access a minimum trust surface.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR9, FR26, FR27

Recommended stories:
- `1.1` Clarify the Homepage First Screen
- `1.2` Show the Two Main Visitor Needs
- `1.3` Remember the Chosen Language and Theme
- `1.4` Open the Main Site Information Pages
- `1.5` Show the Knowledge Section in Site Navigation

Priority order:
- `1.1 -> 1.2 -> 1.3 -> 1.4 -> 1.5`

### Epic 2: Public Proof Experience
Users can open the main verification example, see a clear result, use the demo input, encounter an honest no-data state, and view only proof content that is actually supported.
**FRs covered:** FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR25

Recommended stories:
- `2.1` Show the Main Verification Example
- `2.2` Show a Clear No-Data Result
- `2.3` Use the Demo Input and Sample Links
- `2.4` Show Only Supported Proof Content
- `2.5` Keep the Proof Page Ready for Future Fields

Priority order:
- `/v/genuim` as primary proof artifact precedes `/v/` as discovery/input surface
- `2.1 -> 2.2 -> 2.3 -> 2.4 -> 2.5`

### Epic 3: Audience Routing and Qualified Conversion
Users get the correct route by intent, then a relevant B2B CTA, then a qualified request flow, while scenario and source metadata are captured without extra user burden.
**FRs covered:** FR21, FR22, FR23, FR24

Recommended stories:
- `3.1` Guide Official Checks to `Дія`
- `3.2` Show the Right Business Next Step
- `3.3` Send a Qualified Request
- `3.4` Attach Scenario and Source Details

Priority order:
- routing precedes form-building
- `3.1 -> 3.2 -> 3.3 -> 3.4`

### Epic 4: Funnel Visibility and Growth-Ready Trust Expansion
The team gains measurable funnel visibility and review capability while the public surface remains ready for safe trust/knowledge expansion and future live-lookup protections.
**FRs covered:** FR28, FR29, FR30, FR31, FR32

Recommended stories:
- `4.1` Track Movement from Homepage to Proof
- `4.2` Track Requests by Scenario and Source
- `4.3` Review the Proof-First Funnel
- `4.4` Connect Future Knowledge Pages to the Next Step
- `4.5` Protect Future Live Checks from Repeated Abuse

Internal tracks:
- funnel visibility / reporting
- growth-ready trust / knowledge expansion

Boundary note:
- this epic owns review and expansion outcomes, not the initial capture prerequisites embedded in `Epic 2` and `Epic 3`

Global guardrails:
- primary narrative value precedes trust completion
- canonical proof precedes proof-hub convenience
- routing precedes form-building
- initial capture precedes later funnel reporting
- priority order defines recommended sequencing for story creation and acceptance, but does not prohibit parallel execution where dependencies do not exist
- `Does this story strengthen the trust-first journey, or is it merely convenient to implement?`

Handoff note:
- This epic structure is approved as a trust-first, cross-functional delivery model. It preserves the user journey from clarity to proof to action, keeps implementation slices independently deliverable, embeds quality-critical constraints at story level, and separates early capture prerequisites from later funnel visibility and expansion outcomes.

## Epic 1: Trust-First Homepage Foundation

Users understand `genu.im` from the first screen, see clear separation between `Дія` and `genu.mark`, can enter the proof path, and can access a minimum trust surface.

### Story 1.1: Clarify the Homepage First Screen

As a first-time homepage visitor,
I want the first screen to immediately explain what `genu.im` is and what it is not,
So that I can understand the offer without confusion and know where to go next.

**Acceptance Criteria:**

**Given** a visitor opens the homepage for the first time
**When** the first screen is displayed
**Then** it explains that `genu.im` is a public proof surface for marked products
**And** it does not present the site as a generic QR landing page

**Given** a visitor reads the first-screen copy
**When** the product role is described
**Then** the copy clearly separates `genu.mark` public proof from official checking in `Дія`
**And** it does not suggest that `genu.im` is the official checking service

**Given** a visitor decides to continue from the first screen
**When** they use the main CTA
**Then** they are taken to the canonical proof page `/v/genuim`
**And** the CTA text clearly states what happens next

**Given** a visitor opens the homepage on mobile or desktop
**When** the first screen is shown
**Then** the core message and main CTA are visible and usable
**And** the layout works at `360px` width without horizontal scrolling

### Story 1.2: Show the Two Main Visitor Needs

As a homepage visitor,
I want the homepage to show the two main needs this offer helps with,
So that I can quickly see whether it fits my case.

**Acceptance Criteria:**

**Given** a visitor scrolls past the first screen
**When** the next homepage section appears
**Then** it shows two clearly different blocks
**And** one block is about getting ready for `еАкциз` while the other is about showing proof about a marked product to buyers, partners, or auditors

**Given** a visitor reads both blocks
**When** they compare the headings, short descriptions, and CTAs
**Then** each block speaks to a different need
**And** each CTA clearly says what the visitor can do next

**Given** a visitor chooses the block that fits their case
**When** they click its CTA
**Then** they are taken to the matching destination for that block
**And** they do not need to guess which block is meant for them

**Given** a visitor opens the section on mobile or desktop
**When** the section is displayed
**Then** both blocks and both CTAs are visible, readable, and usable
**And** the layout works at `360px` width without hidden or overlapping actions

### Story 1.3: Remember the Chosen Language and Theme

As a visitor,
I want the site to remember the language and theme I choose,
So that the site feels consistent while I browse and when I return later.

**Acceptance Criteria:**

**Given** a visitor changes the language
**When** they continue using the site
**Then** the interface stays in the chosen language
**And** mixed-language text does not appear

**Given** a visitor changes the theme
**When** they continue using the site
**Then** the interface stays in the chosen theme
**And** the page remains readable and usable

**Given** a visitor returns to the site in a supported browser
**When** a page opens
**Then** the saved language and theme are restored when available
**And** the page does not first show one language or theme and then switch to another

**Given** browser storage is unavailable or restricted
**When** the site loads or the visitor changes the language or theme
**Then** the site still works without errors
**And** it uses fallback language and theme behavior

**Given** a visitor opens the site on mobile or desktop
**When** they use the language or theme controls
**Then** those controls are visible and usable
**And** the layout works at `360px` width without hiding them

### Story 1.4: Open the Main Site Information Pages

As a homepage visitor,
I want to open the main information pages from the site,
So that I can quickly find the background and policy information I need before moving on.

**Acceptance Criteria:**

**Given** a visitor wants more information before taking the next step
**When** they use the site links from the homepage
**Then** they can open pages for About, Contact, Proof & Cases, Privacy, Terms, and FAQ
**And** each link opens a working page

**Given** a visitor opens one of these pages
**When** the page is shown
**Then** it is clear what the page is for
**And** the page contains enough content to be useful

**Given** a visitor opens one of these pages from the public site
**When** the page loads
**Then** it has a clear title and purpose
**And** it is ready to be linked as a public destination from the site

**Given** a visitor moves between the homepage and these pages
**When** they use the site links
**Then** the links are clear and usable
**And** they can easily return to the homepage or continue to another page

**Given** a visitor opens these pages on mobile or desktop
**When** the pages load
**Then** the content and links are readable and usable
**And** the layout works at `360px` width without broken navigation or hidden links

### Story 1.5: Show the Knowledge Section in Site Navigation

As a visitor,
I want to find the knowledge section from the site,
So that I can see where guides and articles will live as the site grows.

**Acceptance Criteria:**

**Given** a visitor uses the site links
**When** they choose the knowledge section
**Then** the site opens a working knowledge page
**And** the page makes clear that this section is for guides and articles

**Given** a visitor opens the knowledge section
**When** the page is shown
**Then** it clearly indicates that this section is an early version of a larger content area
**And** it does not pretend that a full library already exists

**Given** a visitor moves between the homepage and the knowledge section
**When** they use the site links
**Then** the navigation is clear and usable
**And** they can easily return to the homepage or continue to another page

**Given** a visitor opens the knowledge section on mobile or desktop
**When** the page loads
**Then** the content and links are readable and usable
**And** the layout works at `360px` width without broken navigation or hidden links

## Epic 2: Public Proof Experience

Users can open the main verification example, see a clear result, use the demo input, encounter an honest no-data state, and view only proof content that is actually supported.

### Story 2.1: Show the Main Verification Example

As a visitor,
I want to open the main verification example and see a clear verified result,
So that I can understand what information this page provides.

**Acceptance Criteria:**

**Given** a visitor opens `/v/genuim`
**When** the page loads
**Then** it shows a clear verified result
**And** it is clear that this page is an example of the public verification view

**Given** a visitor reads the result on the page
**When** the proof details are shown
**Then** the visible facts are labeled by source
**And** the information is presented clearly

**Given** a visitor opens this page in Phase 1
**When** the page is displayed
**Then** the required demo or sample label is visible
**And** the page does not present the result as a live check

**Given** a visitor opens the page on mobile or desktop
**When** the page is displayed
**Then** the result content and links are readable and usable
**And** the layout works at `360px` width without broken structure or hidden core content

### Story 2.2: Show a Clear No-Data Result

As a visitor,
I want the site to clearly tell me when no public result is available for a code,
So that I understand the outcome without thinking the page is broken.

**Acceptance Criteria:**

**Given** a visitor reaches a result with no public information to show
**When** the page displays the outcome
**Then** it shows a neutral no-data message
**And** it does not present the state as an error

**Given** a visitor reads the no-data result
**When** the page explains the outcome
**Then** it makes clear that the code may not be available in the public verification view or may have been entered incorrectly
**And** the wording stays factual and calm

**Given** a visitor wants an official check after seeing no data
**When** they read the next-step guidance
**Then** the page points them to `Дія` for official checking
**And** it does not suggest that `genu.im` provides the official result

**Given** a visitor opens the no-data result on mobile or desktop
**When** the page is displayed
**Then** the message and links are readable and usable
**And** the layout works at `360px` width without broken structure or hidden content

### Story 2.3: Use the Demo Input and Sample Links

As a visitor,
I want to enter a code or choose a sample link on the demo page,
So that I can reach a result page without needing an account.

**Acceptance Criteria:**

**Given** a visitor opens `/v/`
**When** the page loads
**Then** it shows a clear code input and sample links
**And** the page makes clear what the visitor can do there

**Given** a visitor enters or pastes a code
**When** they submit it
**Then** the site takes them to the matching result state for that code flow
**And** the visitor does not need to log in

**Given** a visitor chooses a sample link
**When** they click it
**Then** the corresponding sample result opens
**And** the sample or demo labeling remains visible

**Given** a visitor opens the demo page on mobile or desktop
**When** the page is displayed
**Then** the input and sample links are readable and usable
**And** the layout works at `360px` width without broken structure or hidden controls

### Story 2.4: Show Only Supported Proof Content

As a visitor,
I want proof pages to show only information that is supported,
So that I can trust what the page displays.

**Acceptance Criteria:**

**Given** a proof page has supported proof details to show
**When** the page loads
**Then** only supported sections are displayed
**And** each visible claim can be tied to its source

**Given** a visible proof claim has a supporting link or document
**When** that claim is shown
**Then** the evidence link is also shown
**And** it is clearly associated with the claim it supports

**Given** a proof section has no approved data or required support
**When** the page loads
**Then** that section is hidden
**And** unsupported sustainability or similar claims are not shown

**Given** a visitor opens the proof page on mobile or desktop
**When** the visible proof sections are displayed
**Then** the content and evidence links are readable and usable
**And** the layout works at `360px` width without broken structure or hidden content

### Story 2.5: Keep the Proof Page Ready for Future Fields

As a visitor,
I want the proof page format to stay consistent as new approved fields are added later,
So that future proof pages can grow without becoming confusing.

**Acceptance Criteria:**

**Given** approved future proof fields are added later
**When** the proof page model is extended
**Then** the same proof page type can support those fields
**And** the current fields continue to work as before

**Given** an optional future field has no data
**When** the page is rendered
**Then** the missing field does not break the layout
**And** empty placeholder content is not shown

**Given** a current Phase 1 page uses only the existing fields
**When** the extended proof model is present
**Then** the page still renders correctly
**And** no extra user steps are introduced

## Epic 3: Audience Routing and Qualified Conversion

Users get the correct route by intent, then a relevant B2B CTA, then a qualified request flow, while scenario and source metadata are captured without extra user burden.

### Story 3.1: Guide Official Checks to `Дія`

As a visitor looking for an official check,
I want the site to direct me to `Дія`,
So that I use the correct service for an official result.

**Acceptance Criteria:**

**Given** a visitor reaches the official-check guidance
**When** the message is shown
**Then** it clearly says that official checking belongs in `Дія`
**And** it does not suggest that `genu.im` provides the official result

**Given** a visitor wants to continue to the official check
**When** they use the official-check CTA
**Then** they are directed to `Дія`
**And** the CTA makes that destination clear before click

**Given** a visitor opens this guidance on mobile or desktop
**When** the section or page is displayed
**Then** the message and CTA are readable and usable
**And** the layout works at `360px` width without hidden or broken controls

### Story 3.2: Show the Right Business Next Step

As a business visitor,
I want the site to show a separate business next step,
So that I can continue toward marking, proof, or transparency help instead of the official-check path.

**Acceptance Criteria:**

**Given** a visitor sees the routing choices
**When** the business option is displayed
**Then** it is clearly separate from the official-check path
**And** it makes clear that it is for business use

**Given** a visitor wants the business path
**When** they use its CTA
**Then** they are taken to the matching business next step
**And** the CTA text makes that next step clear before click

**Given** a visitor opens this business option on mobile or desktop
**When** the section or page is displayed
**Then** the business copy and CTA are readable and usable
**And** the layout works at `360px` width without hidden or broken controls

### Story 3.3: Send a Qualified Request

As a business visitor,
I want to send a short request with my company and situation,
So that I can ask for help without filling a long form.

**Acceptance Criteria:**

**Given** a visitor opens the request form
**When** the form is displayed
**Then** it asks only for the fields needed for the request
**And** it stays within the Phase 1 limit of no more than `5` user-entered fields

**Given** a visitor fills in the required fields correctly
**When** they submit the form
**Then** the request is prepared with their entered business details and scenario
**And** the configured Phase 1 request handoff works without requiring login

**Given** a visitor misses a required field or enters invalid data
**When** they try to submit the form
**Then** the form is not sent
**And** the page clearly shows what needs to be fixed

**Given** a visitor opens the form on mobile or desktop
**When** they use it
**Then** the fields, labels, and submit action are readable and usable
**And** the layout works at `360px` width without broken structure or hidden controls

### Story 3.4: Attach Scenario and Source Details

As a business visitor,
I want the site to carry over the path and scenario that led me to the request form,
So that I do not have to repeat that context by hand.

**Acceptance Criteria:**

**Given** a visitor reaches the request flow from a specific path or scenario
**When** the request form loads or prepares the handoff
**Then** the scenario and source details are attached automatically
**And** the visitor does not need to type them manually

**Given** a request handoff is created
**When** the request details are assembled
**Then** the scenario and source-path details are included with the request
**And** adding that metadata does not add extra user-entered fields

**Given** scenario or source metadata is missing or unavailable
**When** the visitor submits the request
**Then** the request still works
**And** missing metadata does not block submission

## Epic 4: Funnel Visibility and Growth-Ready Trust Expansion

The team gains measurable funnel visibility and review capability while the public surface remains ready for safe trust and knowledge expansion and future live-check protections.

### Story 4.1: Track Movement from Homepage to Proof

As a product team member,
I want to see when visitors move from the homepage to the main proof example,
So that I can tell whether the trust-first entry is being used.

**Acceptance Criteria:**

**Given** a visitor moves from the homepage to the main proof example
**When** that movement is captured
**Then** it is recorded as a homepage-to-proof action
**And** it can be distinguished from unrelated page views

**Given** measurement data is stored or reviewed
**When** homepage-to-proof actions are recorded
**Then** the data excludes full raw codes and personal data
**And** it remains suitable for public-site reporting

**Given** measurement capture fails or is unavailable
**When** a visitor uses the homepage proof entry
**Then** the visitor still reaches the proof page normally
**And** the measurement problem does not break the user journey

### Story 4.2: Track Requests by Scenario and Source

As a product team member,
I want to review requests by scenario and entry source,
So that I can see which paths create useful demand.

**Acceptance Criteria:**

**Given** a qualified request is created
**When** request metadata is available
**Then** the request keeps its scenario and source details for review
**And** requests can be grouped by those fields

**Given** request review data is displayed
**When** scenario and source details are shown
**Then** full raw codes and personal data are not exposed in reporting outputs
**And** the request can still be understood for business review

**Given** a request is missing some metadata
**When** it appears in review data
**Then** the request is still visible
**And** missing metadata does not break reporting

### Story 4.3: Review the Proof-First Funnel

As a product team member,
I want to review the journey from homepage to proof to request,
So that I can judge whether the release supports the intended trust-first funnel.

**Acceptance Criteria:**

**Given** homepage-to-proof and request-source data exist
**When** the funnel is reviewed
**Then** the homepage, proof, and request steps can be seen together
**And** those steps use consistent definitions

**Given** the team reviews the funnel
**When** they compare the major steps
**Then** they can see where visitors continue and where they stop
**And** they can review the funnel without needing raw personal data

### Story 4.4: Connect Future Knowledge Pages to the Next Step

As a visitor,
I want a future knowledge page to lead me to a relevant next step,
So that guidance content can help me continue through the site.

**Acceptance Criteria:**

**Given** knowledge content is enabled in a later phase
**When** a visitor opens a knowledge page
**Then** the page includes a relevant CTA
**And** the CTA matches the content topic

**Given** a visitor uses that CTA
**When** they continue from the knowledge page
**Then** they are taken to a matching next step
**And** they do not reach a dead end

### Story 4.5: Protect Future Live Checks from Repeated Abuse

As a product team member,
I want future live public checks to apply simple protections against repeated abusive requests,
So that the verification endpoint remains usable for normal visitors.

**Acceptance Criteria:**

**Given** live public checks are enabled in a later phase
**When** repeated or enumeration-style requests occur
**Then** bounded protections are applied
**And** normal visitors can still use the service

**Given** a protection is triggered
**When** the abusive pattern is limited
**Then** the response does not expose internal details
**And** it communicates the limit in a controlled way

**Given** Phase 1 static proof pages are in use
**When** visitors open the current proof examples
**Then** no fake rate-limit behavior is shown
**And** the static experience continues to work normally
