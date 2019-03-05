import styled from 'styled-components';
import { base, color, typography } from 'styled/utils';

type Props = Partial<{
  align: string;
  background: string;
  box: boolean;
  end: string;
  font: string;
  mobile: boolean;
  placeholderColor: string;
  start: string;
  textColor: string;
}>;

const InputWrapperContainer = styled.div`
  color: ${({ textColor }: Props) => color(textColor || 'body')};
  height: ${({ mobile }: Props) => mobile ? '48px' : '40px'};
  ${({ font }: Props) => {
    switch (font) {
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
      default:
        return typography('read', 1);
    }
  }};
  font-family: ${base['font-family']};
  position: relative;

  input {
    border: 0;
    ${({ box }: Props) => {
      const type = box ? 'border' : 'border-bottom';
      return `${type}: 1px solid ${color('body')};`; 
    }};
    border-radius: 0;
    caret-color: ${color('body')};
    color: currentColor;
    cursor: inherit;
    font: inherit;
    font-family: inherit;
    height: 100%;
    letter-spacing: inherit;
    line-height: inherit;
    outline: none;
    padding: 0;
    padding-left: ${({ box, start }: Props) => {
      if (box && !start) {
        return '16px';
      }
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
    padding-right: ${({ end }: Props) => {
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
    text-align: ${({ align }: Props) => align || 'left'};
    transition: all 0.2s ease-in-out;
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none; /* get rid of default appearance for IE8, 9 and 10*/
    &::placeholder {
      font-size: 14px;
      font-weight: 300;
      color: ${({ placeholderColor }: Props) => color(placeholderColor || 'upper')};
    }
    &::-moz-placeholder {
      color: ${({ placeholderColor }: Props) => color(placeholderColor || 'top')};
    }
    &:focus {
      ${({ box }: Props) => {
        const type = box ? 'border' : 'border-bottom';
        return `${type}: 1px solid ${color('style')}`; 
      }};
    }
    &:disabled {
      opacity: 0.5;
    }
    &.has-error {
      ${({ box }: Props) => {
        const type = box ? 'border' : 'border-bottom';
        return `${type}: 1px solid ${color('error')};`; 
      }};
      &:focus {
        ${({ box }: Props) => {
          const type = box ? 'border' : 'border-bottom';
          return `${type}: 1px solid ${color('error')};`; 
        }};
      }
    }
    &.is-success {
      ${({ box }: Props) => {
        const type = box ? 'border' : 'border-bottom';
        return `${type}: 1px solid ${color('correct')};`; 
      }};
      &:focus {
        ${({ box }: Props) => {
          const type = box ? 'border' : 'border-bottom';
          return `${type}: 1px solid ${color('correct')};`; 
        }};
      }
    }
  }
`;

/** @component */
export default InputWrapperContainer;