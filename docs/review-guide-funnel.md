# Review Guide: Proof-First Funnel

_Team-internal documentation for Phase 1 funnel review and measurement._

**Last updated:** March 2026  
**Scope:** Phase 1 (Static site, passive signals, manual review)  
**Audience:** Product team, analytics reviewers, leadership

---

## Section 1: Phase 1 Funnel Overview

The genu.im proof-first funnel consists of three steps:

1. **Homepage → Proof Entry** — Brand discovers genu.im and clicks the primary CTA to see a proof example
2. **Proof Engagement** — Visitor explores the proof example and verifies the concept
3. **Request Submission** — Brand submits a request to integrate genu.im into their verification workflow

### Measurement Approach

All Phase 1 signals are **passive and manual** — meaning:

- No backend captures or stores visitor behavior automatically
- No live analytics dashboard exists
- No guarantee that all interactions are recorded
- Review relies on manual inspection of three separate data sources
- The signals are **directional and best-effort**, not precise metrics

This approach is intentional: Phase 1 focuses on release and integration, not analytics infrastructure. If and when the product scales, Phase 2+ will introduce a proper analytics pipeline with real-time tracking and dashboards.

### When to Use This Guide

Use this guide when:
- The product team reviews the release and needs to assess funnel health
- Leadership asks "Are visitors using the proof-first flow?"
- You need to understand how to combine multiple signals into one picture
- You want to spot gaps in the funnel (where visitors drop off)

**Do not use this guide for:**
- Real-time monitoring (not supported in Phase 1)
- Precise ROI calculations (data is too directional)
- Individual user tracking (not captured; not a goal)

---

## Section 2: Funnel Step Definitions

### Step 1: Homepage → Proof Page Entry

**Signal Source:** UTM parameter `utm_campaign=proof_entry` on the primary hero CTA

**Phase 1 Observable Limitation:** The UTM parameter (`utm_campaign=proof_entry`) exists on the hero CTA href and would identify homepage-to-proof CTA clicks in a client-side analytics tool (Google Analytics, Plausible, etc.). In Phase 1, no such tool is installed — **this UTM signal is not measurable in Phase 1.**

**Nearest available proxy:** Google Search Console (GSC) → Performance tab for `/v/genuim/`. This measures organic search traffic to the proof page — it does **not** measure homepage CTA clicks.

**How to use GSC as proxy:**
1. Log into GSC for genu.im
2. Go to Performance → Pages
3. Filter by URL `/v/genuim/` — this shows clicks and impressions from Google search results only
4. Note: Direct navigation, homepage CTA traffic, and bookmarked visits do not appear in GSC

**Interpretation (organic search proxy only):**
- **High impressions = Proof page appears frequently in Google search results**
- **High clicks = Searchers are clicking through to the proof page from Google**
- **Low impressions = Proof page is not yet ranking in organic search**

**What GSC does NOT tell you for Step 1:** How many visitors arrived via the homepage hero CTA. That signal requires client-side analytics (Phase 2+ scope).

**Key Limitation:**
Only the **homepage hero CTA** carries the `utm_campaign=proof_entry` UTM param. Other entry points do NOT:
- Direct navigation to genu.im (no UTM params)
- Demo input via `/v/?code=...` (different URL, no UTM)
- External links pointing to genu.im (no UTM unless the link includes them)

**Why this limitation exists:**
- Phase 1 uses simple, client-side UTM params
- Adding UTM coverage to every CTA and integration point would require more complex tracking
- For now, we monitor the homepage hero CTA as the primary entry signal

**What the GSC proxy misses:** Direct navigation (typed URL), clicks from internal page links (including the homepage hero CTA), and bookmarked visits are all invisible to GSC. The actual number of visitors who viewed `/v/genuim/` is higher than the GSC click count. Phase 2 analytics tooling would be required to measure the full picture.

---

### Step 2: Proof Page Engagement

