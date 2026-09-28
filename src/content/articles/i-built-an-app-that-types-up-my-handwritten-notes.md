---
title: I Built an App That Types Up My Handwritten Notes
deck: PageMark turns a photo of a notebook page into clean Markdown. It keeps your words, admits what it can't read, and exists because I refuse to stop writing by hand.
series: use-the-damn-tool
topics:
  - PageMark
  - note-taking
  - handwritten notes
  - Obsidian
  - Markdown
  - AI study tools
pubDate: 2026-09-28T12:00:00-07:00
author: Mabbit Rountree
description: PageMark reads photos of handwritten notes into Obsidian-ready Markdown, with headings, tasks, flashcards and tables. Free open beta, 10 pages a month.
draft: false
placeholder: false
blocks:
  - type: text
    markdown: |
      I take notes by hand. Every class, every reading, every half-formed idea at 11 p.m. I've tried going all-digital more than once and it never sticks, because writing is where I actually think. Typing is where I transcribe.

      The problem is what happens after. A notebook is a dead end. I can't search it. I can't drop it into NotebookLM. I can't link it to last week's lecture in Obsidian. So either I retype everything, which I don't have time for, or those pages sit in a stack and slowly stop existing.

      So I built the thing I wanted: **[PageMark](https://notes.deconstructingacademia.com)**. You take a photo of a page, and it hands you back clean, structured Markdown with your headings, your to-dos, your flashcards and your tables, in your words.

      It's in open beta, it's free, and I want people to break it.
  - type: callout
    variant: second-look
    eyebrow: The short version
    title: What PageMark does
    markdown: |
      1. **Snap or upload** one page or a whole stack. It finds the paper, crops it, straightens it and cleans up shadows, right in your browser.
      2. **It reads your handwriting** into structured notes. It transcribes; it does not summarize, correct or "improve" your wording.
      3. **You check it.** Your photo sits next to the Markdown, and any word it wasn't sure about is highlighted.
      4. **Take it with you.** Copy it, download a `.md` file, grab a zip of every note, or pull all your flashcards into one file.
  - type: text
    markdown: |
      ## Your shorthand becomes structure

      This is the part I actually care about. A plain photo-to-text tool gives you a wall of words. PageMark reads the marks you already make and turns them into real Markdown structure:

      | You draw | You get |
      | --- | --- |
      | ● dot | a bullet |
      | □ empty box | a to-do checkbox |
      | ☑ checked box | a finished to-do |
      | ▲ triangle | a flashcard (`front = back`) |
      | ★ star | an "important" callout |
      | ? in a circle | a question to follow up on |
      | " quote marks | a quote, with the page number |
      | → arrow | a link to another note |
      | ~ wavy line | your own idea, marked as yours |
      | ◇ diamond | a dated event |

      Underline a whole line twice and it's a heading. Underline it once and it's a subheading. Indent something and it stays nested under the line above it. Draw a grid and you get a real table, not a pile of words that used to be one.

      Put a short code in a box in the corner, like `[A145]` for one class, and PageMark files the note under that course with the name, folder and tags you set. Number your pages (`[A145 · 2]`) and a three-page lecture comes back as one note, in order.
  - type: divider
    dividerStyle: splatter
  - type: text
    markdown: |
      ## What it won't do

      This brand exists to call out tools that oversell themselves, so here's the honest list.

      **It will misread things.** Handwriting is hard, mine included. That's why every word it's unsure about comes back marked `==like this==` and highlighted, and why the review screen puts your photo right next to the text. Check it before you trust it.

      **It won't write your notes for you.** It's a transcriber, not a summarizer. If you didn't write it down, it won't be in there. If your notes are a mess, you'll get a very well-formatted mess. That's on purpose. The thinking stays yours.

      **It doesn't keep your pages.** Your photo is cropped in your browser and sent to be read, and then you download what you want to keep. There's no cloud library of your notebooks sitting on a server. Your filing codes and settings live on your device.

      **Some things aren't built yet.** Tasks come out as checkboxes in the note. Sending them straight to a to-do app is on the list, not in the app.
  - type: quote
    quote: It gives your notebook a way out of the notebook. It doesn't do the notebook's job.
  - type: text
    markdown: |
      ## Why this is a Deconstructing Academia tool

      "Use the Damn Tool" has one rule: a tool should give you back time and access, not replace the part where you learn. Writing by hand is the learning part for a lot of us. PageMark just stops it from being a dead end.

      And the people who most need their notes to go further — working students, returning students, anyone studying on a phone between shifts — are exactly the people who don't have hours to retype a notebook. That's who I built it for, starting with me.

      ## Help me break it

      PageMark is in open beta and free: **10 pages a month, no card**. The test takes one page:

      1. Scan one real page of your notes.
      2. Check the highlighted words and fix anything it misread.
      3. Tell me what worked and what didn't, using the feedback box on the PageMark home page.

      Weird handwriting, cramped margins, a page you're sure will stump it: that's exactly what I need.

      **[Try PageMark free →](https://notes.deconstructingacademia.com)**
