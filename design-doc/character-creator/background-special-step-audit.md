# Background Special-Step Audit

This audit walks every imported background in the current BUGCHUD ruleset and calls out which ones need a future guided character-creation step beyond simply attaching the background and its starting dream.

Primary source docs reviewed:

- `bugchud-docs/api/data/imported/variables/importedBackgrounds.md`
- `bugchud-docs/api/data/imported/variables/importedDreams.md`
- `bugchud-docs/api/data/imported/variables/dreamImportNotes.md`

Implementation sanity check:

- `node_modules/@bugchud/core/dist/character/initializer.js`
- `node_modules/@bugchud/core/dist/data/imported/character/backgrounds.js`
- `node_modules/@bugchud/core/dist/data/imported/character/dreams.js`

Important implementation note: Bugchud currently auto-derives `spellAccessUnlocked` from dream grants, but it does not automatically apply dream-granted languages, recipe unlocks, followers, starting spells, mutations, or bionics during character initialization. That means some dream effects are still procedural even when the schema can represent the end state.

## Legend

- `Yes`: this background clearly needs a dedicated guided step in the future.
- `Maybe`: not strictly blocked, but a guided step or auto-application would improve correctness and reduce manual work.
- `No`: the background does not appear to need a special creation step beyond normal selection.
- `Unknown`: the imported docs are missing enough information that we cannot define the step yet.

## Background Matrix

| Background | Starting dream | Special step | What the future step needs to do |
| --- | --- | --- | --- |
| Fighter | Martial Prowess | No | Passive combat effect only. No creation-time choice or extra procedural input is described. |
| Rogue | Damn Dirty Rogue | No | Passive situational reroll effect only. |
| Learned | Scholar | No | The dream describes an in-play check flow, not a creation-time step. |
| Devout | Zealot | No | Passive save behavior only. |
| Noble-Born | Noble-Blood | Maybe | This is creation-only social status. A future step may need to stamp noble status or a social/reputation flag because the dream describes lineage and tax exemption, but there is no first-class noble-status field today. |
| Monster-Hunter | Nite-Slayer | No | Passive combat modifier only. |
| Duelist | Dancing Technique | No | Passive combat rule swap only. |
| Doktor | Surgeon | No | Passive healing modifier only. |
| Berserker | Wrathful Abandon | No | Passive combat rule only. |
| Savage | Sexy Savage | No | Passive conditional combat effect only. |
| Skirmisher | Diligent Bowman | No | Passive combat rule only. |
| Shaman | None imported | Unknown | The docs explicitly note the rendered source does not print a `Begin with ...` dream line for Shaman, so we cannot define a guided step until the source rule is clarified. |
| Nomad | Roaming Cavalry | No | Passive mounted/ranged/travel rule only. |
| Raider | None imported | Unknown | Same source gap as Shaman: the rendered source names the background but omits the starting dream line. |
| Wendigo | Fell-Beest | No | The dream's rite happens later in play. It does not require a creation-time choice or roll. |
| Wizard | Arcyne Potential | Maybe | Spell access is auto-derived, so no hard blocker exists, but a guided step could explain that this background unlocks spellcasting and grimoire use. No explicit starting spell choice is encoded here. |
| Vicious | Cruel Technique | No | Passive combat modifier only. |
| Mutant | Gene-Freek | Yes | Must roll twice on the mutation table when the dream is acquired, then apply the resulting mutation refs. The dream also keys future attribute value off total held mutations, so this is the clearest missing procedural step besides Cyborg. |
| Perfumer | Chem-Tech | Maybe | The dream grants `alchemyAccess` with specific recipe refs, but character initialization does not auto-apply those recipes. A guided step or auto-grant should add the starting recipes and explain alchemy access. |
| Archon | Sterile-Tyrant | Yes | Needs a social/follower step. The dream is creation-only and grants sworn cutthroats, while the background also carries `socialTags: ["Inhumen worshippers only"]`. The imported dream summary says `3d6` cutthroats, but the imported grant currently stores a fixed quantity of `10`, so this step also needs a product decision on whether to preserve the authored roll or trust the normalized import. |
| Former Slave | Trodden-Upon | No | Passive survival rule only. |
| Cyborg | Overclocked | Yes | Must let the player choose a free major bionic at creation. This is explicitly called out by `dreamImportNotes` as still procedural because the schema has no first-class representation for the free major-bionic choice. |
| Infantry | Efficient Gunman | No | Passive ammo rule only. |
| Dread-Tongued | Dread-Tongued | Yes | Needs a spell-and-language grant step. The dream grants `The Black Tongue` and explicit spell refs, but character initialization does not auto-apply either. A future step should add the language and the granted spells automatically or walk the player through confirming them. |

## Highest-Priority Future Steps

1. `Mutant / Gene-Freek`
   Needs mutation-table resolution and application of two mutation results.
2. `Cyborg / Overclocked`
   Needs a guided free major-bionic pick.
3. `Dread-Tongued`
   Needs automatic or guided application of the granted language and spells.
4. `Archon / Sterile-Tyrant`
   Needs follower/social-status handling and a decision on `3d6` versus fixed `10`.

## Secondary Improvements

1. `Perfumer / Chem-Tech`
   Should auto-add the granted recipes or present a small alchemy unlock step.
2. `Noble-Born / Noble-Blood`
   Should eventually map noble-house status into explicit social metadata instead of leaving it implied by dream text.
3. `Wizard / Arcyne Potential`
   Does not require a hard creation step, but could benefit from better guided onboarding into spell access.

## Blocked By Source Gaps

1. `Shaman`
   Imported docs say the source page does not print a starting dream line.
2. `Raider`
   Imported docs say the source page does not print a starting dream line.

These are not implementation gaps so much as data-clarity gaps. We should not invent steps for them until the source text is confirmed.
