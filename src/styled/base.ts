/**
 * Styled Components Variables configuration
 *
 * @author @kevin, @george, @andy
 **/

import { color } from './color';

interface Base {
  readonly [key: string]: string;
}

export const BANNER_HEIGHT = 64;
export const HEADER_HEIGHT = 64;
export const MOBILE_HEADER_HEIGHT = 54;

const defaults = {
  'font-color': `${color('black')}`,
  'font-family': 'Averta, sans-serif',
  'highlight-color': 'false',
  'letter-spacing': 'false',
  'line-height': '1.43',
};

export const base: Base = {
  ...defaults,
  'background-color': `${color('white')}`,
  'box-sizing': 'border-box',
  'font-family': 'Montserrat, sans-serif',
};
