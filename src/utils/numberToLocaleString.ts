import { Currency } from 'networking/bookings';

export function numberToLocaleString(value: number, currency: Currency | null = Currency.USD): string {
  if (!value) {
    return '';
  }

  return value.toLocaleString(undefined, {
    minimumFractionDigits: getMinimumFractionDigits(currency),
    maximumFractionDigits: getMaximumFractionDigits(currency),
  });
}

function getMinimumFractionDigits(currency: Currency | null): number {
  switch (currency) {
    case Currency.BEE:
      return 0;
    case Currency.ETH:
      return 4;
    case Currency.USD:
      return 2;
    default:
      return 2;
  }
}

function getMaximumFractionDigits(currency: Currency | null): number {
  switch (currency) {
    case Currency.BEE:
      return 0;
    case Currency.ETH:
      return 4;
    case Currency.USD:
      return 2;
    default:
      return 2;
  }
}
