/**
 * Script injects styles to global page
 *
 * @author @kevin, @george, @andy
 **/

import { createGlobalStyle } from 'styled-components';
import { base } from './base';
import { color, typography } from 'styled/utils';

const GlobalStyles = createGlobalStyle`
  html {
    color: ${base['font-color']};
    font-family: ${base['font-family']};
    font-size: ${base['font-size']};
    height: 100%;
    line-height: ${base['line-height']};
    text-size-adjust: 100%;

    -webkit-tap-highlight-color: transparent;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: ${base['box-sizing']};
  }

  body {
    background-color: ${base['background-color']};
    height: 100%;
    position: relative;
    padding: 0;
    margin: 0;
  }
  
  a {
    text-decoration: none;
    cursor: pointer;
    color: currentColor;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  ul, li {
    list-style-type: none;
  }

  .bee-error-message {
    ${typography('read', 4)}
    align-items: center;
    color: ${color('error')};
    display: flex;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    &.show-error {
      opacity: 1;
    }
  }

  .bee-flex-div {
    flex-grow: 1;
  }
`;

export default GlobalStyles;