import { Currency } from 'networking/bookings';

const CURRENCY_DIGITS = {
  [Currency.BEE]: 0,
  [Currency.ETH]: 4,
  [Currency.USD]: 2,
};
const DEFAULT_DIGITS = 2;

export function numberToLocaleString(value: number | string, currency: Currency | null = Currency.USD): string {
  if (typeof value !== 'number') {
    return value;
  }

  if (!value) {
    return '';
  }

  const digits = CURRENCY_DIGITS.hasOwnProperty(currency) ?
    CURRENCY_DIGITS[currency] : DEFAULT_DIGITS;

  return value.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
