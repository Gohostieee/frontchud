[**@bugchud/core API Reference v0.2.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [contracts](../index.md) / RuleContext

# Interface: RuleContext

Defined in: [contracts/actions.ts:57](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L57)

Shared runtime context every resolver needs in order to interpret an action.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-ruleset"></a> `ruleset` | [`BugchudRuleset`](../../content/interfaces/BugchudRuleset.md) | [contracts/actions.ts:58](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L58) |
| <a id="property-world"></a> `world` | [`WorldState`](../../state/interfaces/WorldState.md) | [contracts/actions.ts:59](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L59) |
| <a id="property-campaign"></a> `campaign?` | [`CampaignState`](../../state/interfaces/CampaignState.md) | [contracts/actions.ts:60](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L60) |
| <a id="property-encounter"></a> `encounter?` | [`EncounterState`](../../state/interfaces/EncounterState.md) | [contracts/actions.ts:61](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L61) |
| <a id="property-actingcharacter"></a> `actingCharacter?` | [`CharacterState`](../../state/interfaces/CharacterState.md) | [contracts/actions.ts:62](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L62) |
| <a id="property-actingcreature"></a> `actingCreature?` | [`CreatureState`](../../state/interfaces/CreatureState.md) | [contracts/actions.ts:63](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L63) |
| <a id="property-timestamp"></a> `timestamp` | `object` | [contracts/actions.ts:64](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L64) |
| `timestamp.round?` | `number` | [contracts/actions.ts:65](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L65) |
| `timestamp.turn?` | `number` | [contracts/actions.ts:66](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L66) |
| `timestamp.campaignDay?` | `number` | [contracts/actions.ts:67](https://github.com/Gohostieee/finalchud/blob/aa9d2548e961dbc773e77737086a0a1e2c64eb3f/src/bugchud/contracts/actions.ts#L67) |
