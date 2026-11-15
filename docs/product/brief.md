# Product brief

**Last revised:** 2026-11-15, version 1.0.

## Vision

kitfud-portfolio is an interactive, isometric 3D room model that holds a collection of my projects, interests, experiences and photos. It doubles as an exercise to learn and demonstrate technical-art fundamentals.

I'd like the site to serve as a way to present content through an environment that reflects my individuality, while remaining functional so that site visitors can access important information easily. This design philosophy will carry throughout development, so focus will remain strongly on personal expression and continuous learning, but compromise to allow visitors to quickly access what they're looking for.

## Audiences

The target audiences listed in priority order.

| # | Audience | Why they visit | What the site must give them |
| --- | --- | --- | --- |
| 1 | **The author** | Document accomplishments, show creative/technical work, track progress over time | Convenient publishing (a few minutes via a pull request), a devlog, and room to experiment with new shaders in the `/lab` section |
| 2 | **Friends** | Keep up with my projects and hobbies in a more engaging and visually unique way | "What's new" section, photos, and a compatibility on both phone and PC |
| 3 | **Recruiters** | Judge technical experience through documented projects and the site itself | Access to resume, contact and my most notable projects quickly from both the 3D room and the flat 2D site |
| 4 | **Developers and artists** | Creative and technical inspiration | Live lab demos and source code |

## Visitor experience goal

Visitors should leave with a deeper understanding of my personality, interests, technical abilities, creative pursuits, etc. The site's visual presentation and juicy interactions (like the cat and other easter eggs) reflect that individuality without compromising access to important information.

## Success criteria

| Outcome | How it's measured | Target |
| --- | --- | --- |
| A fully operational isometric website with all core pages implemented | The core pages in the [requirements](requirements.md) document are live and reachable from both the room and the 2D navigation | v1.0 launched with every "Must" feature shipped |
| Demonstration of foundational technical-art skills | Published breakdowns and working pipeline tooling | 5 shaders and a scripted Blender-to-web pipeline running in CI |
| A smooth, reliable desktop experience across a reasonable range of environments | Browser support, frame rate, open bugs | Latest two versions of Chrome, Edge, Firefox, and Safari on desktop; 60 fps on the reference laptop; no critical bug open longer than a couple weeks |
| Site can keep expanding and being updated | Time to publish, documentation for extending the room | Ability to update site content in 30 minutes or less (via MDX file and pull request); a written guide for adding a new interactable |
| Support for phone site visitors | Content usability | Every content page usable on a phone; the room falls back gracefully |
| The site stays alive | Update frequency post-launch | At least one content update a month |
| Learning is recorded | Devlog | One devlog entry per sprint |

## Constraints and non-goals

### Constraints

- Just me as the developer, around 10 hours available to work on the project each week.
- Running on a minimal budget so the project will use the domain plus free tiers for hosting, CI, and analytics.
- The 3D room targets desktop browsers first, while phones get all page content through a simpler room/fallback.

### Non-goals for v1.0

- User account or comment system
- Any sort of CMS or admin interface
- Selling anything
- The full 3D room on low-end phones

## Identity

| Item | Value |
| --- | --- |
| Name | kitfud-portfolio |
| Domain | `kitfud.com`, registered through Cloudflare Registrar |
| Contact | hello@kitfud.com |
| Source | [github.com/Kitfudd/kitfud-portfolio](https://github.com/Kitfudd/kitfud-portfolio) |

## Revision history

| Version | Date | Change |
| --- | --- | --- |
| 1.0 | 2026-11-15 | Moved into the repository |