**Signal Source:** Page views on `/v/genuim/` from any source

**Phase 1 Observable:** This step **shares the same GSC proxy signal as Step 1** — there is no separate Phase 1 observable for proof page engagement. The organic search clicks and impressions for `/v/genuim/` already appear in the Step 1 GSC data. See Step 1 above for how to retrieve this data in GSC.

**There is no independent Phase 1 signal for Step 2.** Full page-view tracking (direct navigation, homepage CTA arrivals, bookmarks, demo input) requires client-side analytics (Phase 2+ scope).

**Key Limitation:**
The shared GSC signal does NOT include:
- Direct navigation (typing the URL)
- Clicks arriving via the homepage hero CTA (see Step 1 — not captured in GSC)
- Visitors who already have the link bookmarked
- Demo input that lands on `/v/` (different URL)

**Why:** GSC measures search engine traffic only. To capture all visitor types, Phase 2+ would need client-side analytics (Google Analytics, Plausible, etc.).

**Qualitative observation:**
You can also visit `/v/genuim/` yourself to confirm:
- Page loads without errors ✅
- Demo notice or banner is visible
- Main heading and call-to-action are present
- Page is responsive and readable

---

### Step 3: Request Submission

**Signal Source:** Email received at `hello@genu.im` with scenario and source metadata in the body

**Observable:** Manual inbox review (following `docs/review-guide-requests.md`)

**Email format (example):**
```
Subject: genu.im request: CompanyName — brand-proof

Contact: John Doe
Email / Phone: john@company.com
Company: CompanyName
Scenario: Brand Proof Rollout [brand-proof]

Context:
We want to display proof of our product on our website.

Source: /perevir-product/
Proof page: /v/genuim/
```

**How to review:**
1. Open `hello@genu.im` inbox
2. Look for emails with subject starting with "genu.im request:"
3. Note the scenario label and source path from the body
4. See `docs/review-guide-requests.md` for detailed counting and privacy guidance

**Interpretation:**
- **High request count = Brands are interested and submitting requests**
- **Source path distribution = You can see which CTAs are driving requests** (e.g., `/perevir-product/` vs other sources)
- **Scenario breakdown = You can see which use cases are attracting interest** (Brand Proof vs eAktsyz)

**Key Limitation:**
`mailto:` links are **best-effort delivery**. Not all submitted requests arrive in the inbox:
- User's email client may block or filter the email
- SMTP may reject the message
- User may close the form before sending
- The request may land in spam

**Why:** `mailto:` is a client-side mechanism — the browser opens the user's email app. The server has no visibility into whether the email actually sent or arrived.

**Never say:** "We received X requests" without noting the delivery limitation.  
**Instead say:** "We received X emails; the actual submission count may be higher due to mailto: delivery gaps."

---

## Section 3: Reading the Funnel Together

A complete Phase 1 funnel review combines all three signals:

1. **GSC signal** → "How many visitors arrived from homepage?"
2. **Proof engagement** → "How many visitors viewed the proof page in search?"
3. **Inbox count** → "How many requests did we receive?"

### Minimal Review Template

Use this template to conduct a monthly or quarterly funnel review:

