// comma-separates terms and leaves no trailing commas
export function formatAddress(...args: Array<string | undefined>): string {
  const clean = args.filter(str => !!str && !(str.toUpperCase() === 'US' || str.toUpperCase() === 'USA'));
  return Array.prototype.join.call(clean, ', ');
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
