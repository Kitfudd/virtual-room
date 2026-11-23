# Asset guidelines

This document will describe the rules every model, texture, bake, and animation follows, from the Blender file to the exported GLB. What each object needs (pivots, separate parts, shape keys) is in [Room and interactables](room-and-interactables.md#asset-notes-for-modelling), and the look is in [Art direction](art-direction.md). How the pipeline runs is in [Architecture](../architecture.md#asset-pipeline).

Numbers marked *starting value* are confirmed or revised after the first finished object in Phase 1.

## Files and folders

```
art/
  room/room.blend            Layout, camera, lights and bakes
  props/<object>.blend       One file per prop or interactable (e.g., desk.blend)
  characters/cat.blend       The cat model, rig, and animations
  textures/<asset>/          Source textures (PNG, EXR) referenced by the .blend files
  bakes/                     Baked lightmaps, one file per layer
  reference/                 Private reference photos (not committed)
```

- `room.blend` brings props in with Blender's *Link* (File › Link) so that props can be worked on separately, and Git LFS stores smaller files.
- Textures stay as separate files and are not to be packed into the `.blend` (File › External Data › Pack Resources), as this would duplicate them inside every saved version.
- Baking takes minutes in Cycles and doesn't run in CI, so baked lightmaps are committed under `art/bakes/` and treated like any other source.
- Commit at checkpoints, such as greybox done or UVs done, and not after every save.
- File names are lower-case kebab-case: `office-chair.blend`.

## Naming inside Blender

| Kind | Pattern | Example |
| --- | --- | --- |
| Render geometry | `GEO_<object>` | `GEO_bed` |
| Interactable | `INT_<section>_<object>` | `INT_projects_monitor` |
| Click proxy | `COL_<object>` | `COL_monitor` (child of its `INT_` object) |
| Light | `LGT_<name>` | `LGT_ceiling_pendant` |
| Camera | `CAM_<name>` | `CAM_iso` |
| Material | `M_<name>` | `M_props_atlas` |
| Texture file | `T_<asset>_<map>.png` | `T_props_basecolor.png`, `T_room_lightmap_day.exr` |
| UV maps | `UVMap` (textures), `Lightmap` (bakes) | — |
| Cat actions | `cat_<action>` | `cat_sleep_loop`, `cat_jump_up` |

Interactables carry custom properties (Object Properties › Custom Properties), which the export script writes into the GLB as glTF `extras` (`export_extras=True`) for the scene code: `section` (the route, for example `/projects`) and `label` (the hover text). Toys without a route set only `label`.

## Scene setup

- **Units:** metric, unit scale 1.0, so 1 Blender unit = 1 m. Model at real-world size.
- **Up axis:** Blender is +Z up; the glTF exporter converts to glTF's +Y up. Leave that option on.
- **Transforms:** apply rotation and scale (Ctrl+A) before export, so every object exports with scale 1 and no rotation baked into its parent.
- **Pivots (origins):** at the base center for furniture, and at the point something rotates around for moving parts (clock hands at the clock's center, the journal page at its hinge, the chair seat at its swivel).
- **Normals:** consistent and facing outward (Mesh › Normals › Recalculate Outside). Turn on Face Orientation in the viewport overlays to check: outward faces show blue.
- **Camera:** `CAM_iso`, orthographic, rotated 45° around Z and tilted about 35° down, the same values the site uses ([camera framing](room-and-interactables.md#camera-framing)).

## Geometry

- **Model what the camera sees.** Delete faces that are never visible (undersides, backs against walls, the cut-away front walls).
- **Bevel silhouettes only.** A small bevel catches the outline pass and light; interior edges don't need one.
- **Size details to the screen.** At the default zoom the room is about 6.5 m across roughly 1,400 pixels, so about 2 pixels per centimeter. Anything smaller than about 1 cm disappears; texture it instead of modeling it.
- **Quads while modeling, triangles on export.** Modeling in quads keeps edits clean; the exporter triangulates. Avoid long thin triangles and n-gons on curved surfaces, which shade badly.
- **Modifiers** (Bevel, Mirror, Subdivision) can stay live while working; the export script applies them (`export_apply=True`). Check the triangle count with modifiers included (Viewport Overlays › Statistics).

| Category | Triangles each (*starting value*) |
| --- | --- |
| Navigation interactables (monitor, bookshelf, …) | 1,000–3,000 |
| Toggles and toys (lamp, clock, mug, …) | 300–1,000 |
| Décor (bed, rug, closet, …) | 200–1,500 |
| The cat | 3,000–6,000 |
| Room shell (walls, floor slab) | under 2,000 |

## UVs and texel density

Texel density is how many texture pixels cover one meter of surface. Keeping it consistent means no object looks blurrier than its neighbor.

- Each object must have two UV maps:
  - UVMap is used for material textures. UV islands may overlap to support mirrored geometry, shared textures, and trim sheets.
  - Lightmap is used for lightmap baking, and islands must not overlap.
- Texture texel density: Use the following starting values:
  - 512 px/m for navigation interactables, which may appear closer to the camera.
  - 256 px/m for all other objects.

These values are intended to provide a consistent level of detail at typical viewing distances. The higher density accommodates high-DPI displays and closer camera views.

- Use 128 px/m as the starting value for lightmap texel density.
- Maintain a minimum margin of 4 pixels between UV islands at the lightmap's target resolution to prevent bake bleeding.
- Seams are placed along natural geometry boundaries or in areas that are unlikely to be visible from the camera.

## Materials and textures

- Each mesh-and-material pair is a draw call, so props share texture atlases (`M_props_atlas`) and décor that never moves is merged into a few meshes.
- Sizes come in powers of two (256, 512, 1024, 2048); 2048 px maximum for atlases, 512 px for single props.
- Color textures (base color) are sRGB, while data textures (lightmaps, masks, normal maps) are set to Non-Color in Blender.
- Source formats include PNG (8-bit) for painted textures and masks and EXR for bakes, which have values above 1.0.
- The pipeline converts textures to KTX2: ETC1S (smallest) for color textures, UASTC (higher quality) for lightmaps and normal maps, where ETC1S would cause visible banding.

## Lighting and bakes

- Four bake layers, each a separate lightmap: `day`, `night`, `ceiling`, `lamp` ([room asset notes](room-and-interactables.md#asset-notes-for-modelling)). The room shader mixes them at runtime.
- Bake in cycles to the `Lightmap` UV map, with denoising on, into `art/bakes/T_room_lightmap_<layer>.exr`.
- Bake only what doesn't move, since moving parts (chair seat, clock hands, the cat) get lighting from the shader instead.

## Interactables

- The structure is as follows: an `INT_` object at the top, its `GEO_` parts as children, and one simple `COL_` proxy (a box or low-poly hull) that the cursor actually hits.
- Moving parts are separate objects with their own pivots, so code can rotate or animate them.
- Custom properties include `section` and `label`, as above.

## Rigging and animation (the cat)

- Rigging begins with Rigify's cat metarig. Export only the deform bones (the `DEF-` bones), not the control bones.
- Each vertex is limited to a maximum of four bone influences using Blender's Weights  (Weights › Limit Total, limit 4), which is what three.js uses.
- Each animation clip is stored as a separate Blender action named `cat_<action>`. Looping animations start and end on the same pose. The scene frame rate is set to 30 fps.
- Animations are baked during export. Root motion (walking along floor paths) is handled in code, so walk cycles animate in place.

## Budgets

Budgets are checked by the validator in CI such that a hard-limit violation fails the build. Hard numbers will be revisited after the vertical slice.

| Budget | Target | Hard limit |
| --- | --- | --- |
| Scene triangles | 50k | 150k |
| Draw calls per frame | under 50 | 100 |
| Texture memory (GPU) | 64 MB | 128 MB |
| Compressed scene download | 3 MB | 6 MB |
| Navigation interactables | 7 (one per section) | 12 |

For scale, a 2048 px texture uses roughly 3–6 MB of GPU memory once compressed, including its smaller mip levels, depending on the format. The 64 MB target fits a dozen or more atlases.

## Export checklist

Before committing an asset:

1. Names follow the conventions above, and `INT_` objects have their custom properties.
2. Rotation and scale are applied; pivots are in place.
3. Normals face outward, and no hidden faces are left.
4. The `UVMap` and `Lightmap` UV maps exist, and `Lightmap` has no overlaps.
5. Textures are external files with the right color space; nothing is packed.
6. The triangle count is within its category.
7. `npm run assets` passes the validator with no errors.
