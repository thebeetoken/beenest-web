import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const AdminHeaderContainer = styled.header`
  background-color: ${color('light')};
  display: flex;
  height: 72px;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 101;

  .admin-header-wrapper {
    display: flex;
    height: 100%;
    justify-content: space-between;
    position: relative;
    width: 1264px;
  }

  .admin-header--logo-meta {
    align-items: center;
    display: flex;
    height: 100%;
    .bee-svg {
      color: ${color('style')};
      height: 28px;
      width: 152px;
    }
    h2 {
      ${typography('feather', 4)}
      color: ${color('top')};
      margin: 5px 0 0 8px;
    }
  }
`;

export default AdminHeaderContainer;
