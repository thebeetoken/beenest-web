import styled from 'styled-components';
import { color } from 'styled/utils';

const AdminContainer = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 100%);
  font-family: Roboto, Arial, sans-serif;
  height: 100%;
  min-height: 100%;
  padding: 108px 0 0;


  .admin-body {
    align-items: flex-end;
    display: flex;
    min-height: calc(100vh - 104px);
    margin: 0 auto;
    justify-content: center;
    position: relative;
    min-width: 1264px;
    width: 1264px;
    .admin-divider {
      position: absolute;
      top: 64px;
      width: 100%;
    }
    .admin-sub-container {
      display: flex;
      min-height: 100%;
      justify-content: flex-end;
      width: 100%;
      .admin-sub-content-container {
        background-color: ${color('white')};
        margin-top: 104px;
        box-shadow: 0 0 20px ${color('black', 0.1)};
        display: flex;
        justify-content: center;
        min-height: calc(100vh - 209px);
        position: relative;
        right: 0;
        width: 1000px;

        table {
          overflow-x:auto;
        }
      }
    }
  }
`;

export default AdminContainer;
