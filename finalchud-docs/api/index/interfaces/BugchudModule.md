[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / BugchudModule

# Interface: BugchudModule\<TMetadata\>

Defined in: [runtime/modules.ts:20](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/modules.ts#L20)

Supported extension surface for downstream applications.

Modules let an app add namespaced registries, validators, selectors, and
model hooks without forking the shared schema package.

## Type Parameters

| Type Parameter |
| ------ |
| `TMetadata` *extends* [`JsonObject`](../../foundation/interfaces/JsonObject.md) |

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-namespace"></a> `namespace` | `string` | Unique namespace used for extension state, registries, and selector lookup. | [runtime/modules.ts:22](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/modules.ts#L22) |
| <a id="property-metadata"></a> `metadata?` | `TMetadata` | App-defined metadata describing the module or its feature flags. | [runtime/modules.ts:24](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/modules.ts#L24) |
| <a id="property-registries"></a> `registries?` | `Readonly`\<`Record`\<`string`, `Readonly`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\>\>\> | Optional namespaced registries for project-specific authored extension data. | [runtime/modules.ts:26](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/modules.ts#L26) |
| <a id="property-validators"></a> `validators?` | `object` | - | [runtime/modules.ts:27](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/modules.ts#L27) |
| `validators.ruleset?` | [`Validator`](../type-aliases/Validator.md)\<[`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md)\> | Additional ruleset validation run alongside built-in rules. | [runtime/modules.ts:29](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/modules.ts#L29) |
| `validators.character?` | [`Validator`](../type-aliases/Validator.md)\<[`CharacterState`](../../state/interfaces/CharacterState.md)\> | Additional character snapshot validation run alongside built-in rules. | [runtime/modules.ts:31](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/modules.ts#L31) |
| `validators.npc?` | [`Validator`](../type-aliases/Validator.md)\<[`NpcState`](../../state/interfaces/NpcState.md)\> | Additional NPC snapshot validation run alongside built-in rules. | [runtime/modules.ts:33](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/modules.ts#L33) |
| <a id="property-selectors"></a> `selectors?` | `Readonly`\<`Record`\<`string`, (`context`) => `unknown`\>\> | App-defined selector functions invoked through `BugchudCore.select()`. | [runtime/modules.ts:36](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/modules.ts#L36) |
| <a id="property-hooks"></a> `hooks?` | `object` | - | [runtime/modules.ts:37](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/modules.ts#L37) |
| `hooks.extendCharacter?` | `void` | - | [runtime/modules.ts:39](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/modules.ts#L39) |
| `hooks.extendNpc?` | `void` | - | [runtime/modules.ts:41](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/runtime/modules.ts#L41) |
