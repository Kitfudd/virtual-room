# ADR 0006: Content as MDX with Zod-validated frontmatter

## Status

Accepted (2026-11-11)

## Context

The site publishes projects, devlog posts, and a collection of other pages ([content model](../product/content-model.md)). A CMS is a non-goal for v1.0, and publishing should take one file and a pull request. Breakdown posts need to embed live shader demos next to their text.

## Decision

We will store content in the repository as MDX files under `content/` with one folder per collection. A content module in `app/content` loads them with Vite's `import.meta.glob`, validates each file's frontmatter against a Zod schema per collection, and exposes typed data to route loaders. Images go through `vite-imagetools`.

## Consequences

- Invalid content fails the build with a clear error so that broken metadata never ships.
- Types for content come from the schemas and are shared by pages and the scene.
- MDX compiles components into content, but content files can also break the build like code can.
- The loader is the project's own code to maintain, including the prerender path list ([ADR 0001](0001-react-router-framework-mode.md)).
