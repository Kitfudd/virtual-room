# kitfud/virtual-room

This project is a personal website presented as an interactive, isometric 3D model of my room. You can interact with the various objects scattered about the room to access different parts of my portfolio. Every page is also viewable through a traditional flat 2D site.

> **Status:** Phase 0 (Discovery & Setup). Planning documents are in place, working on scaffolding the app next. See [`docs/plan/phase-0.md`](docs/plan/phase-0.md).

## Stack

| Area | Choice |
| --- | --- |
| Framework | React 19 with React Router v8 in framework mode (`ssr: false` + `prerender`) |
| Build | Vite 8, TypeScript (strict) |
| 3D | three.js (pinned) through React Three Fiber v9 and drei |
| Rendering | `WebGLRenderer` + GLSL first; `WebGPURenderer` + TSL after launch |
| State and animation | Zustand, GSAP |
| Content | MDX with Zod-validated frontmatter |
| Art pipeline | Blender 5.2 LTS → scripted glTF export → gltf-transform (meshopt, KTX2) |
| Tooling | Node 26 LTS, npm, ESLint, Prettier, Vitest, Playwright, GitHub Actions |
| Hosting | Cloudflare |

## Documentation

The primary entry point for all documentation can be found at [`docs/README.md`](docs/README.md). The other notable docs are as follows:

- [Product brief](docs/product/brief.md): why the site exists and who it's for
- [Requirements](docs/product/requirements.md): features, priorities and releases
- [Development plan](docs/plan/development-plan.md): architecture, pipeline, roadmap and practices
- [Workstation setup](docs/setup.md): how to prepare a machine to work on the project

## Getting started

The application doesn't exist yet! To prepare a machine in the meantime, follow [`docs/setup.md`](docs/setup.md).

## Repository layout

The layout below is the target. Missing folders will be created as development progresses.

```
app/            React Router app with routes, components, scene, shaders, etc.
content/        MDX content: projects, devlog, photos, lab, log, etc.
public/         Static files
art/            Blender and texture sources (Git LFS)
tools/          Blender Python add-on and asset-pipeline scripts
docs/           Product, UX, art and planning documents, ADRs
```

## Contributing

This is a personal project, so feature pull requests aren't accepted. Bug reports are welcome as GitHub issues. The workflow the project itself follows is described in [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Licence

- **Code** is released under the [MIT license](LICENSE).
- **Art, models, textures, photos, writing and other content** are all rights reserved; see [`LICENSE-CONTENT`](LICENSE-CONTENT).

## Contact

hello@kitfud.com
