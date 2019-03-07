import styled from "styled-components";
import { cover, typography, color } from 'styled/utils';

type InputContainerProps = Partial<{
  admin: boolean;
  background: string;
  box: boolean;
  end: string;
  hasError: boolean;
  isFocused: boolean;
  isSuccessful: boolean;
  label: string;
  labelColor: string;
  labelSmall: boolean;
  noBoxShadow: boolean;
  placeholderColor: string;
  placeholderOpacity: number;
  prefixColor: string;
  prefixSize: string;
  size: string;
  start: string;
  suffixColor: string;
  suffixSize: string;
  textAlign: string;
  textColor: string;
  textSize: string;
}>;

const InputContainer = styled.div`
  background-color: ${({ background }: InputContainerProps) => color(background || 'white')};
  border-radius: ${({ admin }: InputContainerProps) => admin ? '4px' : '0'};
  box-shadow: ${({ noBoxShadow }: InputContainerProps) =>
    noBoxShadow ? 'none' : `0 2px 10px ${color('black', 0.08)}`};
  cursor: text;
  display: flex;
  height: ${({ admin, size }: InputContainerProps) => {
    if (admin) {
      return '40px';
    } else if (!!size) {
      return size;
    }
    return '48px';
  }};
  outline: 0;
  position: relative;
  transition: all 0.2s ease-in-out;
  width: 100%;
  &::before,
  &::after {
    ${cover(true)}
    opacity: 0;
    transition: all 0.2s ease-in-out;
    z-index: 1;
  }
  &::before {
    border-bottom: 2px solid ${({ hasError, isSuccessful }: InputContainerProps) => {
      if (hasError) {
        return color('error');
      }
      if (isSuccessful) {
        return color('secondary');
      }
      return color('style');
    }};
    opacity: ${({ admin, box, hasError, isFocused, isSuccessful }: InputContainerProps) => {
      if ((hasError || isSuccessful || isFocused) && !box && !admin) {
        return '1';
      }
      return '0';
    }}
  }
  &::after {
    border: ${({ admin, hasError, isSuccessful, isFocused }: InputContainerProps) => {
      const borderSize = admin ? '1px' : '2px';
      if (hasError) {
        return `${borderSize} solid ${color('incorrect')}`;
      }
      if (isSuccessful) {
        return `${borderSize} solid ${color('secondary')}`;
      }
      if (!isFocused && !hasError && !isSuccessful) {
        return `${borderSize} solid ${color('middle')}`;
      }
      return `${borderSize} solid ${color('style')}`;
    }};
    border-radius: ${({ admin }: InputContainerProps) => (admin ? '4px' : '0')};
    opacity: ${({ admin, box, hasError, isFocused, isSuccessful }: InputContainerProps) => {
      if (
        (!isFocused && admin) ||
        ((hasError || isSuccessful) && box) ||
        ((hasError || isSuccessful) && admin) ||
        (isFocused && (admin || box))
      ) {
        return '1';
      }
      return '0';
    }}
  }


  .bee-input--wrapper {
    color: ${({ textColor }: InputContainerProps) => color(textColor || 'body')};
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: ${({ admin, box }: InputContainerProps) => (admin || box ? '0 8px' : '0')};
    position: relative;
    transition: all 0.2s ease-in-out;
    z-index: 2;
    &::after {
      ${cover(true)}
      border: 1px solid ${color('up')};
      border-radius: 4px;
      opacity: 0;
      transition: all 0.2s ease-in-out;
      z-index: 2;
    }
    @media (min-width: 1025px) {
      &:hover {
        &::after {
          opacity: ${({ admin, hasError, isFocused, isSuccessful }: InputContainerProps) => {
            if (hasError || isSuccessful || !admin || isFocused) {
              return '0';
            }
            return '1';
          }}
        }
      }
    }
  }


  .bee-input--svg-wrapper-prefix,
  .bee-input--svg-wrapper-suffix {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .bee-input--svg-wrapper-prefix {
    width: ${({ prefixSize }: InputContainerProps) => {
      switch (prefixSize) {
        case 'default':
          return '24px';
        case 'small':
          return '32px';
        case 'medium':
          return '40px';
        case 'large':
          return '48px';
        default:
          return '24px';
      }
    }};
  }
  .bee-input--svg-wrapper-suffix {
    width: ${({ suffixSize }: InputContainerProps) => {
      switch (suffixSize) {
        case 'default':
          return '24px';
        case 'small':
          return '32px';
        case 'medium':
          return '40px';
        case 'large':
          return '48px';
        default:
          return '24px';
      }
    }};
  }
  .bee-input--svg-prefix,
  .bee-input--svg-suffix {
    width: 24px;
    svg {
      width: 24px;
    }
  }
  .bee-input--svg-prefix {
    color: ${({ prefixColor }: InputContainerProps) => (!!prefixColor ? color(prefixColor) : 'currentColor')};
  }
  .bee-input--svg-suffix {
    color: ${({ suffixColor }: InputContainerProps) => (!!suffixColor ? color(suffixColor) : 'currentColor')};
  }


  .bee-input--content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    padding-left: ${({ start }: InputContainerProps) => {
      switch (start) {
        case 'zero':
          return '0';
        case 'small':
          return '16px';
        case 'medium':
          return '24px';
        case 'large':
          return '32px';
        default:
          return '0';
      }
    }};
    padding-right: ${({ end }: InputContainerProps) => {
      switch (end) {
        case 'zero':
          return '0';
        case 'small':
          return '16px';
        case 'medium':
          return '24px';
        case 'large':
          return '32px';
        default:
          return '0';
      }
    }};
  }


  .bee-input--label {
    color: ${({ labelColor }: InputContainerProps) => color(labelColor || 'core')};
    height: ${({ label }: InputContainerProps) => (!!label ? 'calc(100% + 16px)' : '100%')};
    left: 0;
    position: absolute;
    right: 0;
    top: ${({ label }: InputContainerProps) => (!!label ? '-16px' : '0')};
    width: 100%;
    span {
      ${({ labelSmall }: InputContainerProps) => (labelSmall ? typography('emp', 8) : typography('emp', 7))};
      position: absolute;
      left: 0;
      top: 0;
    }
  }


  .bee-input--text {
    ${({ admin, textSize }: InputContainerProps) => {
      switch (textSize) {
        case 'tiny':
          return typography('read', 3);
        case 'tiny-e':
          return typography('emp', 7);
        case 'small':
          return typography('read', 2);
        case 'small-e':
          return typography('emp', 6);
        case 'medium':
          return typography('read', 1);
        case 'medium-e':
          return typography('emp', 5);
        case 'light-5':
          return typography('light', 5);
        case 'light-6':
          return typography('light', 6);
        case 'light-7':
          return typography('light', 7);
        case 'welter-5':
          return typography('welter', 5);
        case 'welter-6':
          return typography('welter', 6);
        case 'welter-7':
          return typography('welter', 7);
        case 'heavy-5':
          return typography('heavy', 5);
        case 'heavy-6':
          return typography('heavy', 6);
        case 'heavy-7':
          return typography('heavy', 7);
        default:
          return admin ? typography('welter', 5) : typography('read', 1);
      }
    }};
    height: 100%;
    overflow: hidden;
    position: relative;
    text-align: ${({ textAlign }: InputContainerProps) => {
      switch (textAlign) {
        case 'left':
          return 'left';
        case 'center':
          return 'center';
        case 'right':
          return 'right';
        default:
          return 'left';
      }
    }};
    text-overflow: ellipsis;
    white-space: normal;
    z-index: 1;
  }


  input {
    background: none;
    border: none;
    caret-color: ${color('body')};
    color: currentColor;
    cursor: inherit;
    font: inherit;
    height: 100%;
    letter-spacing: inherit;
    line-height: inherit;
    outline: none;
    text-align: inherit;
    width: 100%;
    &::placeholder {
      ${typography('light', 6)}
      color: ${({ placeholderColor, placeholderOpacity }: InputContainerProps) => {
        if (!!placeholderColor && placeholderOpacity) {
          return color(placeholderColor, placeholderOpacity);
        } else if (!!placeholderColor && !placeholderOpacity) {
          return color(placeholderColor);
        }
        return color('upper');
      }};
    }
  }
`;

/** @component */
export default InputContainer;