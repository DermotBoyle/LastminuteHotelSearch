export enum Currency {
  EUR = 'EUR',
}

export const CurrencySymbolLabels: Record<Currency, string> = {
  [Currency.EUR]: '€',
}

export const getTotalWithCurrencySymbol = (currency: Currency, price: number) => `${CurrencySymbolLabels[currency]}${price} `
