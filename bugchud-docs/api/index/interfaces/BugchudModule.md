[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [index](../index.md) / BugchudModule

# Interface: BugchudModule\<TMetadata\>

Defined in: runtime/modules.ts:20

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
| <a id="property-namespace"></a> `namespace` | `string` | Unique namespace used for extension state, registries, and selector lookup. | runtime/modules.ts:22 |
| <a id="property-metadata"></a> `metadata?` | `TMetadata` | App-defined metadata describing the module or its feature flags. | runtime/modules.ts:24 |
| <a id="property-registries"></a> `registries?` | `Readonly`\<`Record`\<`string`, `Readonly`\<`Record`\<`string`, [`JsonObject`](../../foundation/interfaces/JsonObject.md)\>\>\>\> | Optional namespaced registries for project-specific authored extension data. | runtime/modules.ts:26 |
| <a id="property-validators"></a> `validators?` | `object` | - | runtime/modules.ts:27 |
| `validators.ruleset?` | [`Validator`](../type-aliases/Validator.md)\<[`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md)\> | Additional ruleset validation run alongside built-in rules. | runtime/modules.ts:29 |
| `validators.character?` | [`Validator`](../type-aliases/Validator.md)\<[`CharacterState`](../../state/interfaces/CharacterState.md)\> | Additional character snapshot validation run alongside built-in rules. | runtime/modules.ts:31 |
| `validators.npc?` | [`Validator`](../type-aliases/Validator.md)\<[`NpcState`](../../state/interfaces/NpcState.md)\> | Additional NPC snapshot validation run alongside built-in rules. | runtime/modules.ts:33 |
| <a id="property-selectors"></a> `selectors?` | `Readonly`\<`Record`\<`string`, (`context`) => `unknown`\>\> | App-defined selector functions invoked through `BugchudCore.select()`. | runtime/modules.ts:36 |
| <a id="property-hooks"></a> `hooks?` | `object` | - | runtime/modules.ts:37 |
| `hooks.extendCharacter?` | `void` | - | runtime/modules.ts:39 |
| `hooks.extendNpc?` | `void` | - | runtime/modules.ts:41 |
