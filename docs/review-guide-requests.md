# Request Review Guide — Phase 1

Team-internal reference for reviewing incoming requests via the genu.im request form.

---

## 1. Phase 1 Review Overview

Requests submitted via the `/request/` form are delivered to the **`hello@genu.im`** inbox via a `mailto:` handoff.

**Critical constraints:**

- **`mailto:` is best-effort.** Delivery depends on the visitor's mail client being configured and open. Not all submitted requests will arrive. Do not claim guaranteed capture or storage.
- **No backend storage.** There is no server-side submission, no database, no logging endpoint. Requests exist only if they arrive in the inbox.
- **No live dashboard.** There is no real-time analytics surface, no funnel counter, no telemetry pipeline.
- **Review mechanism:** Manual inbox inspection, optionally aided by email client filtering rules.

---

## 2. Scenario-to-Label Reference

The `scenario` field value appears in both the email subject line (raw value) and the email body (display label + raw value in brackets).

| Select Value | Display Label | Description |
|---|---|---|
| `brand-proof` | Brand Proof Rollout | Visitor exploring public proof for their marked product |
| `eaktsyz` | eAktsyz Readiness | Visitor assessing readiness for eAktsyz marking requirements |
| *(empty)* | *(not set)* | Scenario was not captured or visitor reached form directly without a `?scenario=` param |

**Email subject line format** (used for inbox filtering):

```
genu.im request: CompanyName — brand-proof
```

**Email body Scenario line format** (human-readable):

```
Scenario: Brand Proof Rollout [brand-proof]
```

The raw value in brackets enables inbox filter rules to match exact scenario codes.

---

## 3. Source Path Reference

The `source_path` field records where the visitor came from before reaching the request form.

| Source Path Value | Origin Page | Entry Trigger |
|---|---|---|
| `/perevir-product/` | Official check / business routing page | B2B CTA on `/perevir-product/` with `?scenario=brand-proof` |
| `/request/` | Request form direct | Visitor opened `/request/` directly; no `?from=` param |
| `/v/genuim/` | Canonical proof example | CTA from proof example page (if implemented in future) |
| *(empty)* | Unknown / not captured | `captureMetadata()` returned an empty string; visitor may have navigated directly or from an untracked referrer |

Source path appears in the email body as:

```
Source: /perevir-product/
```

If source path was not captured, the `Source:` line is omitted from the email body entirely.

---

## 4. How to Group Requests

Use your email client's filtering or search capabilities:

**By scenario — subject line filter:**
- Filter by subject containing: `brand-proof`
- Filter by subject containing: `eaktsyz`

**By scenario — body label filter:**
- Filter by body containing: `Brand Proof Rollout`
- Filter by body containing: `eAktsyz Readiness`

**By source path — body filter:**
- Filter by body containing: `Source: /perevir-product/`
- Filter by body containing: `Source: /request/`

**Manual grouping:** Create inbox folders or labels per scenario value. Move matched messages to the corresponding folder for periodic review.

---

## 5. NFR13 Privacy Guardrails for Team-Produced Summaries

When producing any aggregated summary of requests (e.g., a weekly count, a product review document), follow these rules:

**Safe to include:**
- Count by scenario label — e.g., "8 Brand Proof Rollout requests"
- Count by source path — e.g., "5 from `/perevir-product/`"
- Time range — e.g., "Week of 2026-03-10"

**Never include in aggregated outputs:**
- Contact names from individual requests
- Email addresses or phone numbers from individual requests
- Raw excise codes or product identifiers (e.g., `1234567890123`)
- Any data that could identify an individual requestor

**Rationale:** NFR13 — public measurement and reporting shall exclude full raw codes and personal data from public analytics outputs. This applies equally to internal team summaries shared beyond the inbox owner.

---

## 6. Missing-Metadata Handling

Not every request will have complete metadata. This is expected and does not indicate a form error.

| Situation | What to expect | How to handle |
|---|---|---|
| Request without scenario | Subject: `genu.im request: CompanyName — ` (empty after dash); body: `Scenario:  []` | Count as "Scenario not set"; request is still valid |
| Request without source path | `Source:` line absent from email body | Count as "Source unknown"; request is still valid |
| Request without proof path | `Proof page:` line absent from email body | Normal — proof path is only set for requests originating from a proof surface |
| No email received | No record in inbox | Known Phase 1 limitation; `mailto:` delivery is environment-dependent; do not count as a failed request if the visitor may have completed via a direct email |

**Key principle:** A request without scenario or source is still a valid business inquiry. The contact name, email/phone, company, and context fields are always present when the form was submitted correctly.

---

## 7. Transport Limitation Reminder

The `mailto:` handoff is **not server submission**. The email body includes the explicit notice:

```
Sent via genu.im request form (mailto: handoff — not server submission)
```

Do not:
- Claim that requests are "stored" or "recorded" server-side in any team communication
- Quote a total request count as definitive (some requests may not have arrived)
- Use request volume as a precise funnel metric without acknowledging delivery uncertainty

Do:
- Use request volume as a directional signal, not a guaranteed count
- Note the Phase 1 limitation when sharing request data with stakeholders
