# Requirements and scope

**Last revised:** 2026-11-15, version 1.0. Derived from the [product brief](brief.md).

## Releases

| Release | Planned for | Definition |
| --- | --- | --- |
| Vertical slice | ~Week 6 | Internal prototype that proves the pipeline end to end |
| v0.1 | ~Week 9 | Working public 2D site with actual content; the room only on a `/room` preview route |
| v1.0 | ~Week 34 | The room becomes the home page and all sections live |
| Later | After launch | WebGPU/TSL, extra effects, anything cut from v1.0 |

**More about the vertical slice:** the greyboxed room should render on `/room` through the export pipeline, and the finished monitor object highlights on hover and, when clicked, moves the camera and opens `/projects`.

The slice leaves out sound, support for light/dark mode, the cat model, and phone support. Can try to implement camera sway if there's enough time.

## Sections and routes

| # | Section | Routes | What it holds | Room object | First release |
| --- | --- | --- | --- | --- | --- |
| 1 | Room home | `/` | The interactive isometric room; objects that lead to every section; a "what's new" panel | — | v1.0 (`/room` preview from the slice) |
| 2 | Projects | `/projects`, `/projects/:slug` | Selected projects with description, media, technologies, contribution, and outcomes | Monitor | v0.1 |
| 3 | Resume | `/resume` | View and download a conventional PDF resume | Calendar | v0.1 |
| 4 | Devlog | `/devlog`, `/devlog/:slug` | Chronological updates on other projects and the site itself | Open journal | v0.1 |
| 5 | Photos | `/photos`, `/photos/:album` | Photos categorized into albums | Framed pictures | v0.1 if ready, otherwise v1.0 |
| 6 | About / Contact | `/about` | Overview of interests, background, and goals, alongside contact details | Postcard stack | v0.1 |
| 7 | Lab | `/lab`, `/lab/:slug` | Interactive technical-art experiments: custom shaders, rendering demos, etc. | PC tower | v1.0 |
| 8 | Reading & Movie Log | `/log` | Running log of completed/in-progress media | Bookshelf | v1.0 |

The full sitemap and the interactable map are in [Sitemap and visitor flows](../ux/sitemap-and-flows.md) and [Room and interactables](../art/room-and-interactables.md).

## User stories

Each item corresponds to an audience in the brief and lists some expected features.

- **The author**
  - I can quickly publish a devlog post, project, or media log entry by adding one MDX file and merging a pull request (under 30 mins).
  - I can add lab shaders with live controls, without touching the rest of the site.
  - I can add a new interactable to the room by following a written procedure.
- **Friends**
  - When I arrive, I can see what's new since my last visit within a few seconds.
  - I can browse photo albums and the reading and movie log comfortably on my phone.
  - I can play with the cat and notice small details, like the clock showing the real time.
- **Recruiters**
  - I can reach the resume and download it as a PDF within two page hops.
  - For each project I can see the author's role, the tools used, and the outcome.
  - If the 3D room can't run on my machine, I still get every page.
- **Developers and artists**
  - I can open a lab demo and tweak its parameters live.
  - I can read how an effect was built, including code and its performance cost.

## Feature list

IDs group the features: **R** room, **C** content, **S** site-wide, **P** pipeline. Release is the first release a feature ships in. Priorities: must, should, could, won't. Sizes: under 2 hours (S), half a day to a day (M), several days and split into smaller issues on the board (L).

