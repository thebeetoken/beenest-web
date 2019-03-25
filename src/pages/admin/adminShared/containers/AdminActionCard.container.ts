import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const AdminActionCardContainer = styled.div`
  background-color: ${color('white')};
  box-shadow: 0 0 25px ${color('black', 0.1)};
  display: flex;
  flex-direction: column;
  font-family: Roboto, Arial, sans-serif;
  height: 256px;
  padding: 24px 24px 32px;
  position: relative;
  width: 584px;


  .close {
    cursor: pointer;
    height: 24px;
    opacity: 1;
    position: absolute;
    right: 24px;
    top: 24px;
    transition: opacity 0.2s ease-in-out;
    width: 24px;
    z-index: 1;
    &:hover {
      opacity: 0.5;
    }
    .bee-svg {
      color: ${color('middle')};
    }
  }


  .status-options-card-upper {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    height: 104px;
    position: relative;
    width: 100%;
    &::before {
      background-color: ${color('up')};
      bottom: 0;
      content: '';
      height: 1px;
      left: 0;
      position: absolute;
      right: 0;
    }
    .status-options-card-upper--top {
      h1 {
        color: ${color('dark')};
        ${typography('welter', 3)}
      }
      span {
        margin: 0 4px;
        &.accept {
          color: ${color('secondary')};
        }
        &.reject {
          color: ${color('error')};
        }
        &.cancel {
          color: ${color('upper')};
        }
      }
    }
    .status-options-card-upper--bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      .status-options-card-upper--bottom-id {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        h2,
        h3 {
          ${typography('welter', 6)}
        }
        h2 {
          color: ${color('upper')};
        }
        h3 {
          color: ${color('secondary')};
        }
      }
    }
  }


  .status-options-card-lower {
    align-items: flex-end;
    display: flex;
    height: 100%;
    justify-content: space-between;
    .status-options-card-lower--left {
      display: flex;
      flex-direction: column;
      span {
        ${typography('light', 6)}
        color: ${color('top')};
      }
      .currency {
        text-transform: uppercase;
      }
    }
    .status-options-card-lower--right {
      display: flex;
      .cancel,
      .confirmation {
        ${typography('welter', 5)}
        box-shadow: 0 4px 10px ${color('black', 0.15)};
        font-family: 'Roboto';
      }
      .cancel {
        background-image: linear-gradient(180deg, #BED1E6 0%, #737A7D 98%);
      }
      .confirmation {
        background-image: linear-gradient(180deg, #76D4BC 0%, #217B80 99%);
        margin-left: 24px;
      }
    }
  }
`;

export default AdminActionCardContainer;
