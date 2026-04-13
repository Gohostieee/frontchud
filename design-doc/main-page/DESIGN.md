# Design System Strategy: The Industrial Grimoire

## 1. Overview & Creative North Star: "The Cursed Terminal"
This design system is not a utility; it is an artifact. We are moving away from the "friendly SaaS" aesthetic toward a **Creative North Star** we call **The Industrial Grimoire**. 

The interface should feel like a piece of forbidden hardware discovered in a subterranean factory—a heavy-duty terminal where ancient ritual meets brutalist engineering. We break the "template" look by ignoring standard 12-column symmetry. Instead, we use intentional asymmetry, overlapping "modular ritualistic panels," and high-contrast typography scales that feel like digital "burnt-in" data. The goal is to make the user feel like they are interacting with something dangerous, powerful, and heavy.

## 2. Colors: The Obsidian Void
The palette is built on the tension between the deep obsidian void and the "burnt-in" glow of amber and crimson.

*   **Core Tones:**
    *   **Background / Surface:** Use `surface` (#131313) for the primary canvas. It provides the "obsidian" depth.
    *   **The Amber Glow:** `primary_container` (#ffb000) is your "Power On" color. It represents active data and technical stability.
    *   **The Crimson Corruption:** `secondary_container` (#920703) is for dangerous states, occult warnings, and high-tier ritual data.
*   **The "No-Line" Rule:**
    Explicitly prohibit 1px solid borders for sectioning content. Boundaries must be defined through background shifts. For example, a `surface_container_low` (#1c1b1b) section should sit on a `surface` (#131313) background to create a subtle, heavy distinction. 
*   **Surface Hierarchy & Nesting:**
    Treat the UI as physical layers. Use `surface_container_lowest` (#0e0e0e) for recessed data wells and `surface_container_highest` (#353534) for protruding, interactive modules. This creates a "machined" look where elements feel milled out of a single block.
*   **Signature Textures:**
    Apply a subtle film grain or noise overlay (approx. 3-5% opacity) across the `surface`. For primary CTAs, use a subtle linear gradient from `primary` (#ffd597) to `primary_container` (#ffb000) to simulate the uneven light of a cathode-ray tube.

## 3. Typography: The Voice of the Machine
We use two distinct voices to create an editorial, high-end feel.

*   **The Ritual Voice (Epilogue):** Used for `display` and `headline` roles. Epilogue’s weights feel authoritative and structural. Use `display-lg` (3.5rem) with tight letter-spacing for section headers to create a "brutalist poster" effect.
*   **The Data Voice (Space Grotesk):** Used for `body`, `title`, and `label` roles. This font provides the "technical log" aesthetic. 
*   **Intentional Contrast:** Pair a massive `display-md` heading in Epilogue with a tiny, all-caps `label-sm` in Space Grotesk. This "High-Low" contrast is the hallmark of premium editorial design.

## 4. Elevation & Depth: Tonal Layering
Traditional dropshadows are forbidden. Depth is achieved through light emission and material stacking.

*   **The Layering Principle:** Stack `surface-container` tiers to create hierarchy. A `surface_container_high` (#2a2a2a) panel sitting on a `surface_dim` (#131313) background creates a "lift" without needing a single pixel of shadow.
*   **Amber Ambient Glows:** When a "floating" ritualistic panel is required, use a glow instead of a shadow. Apply an extra-diffused blur (20px–40px) using `surface_tint` (#ffba43) at 5% opacity.
*   **The "Ghost Border" Etching:** If a container needs a visual edge, use the "Ghost Border": the `outline_variant` (#524533) at 20% opacity. It should look like a faint etching in metal, not a stroke.
*   **Glassmorphism (The Smoked Lens):** For floating overlays, use `surface_container` colors at 80% opacity with a heavy `backdrop-blur` (12px-20px). This simulates a thick, industrial glass lens over the "terminal" screen.

## 5. Components: Heavy-Duty Modules

*   **Buttons (Heavy-Duty):**
    *   **Primary:** 0px border radius. Background: `primary_container` (#ffb000). Text: `on_primary_fixed` (#281800). Add a runic symbol (e.g., Unicode or custom SVG) to the trailing edge.
    *   **Tertiary:** Ghost style. No background. Border: 1px "Ghost Border" (#524533 at 40%). Text: `primary` (#ffd597).
*   **Ritualistic Panels (Cards):**
    Never use standard rectangles. Use "clipped" corners or asymmetric padding. Separate content within cards using vertical whitespace (24px/32px) instead of divider lines.
*   **Glowing Dividers:**
    Where a break is mandatory, use a 1px line of `surface_tint` (#ffba43) with a `box-shadow` of the same color to create a "burnt-in" horizontal scanline effect.
*   **Input Fields:**
    Background: `surface_container_lowest` (#0e0e0e). For focus states, do not change the border color; instead, apply a subtle inner glow using `primary_container`.
*   **Additional Component: The "Status Rune":**
    A small, glowing indicator used next to technical data. It pulses between `primary_container` (Stable) and `secondary_container` (Danger/Corrupted).

## 6. Do's and Don'ts

### Do:
*   **Embrace the Void:** Leave large areas of `surface` (#131313) empty to emphasize the "heavy" mood.
*   **Asymmetry:** Place technical data labels (Space Grotesk) off-center or rotated 90 degrees for a custom "terminal" feel.
*   **Runic Accents:** Use runes as decorative background elements at very low contrast (2-4% above background).

### Don't:
*   **No Rounded Corners:** `roundedness: 0px` is absolute. Any radius above 0px destroys the brutalist industrial aesthetic.
*   **No "Clean" Grays:** Avoid neutral grays. Every "neutral" in this system must be tinted toward the `outline` (#9f8e78) or `surface_variant` (#353534) to maintain the ancient, weathered feel.
*   **No Standard Icons:** Replace generic icons (like "Settings" or "User") with abstract runic or technical sigils where possible.