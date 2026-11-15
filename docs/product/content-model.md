# Content model

**Last revised:** 2026-11-15.

## Content model

All content exists in the repository as MDX files with frontmatter, validated by Zod schemas at build time. A small content module loads them with Vite's `import.meta.glob`, feeds the route loaders, and generates the list of paths React Router prerenders. Publishing is a pull request (there's no CMS). The 3D scene reads the same data, for example the featured project thumbnails on the monitor.

| Collection | Key fields | Pages | Also used in the room |
| --- | --- | --- | --- |
| `projects` | title, slug, date, role, tools[], tags[], cover, gallery[], featured, links | `/projects`, `/projects/:slug` | Monitor screen loop |
| `devlog` | title, date, summary, tags[], series (for example "phase recap", "shader breakdown") | `/devlog`, `/devlog/:slug`, RSS | Sticky notes (what's new) |
| `photos` | image, caption, date, album, alt (required) | `/photos`, `/photos/:album` | Framed pictures |
| `lab` | title, effect id, concepts[], demo component | `/lab`, `/lab/:slug` | PC tower side panel |
| `log` | type (book or film), title, creator, year, status, date finished, rating (optional, 1-10), notes | `/log` | Bookshelf |
| `pages` | About / Contact, Resume | `/about`, `/resume` | Postcards, calendar |
