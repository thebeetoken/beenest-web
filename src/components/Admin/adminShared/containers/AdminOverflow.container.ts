import styled from 'styled-components';

const AdminOverflowContainer = styled.section`
  display: block;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }


  .admin-table-loading {
    align-items: center;
    display: flex;
    justify-content: center;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
`;

export default AdminOverflowContainer;
