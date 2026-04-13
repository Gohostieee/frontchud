[**@bugchud/core API Reference v0.1.0**](../../index.md)

***

[@bugchud/core API Reference](../../index.md) / [foundation](../index.md) / trace

# Function: trace()

```ts
function trace(
   rulebookChapter, 
   start, 
   end, 
   sourceNote?, 
   keywords?): SourceTrace;
```

Defined in: foundation/builders.ts:28

Construct a rulebook source trace while keeping optional metadata optional.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `rulebookChapter` | \| `"CHAPTER 0: INTRODUCTION"` \| `"CHAPTER 1: ATTRIBUTES & TAGS"` \| `"CHAPTER 2: CHECKS & SAVES"` \| `"CHAPTER 3: CHARACTER CREATION"` \| `"CHAPTER 3: CHARACTER progression"` \| `"CHAPTER 4: EQUIPMENT"` \| `"CHAPTER 5: VEHICLES & MOUNTS"` \| `"CHAPTER 7: BIONICS"` \| `"CHAPTER 8: MUTATION"` \| `"CHAPTER 9: MAGICK OF PSYDONIA"` \| `"CHAPTER 10: ALCHEMY"` \| `"CHAPTER 11: FAITHS OF PSYDONIA"` \| `"CHAPTER 12: COMBAT RULES"` \| `"CHAPTER 14: WARBANDS AND FORTRESSES"` \| `"CHAPTER 17: THE WORLD OF PSYDONIA"` \| `"CHAPTER 18: BOOK OF THE GRUNGEON-MASTER"` |
| `start` | `number` |
| `end` | `number` |
| `sourceNote?` | `string` |
| `keywords?` | readonly `string`[] |

## Returns

[`SourceTrace`](../interfaces/SourceTrace.md)
