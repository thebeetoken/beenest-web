import styled from 'styled-components';
import { color, typography } from 'styled/utils';

type Props = Partial<{
  height: number;
  tabWidth: number;
}>;

const TabNavContainer = styled.div`
  display: flex;
  height: ${({ height }: Props) => height ? `${height}px` : '100%'};
  width: 100%;
  flex-grow: 1;
  position: relative;

  .bee-tab-nav-item--container {
    flex-grow: 1;
    width: 100%;
    height: 100%;
    position: relative;
    .verification-badge {
      ${typography('title', 3)}
      color: ${color('error')};
      position: absolute;
      right: 16px;
      top: -16px;
      z-index: 2;
    }
  }


    .bee-tab-nav--item {
      align-items: center;
      display: flex;
      height: inherit;
      justify-content: center;
      width: ${({ tabWidth }: Props) => tabWidth ? `${tabWidth}px` : '100%'};
      a {
        ${typography('title', 7)}
        align-items: center;
        background-color: ${color('light')};
        color: ${color('upper')};
        display: flex;
        height: inherit;
        justify-content: center;
        transition: all 0.2s ease-in-out;
        width: inherit;
        &:hover:not(.active) {
          opacity: 0.5;
        }
        &.active {
          background-color: ${color('white')};
          box-shadow: 0 2px 10px ${color('black', 0.1)};
          border-radius: 2px;
          color: ${color('secondary')};
          position: relative;
          z-index: 1;
        }
      }
    }
  }
`;

export default TabNavContainer;