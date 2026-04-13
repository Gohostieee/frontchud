[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [content](../index.md) / BodyRulesDefinition

# Interface: BodyRulesDefinition

Defined in: [content/body.ts:57](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/body.ts#L57)

Aggregated body-system metadata linking bionics, mutation, and Xom.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-bionicrefs"></a> `bionicRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"bionic"`\>[] | [content/body.ts:58](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/body.ts#L58) |
| <a id="property-mutationrefs"></a> `mutationRefs` | readonly [`RegistryRef`](../../foundation/interfaces/RegistryRef.md)\<`"mutation"`\>[] | [content/body.ts:59](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/body.ts#L59) |
| <a id="property-xom"></a> `xom` | [`XomDefinition`](XomDefinition.md) | [content/body.ts:60](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/body.ts#L60) |
| <a id="property-removalrules"></a> `removalRules` | readonly [`MutationRemovalRuleDefinition`](MutationRemovalRuleDefinition.md)[] | [content/body.ts:61](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/body.ts#L61) |
| <a id="property-bodytags"></a> `bodyTags?` | readonly `string`[] | [content/body.ts:62](https://github.com/Gohostieee/finalchud/blob/85a148e8fcb68c528fff24f9dc2939a747ac1005/src/bugchud/content/body.ts#L62) |
