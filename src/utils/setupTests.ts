/**
 * The script sets and configures Enzyme and JSDOM
 * for front end testing
 *
 * @author @andy
 **/

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

const globalAny: any = global;
process.env = {
  ...process.env,
  SETTINGS: {
    ...globalAny.SETTINGS,
  },
};

// required for react-slick tests
const matchMedia = function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {},
  };
};

Object.defineProperty(global, 'matchMedia', { value: matchMedia, writable: true });
Object.defineProperty(window, 'localStorage', { value: {}, writable: true });
configure({ adapter: new Adapter() });
