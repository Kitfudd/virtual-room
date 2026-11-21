# ADR 0001: React with React Router framework mode

## Status

Accepted (2026-11-11)

## Context

The home page is a 3D room, but every section must also work as a plain, fast, indexable page ([requirements](../product/requirements.md): S1, NFRs). In order for the "Back to room" button to be instant, the room canvas needs to stay alive across navigation without loading on content pages. The project has no server budget, and hosting is static.

## Decision

We will build the site with React 19 and React Router v8 in framework mode, with `ssr: false` and `prerender` in `react-router.config.ts`. Every content route is prerendered to static HTML, and the list of paths comes from the content index. The room canvas lives in the root layout, is lazy-loaded with `React.lazy`, and is paused rather than unmounted when the visitor leaves `/`.

## Consequences

- Pages load and read without JavaScript, and each has its own title, description and Open Graph tags.
- Loaders run at build time, and anything dynamic must happen in the browser (no server at runtime).
- In order for a new dynamic route to be built (for example a new collection), it must add its paths to the prerender list.
- React Router v8 requires Node 22.22+, React 19.2.7+ and Vite 7+, which sets the base requirements for [ADR 0002](0002-vite-and-npm.md).
- React Three Fiber runs in the same component model, so the 2D UI and the 3D scene share state and patterns ([ADR 0003](0003-threejs-via-react-three-fiber.md)).
