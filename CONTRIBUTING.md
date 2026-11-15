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

## Releases

- Versions follow [Semantic Versioning](https://semver.org/) and are tagged `vMAJOR.MINOR.PATCH` on `main`.
- The changelog is generated from commit messages.
- Planned milestones are `v0.0.1` for the walking skeleton, `v0.1.0` for the public 2D site, and `v1.0.0` when the 3D room becomes the default home page.
