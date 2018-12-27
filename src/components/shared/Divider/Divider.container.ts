import styled from 'styled-components';
import { canvas } from 'styled/color';
import { color } from 'styled/utils';

// Variable that creates background-color css classes dynamically
const dividerColorClasses = Object.keys(canvas).map((key: string): string => {
  return `&.bee-divider-color {
    &__${key} {
      &::before {
        background-color: ${color(key)};
      }
    }
  }`
}).join('');

const DividerContainer = styled.div`
  /* Default styles for a divider */
  height: 16px;
  position: relative;
  width: 100%;

  &::before {
    background-color: ${color('middle')};
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
    top: 50%;
    width: 100%;
  }


  /* Styles for divider color, default is middle */
  ${dividerColorClasses}


  /* Styles for divider height, default is short */
  &.bee-divider-size {
    &__short {
      &::before {
        height: 1px;
      }
    }
    &__tall {
      &::before {
        height: 2px;
      }
    }
    &__huge {
      &::before {
        height: 3px;
      }
    }
  }
`;

/** @component */
export default DividerContainer;