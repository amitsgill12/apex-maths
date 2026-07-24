# Locus Tuition — Project Brief

This file gives Claude Code full context on this project so it doesn't need re-explaining each session. Read this before making changes.

---

## 1. Business Overview

**Name:** Locus Tuition (rebranded from "Apex Maths" in July 2026 — the original name and several near-variants were already in use by competing UK tutoring businesses; "Locus Tuition" was verified clear across UK company registrations, domains, and social handles before adoption)

**What it is:** Online GCSE and iGCSE maths tuition, UK-based, no in-person sessions.

**Audience:** Years 7–11. Core focus is GCSE (AQA, Edexcel). Cambridge iGCSE is offered as a **secondary/plus option** — it should be mentioned, but must not be positioned as a headline focus of the business.

**Founder background** (for About Us and general tone):
- Tutoring for 16 years, since university
- Maths graduate
- Specialises in Years 7–11
- Philosophy: maths isn't as hard as school makes it look — there's a learnable system to it
- Strong focus on building student confidence, not just subject knowledge
- No photo of the tutor appears on the site (confirm this is still the preference before launch)

**Contact details:**
- WhatsApp: 07908 288 822
- Email: hello@locustuition.co.uk
- Instagram: @locustuition
- TikTok: @locustuition
- Facebook: to confirm — not yet verified as claimed under this handle

---

## 2. Brand & Design System

**Colours:**
- Navy: `#0f2544`
- Gold: `#f0a500`
- Warm off-white: `#faf9f7`
- New addition needed: a **success/progress colour**, separate from gold, for use in progress bars, correct-answer ticks, "grade improved" style visuals. Gold reads as a brand accent, not a semantic "this is working" signal. Recommend a muted sage/emerald (~`#4a7c59`, to be finalised in code).

**Fonts:** Instrument Serif (headings), Outfit (body) — unchanged from original brief.

**Feel:** Premium edtech — closer to a confident tech company doing tuition than a traditional, cheap-feeling tutor website. Clean, professional, not generic.

**Visual inspiration — mobiletutors.co.uk:** The user likes this competitor's use of:
- Stat call-outs and numbers-led credibility
- Tick/checklist visuals
- A numbered "how it works" / "how we transform grades" style section with visual life to it
- Comparison-style layouts

This is a reference for *visual energy and structural devices only* — do not copy their layout, wording, or content directly. Locus Tuition's own voice and content should be used throughout.

**Logo:** The old Apex triangle mark is retired. New mark TBD — a locus in mathematics is the set of points/path traced under a condition, which gives a natural direction for an updated mark (e.g. a traced curve or path motif). Not yet designed.

---

## 3. Site Structure — Phase 1 (current phase)

Five pages, all static HTML/CSS/JS:

1. **Home**
2. **About Us**
3. **Courses** — single continuous/scrollable page with anchored sections (not split into separate pages)
4. **FAQs**
5. **Book Consultation** — Calendly embed

### Home page must include:
- Hero section
- A problem/solution framing near the top (structurally inspired by Mobile Tutors' "gap in schooling" opener, but written entirely in Locus Tuition's own words)
- A numbered "How We Transform Grades" style section (4 steps), visually treated to give the page life — this is a deliberate borrow of the *device*, not the content, from Mobile Tutors
- A summary of course types, linking down into the relevant Courses page anchors
- Calls to action toward Book Consultation throughout

### Courses page must include (anchored sections, single page):
- 1-1 sessions
- Group sessions (two tiers — see pricing below)
- iGCSE — clearly flagged as a secondary/plus offering, not a headline service
- Bootcamps
- Pricing for each (placeholder values initially — see Section 5)

### FAQs page:
Standard set to be drafted by Claude and edited by the user. Should cover at minimum: pricing structure, exam boards covered, how online sessions actually run, the 4-week commitment/cancellation terms, and what happens after the discovery call.

### About Us page:
Built from the founder background in Section 1. Tone: a balance of warm/personal and credible/numbers-led — not purely stats-heavy corporate copy, not purely folksy either.

### Testimonials:
Use placeholders across the site for now. Real parent/student reviews will be supplied later to replace them.

---

## 4. Pricing Structure (placeholders — exact figures to be finalised by user)

- **1-1 sessions:** £40–£60/hour, banded by Year group (exact bands not yet finalised — use clearly marked placeholder ranges, not invented specifics)
- **Group sessions — two tiers:**
  - **Standard Group:** £15–£20/session, max 8 students
  - **Premium Group:** £25/hour, max 5 students. Includes: accessible documents, unlimited tutor messaging, and (future) access to the AI question-helper tool. **Do not present the AI tool as live** — it's Phase 3 scope, not yet built.
- **Bootcamps:** Format still under review — user is weighing a single intensive week (4 consecutive days) against splitting across two weeks to work around student holiday schedules. Use placeholder dates/structure until this is decided. Draft topic lists below, to be edited by the user to match their actual teaching plan.

