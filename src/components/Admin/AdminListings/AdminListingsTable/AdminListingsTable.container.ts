import styled from 'styled-components';

import AdminTableContainer from '../../adminShared/containers/AdminTable.container';

import { color } from 'styled/utils';

const AdminListingsTableContainer = styled(AdminTableContainer)`
  height: 100%;

  .admin-table-row-container {
    .admin-table-row--item:nth-of-type(1) {
      width: 80px;
    }
    .admin-table-row--item:nth-of-type(3),
    .admin-table-row--item:nth-of-type(4),
    .admin-table-row--item:nth-of-type(5) {
      display: flex;
      flex-direction: column;
      span {
        display: block;
        height: auto;
        width: auto;
      }
    }
    .admin-table-row--item:nth-of-type(6) {
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
