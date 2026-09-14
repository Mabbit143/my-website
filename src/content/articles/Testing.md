---
title: CMS Layout Sandbox
deck: A private draft for testing article blocks before using them in a published piece.
series: receipts-or-it-didnt-happen
topics:
  - cms test
  - layout
pubDate: 2026-09-07
author: Mabbit
description: Private draft used to preview and test Deconstructing Academia article layouts.
draft: true
placeholder: true
blocks:
  - type: text
    markdown: |
      ## Start with ordinary text

      This draft is a safe place to test blocks in Pages CMS. It never appears on the public site while **Keep as Draft** is switched on.
  - type: pinboard
    eyebrow: Evidence board
    title: Three notes that belong together
    intro: Use a board when readers need to compare short pieces of information at a glance.
    notes:
      - title: The official rule
        body: Put the policy language here.
        color: yellow
      - title: The missing question
        body: Name what the rule leaves unanswered.
        color: pink
      - title: The receipt
        body: Link the source that lets readers check the claim.
        color: cyan
        link: https://example.com
        linkLabel: Example source
  - type: callout
    variant: warning
    title: Keep this draft private
    markdown: Do not switch off **Keep as Draft** unless this sandbox has been turned into a real article.
---
