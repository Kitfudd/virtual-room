# ADR 0005: Zustand for shared state and GSAP for animation

## Status

Accepted (2026-11-11)

## Context

The DOM and the canvas share state, which includes hovered/selected, camera target, quality tier, light/dark mode, weather. The scene reads some of it every frame, and doing that through React context or props would re-render the scene.

In terms of animation, the camera moves, object reactions, and light/dark timelapse need precise easing and sequenced timelines that can be interrupted. Since 2025, after Webflow acquired it, GSAP has been free for all uses, including commercial ones and every plugin, under its "Standard No Charge" license.

## Decision

We will hold shared UI and scene state in Zustand stores in `app/store`. Components subscribe with selectors; scene code reads state inside `useFrame` with `getState()` so per-frame reads never trigger React renders.

We will use GSAP for camera transitions, interaction feedback, UI transitions, and other authored animations. Continuous procedural motion (sway, steam, idle loops) stays in shaders or `useFrame`.

## Consequences

- Subscribe to change and read per frame without rendering as a rule for scene code.
- Store shapes become an architectural contract, documented in `docs/architecture.md`.
- GSAP's license is free but proprietary (not open source) and can be changed by Webflow, which is acceptable for a personal site.
- `prefers-reduced-motion` handling lives in one place, around GSAP timelines and camera moves.
