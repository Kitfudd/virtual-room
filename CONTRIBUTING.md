# Contributing

This is a personal project with one developer. Bug reports are welcome as [GitHub issues](https://github.com/Kitfudd/virtual-room/issues), but feature pull requests aren't accepted since the room and its content are personal. The rest of this document will describe the working agreement the project follows, partially for my own reference.

## Branches

- `main` is always deployable. In order to protect it, changes are made only through pull requests and force pushes/deletions are blocked.
- Work happens on short-lived branches (lower-case kebab-case) cut from `main`. They're named here by type:

| Prefix | Use for | Example |
| --- | --- | --- |
| `feat/` | New behavior in the site or the room | `feat/monitor-hover` |
| `fix/` | Bug fixes | `fix/camera-clamp` |
| `art/` | Models, textures, etc. | `art/bookshelf` |
| `docs/` | Documentation only | `docs/adr-0007-hosting` |
| `chore/` | Tooling, dependencies, CI, config | `chore/renovate-config` |

## Commits

Commit messages will follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <summary in the imperative, under 72 characters>

<optional body: what changed and why>
```

- **Types:** `feat`, `fix`, `perf`, `refactor`, `test`, `docs`, `style`, `build`, `ci`, `chore`, `revert`, and an extra `art` for asset changes.
- **Scopes:** `room`, `scene`, `shaders`, `ui`, `content`, `pipeline`, `art`, `docs`, `ci`, `deps`. Scope is optional when a change spans several areas.
- A breaking change gets `!` after the type or scope, as well as a `BREAKING CHANGE:` footer.

Examples: `feat(room): open /projects from the monitor`, `art(bookshelf): bake daylight lightmap`, `docs: add ADR 0007 hosting`.

## Planning and sprints

Work is tracked on a GitHub Project board. The workflow automatically adds issues in this repository to the board.

- **Issues:** features, bugs, assets, shaders, and spikes use the issue forms. Docs and chore work can be plain issues with the `docs` or `chore` label.
- **Board columns:** Backlog → Ready → In progress → In review → Done.
- **Fields:** Size (S under 2 hours, M half a day to a day, L several days and gets split), Priority (P0 now, P1 this phase, P2 later), and the sprint.
- **Sprints:** two weeks long starting on Mondays (Sprint 0 began 2026-11-16). The first day is for planning, which involves picking a sprint goal and pulling Ready issues into the sprint. The last day is for the demo, a short devlog post, and a retro (what went well, what didn't, and one thing to change).

**Checklist for the Ready status:**

1. Acceptance criteria are written and testable
2. It has a size, and anything L is split
3. Open questions become a spike first
4. Interactables and shaders larger than S have a one-page spec

**Checklist for the Done status:**

1. Merged into `main` through a squash-merged PR that links the issue
2. CI checks pass (once they exist) including performance budgets
3. Deployed to the preview and checked there
4. Docs updated where behavior or decisions changed

## Releases

- Versions follow [Semantic Versioning](https://semver.org/) and are tagged `vMAJOR.MINOR.PATCH` on `main`.
- The changelog is generated from commit messages.
- Planned milestones are `v0.0.1` for the walking skeleton, `v0.1.0` for the public 2D site, and `v1.0.0` when the 3D room becomes the default home page.
