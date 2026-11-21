# ADR 0004: WebGL and GLSL for now, then WebGPU and TSL later

## Status

Accepted (2026-11-11)

## Context

three.js offers two renderers. `WebGLRenderer` with GLSL `ShaderMaterial` is stable, and most shader learning material is written in GLSL, which maps closely to the HLSL used in Unity and Unreal. `WebGPURenderer`, with shaders written in TSL (three.js's node-based shading language, compiled to WGSL or GLSL), became the recommended renderer in three.js r182 and falls back to WebGL 2 automatically. Its APIs are still changing, and R3F's WebGPU-first major version is in alpha.

## Decision

We will use `WebGLRenderer` and GLSL for phases 1–6 (shader track #1–10). After v1.0, in Phase 7, we will port the renderer to `WebGPURenderer` and rewrite the shaders in TSL (shader track #11–12).

## Consequences

- Shader work builds on stable APIs and has more widely available learning resources.
- The shaders written in phases 1–6 will be rewritten in Phase 7.
- Renderer-specific code is kept inside `app/scene` and `app/shaders` ([ADR 0003](0003-threejs-via-react-three-fiber.md)), and effects are built first in `/lab` sandboxes so that they can be ported one at a time.
- Hold off on Compute shaders (GPU particles) until Phase 7; before then particles will use instanced meshes animated in the vertex shader.
