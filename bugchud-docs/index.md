# Documentation Index

This handbook explains `@bugchud/core` from an application-integration point of view.

If you are building with the package for the first time, start here:

- [Getting Started](./guides/getting-started.md)
- [Using The Library In An Application](./guides/using-in-an-application.md)
- [Runtime API Guide](./guides/runtime-api.md)
- [Character And NPC Workflows](./guides/character-and-npc-workflows.md)
- [Imported Data Guide](./guides/imported-data.md)

If you need the architecture and data model behind the runtime surface, start here:

- [Layer Model](./concepts/layer-model.md)
- [Data Flow](./concepts/data-flow.md)
- [IDs And Refs](./concepts/ids-and-refs.md)
- [Snapshots And Serialization](./concepts/snapshots-and-serialization.md)
- [Extensions](./concepts/extensions.md)

If you need schema-level detail, start here:

- [Schema Overview](./reference/schemas/overview.md)
- [Content Schemas](./reference/schemas/content.md)
- [State Schemas](./reference/schemas/state.md)
- [Contracts, Views, And Validation](./reference/schemas/contracts-views-validation.md)

If you need exact signatures, use the generated reference:

- [Generated API Reference](./api/index.md)
- [Root Runtime Exports](./api/index/index.md)
- [Foundation Exports](./api/foundation/index.md)
- [Content Exports](./api/content/index.md)
- [State Exports](./api/state/index.md)

## Handbook Structure

- `concepts/`
  Architectural explanations, boundaries, and relationships between layers.
- `guides/`
  Task-oriented documentation for application developers.
- `reference/schemas/`
  Schema family maps and field-level explanations for the public data model.
- `api/`
  Generated markdown reference from TypeScript source comments and public exports.

## Maintenance Rule

Any new public export or schema family should ship with both of the following:

- JSDoc good enough to appear in the generated API reference.
- Handbook coverage in the relevant conceptual, guide, or schema page.

See [Documentation Maintenance](./contributing/documentation.md).
