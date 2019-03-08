import styled from 'styled-components';
import { canvas } from 'styled/color';
import { typographyObject } from 'styled/typography';
import { color, cover, typography } from 'styled/utils';

// function that creates background css classes dynamically
const fabBackgroundClasses = Object.keys(canvas).map((key: string): string => {
  return `&.bee-fab-background {
    &__${key} {
      background-color: ${color(key)};
    }
  }`;
}).join('');

// function that creates svg/font color css classes dynamically
const fabColorClasses = Object.keys(canvas).map((key: string): string => {
  return `&.bee-fab-color {
    &__${key} {
      color: ${color(key)};
    }
  }`;
}).join('');

// function that creates svg color css classes dynamically
const fabIconColorClasses = Object.keys(canvas).map((key: string): string => {
  return `&.bee-fab-svg-color {
    &__${key} {
      color: ${color(key)};
    }
  }`;
}).join('');

// function that creates typography css classes dynamically
const fabTypographyClasses = Object.keys(typographyObject).map((typography: string): string => {
  return Object.keys(typographyObject[typography]).map((value: string): string => {
    return `&.bee-fab-typography {
      &__${typography}-${value} {
        ${typographyObject[typography][value]}
      }
    }`;
  }).join('');
});

type FabContainerProps = Partial<{
  children: React.ReactNode;
  height: string;
  icon: string;
  noFlex: boolean;
  noPadding: boolean;
  radius: string;
  width: string;
}>;

const FabContainer = styled.button`
  /* Default styles for button */
  ${typography('title', 9)}
  align-items: center;
  background-color: ${color('style')};
  border: 0;
  color: ${color('body')};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  outline: none;
  padding: ${(props: FabContainerProps) => props.noPadding ? '0px' : '0 16px'};
  position: relative;
  transition: all 0.2s;
  /* Style to set height */
  height: ${(props: FabContainerProps) => props.height || '80px'};
  /* Style to set width */
  width: ${(props: FabContainerProps) => props.width || '80px'};
  /* Style to set border radius */
  border-radius: ${(props: FabContainerProps) => props.radius || '0px'};
  
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
  }
  &::before,
  &::after {
    ${cover(true, false)}
  }
  /* Styles for fab background */
  ${fabBackgroundClasses}
  /* Styles for fab text/svg color */
  ${fabColorClasses}
  /* Styles for fab typography */
  ${fabTypographyClasses}
  /* Styles for creating a transparent button */
  &.bee-fab__clear {
    background-color: transparent;
    background: transparent;
  }
  /* Styles for bee-fab-container */
  .bee-fab--container {
    align-items: center;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    flex-shrink: 0;
    height: 100%;
    justify-content: center;
    width: 100%;
  }
  .bee-fab--svg-container {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 24px;
    svg {
      width: 24px;
    }
    /* Styles for icon color */
    ${fabIconColorClasses}
  }
  /* Styles for bee-fab-content */
  .bee-fab--content {
    display: flex;
    flex: 1 0 auto;
    justify-content: center;
    /* Style to add a margin-bottom if text and icon are avaialble */
    ${(props: FabContainerProps) => !!props.children && !!props.icon && `margin-top: 4px;`}

    &__no-flex {
      flex: 0 1 auto;
    }
  }
`;

/** @component */
export default FabContainer;
