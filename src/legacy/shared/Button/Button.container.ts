import styled from 'styled-components';
import { canvas } from 'styled/color';
import { typographyObject } from 'styled/typography';
import { base, color, cover, typography } from 'styled/utils';

// function that creates background css classes dynamically
const buttonBackgroundClasses = Object.keys(canvas).map((key: string): string => {
  return `&.bee-button-background {
    &__${key} {
      background-color: ${color(key)};
    }
  }`;
}).join('');

// function that creates typography css classes dynamically
const buttonBorderClasses = Object.keys(canvas).map((key: string): string => {
  return `&.bee-button-border {
    &__${key} {
      border: 2px solid ${color(key)};
      background-color: transparent;

      @media (min-width: 1025px) {
        &:hover {
          background: ${color(key)};
          color: ${key === 'white' ? color('core') : color('white')};
          opacity: 1;
          &:disabled {
            background: ${color('white')};
            color: ${color('core')};
            cursor: not-allowed;
            opacity: 0.5;
          }
        }
        &:active {
          opacity: 0.9;
          &:disabled {
            opacity: 1;
          }
        }
      }
    }
  }`;
}).join('');

// function that creates typography css classes dynamically
const buttonColorClasses = Object.keys(canvas).map((key: string): string => {
  return `&.bee-button-color {
    &__${key} {
      color: ${color(key)};
    }
  }`;
}).join('');

// function that creates typography css classes dynamically
const buttonTypographyClasses = Object.keys(typographyObject).map((name: string): string => {
  return Object.keys(typographyObject[name]).map((value: string): string => {
    return `&.bee-button-typography {
      &__${name}-${value} {
        ${typographyObject[name][value]}
      }
    }`;
  }).join('');
});

type ButtonContainerProps = Partial<{
  radius?: string;
}>;

const ButtonContainer = styled.button`
  ${typography('title', 8)}
  align-items: center;
  background-color: ${color('style')};
  border: 0;
  color: ${color('body')};
  cursor: pointer;
  display: flex;
  font-family: ${base['font-family']};
  flex-shrink: 0;
  height: 48px;
  justify-content: center;
  min-width: 120px;
  outline: none;
  padding: 0 20px;
  position: relative;
  transition: all 0.15s ease-in-out;


  /* Style to set border radius */
  border-radius: ${({ radius }: ButtonContainerProps) => radius || '4px'};


  @media (min-width: 1025px) {
    /* Styles for hover state */
    &:hover {
      opacity: 0.52;
    }


    /* Styles for active state, must be after hover to override styles */
    &:active {
      opacity: 0.78;
      transform: translateY(2px);
    }
  }


  /* Styles for disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:active {
      opacity: 1;
      transform: none;
    }
    &:hover {
      opacity: 0.52;
    }
  }


  &::before,
  &::after {
    ${cover(true, false)}
  }


  /* Styles for button background */
  ${buttonBackgroundClasses}


  /* Styles for button text color */
  ${buttonColorClasses}


  /* Styles for button border color */
  ${buttonBorderClasses}


  /* Styles for button typography */
  ${buttonTypographyClasses}


  /* Styles for creating a transparent button */
  &.bee-button__clear {
    background-color: transparent;
    background: transparent;
  }


  /* Button Padding:
    Classes to change the default
    20px padding of the button
  */
  &.bee-button__remove-default-padding {
    padding: 0;
  }
  &.bee-button__remove-end-padding {
    padding: 0 0 0 20px;
  }
  &.bee-button__remove-start-padding {
    padding: 0 20px 0 0;
  }


  /* Styles for removing border radius */
  &.bee-button__remove-border-radius {
    border-radius: 0;
  }


  /* Button Size
    Classes to change the
    default height of the button.
    Default is 'regular'
  */
  &.bee-button-size {
    &__small {
      height: 40px;
    }
    &__regular {
      height: 46px;
    }
    &__tall {
      height: 56px;
    }
  }


  /* Styles for bee-button-container */
  .bee-button--container {
    align-items: center;
    display: flex;
    flex: 1 0 auto;
    flex-shrink: 0;
    height: 100%;
    justify-content: center;
    width: 100%;
  }


  /* Svg
    Classes to change the
    default width of the
    Svg prefix/suffix container.
    Default is 'zero'
  */
  .bee-button--svg-prefix-container,
  .bee-button--svg-suffix-container {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 24px;
    svg {
      width: 24px;
    }
  }
  .bee-button--svg-prefix-container {
    &.bee-button-svg-prefix {
      &__zero {
        width: 24px;
      }
      &__small {
        width: 32px;
      }
      &__medium {
        width: 48px;
      }
    }
  }
  .bee-button--svg-suffix-container {
    &.bee-button-svg-suffix {
      &__zero {
        width: 24px;
      }
      &__small {
        width: 32px;
      }
      &__medium {
        width: 48px;
      }
    }
  }


  /* Styles for bee-button-content */
  .bee-button--content {
    display: flex;
    flex: 1 0 auto;
    justify-content: center;

    /* Style to remove the default flex: 1 0 auto */
    &.bee-button-content__no-flex {
      flex: 0 1 auto;
    }

    /* Button Content Padding
      Classes to change the
      default left/right padding
      of the button content.
      Default is 'default'
    */
    &.bee-button-content-start {
      &__default {
        padding-left: 0;
      }
      &__small {
        padding-left: 16px;
      }
      &__medium {
        padding-left: 24px;
      }
      &__large {
        padding-left: 40px;
      }
    }
    &.bee-button-content-end {
      &__default {
        padding-right: 0;
      }
      &__small {
        padding-right: 16px;
      }
      &__medium {
        padding-right: 24px;
      }
      &__large {
        padding-right: 40px;
      }
    }

    /* Button Content Layout
      Classes to change the
      default layout
      of the button content.
      Default is 'center'
    */
    &.bee-button-content-layout {
      &__start {
        justify-content: flex-start;
      }
      &__center {
        justify-content: center;
      }
      &__end {
        justify-content: flex-end;
      }
    }
  }
`;

/** @component */
export default ButtonContainer;
