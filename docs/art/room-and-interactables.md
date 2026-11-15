# Room and interactables

**Last revised:** 2026-11-15. Paired with the [sitemap](../ux/sitemap-and-flows.md), this document is enough to greybox the room in Blender and stub every route.

## Room inventory

| Zone | Objects |
| --- | --- |
| Desk | Desk, office chair, computer monitor, PC tower, tablet, lamp, open journal with mechanical pencil and eraser, cat mug, pinboard with headphones, pens and accessories |
| Walls and ceiling | Wall of sticky notes, calendar, clock, framed pictures, windows with curtains, wall light switch, ceiling pendant light |
| Sleep | Bed with pillow and blankets, night stand |
| Storage | Bookshelf, closet, hanging rack with backpack, sling bag, umbrella and other items, stack of postcards |
| Cat | The cat, cat tree and bed, cat toys (feather wand, fishing-rod toy, ball of yarn) |
| Floor and décor | Area rug, cat plush |

## Camera framing

- **Projection:** orthographic, rotated 45 degrees around the vertical axis and looking down at about 35 degrees, close to true isometric. The same values are used in Blender and three.js so bakes and runtime line up.
- **Cutaway:** only the two back walls are drawn. They're cut at one height, with the wall thickness showing as a light cap along the top, and the floor is a slab with visible thickness.
- **Presentation:** the room floats on a flat background color with a soft cast shadow, and the whole room fits in frame with some margin.
- **Layout:** anything on the two front walls is cut away, so the window, closet, light switch, pictures, calendar and clock sit on the two back walls or stand free. The model's layout differs from the real room wherever the camera needs it to.
- **Light:** with the window on a back wall, daylight falls across the floor toward the viewer. The patch of sunlight moves during the day-night transitions to depict the timelapse. Other light sources also include the ceiling light and desk lamp, which are both independently toggleable.

## Room size

- **Dimensions (tentative):** a 4.2 x 4.2 m floor with walls cut at 2.2 m, modelled in meters and scaled proportionately in Blender (1 Blender unit = 1 m). The actual numbers are loose and can still change once the greybox is on screen.
- **Wall cut:** 2.2 m is the visible wall height. The pendant light hangs into frame from above the cut.
- **Thickness:** walls and floor slab are about 15 cm, showing as light caps.

## Interactable map

Each section gets the object whose everyday meaning already hints at it, so visitors can guess without reading a label. Hover labels (R2) and the 2D nav still say exactly where each one goes.

### Navigation: one object per section

| Section | Object | Design behind design | Alternative considered |
| --- | --- | --- | --- |
| Projects | Computer monitor | Where the work happens, and the screen can loop project thumbnails | PC tower |
| Resume | Calendar | A running timeline of education and experience | Pinboard |
| Devlog | Open journal with pencil and eraser | A journal is a log, and pages can flip on hover | Wall of sticky notes |
| Photos | Framed pictures on the walls | Intuitive one-to-one | Stack of postcards |
| About / Contact | Stack of postcards | The front of the postcard is "about me", which can be flipped to reveal contact details | Hanging rack with backpack |
| Lab | PC tower | Where rendering happens; its side panel can glow with a live shader | Tablet |
| Reading & Movie Log | Bookshelf | Books, plus a shelf of films | - |

### Toggles and toys

