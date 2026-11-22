# Architecture decision records

Each significant technical decision is recorded here as a short ADR in the [Nygard format](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) (title, status, context, decision, consequences). Start a new ADR from [`template.md`](template.md).

- **Naming:** `NNNN-short-title.md`, numbered in order.
- **Status:** `Proposed` while in review, `Accepted` once merged, `Deprecated`, or `Superseded by NNNN`.
- **Changing a decision:** write a new ADR that supersedes the old one, and update only the old one's status line. Accepted ADRs aren't rewritten, so the history of why things changed stays readable.

| ADR | Decision | Status |
| --- | --- | --- |
| [0001](0001-react-router-framework-mode.md) | React with React Router framework mode | Accepted |
| [0002](0002-vite-and-npm.md) | Vite as the build tool and npm as the package manager | Accepted |
| [0003](0003-threejs-via-react-three-fiber.md) | three.js through React Three Fiber | Accepted |
| [0004](0004-webgl-first-webgpu-later.md) | WebGL and GLSL for now, then WebGPU and TSL later | Accepted |
| [0005](0005-zustand-and-gsap.md) | Zustand for shared state and GSAP for animation | Accepted |
| [0006](0006-mdx-content-with-zod.md) | Content as MDX with Zod-validated frontmatter | Accepted |
| [0007](0007-cloudflare-workers-hosting.md) | Cloudflare Workers static assets for hosting | Accepted |
