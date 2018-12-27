import styled from 'styled-components';

import AdminTableContainer from '../../adminShared/containers/AdminTable.container';

import { color } from 'styled/utils';

const AdminListingsTableContainer = styled(AdminTableContainer)`
  height: 100%;

  .admin-table-header-container {
    .admin-table-header--item:nth-of-type(1),
    .admin-table-header--item:nth-of-type(4) {
      width: 80px;
    }
  }
  .admin-table-row-container {
    .admin-table-row--item:nth-of-type(1),
    .admin-table-row--item:nth-of-type(4) {
      width: 80px;
    }
    .admin-table-row--item:nth-of-type(3) {
      span:first-of-type {
        text-transform: capitalize;
      }
      span + span {
        text-transform: uppercase;
      }
    }
    .admin-table-row--item:nth-of-type(3),
    .admin-table-row--item:nth-of-type(4),
    .admin-table-row--item:nth-of-type(5),
    .admin-table-row--item:nth-of-type(6) {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        display: block;
        height: auto;
        width: auto;
      }
    }
    .admin-table-row--item:nth-of-type(1),
    .admin-table-row--item:nth-of-type(5) {
      cursor: pointer;
      word-break: break-all;
      @media (min-width: 1025px) {
        &:hover {
          opacity: 0.5;
        }
      }
    }
    .admin-table-row--item:nth-of-type(4) {
      text-transform: capitalize;
    }
    .admin-table-row--item:nth-of-type(7) {
      span {
        display: flex;
        justify-content: space-between;
        padding: 0 32px;
      }
    }
    @media (min-width: 1025px) {
      &:hover {
        background-color: ${color('light')};
      }
    }
  }
`;

export default AdminListingsTableContainer;
