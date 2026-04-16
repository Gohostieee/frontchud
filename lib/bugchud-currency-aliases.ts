const UNIFIED_CURRENCY_ALIASES = ["zennies", "brouzoufs", "mammons"] as const;

function isUnifiedCurrencyAlias(denomination: string) {
  return UNIFIED_CURRENCY_ALIASES.includes(
    denomination as (typeof UNIFIED_CURRENCY_ALIASES)[number],
  );
}

export function getVisibleCurrencyDenominations(
  denominations: readonly string[],
  defaultCurrency: string,
) {
  const visible: string[] = [];
  let addedUnifiedCurrency = false;

  for (const denomination of denominations) {
    if (isUnifiedCurrencyAlias(denomination)) {
      if (!addedUnifiedCurrency) {
        visible.push(defaultCurrency);
        addedUnifiedCurrency = true;
      }
      continue;
    }

    if (!visible.includes(denomination)) {
      visible.push(denomination);
    }
  }

  if (!addedUnifiedCurrency && isUnifiedCurrencyAlias(defaultCurrency)) {
    visible.unshift(defaultCurrency);
  }

  return visible;
}

export function getCurrencyFieldLabel(denomination: string) {
  if (isUnifiedCurrencyAlias(denomination)) {
    return "zennies / brouzoufs / mammons";
  }

  return denomination;
}

export function readCurrencyAmount(
  currency: Record<string, number> | undefined,
  denomination: string,
) {
  if (!currency) {
    return 0;
  }

  if (isUnifiedCurrencyAlias(denomination)) {
    return UNIFIED_CURRENCY_ALIASES.reduce(
      (total, alias) => total + (currency[alias] ?? 0),
      0,
    );
  }

  return currency[denomination] ?? 0;
}

export function writeCurrencyAmount(
  currency: Record<string, number> | undefined,
  denomination: string,
  amount: number,
  defaultCurrency: string,
) {
  const nextCurrency = { ...(currency ?? {}) };

  if (isUnifiedCurrencyAlias(denomination)) {
    for (const alias of UNIFIED_CURRENCY_ALIASES) {
      delete nextCurrency[alias];
    }
    nextCurrency[defaultCurrency] = amount;
    return nextCurrency;
  }

  nextCurrency[denomination] = amount;
  return nextCurrency;
}

export function normalizeCurrencyAliases(
  currency: Record<string, number> | undefined,
  defaultCurrency: string,
) {
  if (!currency) {
    return {};
  }

  const hasUnifiedCurrency = UNIFIED_CURRENCY_ALIASES.some((alias) => alias in currency);
  if (!hasUnifiedCurrency) {
    return { ...currency };
  }

  const nextCurrency: Record<string, number> = {};
  for (const [denomination, amount] of Object.entries(currency)) {
    if (isUnifiedCurrencyAlias(denomination)) {
      continue;
    }
    nextCurrency[denomination] = amount;
  }

  nextCurrency[defaultCurrency] = readCurrencyAmount(currency, defaultCurrency);
  return nextCurrency;
}
