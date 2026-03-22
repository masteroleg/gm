---
title: Економіка впровадження
asset_type: Shared optional
audience: CFO / economic buyer / sponsor
funnel_stage: Late
decision_to_unlock: Validate the economic logic and justify moving to proposal, audit, or pilot
one_sentence_purpose: Give economic buyers a disciplined way to evaluate the value of launching `genu.mark` without fake precision or mixed narrative logic
single_key_message: Найсильніший business case починається не з красивих digital-обіцянок, а з меншого хаосу, швидшого старту, меншого rework і кращого контролю при впровадженні `genu.mark`
primary_cta: Validate ROI assumptions
secondary_cta: Move to proposal
owner: Founder / sales / PM / finance reviewer
status: Optional later branch source
last_updated: 2026-03-21
source_inputs:
  - source-of-truth/01-platform-core.md
  - source-of-truth/04-regulated-buyer-model.md
  - source-of-truth/05-message-house.md
  - source-of-truth/06-claims-register.md
  - buyer-facing/shared/02-packages.md
  - buyer-facing/regulated/05-evidence-pack-audit-ready.md
---

# Економіка впровадження

## Роль документа

Цей документ відповідає на late-stage питання:

`Чому для бізнесу вигідніше запустити genu.mark як контрольований контур, ніж тягнути проект через patchwork, затримки та ручний chaos?`

Його задача - дати CFO або economic buyer достатньо ясну логіку для переходу до пропозиції.

## Що це не є

- не обіцянка ROI;
- не таблиця з вигаданими відсотками;
- не спроба продати маркетинговий upside як базовий кейс;
- не універсальна модель для будь-якого клієнта.

## Основне правило економіки

Базовий економічний кейс у regulated-продажі має починатися з таких речей:
- менше ризику зриву старту;
- менше ручного хаосу;
- менше rework та data cleanup;
- менше координаційного перевантаження між сторонами;
- швидший перехід до контрольованого контуру.

Якщо клієнт окремо хоче рахувати зовнішній trust effect або інші додаткові сценарії, це рахується окремо, а не змішується з базовою regulated-економікою.

## Головна економічна теза

Найсильніший business case тут не про `digital wow`.

Він про те, що хаотичне або надто фрагментоване впровадження коштує дорого:
- зупинками;
- ручними виправленнями;
- затримками у запуску;
- дублюванням роботи між постачальниками;
- довшими погодженнями.

## Головні value buckets

### 1. Уникнений виробничий хаос

Питання для клієнта:
- скільки коштує один збій або затримка на лінії;
- скільки коштує нестабільний старт;
- скільки часу з'їдає ручна координація під час збоїв.

Логіка:

`Avoided disruption value = avoided incidents x cost per incident`

### 2. Менше rework і ручних виправлень

Питання для клієнта:
- скільки людей виправляють, звіряють або перепаковують дані вручну;
- скільки часу йде на повторні проходи та інциденти;
- скільки коштує відновлення картини після помилки.

Логіка:

`Avoided rework value = avoided hours x loaded internal cost`

### 3. Менше fragmentation cost

Питання для клієнта:
- скільки сторін доводиться координувати;
- де виникають ownership gaps;
- скільки management time йде на stitching між обладнанням, інтеграціями і зовнішніми контурами.

Логіка:

`Avoided fragmentation value = coordination load + duplicated effort + issue-resolution cost`

### 4. Швидший контрольований старт

Питання для клієнта:
- що коштує затримка старту;
- що коштує довше вікно невизначеності;
- скільки коштує затягнута readiness phase.

Логіка:

`Speed value = earlier stable operation + avoided delay cost`

### 5. Менше friction при погодженні та перевірці

Питання для клієнта:
- скільки часу йде на зайві кола погоджень;
- скільки коштує відсутність ясного evidence contour;
- скільки втрачається через слабку доказовість проекту.

Логіка:

`Diligence value = reduced review cycles + reduced clarification effort + reduced approval delay`

## Рекомендована модель розрахунку

Використовуйте чотири рівні:

### A. Вартість поточного хаосу

- інциденти;
- ручні виправлення;
- координаційне перевантаження;
- затримки погодження.

### B. Вартість більш контрольованого запуску

- сильніше ядро;
- зрозуміліші межі відповідальності;
- легший старт першої фази;
- менше emergency work.

### C. Вартість обраного package path

- аудит / архітектурний розбір;
- запуск ядра `genu.mark`;
- зовнішні підключення, якщо вони потрібні;
- окремі додаткові опції, якщо вони купуються свідомо.

### D. Вторинні ефекти

Цей рівень можна обговорювати тільки окремо і тільки якщо клієнт сам хоче це рахувати.

Не додавайте його автоматично до базового кейсу.

## Консервативне правило

Перший pass для CFO має рахувати тільки `A + B - C`.

Вторинні ефекти не повинні бути причиною купівлі regulated-рішення.

## Робочі формули

`Conservative ROI = (avoided disruption + avoided rework + avoided fragmentation + speed value + diligence value) - package cost`

`Working ROI = conservative case + buyer-validated secondary effects`

## Таблиця припущень

| Value bucket | Що треба від клієнта | Як оцінювати | Рівень впевненості |
|--------------|----------------------|--------------|--------------------|
| Збої / затримки | частота, вартість одного інциденту | історія клієнта або estimate | High / Medium / Low |
| Rework | люди, години, частота | внутрішній labor estimate | High / Medium / Low |
| Fragmentation cost | кількість сторін, coordination overhead | management estimate | Medium / Low |
| Speed value | ціна затримки readiness | sponsor estimate | Medium / Low |
| Diligence friction | кількість review loops, затримка | process estimate | Medium / Low |

## Готовий короткий текст

`Найсильніший economic case тут простий: контрольований запуск genu.mark часто дешевший за хаос, затягування і patchwork між сторонами. Спочатку ми зменшуємо ризик, rework і перевантаження, а вже потім окремо рахуємо будь-які додаткові ефекти.`

## Що не можна говорити

- що ROI гарантований;
- що в усіх клієнтів буде однакова економіка;
- що базовий кейс тримається на зовнішньому brand / trust upside;
- що додаткові сценарії вже входять у base case;
- що будь-який публічний контур автоматично дає compliance value.

## CTA

### Primary

`Validate ROI assumptions`

### Secondary

`Move to proposal`

## Handoff rule

Якщо клієнт питає `що саме ми рахуємо`, переходьте до `buyer-facing/shared/02-packages.md`.

Якщо клієнт питає `які докази лежать під цим`, переходьте до `buyer-facing/regulated/05-evidence-pack-audit-ready.md`.
