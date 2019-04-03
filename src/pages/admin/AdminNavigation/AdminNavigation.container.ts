import styled from 'styled-components';
import { color } from 'styled/utils';

const AdminNavigationContainer = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-between;
  left: 0;
  position: absolute;
  top: 0;
  width: 232px;


  a {
    &.active {
      .bee-fab {
        background-color: ${color('secondary')};
        color: ${color('white')};
      }
    }
  }


  .bee-fab {
    box-shadow: 0 0 20px ${color('black', 0.2)};
    color: #CFD8DC;
    height: 40px;
    width: 40px;
  }
`;

export default AdminNavigationContainer;
