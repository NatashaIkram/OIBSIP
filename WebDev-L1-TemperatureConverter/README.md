# Temperature Converter

This project is developed as part of the Oasis Infobyte Web Development & Designing Internship.
# Temperature Converter

A polished, single-purpose utility for converting temperatures between Celsius, Fahrenheit, and Kelvin — built with plain HTML, CSS, and JavaScript.

## Project Overview

Temperature Converter is a small, focused web app that takes a value in any one of three temperature scales and instantly returns the equivalent in all three. It's designed to feel like a real productivity utility: a single glass-style card, generous whitespace, considered typography, and quiet micro-interactions rather than flashy effects.

## Features

- Convert between **Celsius**, **Fahrenheit**, and **Kelvin** in one action, with all three results shown at once
- Real-time validation while typing, plus full validation on submit
- Rejects empty input, non-numeric input, and temperatures below absolute zero (‑273.15 °C / ‑459.67 °F / 0 K), each with a clear, friendly message instead of a browser `alert()`
- Press **Enter** to convert
- **Copy** button to copy all three results to the clipboard
- **Reset** button to clear the form and start over
- Short (~300ms) loading state and smooth fade-in when results update
- Fully responsive, from desktop down to small mobile screens
- Accessible: semantic HTML, labelled fields, live regions for errors and results, visible keyboard focus states, and respect for `prefers-reduced-motion`

## Technology Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties (design tokens), Flexbox/Grid layout, no framework
- **Vanilla JavaScript (ES6+)** — no libraries, no build step
- **Google Fonts** — Manrope (with Inter as a system fallback)

No Bootstrap, Tailwind, React, or other frameworks are used.

## Folder Structure

```
temperature-converter/
├── index.html      # Markup and page structure
├── style.css        # All styling (design tokens, layout, components, responsive rules)
├── script.js         # Application logic (validation, conversion, rendering)
├── images/            # Reserved for any static image assets
└── README.md          # This file
```

## How to Run

No build tools or dependencies are required.

1. Download or clone the project folder.
2. Open `index.html` directly in any modern browser, **or** serve it locally for the best experience with the clipboard API:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your browser.

## Screenshots

Screenshots are not included in this repository. To capture your own, open the app in a browser and use your OS screenshot tool — a good set to capture is: the empty state, a successful conversion, the absolute-zero error card, and the mobile layout.

## Future Improvements

- Add unit conversion history with the ability to revisit past conversions
- Support additional scales (Rankine, Réaumur)
- Add a dark mode toggle
- Persist the last-used unit and value between sessions
- Add unit tests for the conversion and validation functions

## Author

Built as a demonstration of production-quality frontend craft: clean architecture, accessible markup, and a design system-driven interface.
