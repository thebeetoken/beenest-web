import { Currency } from 'networking/bookings';
import { numberToLocaleString } from 'utils/numberToLocaleString';

export const currencyToDisplay = (currency: Currency | null, value: number) => {
  return `${currency && currency === Currency.USD ? '$' : ''}${numberToLocaleString(value, currency)} ${currency && currency}`.trim();
}