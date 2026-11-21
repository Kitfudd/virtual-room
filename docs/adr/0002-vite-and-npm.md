# ADR 0002: Vite as the build tool and npm as the package manager

## Status

Accepted (2026-11-11)

## Context

React Router's framework mode runs as a Vite plugin ([ADR 0001](0001-react-router-framework-mode.md)), so the build tool is largely decided by that choice. Vite also has fast hot reload (matters when tweaking shaders) and plugins for importing GLSL as text, MDX, and responsive images.

For managing packages, pnpm was the first choice, but Corepack, the usual way to pin pnpm, is no longer bundled with Node from version 25. npm ships with Node, so it needs no extra tool on either machine or in CI.

## Decision

We will build with Vite 8 and manage packages with npm:

- fnm reads and selects the Node version specified in `.node-version`.
- The Node and npm versions are pinned in `package.json` under `engines`, with `engine-strict=true` in `.npmrc` enforcing these requirements.
- `package-lock.json` is committed, and CI installs with `npm ci`.
- GLSL file are imported as plain text strings, MDX files are transformed into JavaScript modules using `@mdx-js/rollup`, and images are process using `vite-imagetools`.

## Consequences

- These is one less tool to install and keep in sync; in addition, a wrong Node or npm version fails the install immediately instead of producing a subtly different lockfile.
- npm installs more slowly and uses more disk than pnpm, which is acceptable for a small single app.
- Each Vite plugin adds a dependency to the build process, increasing the project's ongoing maintenance and compatibility requirements.
