---
title: Visual Output Rules for Notebook LM
asset_type: Internal control packet
audience: Notebook LM operator / designer / presentation producer
funnel_stage: Internal build
decision_to_unlock: Lock one clear visual style and one set of production rules for generated sales assets
one_sentence_purpose: Define the visual and structural rules Notebook LM must follow so generated decks and infographics are modern, elegant, clear, and easy for Dominanta salesmen to present
single_key_message: Generated assets must look like regulated industrial premium sales materials, not startup slides, software dashboards, or equipment catalogs
primary_cta: Approve visual generation rules
secondary_cta: Use as the style source for all Notebook LM output tasks
owner: Sales enablement / designer / UX review
status: Legacy support doc
last_updated: 2026-03-21
source_inputs:
  - dominanta-sales/05-ready-solution-visual-production-spec.md
  - dominanta-sales/03-system-map-visual.md
  - notebooklm-source/02-dominanta-sales-context.md
---

# Visual Output Rules for Notebook LM

## Обраний стиль

Базовий стиль для generated assets:

`regulated industrial premium`

Це означає:
- сучасно, але стримано;
- елегантно, але не декоративно;
- індустріально, але не технічно-перевантажено;
- візуально сильно, але без зайвого шуму.

## Чому саме цей стиль

Він найкраще працює для нашого контексту, тому що:
- Dominanta salesmen продають через довіру до hardware reality;
- клієнт очікує серйозну, operationally credible подачу;
- треба показати ready path, а не creative concept;
- надмірно "красиві" або software-first слайди знижують довіру.

## Візуальний принцип

Кожен артефакт повинен читатися так:
- за 5 секунд - зрозуміло, про що це;
- за 30 секунд - це можна пояснити вголос;
- за 3 хвилини - це можна обговорити з клієнтом без хаосу.

## Базові правила композиції

- один головний меседж на один слайд / один екран / один блок;
- один core visual на один артефактний модуль;
- 3-5 support points максимум;
- чіткий grid;
- великі поля;
- простий напрямок читання зліва направо або зверху вниз.

## Рекомендована палітра

Використовувати спокійну, контрольовану палітру:
- graphite / dark gray;
- warm white / very light gray;
- deep blue або deep teal як опорний акцент;
- один signal color для risk / seam / emphasis.

Не використовувати багато яскравих кольорів одночасно.

## Типографіка

- максимум одна font pairing;
- шрифти мають бути сучасні, нейтральні, дуже читабельні;
- великі headline, короткі subhead, короткі body blocks;
- не допускати дрібного тексту, який треба "вичитувати".

## Diagram grammar

Однакова візуальна граматика для всіх generated artifacts:
- обладнання = hardware block;
- `genu.mark` або `genu.code` = central logic block залежно від сценарію;
- `ERP` / `еАкциз` = зовнішні контури, а не частина центрального блоку;
- optional public context = окремий secondary block лише коли це справді потрібно;
- customer outcome = right-side result block;
- seams / risk = контрастні маркери розривів;
- next step = окремий CTA block.

## Що обов'язково стандартизувати

У всіх generated assets мають бути однаковими:
- порядок назв у regulated assets: `Domino` -> `genu.mark` -> `ERP / еАкциз` -> `Logictime`;
- порядок назв у voluntary assets: `genu.code` -> optional public context -> next step;
- стиль стрілок, ліній, блоків, карток;
- line weight;
- border radius;
- spacing scale;
- icon family;
- CTA formatting.

## Що заборонено

Notebook LM не повинен генерувати або підказувати:
- glassmorphism;
- neon / cyber / startup gradients;
- декоративні 3D-ефекти;
- generic stock-photo nonsense;
- dashboard-like UI як головний візуал;
- перевантажені architecture maps з перехресними стрілками;
- великі абзаци замість модулів.

## Правило для deck outputs

Deck має виглядати як:
- executive brief;
- ready-customer-path presentation;
- sales conversation scaffold.

Deck не має виглядати як:
- software demo deck;
- product brochure;
- equipment catalog;
- investor pitch.

## Правило для infographic outputs

Інфографіка має бути:
- односторінковою;
- з однією головною ідеєю;
- придатною до швидкого пересилання після зустрічі;
- зрозумілою навіть без довгого усного пояснення.

Найкращий формат:
- проблема;
- fragmented path vs ready path;
- system role map;
- next step.

## Правило для weak solution-sellers

Кожен generated asset повинен допомагати слабкому solution-seller, а не вимагати від нього більшої експертизи.

Тому в кожному артефакті має бути очевидно:
- що сказати першим реченням;
- що показати як головну різницю;
- що сказати про combined path;
- як перейти до CTA.

## Prompt-ready style block

Цей блок можна дослівно вставляти у generation tasks:

`Create the output in a regulated industrial premium style: modern, elegant, clear, minimal, non-decorative. Prioritize hierarchy, explainability, and presentation ease. Use a strict grid, wide margins, restrained color, strong diagram logic, and low text density. Avoid decorative effects, dense paragraphs, software-dashboard aesthetics, generic stock imagery, and complex unreadable diagrams.`

## Фінальний візуальний тест

Якщо елемент не покращує:
- розуміння;
- довіру;
- швидкість пояснення;

його треба прибрати.
