# Art direction

**Last revised:** 2026-11-15. Note: the dark-mode palette and the background colors are experimental placeholder values to be tested in Phase 1.

## The look

There are currently a couple different reference images that inspire the art direction of the virtual room. The room is hand-drawn-esque in a soft, cool palette. Soft outlines tinted by material, mostly flat shading with soft gradients, cool blue shadows against warm sunlight, and a little more texture and detail than the first reference image (the blue room).

The reference images are third-party, so they're kept in the ignored `art/reference/` folder rather than committed. Note that both images are guides only for style and color rather than perspective.

## What each reference contributes

| Reference | Take | Leave |
| --- | --- | --- |
| Blue room | The color palette for light mode; clean, even outlines; flat shading with soft gradients; cool blue shadows against warm sunlight; sunlight landing as clear, sharp shapes on walls and floor | Textures and some small details are plain |
| White room | Sketchier linework with varied line weights; watercolour-like shading; dense small details; subtle glow around light | Warm white color palette |

## Style principles

1. Objects silhouettes are drawn with thin outlines and major creases, which should be in a slightly more saturated shade of its own material's color. The goal of this is to give the room a "soft" feeling. Adding a little variation in weight and a slight wobble make them feel drawn rather than traced.
2. Light reads in two or three soft bands rather than realistic gradients. The light are a warm white, and by contrast, the shadows are tinted blue.
3. Sunlight lands as clean, readable shapes on the walls and floor (e.g., window-grid pattern), using light cards rather than real-time shadows.
4. The material texture is a subtle paper grain with hand-painted strokes (wood grain, fabric folds) rather than smoother or toon-like style.

## Light-mode palette

Sampled from the blue-room reference.

| Role | Hex | Sampled from |
| --- | --- | --- |
| Wall, shaded | `#6194A7` | Left wall in shadow |
| Wall, lit | `#9DBEC8` | Right wall |
| Sunlight on wall | `#E8F6F0` | Window light on the left wall |
| Ceiling and haze | `#B5CED5` | Ceiling |
| Floor, sunlit | `#F0DDB4` | Floor in sun |
| Floor, base | `#EBD5AD` | Floor |
| Furniture wood | `#D6BBA1` | Desk top |
| Textiles, white | `#FAFBF5` | Rug |
| Textile shadow | `#99B7C3` | Curtain in shade |
| Bedding, blue-grey | `#7C98A5` | Bedspread |
| Darkest ink (accents only) | `#26292E` | Darkest line pixels |

The shadows on white fabric come out blue, not grey. The cool-shadow/warm-light contrast is important to making the palette feel softer.

## Dark-mode palette

Tentative (to be tested at a future date).

| Role | Hex | Idea |
| --- | --- | --- |
| Walls | `#2B3A55` | The same blue in a deeper shade |
| Floor | `#6E6458` | Wood in low light |
| Ceiling light pool | `#FFD9A0` | Warm light under the pendant |
| Desk lamp pool | `#FFC98A` | Slightly warmer than the ceiling light |
| Monitor glow | `#9FD3FF` | Cool screen light |
| Moonlight | `#A9B8E0` | Through the window, on the floor |
| Darkest ink (accents only) | `#1B1E24` | Slightly darker so lines are still visible |

## Building the aesthetic

- A screen-space edge pass on depth and normals. It gives consistent line widths and catches creases, and a little noise varies the lines. The line color comes from the scene color under the edge, darkened and slightly saturated, so that every material gets matching tinted lines with no per-object setup. Per-object inverted-hull outlines are the fallback. The outline shader (#3 in the [shader track](../plan/development-plan.md#rendering-and-shader-track)) is a Phase 1 task.
- Lighting is baked in Blender, then remapped in the room shader through a soft two- or three-band ramp. Light and dark mode use different ramps and bake layers.
- Textures are hand-painted base color textures with a very faint screen-space paper grain.
- The glow takes the form of a gentle bloom on light sources only.
