import styled from 'styled-components';

import AdminTableContainer from '../../adminShared/containers/AdminTable.container';

import { color } from 'styled/utils';

const AdminBookingsTableContainer = styled(AdminTableContainer)`
  height: 100%;
  .admin-table-row-container {
    .admin-table-row--item:nth-of-type(1) {
      @media (min-width: 1025px) {
        &:hover {
          opacity: 0.5;
        }
      }
    }
    .admin-table-row--item:nth-of-type(2) {
      cursor: pointer;
      @media (min-width: 1025px) {
        &:hover {
          opacity: 0.5;
        }
      }
    }
    .admin-table-row--item:nth-of-type(3) {
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
    .admin-table-row--item:nth-of-type(4) {
      span {
        display: block;
        height: auto;
        margin-left: 4px;
        text-transform: uppercase;
        width: auto;
      }
    }
    .admin-table-row--item:nth-of-type(6) {
      span {
        display: block;
        height: auto;
      }
    }
    @media (min-width: 1025px) {
      &:hover {
        background-color: ${color('light')};
      }
    }
  }
`;

export default AdminBookingsTableContainer;
