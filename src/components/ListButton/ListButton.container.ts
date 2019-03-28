import styled from 'styled-components';
import { color, typography } from 'styled/utils';

type Props = Partial<{
  verified: boolean;
}>;

const ListButtonContainerMobile = styled.button`
  align-items: center;
  background-color: ${color('white')};
  border: 0;
  box-shadow: 0 2px 10px ${color('black', 0.1)};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 80px;
  justify-content: center;
  outline: none;
  padding: 20px 16px 18px;
  transition: all 0.15s ease-in-out;
  width: 100%;
  &:active {
    background-color: ${color('middle')};
    box-shadow: 0 2px 2px ${color('black', 0.1)};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    &:active {
      background-color: ${color('white')};
      box-shadow: 0 2px 10px ${color('black', 0.1)};
    }
  }


  .bee-list-item-button--content {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-items: center;
    width: 100%;
    h4 {
      ${typography('emp', 7)}
      color: ${color('body')};
      display: flex;
      height: 100%;
      width: 100%;
      span {
        ${typography('caption', 3)}
        color: ${({ verified }: Props) => verified ? color('correct') : color('error')};
        margin-left: 8px;
        transition: all 0.15s ease-in-out;
      }
    }
    .bee-list-item-button--cta {
      align-items: center;
      color: ${color('upper')};
      display: flex;
      justify-content: space-between;
      height: 24px;
      width: 100%;
      span {
        ${typography('read', 4)}
        align-items: center;
        display: flex;
        justify-content: center;
        height: 100%;
      }
      .bee-svg {
        height: 100%;
        width: 24px;
      }
    }
  }
`;

const ListButtonContainerTablet = styled(ListButtonContainerMobile)`
  @media (min-width: 768px) {
    width: 420px;
    &:hover {
      background-color: ${color('light')};
    }
    &:disabled {
      &:hover {
        background-color: ${color('white')};
      }
    }

    .bee-list-item-button--content {
      h4 {
        ${typography('emp', 6)}
        span {
          ${typography('caption', 2)}
        }
      }
      .bee-list-item-button--cta {
        span {
          ${typography('read', 2)}
        }
      }
    }
  }
`;

const ListButtonContainer = styled(ListButtonContainerTablet)`
  @media (min-width: 1025px) {
    &:hover {
      background-color: ${color('light')};
    }
    &:disabled {
      &:hover {
        background-color: ${color('white')};
      }
    }
  }
`;

/** @component */
export default ListButtonContainer;
