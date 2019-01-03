import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const AdminTableContainer = styled.div`
  .admin-table-loading {
    align-items: center;
    display: flex;
    justify-content: center;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }


  table {
    border-collapse: collapse;
    height: 100%;
    width: 100%;
    tbody {
      display: block;
      padding-bottom: 96px;
      position: relative;
      &::-webkit-scrollbar {
        display: none;
      }
      &::before {
        background: linear-gradient(180deg, rgba(255,255,255,0.00) 4%, #FFFFFF 100%);
        bottom: 0;
        content: '';
        height: 156px;
        left: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        z-index: 1;
      }
    }
  }


  td.admin-table-row--item {
    ${typography('welter', 5)}
    color: ${color('dark')};
    padding: 8px;
  }

  .admin-table-row-container {
    background-color: transparent;
    display: flex;
    height: 64px;
    margin: 0 auto;
    position: relative;
    transition: background-color 0.15s ease-in-out;
    width: 960px;
    &::before {
      background-color: ${color('middle')};
      bottom: 0;
      content: '';
      height: 1px;
      left: 0;
      position: absolute;
      right: 0;
    }
    &.paginator {
      align-items: center;
      height: 128px;
      justify-content: center;
      &:before {
        content: none;
      }
      &:hover {
        background-color: transparent;
      }
      td {
        display: flex;

        button + button {
          margin-left: 24px;
        }
      }
    }
    .admin-table-row--item {
      ${typography('welter', 7)}
      align-items: center;
      color: ${color('dark')};
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      opacity: 1;
      padding: 0;
      text-align: center;
      transition: opacity 0.2s ease-in-out;
      width: 160px;
      span {
        align-items: center;
        display: flex;
        justify-content: center;
        height: 40px;
        width: 140px;
      }
      .update-status {
        align-items: center;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        height: 100%;
        justify-content: center;
        width: 100%;
        h2 {
          ${typography('welter', 6)}
          color: ${color('top')};
        }
      }
    }
    @media (min-width: 1025px) {
      &:hover {
        background-color: ${color('light')};
      }
    }
  }
`;

export default AdminTableContainer;
