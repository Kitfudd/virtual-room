# ADR 0003: three.js through React Three Fiber

## Status

Accepted (2026-11-11)

## Context

The application requires an interactive WebGL-based 3D scene with raycasting, glTF model loading, custom shaders, and post-processing effects. The 3D experience must also integrate seamlessly with React pages and HTML-based UI overlays.

three.js is a widely adopted JavaScript library for creating and rendering 3D graphics on the web. React Three Fiber (R3F) provides a React-based renderer for three.js, allowing 3D scenes to be built declaratively using React components. drei complements R3F with reusable helpers for common tasks, including model loading, camera controls, and HTML overlays.

Options considered: plain three.js managed from `useEffect`, Babylon.js, and R3F.

## Decision

We will use three.js through React Three Fiber v9 and drei. `three`, `@react-three/fiber` and `@react-three/drei` are pinned to exact versions in `package.json` and they're upgraded together, in a dedicated PR that includes a visual check of the room.

## Consequences

- Scene code is written as React components and hooks, sharing patterns and state with the rest of the app.
- Per-frame work goes in `useFrame` and reads state without triggering React re-renders ([ADR 0005](0005-zustand-and-gsap.md)); this is the main performance rule for scene code.
- Automated update tooling groups these packages into one PR that's reviewed by hand.
- Renderer-specific code stays inside `app/scene` and `app/shaders`, so the move to WebGPU ([ADR 0004](0004-webgl-first-webgpu-later.md)) minimizes the number of necessary changes.
