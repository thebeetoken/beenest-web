import styled from 'styled-components';
import { canvas } from 'styled/color';
import { color, typography } from 'styled/utils';

interface Props {
  hoverColor?: string;
  hoverOpacity?: number;
}

// Variable that creates svg/checkbox color classes dynamically
const checkboxColorClasses = Object.keys(canvas).map((key: string): string => {
  return `&.bee-checkbox-color {
    &__${key} {
      .bee-checkmark--container {
        border: 2px solid ${color(key)};
        color: ${color(key)};
      }
    }
  }`
}).join(' ');

const CheckboxContainer = styled<Props, any>('label')`
  /* Default styles for custom checkbox */
  ${typography('read', 2)}
  cursor: pointer;
  display: inline-block;
  height: 24px;
  position: relative;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;


  /* Style to center text text */
  .bee-checkbox--text-container {
    align-items: center;
    display: flex;
    height: 100%;
  }


  /* Style to add padding if there is text */
  &.bee-checkbox__has-text {
    padding-left: 32px;
  }


  /* Style to hide the browser's default checkbox */
  input {
    cursor: pointer;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
  }


  /* Style to create a custom checkbox */
  .bee-checkmark--container {
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    width: 24px;
    border: 2px solid ${color('core')};
    color: ${color('core')};
    transition: all 0.2s ease-in-out;


    .bee-svg {
      height: 24px;
      width: 24px;
    }


    /* Style for hover state */
    &::before {
      content: '';
      position: absolute;
      top: -4px;
      bottom: -4px;
      left: -4px;
      right: -4px;
      /* TODO: figure out why 'hover' state is always on after clicking */
      /* border: 2px solid ${color('style', 0.25)}; */
      border-radius: 2px;
      opacity: 0;
      z-index: 1;
      transition: all 0.2s ease-in-out;


      /* Style to override hover state color and opacity */
      ${(props: Props) => !!props.hoverColor && !!props.hoverOpacity && `
        border: 2px solid ${color(props.hoverColor, props.hoverOpacity)};
      `}


      /* Style to override hover state color and opacity */
      ${(props: Props) => !!props.hoverColor && !props.hoverOpacity && `
        border: 2px solid ${color(props.hoverColor)};
      `}


      /* Style to override hover state color and opacity */
      ${(props: Props) => !props.hoverColor && !!props.hoverOpacity && `
        border: 2px solid ${color('style', props.hoverOpacity)};
      `}
    }
  }


  /* Style to hide icon */
  .bee-checkbox--svg-container {
    left: -2px;
    opacity: 0;
    position: absolute;
    top: -2px;
    transition: all 0.2s ease-in-out;
  }


  /* Style to show hidden icon */
  input:checked ~ .bee-checkmark--container {
    .bee-checkbox--svg-container {
      opacity: 1;
    }
  }


  /* Dynamically creating all checkbox colors.  Default is core */
  ${checkboxColorClasses}


  @media (min-width: 1025px) {
    /* Style to show hidden border hover state */
    &:hover input ~ .bee-checkmark--container {
      &::before {
        opacity: 1;
      }
    }
  }
`;

/** @component */
export default CheckboxContainer;