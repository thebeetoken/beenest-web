import styled from "styled-components";
import { cover, typography, color } from 'styled/utils';

type TextareaContainerProps = Partial<{
  admin: boolean;
  background: string;
  hasError: boolean;
  isFocused: boolean;
  isSuccessful: boolean;
  label: string;
  labelColor: string;
  labelSmall: boolean;
  noBoxShadow: boolean;
  placeholderColor: string;
  placeholderOpacity: number;
  textAlign: string;
  textareaHeight: string;
  textColor: string;
  textSize: string;
}>;

const TextareaContainer = styled.div`
  background-color: ${({ background }: TextareaContainerProps) => color(background || 'white')};
  border-radius: ${({ admin }: TextareaContainerProps) => admin ? '4px' : '0'};
  border: 1px solid ${color('up')};
  box-shadow: ${({ noBoxShadow }: TextareaContainerProps) => noBoxShadow ? 'none' : `0 2px 10px ${color('black', 0.08)}`};
  cursor: text;
  display: flex;
  height: ${({ textareaHeight }: TextareaContainerProps) => textareaHeight || '164px'};
  max-height: 224px;
  min-height: 164px;
  outline: 0;
  padding: 0;
  position: relative;
  transition: all 0.2s ease-in-out;
  width: 100%;
  &::placeholder {
    font-size: 14px;
    font-weight: 300;
    color: ${({ placeholderColor }: TextareaContainerProps) => color(placeholderColor || 'upper')};
  }
  &:hover {
    background-color: ${color('light')};
  }
  &:focus-within {
    border: 1px solid ${color('style')};
    &:hover {
      background-color: transparent;
    }
  }
  &.has-error {
    &:focus-within {
      border: 1px solid ${color('error')};
    }
  }
  &.is-success {
    &:focus-within {
      border: 1px solid ${color('correct')};
    }
  }


  .bee-textarea--wrapper {
    color: ${({ textColor }: TextareaContainerProps) => color(textColor || 'body')};
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px;
    position: relative;
    transition: all 0.2s ease-in-out;
    z-index: 2;
    /* &::after {
      ${cover(true)}
      border: 1px solid ${color('up')};
      border-radius: 4px;
      opacity: 0;
      transition: all 0.2s ease-in-out;
      z-index: 2;
    } */
    @media (min-width: 1025px) {
      &:hover {
        &::after {
          opacity: ${({ admin, hasError, isFocused, isSuccessful }: TextareaContainerProps) => {
            if (!admin || hasError || isFocused || isSuccessful) {
              return '0';
            }
            return '1';
          }}
        }
      }
    }
  }


  .bee-textarea--content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    overflow: hidden;
  }


  .bee-textarea--label {
    color: ${({ labelColor }: TextareaContainerProps) => color(labelColor || 'core')};
    height: ${({ label }: TextareaContainerProps) => !!label ? 'calc(100% + 16px)' : '100%'};
    left: 0;
    position: absolute;
    right: 0;
    top: ${({ label }: TextareaContainerProps) => !!label ? '-16px' : '0'};
    width: 100%;
    span {
      ${({ labelSmall }: TextareaContainerProps) => labelSmall ? typography('emp', 8) : typography('emp', 7)};
      position: absolute;
      left: 0;
      top: 0;
    }
  }


  .bee-textarea--text {
    ${({ admin, textSize }: TextareaContainerProps) => {
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
    overflow: auto;
    position: relative;
    text-align: ${({ textAlign }: TextareaContainerProps) => {
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


  .DraftEditor-root {
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
    padding: 0;
    position: relative;
    resize: none;
    text-align: inherit;
    width: 100%;
    .public-DraftEditorPlaceholder-root {
      ${typography('light', 6)}
      color: ${({ placeholderColor, placeholderOpacity }: TextareaContainerProps) => {
        if (!!placeholderColor && placeholderOpacity) {
          return color(placeholderColor, placeholderOpacity);
        } else if (!!placeholderColor && !placeholderOpacity) {
          return color(placeholderColor);
        }
        return color('upper');
      }};
      left: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
    }
    .DraftEditor-editorContainer {
      height: 100%;
      .public-DraftEditor-content {
        height: 100%;
      }
    }
  }
`;

/** @component */
export default TextareaContainer;
