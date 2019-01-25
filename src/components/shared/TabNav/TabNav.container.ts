import styled from 'styled-components';
import { color, typography } from 'styled/utils';

type Props = Partial<{
  height: number;
  tabWidth: number;
}>;

const TabNavContainerMobile = styled.div`
  display: inline-block;
  height: ${({ height }: Props) => height ? `${height}px` : '100%'};
  flex-grow: 1;
  position: relative;


  .alert-badge {
    ${typography('title', 3)}
    color: ${color('error')};
    position: absolute;
    right: 16px;
    top: -16px;
    z-index: 2;
  }
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
    span {
      ${typography('read', 3)}
      text-align: center;
      word-break: break-word;
    }
    .bee-svg {
      height: 24px;
      width: 24px;
    }
  }
`;

const TabNavContainerTablet = styled(TabNavContainerMobile)`
  @media (min-width: 768px) {
    a {
      padding: 0 16px;
      span {
        ${typography('title', 7)}
        word-break: normal;
      }
    }
  }
`;

export default TabNavContainerTablet;