```
Funnel Review — [Date Range]
Reviewed by: [Name]
Date: [Review Date]

STEP 1: Homepage → Proof Entry
- GSC impressions for /v/genuim/ in period: [N]
- GSC clicks for /v/genuim/ in period: [N]
- Note: UTM-attributed arrivals from the homepage hero CTA are **not captured in GSC at all** — GSC measures organic search traffic only. Homepage CTA → proof page clicks are not measurable in Phase 1 without client-side analytics (Phase 2+ scope)

STEP 2: Proof Engagement
- GSC data (Step 1 above) gives a directional signal
- Qualitative check: proof page loads correctly? ✅
- Note: Full page-view tracking (direct navigation, bookmarks, etc.) not available in Phase 1

STEP 3: Requests Received
Total emails received in period: [N]

  By scenario:
  - Brand Proof Rollout: [N]
  - eAktsyz Readiness: [N]
  - Scenario not set: [N]

  By source path:
  - From /perevir-product/: [N]
  - From /request/?scenario=...: [N]
  - Source unknown: [N]

  Note: mailto: delivery is not guaranteed. Received count may be lower than actual submissions.

FUNNEL SUMMARY:
- Strong signal (clicking proof) from [N] GSC clicks
- Received [N] requests from brands
- Key insight: [What did you learn?]

Phase 1 Limitation Reminder:
These signals are directional, not precise. Missing data (zero counts) does not mean no activity occurred — it means the activity was not captured via these specific Phase 1 signals.
```

### Combining the Signals

**Example interpretation:**

> "In February, GSC showed 150 clicks for /v/genuim/. We received 12 emails from brands interested in Brand Proof. This suggests that while proof discoverability is good (150 clicks), conversion to explicit requests is lower (12). We should review whether the proof example clearly explains the next steps."

**Example of honest missing data:**

> "In March, we received 8 request emails from Brand Proof and 2 from eAktsyz. GSC data was unavailable for this period due to search console setup issues. We cannot assess the top-of-funnel signal (homepage-to-proof) for this month. Recommendation: restore GSC tracking for next month."

---

## Section 4: NFR13 Privacy Guardrails

Sensitive data must be excluded from any funnel summary shared beyond the inbox owner.

### What You CAN Share:

✅ **Scenario label counts** — e.g., "3 Brand Proof requests, 1 eAktsyz request"  
✅ **Source path counts** — e.g., "5 requests from /perevir-product/, 2 from direct /request/"  
✅ **GSC aggregate data** — e.g., "150 clicks for /v/genuim/ in February"  
✅ **Directional trends** — e.g., "Request volume increasing month-over-month"

### What You CANNOT Share:

❌ **Contact names** — Never include contact names in shared funnel reports  
❌ **Email addresses** — Personal emails must stay in the inbox  
❌ **Phone numbers** — Private contact details must stay in the inbox  
❌ **Raw scenario codes** — If sharing counts, use labels only (not raw codes like "eaktsyz")  
❌ **Company names** — May identify individuals; keep confidential  
❌ **Context text** — Business details and use cases are sensitive; quote labels only

### Why This Matters:

The funnel review is a **team-internal artifact** meant for:
- Product decisions about what to build next
- Understanding release impact
- Assessing feature adoption

It is **not meant for:**
- Public marketing
- External stakeholder reports (without privacy review)
- Detailed customer tracking
- Compliance reports that expose personal data

**Reference:** See `docs/review-guide-requests.md` Section 5 for more privacy guidance.

---

## Section 5: Partial / Missing Data Handling

Phase 1 is incomplete by design. Not all signals will be available in every review period. The key principle is:

**State what is available. State what is not. Never extrapolate.**

### Common Scenarios and What to Write

