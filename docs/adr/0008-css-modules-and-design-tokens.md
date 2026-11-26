# ADR 0008: CSS Modules and CSS custom properties for styling

## Status

Accepted (2026-11-26)

## Context

The site needs styles for the 2D content pages and the room's HTML overlays, as well as a light and a dark theme that defaults to the system setting and can be switched by the 2D toggle and the room's light switch ([requirements](../product/requirements.md): S5, R14). Content pages must stay under 120 KB of JavaScript, and the supported browsers are the latest two versions of Chrome, Edge, Firefox and Safari.

| Option | For | Against |
| --- | --- | --- |
| Tailwind CSS | Fast to write, the template's default | A build dependency with its own vocabulary with potential to clutter components |
| CSS-in-JS (styled-components, Emotion) | Styles next to component logic | Runtime JavaScript on every page and requires extra setup for prerendering |
| Zero-runtime CSS-in-TS (vanilla-extract) | Typed tokens | Another Vite plugin and build step |
| CSS Modules and plain CSS | Built into Vite, no runtime, and scoped class names | Tokens aren't typed, so naming requires more discipline |

## Decision

We will use CSS Modules for component styles, CSS custom properties for design tokens, and plain global CSS only for the base layer (no CSS framework/CSS-in-JS):

- Each component's styles live next to it in a CSS Module, e.g. `nav-bar.module.css` beside `nav-bar.tsx`.
- Design tokens are CSS custom properties in one global stylesheet, `app/styles/global.css`, which also holds the base element styles imported by `app/root.tsx`.
- Each color token is declared once with both its values through `light-dark()`, and `:root` sets `color-scheme: light dark`, so the theme follows the system setting by default.

## Consequences

- Styling adds no JavaScript and no dependency, because Vite compiles CSS Modules itself.
- Class names are scoped per component and token names are contractually defined in one file.
- `light-dark()` only takes colors. Other theme differences, such as images, need a `[data-theme]` or `prefers-color-scheme` rule.
- Every supported browser has `light-dark()` (Baseline since 2024). Older browsers ignore the tokens and show their default colors.
- The canvas can't read CSS, so the theme itself lives in the site store ([architecture](../architecture.md#state)), and the code that changes it keeps the store and `data-theme` in step.
