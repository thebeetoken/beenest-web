import styled from 'styled-components';
import { color, typography } from 'styled/utils';

type Props = Partial<{
  align: string;
  background: string;
  end: string;
  font: string;
  placeholderColor: string;
  start: string;
  textColor: string;
}>

const AdminInputWrapperContainer = styled.div`
  color: ${({ textColor }: Props) => color(textColor || 'body')};
  height: 40px;
  ${({ font }: Props) => {
    switch (font) {
      case 'light-5':
        return typography('light', 5);
      case 'light-6':
        return typography('light', 6);
      case 'light-7':
        return typography('light', 7);
      case 'heavy-5':
        return typography('heavy', 5);
      case 'heavy-6':
        return typography('heavy', 6);
      case 'heavy-7':
        return typography('heavy', 7);
      case 'welter-5':
        return typography('welter', 5);
      case 'welter-6':
        return typography('welter', 6);
      case 'welter-7':
        return typography('welter', 7);
      default:
        return typography('welter', 5);
    }
  }};
  position: relative;

  input {
    border: 0;
    border-radius: 4px;
    border: 1px solid ${color('up')};
    box-shadow: 0 2px 10px ${color('black', 0.08)};
    caret-color: ${color('body')};
    color: currentColor;
    cursor: inherit;
    font: inherit;
    height: 100%;
    letter-spacing: inherit;
    line-height: inherit;
    outline: none;
    padding-left: ${({ start }: Props) => {
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
          return '8px';
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
    &::placeholder {
      font-size: 14px;
      font-weight: 300;
      color: ${({ placeholderColor }: Props) => color(placeholderColor || 'upper')};
    }
    &:hover {
      background-color: ${color('light')};
    }
    &:focus {
      border: 1px solid ${color('style')};
      &:hover {
        background-color: transparent;
      }
    }
    &.has-error {
      &:focus {
        border: 1px solid ${color('error')};
      }
    }
    &.is-success {
      &:focus {
        border: 1px solid ${color('correct')};
      }
    }
  }
`;

/** @component */
export default AdminInputWrapperContainer;