| Object | What it does | Requirement |
| --- | --- | --- |
| Wall light switch | Off (the default): light mode, by day. On: dark mode, at night, with the ceiling light lit. Each flip plays the timelapse | R14, R17 |
| Desk lamp | Turns its own light on and off | R16 |
| Window and curtains | Cycles the weather: clear, cloudy, rain, snow | R18-R20 |
| Wall of sticky notes | Shows "what's new" as the newest notes | R10 |
| Clock | Shows the visitor's local time | R9 |
| The cat, on its tree or bed | Moves between stations around the room (see [The cat](#the-cat)); reacts to hover and clicks | R8, R22 |
| Feather wand and fishing-rod toy | Hidden reaction: the cat chases the toy | R8 |
| Cat mug | Steam; a small wobble on click | R13 |
| Office chair | Spins on click | R7 |
| Headphones on the pinboard | Ambient sound on and off, once sound exists | R15 (Later) |
| Plush | Squish on click | R7 |

Bed, night stand, area rug, closet, hanging rack and tablet stay decorative for now; any of them can become a toy later.

## Asset notes for modelling

| Object | What the model needs | Because |
| --- | --- | --- |
| The cat | A rig (spine, neck, head, ears, tail, legs) with separate eyes and eyelids or eye bones, plus the animation set in [The cat](#the-cat) | Idle loop, reactions, and eyes that follow the cursor |
| Clock | Hour and minute hands as separate objects, pivots at the clock's centre | Rotated in code to show the real time |
| Wall light switch | A separate toggle part with its pivot | Flips on click |
| Ceiling pendant light | A pendant hanging into frame from above since the ceiling itself is cut away and its light baked on its own layer | Lit in dark mode, off in light mode |
| Desk lamp | Separate head, an emissive bulb, and its light baked on its own layer | Switches on and off in both light and dark mode |
| Window | Separate glass, with UVs set up for a rain shader and the sky behind it | Weather, the sky, and rain streaks on the glass |
| Window sill | A clean, separate top surface | Snow can settle on it |
| Curtains | Enough geometry to sway and a vertex-color mask for which parts move | Wind and weather motion |
| Monitor | A screen face with its own UVs and material | Shows project thumbnails |
| PC tower | A separate side panel with its own UVs | Shows a live Lab shader |
| Journal | The top page as its own object, with a hinge pivot | Page flip on hover |
| Postcard stack | The top card separate, with front and back faces | Flips to show contact details |
| Bookshelf | A few hero books as separate objects, the rest merged | One book slides out on hover |
| Office chair | Seat on its own swivel pivot | Spins on click |
| Feather wand and fishing-rod toy | A simple bone chain in the string or wand | Swings when the cat plays |
| Ball of yarn | A ball with its pivot at the centre, and a short loose strand on a bone chain | The cat bats it across the rug |
| Small desk items (pencil, eraser, pens) | Separate objects with pivots, placed where the cat's paws can reach | The cat paws them and sometimes knocks one off |
| Cat plush | Rounded plush form, color points as fabric patches, and a squash shape key | Squishes on click |
| Every interactable | A simple invisible `COL_` proxy mesh | Easier clicking and cheaper raycasts |

Note that daylight, night ambience, the ceiling light and the desk lamp each bake to their own layer. A shader mixes them, so any combination of switch, lamp, and time of day works without re-baking.

The plush is generic cat plush modelled on a Siamese cat. It has a Siamese-type colourpoint with a cream body, darker grey-brown points on the face mask, ears, paws and tail, pale blue eyes, large ears, and a slender face. Since he's being turned into a plush, the toy representation will be constructed with softer, rounder proportions (big head, stubby legs), the points as fabric patches, a seam or two, and a shape key for the squish.

## The cat

Modelled on an actual cat, with reference photos kept private in the ignored `art/reference/` folder.

### Appearance

- Exquisite dual-colored tabby with gray and white fur! She has a gray back, sides, and head with darker tabby stripes, contrasted against a white chest, bib, muzzle and all four paws (one paw has white fur that extends higher up into the leg).
- An asymmetric white blaze running from the muzzle up one side of the face toward the forehead.
- Pink nose, pink inner ears, and pink paws. Her eyes are yellow-green eyes, and she has a grey tail with darker bands and a darker tip.

### Default routine (R22)

By default, the cat moves between stations on its own in a fixed sequence. When visitors interact with the cat, separate events are triggered that temporarily interrupt the routine.

| Station | What the cat does | Animation clips |
| --- | --- | --- |
| Bed | Sleeps curled up, with an occasional ear twitch | Jump up, curl down, sleep loop, wake and stretch |
| Rug | Plays with a ball of yarn | Bat-and-play loop, pounce |
| Cat tree | Scratches the post, then climbs and perches on top | Scratch loop, climb or jump, perched idle |
| Desk | Paws at small items and sometimes knocks one off | Jump up, paw loop, knock-off |
| Off-screen | Walks out of frame and stays away for a while | Walk out, walk in |

A state machine determines the cat's next station and route throughout the room with weighted randomness. Entering a new area plays a jump clip lined up with the corresponding surface. Leaving the room frame doubles as a cheap transition, as the cat can walk out and come back in near another station instead of crossing the whole room.
