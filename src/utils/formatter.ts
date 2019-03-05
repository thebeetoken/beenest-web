import format from 'date-fns/format';
import { Listing } from "networking/listings";

// comma-separates terms and leaves no trailing commas
export function formatAddress(...args: Array<string>): string {
  const clean = args.filter(str => !!str && !(str.toUpperCase() === 'US' || str.toUpperCase() === 'USA'));
  return /^([0-9]|-)+$/.test(clean[clean.length - 1]) // No comma before postal code, if present
    ? clean.slice(0, -1).join(', ') + ' ' + clean.slice(-1)
    : clean.join(', ');
}

interface FormatGeolocationAddress {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

export function formatGeolocationAddress({ lat, lng, city, country }: FormatGeolocationAddress) {
  return `Latitude & Longitude: ${lat}, ${lng}, ${city}, ${country} `
}

export function arrayToString(input: string[]): string {
  if (!input || !input.length) return '';
  return input.toString().replace(/,/g, ', '); // space after comma
}

export function stringToArray(input: string): string[] {
  if (!input) return [];
  return input
    .split(',')
    .map((a: string) => a.replace(/\s+/g, ' ').trim()) // remove unnecessary whitespaces
    .filter(String); // remove empty strings
}

export function getGoogleMapURI(listing: Listing): string {	
  const { lat, lng } = listing;
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function formatPrice(price: number) { // TODO: Currency?
  return `\$${price.toFixed(2)}`;
}

export function formatMonth(date: Date | string) {
  return format(date, 'MMMM YYYY');
}