### Draft Bootcamp Topics — Foundation tier (placeholder, user to edit)
Number & ratio, fractions/decimals/percentages, basic algebra (expressions, equations, sequences), angles & basic geometry, perimeter/area/volume, probability basics, averages & statistical diagrams, straight-line graphs.

### Draft Bootcamp Topics — Higher tier (placeholder, user to edit)
Advanced algebra (simultaneous & quadratic equations, functions), trigonometry (including sine/cosine rule), circle theorems, vectors, advanced graphs (quadratics, cubics, transformations), compound growth/decay, advanced probability (conditional, tree diagrams), statistical analysis.

---

## 5. Booking Flow (Phase 1 scope)

- **Discovery call:** free, 15 minutes, booked via a Calendly embed on the Book Consultation page.
- **No paid taster lesson** — this was in the original plan and has been dropped.
- **Commitment model:** 4-week rolling monthly commitment, paid roughly a month in advance. No fixed contract — a student/parent can cancel simply by not booking/paying for the following month.
- **Phase 1 scope boundary:** everything *after* the discovery call — enrolment, monthly payment collection, cancellation handling — is done **manually by the user via email confirmation**. No automated payment or subscription system should be built in Phase 1.
- **Later (Phase 2+):** GoHighLevel CRM is planned to automate confirmation emails, monthly billing reminders, and cancellation flows. Not in scope now.

---

## 6. Technical Setup — Phase 1

- **Hosting:** GitHub Pages
- **Repo:** `amitsgill12/apex-maths`, local path `~/Documents/apex-maths` (name still references the old brand — optional rename to consider, non-blocking, flag to user rather than doing unprompted)
- **Domain:** locustuition.co.uk (live, purchased via Namecheap)
- **Stack:** Vanilla HTML/CSS/JS. **No React or other framework** — the site is content pages with light interactivity (mobile nav, FAQ accordion, maybe a stat-counter animation), which doesn't need a framework. Revisit this decision only if/when Phase 3's portal is being built.
- **File structure:**
```
index.html
about.html
courses.html
faq.html
book.html
css/style.css       (shared styles)
css/[page].css       (only if a specific page needs real overrides)
js/main.js           (shared nav, FAQ accordion, mobile menu, any animations)
```
- **Calendly:** embed directly on the Book Consultation page (not just a link out).
- **Copyright year:** must read 2026, not 2025 — check and correct anywhere this appears in existing code.

---

## 7. Working Style / Non-negotiables for Claude Code

- Explain changes step by step — the user is learning HTML/CSS/JS as we go, not just handing off work to be done blindly.
- Git workflow is terminal-based, not GitHub Desktop: `git add .` → `git commit -m "..."` → `git push`, run from `~/Documents/apex-maths`.
- Use Plan Mode before executing any multi-file change.
- Keep files split by type (html/css/js) — do not collapse into a single-file structure.
- **Do not build Phase 2 or Phase 3 features now.** This document describes them for context and continuity only. Active build scope is Phase 1 (the five-page marketing site) unless the user explicitly says otherwise.
- Match the existing design system (colours, fonts, spacing conventions) unless the user explicitly asks for a change.

---

## 8. Phase Roadmap (context only — only Phase 1 is being actively built)

### Phase 1 (current)
Multi-page marketing site — Home, About Us, Courses, FAQs, Book Consultation. Calendly embed for discovery calls. Manual enrolment process handled by the user directly.

### Phase 2
Calendly refinement plus GoHighLevel CRM integration: automated confirmation emails, monthly billing reminders/collection, cancellation flow, lead nurture sequences.

### Phase 3
Student/parent/tutor portal, Supabase-backed:
- **Roles:** Student, Parent, Tutor (the user plus any future hired tutors — each tutor can write/view notes for their own students only), Admin (the user, full visibility across everything)
- **Planned features:**
  - Lesson notes — tutors log what was covered each session
  - Curriculum tracking — students/parents can see progress mapped across the syllabus
  - Resource library — question sheets, past papers, mark schemes, formula sheets, homework, organised by student/topic
  - AI question-helper tool — planned integration into the Premium Group tier and portal generally. **Not yet scoped.** Needs its own dedicated design conversation later covering: how it assists without simply giving away answers, cost per use, and safety/guardrails. Do not build or advertise as live until that scoping happens.

---

## 9. Open Decisions (flagged, not yet resolved — do not silently assume answers)

- Bootcamp format: single intensive week vs. split across two weeks
- Exact 1-1 pricing bands by Year group
- Facebook handle — confirm claimed under @locustuition or a close variant
- Logo mark — not yet designed
- Exact hex for the new success/progress accent colour
- Whether to rename the GitHub repo away from "apex-maths"
