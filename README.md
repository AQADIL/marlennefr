# Legendary Nefr from Satbayev

A tiny one-page website for Marlen Meirbek  a.k.a. the **"nefr from Satbayev"**.

This is not a corporate portfolio with 10 years of fake experience.
Its a playful mix of:
- glowing UI,
- spinning 3D diamond,
- meme-style skills,
- and a steering wheel that changes the whole vibe.

All built with simple, readable frontend code.

---

## Features

- **3D Diamond Hero**  
  A custom Three.js scene with:
  - octahedron "diamond" mesh,
  - glassy `MeshPhysicalMaterial`,
  - glowing inner core,
  - orbiting particles,
  - smooth auto-rotation + drag / hover interaction.

- **Bilingual EN / KZ**  
  The whole page supports **English** and **Kazakh**:
  - language toggle in the navbar (EN / KZ),
  - all main copy (hero, about, skills, contact) translated,
  - meme energy preserved in both languages,
  - no page reloads  language swaps on the fly.

- **Steering Wheel Gallery**  
  A small wheel in the About section with 4 handles:
  - each handle switches a photo and caption,
  - different "main character" modes (serious / chaos / study / AFK),
  - works with mouse, wheel, and keyboard arrows,
  - captions also change with language.

- **Meme-style Skill Issues**  
  Instead of boring tech stack bullets:
  - cards like *"HTML & CSS (copypaste mode)"*,
  - progress bars that visually admit the chaos,
  - still fully responsive and readable.

- **Simple Contact Block**  
  Only things that actually work:
  - phone,
  - WhatsApp,
  - Instagram,
  with custom SVG icons (no emoji spam).

- **Responsive Layout**  
  - Desktop: split hero (text + 3D diamond).
  - Tablet/mobile: stacked layout, bigger diamond on small screens.
  - Smooth scrolling for navbar anchors.

---

## Tech Stack

**Core:**
- HTML5 (single-page layout)
- CSS3 (custom layout, animations, responsive design)
- Vanilla JavaScript (no frameworks)

**Libraries:**
- [Three.js](https://threejs.org/)  3D diamond, lights, particles
- [GSAP 3](https://greensock.com/gsap/) + ScrollTrigger  entrance and scroll animations
- [particles.js](https://vincentgarreau.com/particles.js/)  background particle field

**i18n / UX:**
- Simple custom i18n using `data-i18n-key` attributes
- EN / KZ dictionary in JavaScript
- Live language switching without page reload

No build tools, no bundlers, no React. Just open the HTML file and everything works.

---

## Project Structure

```text
marlennefr/
  index.html              # Main page
  README.md               # You are here
  assets/
    css/
      styles.css          # Layout, components, responsive design
    js/
      diamond.js          # Three.js diamond scene
      animations.js       # Particles, GSAP, wheel gallery, i18n, UI logic
      carousel.js         # Legacy/simple wheel logic (not required in HTML)
    icons/
      phone.svg
      whatsapp.svg
      instagram.svg
    pics/
      1.jpg               # Mood photos for the wheel
      2.jpg
      3.jpg
      4.jpg
```

---

## How to Run Locally

No special setup needed.

1. Clone or download the repo.
2. Open `index.html` in a modern browser.
3. Thats it  you should see the hero with a spinning 3D diamond.

If you run this via a small local server (`Live Server` in VS Code, `http-server`, etc.),
links and console logs behave a bit nicer, but its not required.

---

## Language Switching (EN / KZ)

The language system is intentionally lightweight:

- All translatable elements in HTML have `data-i18n-key` attributes.
- `assets/js/animations.js` contains an `I18N` object with two keys:
  - `en`  English texts,
  - `kz`  Kazakh texts.
- The function `applyLanguage(lang)`:
  - updates the `<html lang>` attribute,
  - replaces text content for every `[data-i18n-key]`,
  - updates the name and the hero "nickname" line,
  - tells the wheel gallery to switch its captions.
- Navbar buttons (`.lang-btn`) toggle the active language and styling.

No JSON files, no heavy frameworks  just a small dictionary and DOM updates.

---

## 3D Diamond Overview

The diamond scene (`assets/js/diamond.js`) uses:

- `THREE.OctahedronGeometry` for the main shape,
- `MeshPhysicalMaterial` with:
  - transmission, clearcoat, high IOR for a glassy look,
- a glowing sphere inside for the core,
- a separate wireframe overlay for extra sci-fi vibes,
- particle field built from `BufferGeometry` + `PointsMaterial`.

Interaction:
- gentle auto-rotation on every frame,
- cursor hover changes the target rotation and adds a subtle pulse,
- pointer drag lets you manually spin the diamond.

---

## Why This Exists

Because not every personal site has to look like a LinkedIn clone.
Sometimes you just want:

- a spinning crystal,
- chaotic skill cards,
- and a wheel that says youre in *AFK life* mode.

If youre reading this from the repo: feel free to poke around the code,
steal some CSS ideas, or fork and turn it into your own cursed portfolio.

---

## Credits

- **Design & concept:** Marlen Meirbek (a.k.a. nefr from Satbayev)
- **Implementation & 3D / animations help:** Akadil

If you build something cool on top of this, drop a link somewhere. The nefr will be proud.
