import styled from 'styled-components';
import { color } from 'styled/utils';
import AdminTableContainer from '../../adminShared/containers/AdminTable.container';

const AdminUsersTableContainer = styled(AdminTableContainer)`
  .admin-table-row-container {
    .admin-table-row--item:nth-of-type(2),
    .admin-table-row--item:nth-of-type(3),
    .admin-table-row--item:nth-of-type(4) {
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
    .admin-table-row--item:nth-of-type(2) {
      width: 220px;
      @media (min-width: 1025px) {
        &:hover {
          opacity: 0.5;
        }
      }
    }
    .admin-table-row--item:nth-of-type(3) {
      span {
        &.found {
          color: ${color('correct')};
        }
        &.not-found {
          color: ${color('incorrect')};
        }
      }
    }
    .admin-table-row--item:nth-of-type(5) {
      span {
        display: flex;
        justify-content: space-between;
        padding: 0 32px;
      }
    }
    .admin-table-count {
      padding: 0 25px;
    }
  }
`;

export default AdminUsersTableContainer;
