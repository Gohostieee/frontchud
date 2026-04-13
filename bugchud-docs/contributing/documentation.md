# Documentation Maintenance

## What This Is

This page defines the documentation maintenance rule for the repository.

## When An App Should Use It

Repository maintainers and contributors should use this page whenever they add, rename, or significantly change a public API or schema family.

## Important Related Types And Classes

- public exports from `src/bugchud/index.ts`
- public subpath entrypoints
- `typedoc.json`
- `docs/api/`

## How It Connects To The Rest Of The Library

The repo now has two documentation sources that must stay aligned:

- handbook docs in `docs/`
  Source of truth for concepts, intended usage, architecture, and boundaries.
- generated API docs in `docs/api/`
  Source of truth for signatures, public export inventory, and symbol-level reference.

## Example Usage

When a new public export or schema family is added, the change is not complete until all of these are true:

1. The exported symbol has meaningful JSDoc.
2. The relevant handbook page explains when and why an application would use it.
3. `npm run docs:check` passes.
4. README or docs index links are updated if the new surface changes the primary navigation.

## Caveats Or Current Limitations

- Generated API docs are only as good as the source comments.
- Handbook pages should explain intent and boundaries, not duplicate every generated signature.
- If a change introduces a new schema family, update the schema overview before adding narrower detail pages.
