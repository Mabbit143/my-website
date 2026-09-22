# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 4 (static site generator) + `@astrojs/mdx` + `@astrojs/sitemap`, TypeScript config, content-collections-driven articles (`src/content/articles`, Markdown/MDX). No CMS backend in this repo — articles are files. Deploy target is `deconstructingacademia.com` (not yet live there per `astro.config.mjs`; `site` is pre-set for when the domain is repointed).

## Users

Deconstructing Academia (DA) speaks to people who are curious, capable, and tired of being made to feel intellectually underdressed: students who can think but hate performing "academic," first-generation and returning students learning hidden institutional rules, working-class students navigating institutions built around money and invisible support, formerly incarcerated people and others whose lived knowledge is studied more often than respected, independent researchers and organizers without institutional access, people who love learning but distrust the machinery around it, and academics who refuse to pretend the system is neutral.

DA explicitly does not write to persuade every professor, soothe every institution, or reassure people who believe professionalism requires obedience.

## Product Purpose

DA is a public argument about knowledge: who gets to create it, whose language is treated as intelligent, whose experience counts as evidence, whose work gets cited, and who gets shut out before the conversation begins. It teaches a repeatable method for examining institutional narratives ("The Second Look," "The Missing Comparison") rather than delivering a single fixed argument. Success is measured by whether the audience walks away with recognition, language, evidence, a tool, permission, or a sharper question — not by soothing academia or making it friendlier.

## Positioning

The campaign thesis: durable institutional fictions rarely arrive labeled as lies — they arrive as neutral language, professional standards, official categories, familiar statistics, and explanations repeated until nobody remembers they were constructed. DA's mechanism is disciplined suspicion of what power asks us to accept without inspection, applied through a named method (trace the source, inspect the category, identify what disappeared, ask who benefits) rather than blanket institutional distrust. Explicitly anti-bullshit, not anti-intellectual, and not "constructed = imaginary" — constructed categories have painfully real consequences.

## Operating Context

- **Content model:** editorial series, not a single repeating template. Eight recurring series: Whose Peers?, Academic Autopsy, Receipts or It Didn't Happen, Field Notes From the Other Side, The Syllabus Left This Out, Use the Damn Tool, Dog-Eared Dissent, Where the Work Is. Each series has its own accent palette and tonal register (see incumbent `src/styles` / design brief — visual system, not product truth).
- **Cross-platform role:** Instagram is primary (visual home: carousels, Reels, graphics). Facebook is secondary (conversation/distribution, longer founder-led context). **deconstructingacademia.com (this repo) is the long-form destination** — articles, evidence trails, downloads, durable reference material. TikTok is shelved/inactive.
- **Content pipeline:** articles live as Markdown/MDX files in `src/content/articles`, rendered through a typed block system (`BlockRenderer` + `TextBlock`/`ImageBlock`/`QuoteBlock`/`CalloutBlock`/`DividerBlock`).
- **Publication gate:** a post/article should only ship if it makes a specific claim, the evidence matches the certainty of the language, it sounds like DA rather than a university communications office, and it would be worth publishing even with no product to sell underneath it.

## Capabilities and Constraints

- Products (downloads, tools) support the mission and are explicitly not the campaign's main character — no manufactured urgency, no fake transformation narrative.
- Rigor constraint: missing data proves the official evidence cannot answer a question, not that concealment occurred — the site must not overstate what unresolved sourcing can support.
- Editorial voice rule ("the teeth stay in"): plainspoken, skeptical, name the actor when evidence supports it, delete cowardly hedging, no manufactured both-sides framing when evidence supports a conclusion.
- Precision constraint: "colonial" is never used as a floating synonym for anything harmful/false/unfair — only for an actual shown historical/structural relationship.
- Domain not yet live (see Stack) — canonical URLs/sitemap are pre-configured for `deconstructingacademia.com` ahead of the repoint.

## Brand Commitments

- Name: Deconstructing Academia (DA).
- An incumbent visual and voice system already exists in this repo/workspace (locked color system, typography, editorial-series palette mapping, component vocabulary) — treated as visual authority, not reinvented here. See the shipped `src/styles` and the design brief in the sibling `Deconstructing Academia` folder for the actual system; this file records product truth only.
- Rallying line: "The system does not need every fiction to be believed. It needs the fiction to feel normal."
- Campaign question: "What are we being trained not to notice?"

## Evidence on Hand

No real testimonials, case studies, press mentions, or performance/audience data exist in this workspace yet — confirmed absence, not an oversight. Future work must not fabricate these. A first prison case file ("Innocent Until Proven Poor") has "verified starting evidence" referenced in campaign planning, but the verified source packet itself is not yet finalized (per campaign-foundation doc: "final source packet for every factual post" is still open).

## Product Principles

1. Teach a method of seeing, not a single conclusion — the examples (prison, wealth, pretrial detention, research conventions, statistics, historical narratives) rotate; the analytical method stays fixed.
2. Rigor and skepticism of power are not in tension — evidence rules are never loosened to make a political point land harder.
3. Products and CTAs are subordinate to the argument; nothing ships as an advertisement dressed as an argument.
4. Long-form work here on the website is evidence-and-reference-grade; Instagram/Facebook are the compact/visual and distribution layers, not duplicates of this content.
5. Every published piece must earn its place under the publication gate (specific claim, matched evidence, distinct voice, right-fit design, at least one memorable line).

## Accessibility & Inclusion

No additional requirements beyond the WCAG-AA contrast standard already implemented in the site's CSS (confirmed 2026-09-16 — no further need identified at this time).
