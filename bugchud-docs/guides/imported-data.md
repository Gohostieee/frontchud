# Imported Data Guide

## What This Is

This guide explains the `@bugchud/core/data` package, which ships the imported BUGCHUD ruleset and transcribed reference content.

## When An App Should Use It

Use this page when your application wants the canonical shared ruleset bundled with the package instead of supplying its own custom ruleset loader.

## Important Related Types And Classes

- `importedRuleset`
- `importedRegistries`
- `ImportedPackageManifest`
- `RulesetCatalog`
- `BugchudRuleset`

## How It Connects To The Rest Of The Library

`@bugchud/core/data` is not a separate runtime system. It is input data for the rest of the library.

Applications typically use it like this:

```ts
import { BugchudCore } from "@bugchud/core";
import { importedRuleset } from "@bugchud/core/data";

const core = new BugchudCore({ ruleset: importedRuleset });
```

Important design rules:

- treat imported data as read-only
- pass it into `BugchudCore` or `RulesetCatalog`
- prefer catalog/model APIs for application behavior
- avoid mutating imported registries in place

The package also exposes manifest and coverage data so downstream projects can understand what was imported and how complete the transcribed ruleset is.

## Example Usage

```ts
const issues = core.validateRuleset();
const allDreams = core.catalog.listByKind("dream");
```

## Caveats Or Current Limitations

- The data package is intentionally heavy and may not be suitable for every frontend bundle without code-splitting.
- This handbook documents the data package conceptually and structurally, not every individual registry entry.
- Applications that want custom or partial rulesets can skip `@bugchud/core/data` and provide their own `BugchudRuleset`.
