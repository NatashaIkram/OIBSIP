# Personal Portfolio

This project is developed as part of the Oasis Infobyte Web Development & Designing Internship.
# Natasha Ikram — Portfolio 

## Project Overview

A responsive personal portfolio for Natasha Ikram, Frontend Developer, designed to
read like a real product — restrained, editorial, and dark-themed — rather than a student
project. Built entirely with semantic HTML5, hand-authored CSS3, and vanilla JavaScript, with
no frameworks or build tooling required.

The design draws on the visual language of Linear, Vercel, Framer, and Stripe: a near-black
interface, a single confident accent color, and typography carrying most of the personality.

## Features

- **Sticky, transparent-to-blurred navigation** — starts transparent over the hero and
  transitions to a blurred dark surface once the user scrolls.
- **Editorial hero** with a headline-first introduction and a hand-built animated wireframe
  sphere (SVG + CSS), instead of a profile photo or coding illustration.
- **Featured Projects** section with large cards, technology tags, GitHub and live-demo
  links, and a subtle lift-and-zoom hover interaction.
- **About** section in a split layout with lightweight stats — no long paragraphs.
- **Skills** shown as elegant, hoverable technology chips — no progress bars or percentages.
- **Design Philosophy** section: four principles (Attention to Detail, Accessibility,
  Performance, Clean Code), each with a minimalist line-icon.
- **Contact** section with a large heading, email/GitHub/LinkedIn list, and a clear CTA.
- **Scroll-reveal animations**, driven by `IntersectionObserver`, with instant fallbacks when
  `prefers-reduced-motion` is set.
- **Fully responsive** from a 1440px desktop container down to 480px mobile, with no
  horizontal scroll or overlapping elements at any breakpoint.
- **Accessible by default** — semantic landmarks, logical heading order, visible focus
  states, descriptive alt text, and WCAG-conscious contrast on every text/background pairing.

## Technology Stack

| Layer       | Choice                                   |
|-------------|-------------------------------------------|
| Markup      | Semantic HTML5                             |
| Styling     | CSS3 (custom properties, Grid, Flexbox)    |
| Interaction | Vanilla JavaScript (ES6+, no dependencies) |
| Type        | Manrope (headings), Inter (body), via Google Fonts |
| Icons       | Hand-drawn inline SVG                      |

No CSS or JS frameworks, no Bootstrap, no Tailwind, no build step.

## Folder Structure

```
portfolio/
├── index.html
├── README.md
├── style.css
├── script.js
└── images/
    ├── project-lumera.svg
    ├── project-converter.svg
    └── project-comingsoon.svg
```

## Installation

No build tools are required.

1. Download or clone the `portfolio` folder.
2. Open `index.html` directly in a browser, **or** serve it locally (recommended, so
   relative asset paths and fonts resolve identically to production):

   ```bash
   cd portfolio
   python3 -m http.server 8000
   ```

   Then visit `http://localhost:8000`.

### Customizing

- **Copy** lives directly in `index.html` — section comments (`<!-- ============ HERO ============ -->`)
  mark where each block starts.
- **Colors, type scale and spacing** are CSS custom properties at the top of `css/style.css`
  under `:root` — change a token once and it updates everywhere.
- **Resume button** currently points to `#`; replace the `href` with a real PDF path (e.g.
  `assets/resume.pdf`) and add the file.
- **Project images**: swap the SVG placeholders in `images/` for real screenshots, keeping
  the same filenames, or update the `src` attributes in `index.html`.
- **Live Demo links** are placeholders (`#`) until each project is deployed.

## Screenshots

_Add screenshots of the live site here once deployed — for example:_

```
images/screenshots/hero.png
images/screenshots/projects.png
images/screenshots/mobile.png
```

```markdown
![Hero section](images/screenshots/hero.png)
![Projects section](images/screenshots/projects.png)
```

## Author

**Natasha Ikram**
Frontend Developer · BS Information Technology
[GitHub](https://github.com/NatashaIkram) · [LinkedIn](https://www.linkedin.com/in/natasha-ikram-4a92073ab/)

## Future Improvements

- Replace SVG project placeholders with real product screenshots once each project is live.
- Add a working contact form (with server-side or third-party handling) alongside the mailto link.
- Add a lightweight case-study page per project (problem, process, outcome) linked from each card.
- Add a light-mode toggle while preserving the dark theme as default.
- Wire up analytics and Open Graph / social preview meta tags for shareability.
- Add automated accessibility and Lighthouse performance checks to a CI workflow.