| ID | Feature | Release | Priority | Size |
| --- | --- | --- | --- | --- |
| R1 | Orthographic isometric camera with limited pan and zoom | Slice | Must | M |
| R2 | Hover highlight and HTML label on interactables | Slice | Must | S |
| R3 | Click → camera move → route (monitor first) | Slice | Must | M |
| R4 | Loading state, 2D nav over the canvas, skip link | Slice | Must | S |
| R5 | Camera sway: the view rocks 5 degrees with the cursor; off for touch and reduced motion | Slice (trial), v1.0 | Must | S |
| R6 | Every section reachable from a room object | v1.0 | Must | L |
| R7 | Juicy interactions: hover lift, squash-and-stretch on press, eased camera moves, small particle burst, cursor transform on hover (S7) | v1.0 | Must | M |
| R8 | Interactable cat: idle loop, reacts to hover and clicks | v1.0 | Must | L |
| R9 | Wall clock whose hands show the accurate time | v1.0 | Must | S |
| R10 | "What's new" panel in the room | v1.0 | Must | S |
| R11 | Keyboard and touch navigation of interactables | v1.0 | Must | M |
| R12 | Quality tiers and a fallback image on weak devices | v1.0 | Must | M |
| R13 | Ambient motion: mug steam, plant sway, dust motes | v1.0 | Should | M |
| R14 | Light switch toggles light/dark mode. Off (the default) is light mode by day; on is dark mode at night, with the ceiling light lit. The room's lighting and the site theme change together | v1.0 | Should | L |
| R15 | Ambient sound, off by default | Later | Could | M |
| R16 | Working desk lamp, toggled on and off, lighting its corner in either mode | v1.0 | Should | M |
| R17 | Timelapse transition between light and dark mode: sky, sun and shadows sweep over 2-3 s; a short crossfade under reduced motion | v1.0 | Should | M |
| R18 | Weather selector, with clear and cloudy skies outside the window | v1.0 | Should | M |
| R19 | Rain: falling outside, streaks on the window glass | v1.0 | Could | M |
| R20 | Snow: falling outside, settling on the sill | v1.0 | Could | M |
| R21 | Weather follows the real local weather | Later | Could | M |
| R22 | Cat routine: the cat moves between stations (sleeps on the bed, plays with yarn on the rug, scratches the cat tree, paws items on the desk) and leaves the frame for a while | v1.0 | Must | L |
| C1 | Projects list and detail pages | v0.1 | Must | M |
| C2 | Resume page with PDF view and download | v0.1 | Must | S |
| C3 | About / Contact with external links | v0.1 | Must | S |
| C4 | Devlog list, posts, tags and RSS | v0.1 | Must | M |
| C5 | "What's new" feed on the 2D home (latest across sections) | v0.1 | Must | S |
| C6 | Photos: albums, grid, lightbox, alt text | v0.1 or v1.0 | Must | M |
| C7 | Lab index and demo pages with live controls | v1.0 | Must | M |
| C8 | Reading & Movie Log: type, title, creator, year, status, date, optional rating and notes; filter by type and status | v1.0 | Must | M |
| C9 | Cover images for log entries | Later | Could | S |
| S1 | Pre-rendered routes with per-route titles, meta and Open Graph images | v0.1 | Must | M |
| S2 | Responsive layout for phones | v0.1 | Must | M |
| S3 | 404 page | v0.1 | Must | S |
| S4 | Privacy-friendly analytics, including interactable clicks | v0.1 | Should | S |
| S5 | Site theme follows the room's light/dark mode, with a 2D toggle for content pages and keyboard users; defaults to the system setting | v1.0 | Should | S |
| S6 | Site search | Later | Won't | M |
| S7 | Custom cursor site-wide, with a subtle transformation over interactable objects; system cursor on touch | v1.0 | Should | S |
| P1 | Scripted Blender export and asset validator in CI | Slice | Must | M |
| P2 | Content schemas (Zod) validated at build time | v0.1 | Must | S |
| P3 | Visual regression tests of canvas states | v1.0 | Should | M |

## Non-functional requirements

| Area | Requirement |
| --- | --- |
| Desktop support | Latest two versions of Chrome, Edge, Firefox, and Safari: full room and all pages |
| Phone support | Latest two versions of Safari on iOS and Chrome on Android: every content page fully usable; the room loads only on capable devices with a clean fallback otherwise |
| Room performance | 60 fps on the reference laptop (integrated GPU); under 100 draw calls; scene download under 3 MB target, 6 MB limit |
| Page performance | LCP under 2.5s on throttled mobile; content pages under 120 KB of JS gzipped and never load three.js; mobile Lighthouse 90+ |
| Accessibility | WCAG 2.2 AA on content pages; every interactable reachable by keyboard; `prefers-reduced-motion` disables camera sway, camera moves and particles, and turns the timelapse into a short crossfade; the custom cursor keeps a clear hotspot |
| Privacy | EXIF and GPS stripped from photos; a privacy pass on the room model; analytics without cookies; only chosen contact details shown |
| SEO and sharing | Every route pre-rendered with its own title, description and Open Graph image; sitemap and RSS |
| Maintainability | New content is one MDX file and a pull request, live within 30 minutes; a written guide for adding an interactable |
| Reliability | No P1 bug open longer than two weeks; CI blocks merges on failing checks or budget violations |

## Revision history

| Version | Date | Change |
| --- | --- | --- |
| 1.0 | 2026-11-15 | Moved into the repository |
