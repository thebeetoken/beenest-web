import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const AdminSideNavigationContainer = styled.div`
  top: 104px;
  height: calc(100% - 104px);
  left: 0;
  position: absolute;
  width: 232px;


  .admin-side-navigation-content {
    background-color: ${color('white')};
    border-top: 2px solid ${color('style')};
    box-shadow: 0 0 10px ${color('black', 0.1)};
  }


  header {
    ${typography('heavy', 4)}
    align-items: center;
    color: ${color('dark')};
    display: flex;
    height: 56px;
    padding: 0 16px;
  }


  .admin-side-navigation--items {
    ${typography('light', 5)}
    color: ${color('body')};
    width: 100%;
    a {
      background-color: ${color('light')};
      display: flex;
      height: 52px;
      padding-left: 24px;
      position: relative;
      width: 100%;
      align-items: center;
      transition: all 0.2s ease-in-out;
      &.active {
        background-color: transparent;
        color: ${color('white')};
        justify-content: center;
        padding-left: 0;
        position: relative;
        z-index: 1;
        &::before {
          background-color: ${color('secondary')};
          bottom: 0;
          box-shadow: 0 0 10px ${color('black', 0.2)};
          content: '';
          left: -8px;
          position: absolute;
          right: -8px;
          top: 0;
        }
      }
    }
    span {
      position: relative;
      z-index: 1;
    }
    @media (min-width: 1025px) {
      a {
        &:hover {
          background-color: ${color('up')};
        }
      }
    }
  }
`;

export default AdminSideNavigationContainer;