| Scenario | What to Write | What NOT to Write |
|----------|---------------|-------------------|
| GSC data unavailable for a period (e.g., setup issue, search console access lost) | "Homepage-to-proof signal unavailable for [dates] — GSC tracking was not active." | "X visitors moved from homepage to proof" (when you have no data) |
| Proof page engagement not tracked | "Proof page engagement not directly measurable in Phase 1 without additional analytics tooling." | "Y visitors engaged with the proof page" (when you don't know) |
| No request emails received | "No request emails received in [period] via mailto: — this may reflect delivery gaps or low interest." | "0 requests submitted" (implies nobody submitted; actual may be higher) |
| Partial request delivery | "Z request emails received; actual submission count may be higher due to mailto: delivery limitations." | "Z requests submitted" (overstates certainty) |
| Source path missing from some requests | "Of [N] requests, [M] included source path; [N-M] source unknown." | Don't try to infer the unknown sources |

### The Principle: Transparency Over Completeness

A partial funnel review is better than a complete-looking but inaccurate one.

**Good example:**
> "In Q1, we received 18 request emails (Brand Proof: 14, eAktsyz: 4). GSC data shows 450 clicks for /v/genuim/ (organic search only). Actual homepage-to-proof traffic is likely higher due to direct navigation and internal links, which GSC does not capture. We have good funnel health signals, but Phase 1 limits our ability to measure the full picture. Recommended: Phase 2 will add client-side analytics for complete tracking."

**Bad example (misleading):**
> "In Q1, 450 visitors used the proof-first funnel, and we converted 18 to requests (4% conversion). We received no other traffic."

The bad example implies precision that Phase 1 does not have. It also ignores delivery gaps and missing signals.

---

## Section 6: Known Phase 1 Limitations

### Intentional Design Choices (Not Bugs)

1. **UTM params cover homepage hero CTA only**
   - Why: Phase 1 keeps it simple; other CTAs and integrations are not tracked
   - Impact: We measure the primary entry path, not all entry paths
   - Future: Phase 2 can add UTM coverage to more CTAs or use analytics instead

2. **Proof page views not tracked end-to-end**
   - Why: No client-side analytics library (Phase 1 design choice)
   - Impact: We can only see organic search traffic (GSC), not all page views
   - Future: Phase 2 can add Google Analytics or Plausible for complete tracking

3. **`mailto:` delivery is best-effort**
   - Why: `mailto:` is a client-side mechanism; the server cannot guarantee delivery
   - Impact: Request counts are directional, not definitive
   - Future: Phase 2 can add server-side form submission for guaranteed capture

4. **No backend storage or telemetry**
   - Why: Phase 1 is a static site; no runtime infrastructure
   - Impact: All signals must be manually reviewed; no live dashboard
   - Future: Phase 2 can add a backend to support live analytics and dashboards

### What This Means for the Team

- **We have good release visibility via passive signals**
- **We can spot major funnel problems (e.g., broken pages, no requests)**
- **We cannot measure precise metrics or real-time behavior**
- **We should plan Phase 2 analytics as the product scales**

### Transition to Phase 2+

This review guide will be superseded when Phase 2+ analytics are adopted. At that point:
- Real-time data will replace manual review
- Dashboards will show live funnel metrics
- Backend submission will replace `mailto:`
- UTM params may be replaced or supplemented with event tracking

Until then, trust the Phase 1 signals and acknowledge their limitations in team discussions.

---

## Appendix: Quick Reference

### Email Example

**Subject:** `genu.im request: BrandName — scenario-label`

**Body:**
```
Contact: [Name]
Email / Phone: [Contact]
Company: [Company]
Scenario: [Human Label] [raw-code]

Context:
[Brand's use case]

Source: [where they came from]
Proof page: [which proof URL they saw]
```

### Privacy Checklist

Before sharing any funnel report:
- [ ] No contact names included
- [ ] No email addresses included
- [ ] No phone numbers included
- [ ] Scenario labels used, not raw codes
- [ ] Counts by scenario and source only
- [ ] No company names or personal details
- [ ] Limitations clearly stated

### Files Referenced in This Guide

- `docs/review-guide-requests.md` — Request inbox review and scenario details
- `site/index.html` — Hero CTA with UTM params
- `site/assets/js/request-form.js` — Scenario label mapping
- Google Search Console — GSC performance data for `/v/genuim/`
- `hello@genu.im` inbox — Request email review

---

## Contact & Questions

For questions about this guide or the Phase 1 funnel:
- Review `docs/review-guide-requests.md` for request-specific guidance
- Check the Epic 4 acceptance criteria and retrospective for context
- Contact the product team for clarifications on measurement strategy

---

_This is a Phase 1 guide. It will evolve as the product and analytics infrastructure mature._
