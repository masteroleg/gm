# Sprint Change Proposal - 2026-03-11

## Section 1: Issue Summary

- **Trigger:** Residual `CONCERNS` after implementation-readiness review, localized to `ux-design-specification.md` and specifically to the `NoDataState` section.
- **Context:** `PRD`, `Architecture`, and `Epics` are already aligned and do not need reopening. The remaining gap is that the UX artifact under-specifies the approved no-data behavior.
- **Evidence:**
  - `FR14` in `prd.md` requires a neutral no-data state with no authenticity, legality, or state-approval claims, and requires the next-step CTA to stay separate from any official consumer-check action.
  - `FR15` in `prd.md` requires the no-data state to explain what public proof could appear and to include a business CTA.
  - `Story 2.2` in `epics.md` requires factual, calm no-data copy and explicit guidance to `Дія` for official checking.
  - The current `NoDataState` entry in `ux-design-specification.md` only covers neutral wording plus redirect to `Дія`, so it still lags accepted requirements.

## Section 2: Impact Analysis

### Epic Impact

- **Affected epic:** `Epic 2: Public Proof Experience`
- **Affected story:** `Story 2.2: Show a Clear No-Data Result`
- **Impact type:** Documentation alignment only; epic scope, story structure, and backlog order remain valid.

### Story Impact

- No new stories are required.
- No story IDs need renumbering.
- `Story 3.2` remains relevant as supporting context for the required separate business CTA, but it does not need modification.

### Artifact Conflicts

- `prd.md` - no change required
- `architecture.md` - no change required
- `epics.md` - no change required
- `ux-design-specification.md` - targeted update required in `NoDataState`

### Technical Impact

- No change to architecture, routing, page inventory, or Phase 1 scope.
- No new proof surfaces, no live lookup semantics, and no submission semantics are introduced.
- Expected follow-up is a repeat implementation-readiness pass with an expected `PASS` if no new contradictions are found.

## Section 3: Recommended Approach

- **Selected path:** Direct Adjustment
- **Why this path:** The issue is a narrow artifact-sync gap, not a product, architecture, or delivery problem. A focused UX-spec correction resolves the residual concern while preserving approved scope and sprint momentum.
- **Effort:** Low
- **Risk:** Low
- **Timeline impact:** Minimal; no backlog replan or artifact reopening required.

## Section 4: Detailed Change Proposals

### UI/UX Specification Update

**Artifact:** `_bmad-output/planning-artifacts/ux-design-specification.md`

**Section:** `NoDataState`

**OLD:**

```md
#### NoDataState

**Призначення:** Чесний нейтральний стан коли код не знайдено — USP чесності платформи

**Копія:**
> *"Цей код не зареєстрований у genu.mark. Можливо, продукт не маркований через нашу платформу — або код введено невірно. Для офіційної перевірки акцизу → Дія."*

**Заборони:** жодного червоного кольору, жодних "помилок", жодного overclaiming

**Accessibility:** `role="status"`, нейтральний тон, посилання на Дія в новій вкладці з `aria-label`
```

**NEW:**

```md
#### NoDataState

**Призначення:** Чесний нейтральний стан коли в `genu.im` немає публічного proof для цього коду. Це межа публічної surface, а не помилка, не підтвердження справжності, не юридичний висновок і не live lookup.

**Копія:**
> *"Для цього коду в `genu.im` зараз немає публічного proof. Це може означати, що публічний запис у цій surface недоступний — або код введено невірно. `genu.im` не показує офіційний результат перевірки акцизу; для офіційної перевірки використовуйте Дія."*

**Якщо публічний proof доступний, тут можуть з'явитися лише такі блоки:**
- статус / result label
- source-labeled facts з контуру `genu.mark`
- відомості про продукт або категорію
- source disclosure (`джерело`, `timestamp`)
- NDA-safe evidence links або documents, якщо вони справді доступні

**Next steps:**
- `Дія ↗` — окремий external action тільки для official checking
- окремий business CTA — наприклад, *"Обговорити маркування або public proof для мого продукту →"*

**Заборони:** жодного червоного кольору, жодних "помилок", жодного overclaiming, жодних authenticity / legality / state-approval claims, жодних submission semantics, жодних live lookup semantics, жодних нових Phase 1 surfaces

**Додаткове правило:** показуються тільки підтримані proof blocks; порожні секції не рендеряться

**Accessibility:** `role="status"`, нейтральний тон, окремі й візуально розділені дії для `Дія` та business CTA, посилання на `Дія` в новій вкладці з `aria-label`
```

**Rationale:**

- Brings the UX spec into explicit alignment with `FR14` and `FR15`.
- Preserves honest neutral no-data semantics.
- Keeps official checking in `Дія` and separates it from the business next step.
- Adds the missing public-proof-block list without introducing any new page type or Phase 1 scope.
- Makes the non-goals explicit so implementation does not drift into submission or live-lookup behavior.

## Section 5: Implementation Handoff

- **Scope classification:** Minor
- **Route to:** Direct artifact correction limited to `ux-design-specification.md` before Sprint Planning
- **Responsibilities:**
  - Update `_bmad-output/planning-artifacts/ux-design-specification.md`
  - Keep `prd.md`, `epics.md`, and `architecture.md` unchanged unless a new direct contradiction is discovered
  - Re-run implementation-readiness after the UX-spec correction
- **Success criteria:**
  - `NoDataState` in `ux-design-specification.md` explicitly preserves honest neutral no-data behavior
  - `Дія` remains the explicit official-check path
  - potential public proof blocks are listed clearly
  - a separate business CTA is explicit and distinct from `Дія`
  - empty proof sections remain hidden / non-rendered when unsupported
  - no submission semantics, live lookup semantics, or new Phase 1 surfaces are introduced
  - follow-up implementation-readiness review is expected to return `PASS`, assuming no new direct contradictions are discovered
