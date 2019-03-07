/**
 * Styled Components Colors configuration
 *
 * @author @kevin, @george, @andy,
 **/

// Object holding Brand colors
const brand = {
  core: '#455A64',
  link: '#00969e',
  secondary: '#77838f',
  style: '#377dff',
};

// Object holding Social colors
const social = {
  earn: '#BA9462',
  facebook: '#3664A2',
  google: '#DF564B',
  linkedin: '#0077B5',
  onfido: '#59C5A2',
  twitter: '#1DA1F2',
};

// Object holding Tone colors
const tone = {
  dark: '#494C4D',
  light: '#FAFAFA',
  lighter: '#FCFCFC',
  middle: '#ECEFF1',
  top: '#777777',
  up: '#CFD8DC',
  upper: '#ACB6BB',
};

// Object holding Utility colors
const utility = {
  black: '#000000',
  body: '#263238',
  correct: '#18B28A',
  edit: '#5A869A',
  error: '#E7643A',
  incorrect: '#CC4733',
  sub: '#F6D222',
  tag: '#12ACBB',
  white: '#FFFFFF',
};

interface Canvas {
  readonly [colors: string]: string;
}

// Merge color objects together to one canvas object
export const canvas: Canvas = {
  ...brand,
  ...social,
  ...tone,
  ...utility,
};

export const color = (colors: string, opacity: number = 1): string => {
  const hexCode = canvas[colors];
  const r = parseInt(hexCode.slice(1, 3), 16);
  const g = parseInt(hexCode.slice(3, 5), 16);
  const b = parseInt(hexCode.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity})`;
};

export const hexColor = (c: string) => canvas[c];
