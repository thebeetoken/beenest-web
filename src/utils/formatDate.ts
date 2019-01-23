import format from 'date-fns/format';

/**
 * Formats the checkInDate and checkOutDate to UTC and a date range 
 * @param {string} checkInDate ex. 2019-01-09T00:00:00.000Z
 * @param {string} checkOutDate ex. 2019-01-11T00:00:00.000Z
 * @returns {string} ex. 01/09/2019 - 01/11/2019
 */

export const formatDateRange = (checkInDate: string, checkOutDate: string): string => {
  return `${format(checkInDate.slice(0, 10), 'MM/DD/YYYY')} - ${format(checkOutDate.slice(0, 10), 'MM/DD/YYYY')}`;
}

/**
 * Formats the full date into human, readable date
 * @param {string} string ex. 2019-01-09T00:00:00.000Z
 * @returns {string} ex. 01/09/2019
 */
export const formatSingleDate = (date: string, formatString?: string): string => {
  return format(date.slice(0, 10), formatString || 'MM/DD/YYYY');
}

/**
 * Formats the date to just the year
 * @param {Date} date ex. 2019-01-09T00:00:00.000Z
 * @returns {string} ex. 2019
 */
export const dateToYear = (date: Date | string): string => format(date, 'YYYY');