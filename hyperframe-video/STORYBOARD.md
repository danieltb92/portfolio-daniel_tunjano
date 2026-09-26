---
format: 1920x1080
duration: 10s
message: "Daniel Tunjano — diseñador industrial & UX/UI y desarrollador web, disponible para proyectos"
arc: Hook → Identity → Proof → CTA
audience: potential clients and recruiters viewing the portfolio
mode: autonomous
music: confident minimal electronic underscore
---

## Video direction

- **Palette (frame.md, verbatim):** paper `#EFF9FF` ground with the permanent ~2cqw graph grid on every frame; ink `#000000` is the primary type; blue `#008AD4` (ink-soft/grid) is the only accent — chip fills, the mark's dot, one underline. Two-color discipline: never a third hue. Top/bottom hairlines frame every composition.
- **Type (frame.md roles):** display = Kufam 700, negative tracking, hierarchy by SIZE (hero 3–6× its neighbor); body/labels = Inter; micro labels uppercase tracked. Load-bearing lines ≥ 1.4cqw.
- **Motion grammar:** long-tail `power3` settles, never bouncy; reveals are **paced to the on-screen word beats** (the kinetic text plays the voice's role — no narration) and spread across each frame's back half; holds are still (subtle jitter at most); no mid-video exits — the harness transition is the exit; only the final frame may exit.
- **Rhythm:** F1 kinetic word beats → F2 the big identity hit (the climax) → F3 quick role cascade → F4 allocated stillness, calm close. F4 is the deliberate held/breather frame.
- **Negative list:** no slideshow (front-load-then-freeze), no screensaver float, no bouncy/elastic entrances, no browser chrome/nav bars/footers, no third color, no lazy breathing. Content lives in the top ~83% (caption band clear).

## Frame 1 — Formas

- scene: Three word beats hard-cut in center on the graph grid: FORMAS · INTERFACES · EMOCIONES, each landing alone in massive black Kufam
- duration: 2.6s
- poster: 1.5
- transition_in: cut
- status: animated
- src: compositions/frames/01-formas.html
- type: hook
- persuasion: Source-traceable hook (the site's own thesis line)
- beat: curiosity
- blueprint: kinetic-type-beats (Reproduce — Hook flash, in-place token cycle engine)
- sfx: pop

narrativeRole: Open on the portfolio's own three-word thesis — the words ARE the motion, each swap is the beat.
keyMessage: This is a designer who works between forms, interfaces and emotions.

Scene 1 (0.0–0.9s): paper + grid ground, hairlines present. Only the first beat exists: **FORMAS** flash-cuts in dead-center (hard-cut word-swap → `discrete-text-sequence`), display-hero scale, ink black, left-of-center anchor at ~45% width — one element alone, ~50% of frame. Camera locked.
Scene 2 (0.9–1.7s): the slot swaps by instant cut — **INTERFACES** replaces FORMAS in place (`discrete-text-sequence`), same anchor, nothing else enters.
Scene 3 (1.7–2.6s): final swap — **EMOCIONES** lands via **kinetic beat-slam** (`kinetic-beat-slam`), slightly larger (size escalation); holds dead still to the frame end. No drift.

## Frame 2 — Name

- scene: The circular brand mark draws/assembles, then the huge DANIELTB wordmark resolves into a centered lockup with "Daniel Tunjano" beneath
- duration: 3.6s
- poster: 2.4
- transition_in: zoom-through
- status: animated
- src: compositions/frames/02-name.html
- type: branding
- persuasion: Authority by identity
- beat: confidence
- blueprint: logo-assemble-lockup (Adapt — parts-assembly → lockup; keep the signature: mark builds → wordmark joins → centered lockup hold)
- focal: assets/favicon.svg
- roles: favicon.svg = cutout (hero mark, dead-center) · svgs/svg-a6c18493.svg = supporting (wordmark joins from the right)
- sfx: whoosh-cinematic, impact-bass-1

narrativeRole: The identity hit — the name the whole video exists to introduce.
keyMessage: DANIELTB — Daniel Tunjano.

Adapt: static-frame parts-assembly (no orbit, no camera tilt); the mark is the site's real circular SVG, the wordmark the site's real DANIELTB SVG.
Scene 1 (0.0–1.2s): cleared stage on paper + grid. The mark's ring **self-draws** stroke-by-stroke dead-center (`svg-path-draw`), then the blue dot pops into its slot per the blueprint's parts-assembly. Centered, ~28% of frame height; only the mark exists.
Scene 2 (1.2–2.5s): the DANIELTB **wordmark reveals** out from behind/beside the mark left→right (`svg-path-draw` tail / clip reveal), lockup recentering as it lands; the micro line **"Daniel Tunjano"** reveals **per-word** beneath (`dynamic-content-sequencing`) — back-half reveals, nothing pre-loaded. Asymmetric→centered lockup, ~60% width.
Scene 3 (2.5–3.6s): the complete lockup **settles** and holds dead still per the blueprint; at most subtle jitter. Grid + hairlines carry the rest. Silence ~50%.

## Frame 3 — Role

- scene: Role line builds in two beats — "Diseñador industrial & UX/UI" then "Desarrollador web" — while the tool icons (Figma, Illustrator, Photoshop, Tailwind, React) cascade in a row beneath
- duration: 2.2s
- poster: 1.4
- transition_in: crossfade
- status: animated
- src: compositions/frames/03-role.html
- type: benefit_highlight
- persuasion: Feature-to-benefit translation (tools = craft range)
- beat: clarity
- blueprint: grid-card-assemble (Adapt — Key_Feature grid as a one-row icon cascade; keep the staggered-assemble signature)
- focal: assets/svg-0663f3f0.svg
- roles: svg-0663f3f0.svg = supporting (Figma, row lead) · svg-dc35e6ca.svg = supporting · svg-6e18eec3.svg = supporting · svg-60aebd4c.svg = supporting · svg-5bd3d4f2.svg = supporting
- sfx: pop

narrativeRole: Delivers the half of "name + role" the lockup didn't say — what he does and the craft behind it.
keyMessage: Industrial + UX/UI designer and web developer.

Adapt: one-row labeled icon strip instead of a tile grid; role line is the headline the row book-ends.
Scene 1 (0.0–1.0s): upper-center: **"Diseñador industrial & UX/UI"** assembles **word-by-word** on a smooth long-tail (`dynamic-content-sequencing`), headline scale, ink. Nothing else yet — asymmetric upper-third anchor.
Scene 2 (1.0–1.7s): second beat appends below — **"& Desarrollador web"** reveals on its own beat; simultaneously the five **tool icons cascade into a centered row**, each sliding a short distance directly into its slot, staggered left→right (`center-outward-expansion` short-path form / `gsap-effects` stagger), full-width strip at ~70% down (still above the caption band).
Scene 3 (1.7–2.2s): the row + lines **hold near-static** (gentle settle only, no float, no push). Reads as one assembled unit.

## Frame 4 — Cierre

- scene: Clean end card — brand mark small above, danieltunjano.online as the display line, availability chip "Disponible para nuevos proyectos →" beneath
- duration: 1.6s
- poster: 1.0
- transition_in: crossfade
- status: animated
- src: compositions/frames/04-cierre.html
- type: cta
- persuasion: Risk reversal (available now)
- beat: urgency-to-act
- blueprint: titlecard-reveal (Reproduce — single card, one restrained move + hold; chip arrives as the grey→bright append)
- focal: assets/favicon.svg
- roles: favicon.svg = cutout (small mark above the URL) · og-image.webp = supporting (brand reference only, not on screen)
- sfx: chime

narrativeRole: Closes on the URL and the availability line the site itself leads with.
keyMessage: Go to danieltunjano.online — he's available for new projects.

Scene 1 (0.0–0.7s): the ONE move: centered card **slide-up crossfade** in (`scale-swap-transition` restrained set) — small brand mark above, **danieltunjano.online** as display-closing beneath it, both arriving together, centered ~55% width.
Scene 2 (0.7–1.1s): the availability chip **"Disponible para nuevos proyectos →"** does the grey→bright append (`discrete-text-sequence`) below the URL — blue `#008AD4` fill, Inter micro. This is the card's append, not a second phase.
Scene 3 (1.1–1.6s): hold dead static to the final frame — allocated stillness, the calm close. No exit motion (end of film).
