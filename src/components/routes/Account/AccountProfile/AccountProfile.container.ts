import styled from 'styled-components';
import { color } from 'styled/utils';

const AccountProfileContainerMobile = styled.div``;

const AccountProfileContainerTablet = styled(AccountProfileContainerMobile)`
  @media (min-width: 768px) {
    height: 296px;
    width: 288px;
    box-shadow: 0 4px 15px ${color('black', 0.15)};
    aside {
      height: 100%;
      width: 100%;
      .top-bar {
        background-color: ${color('style')};
        height: 4px;
        width: 100%;
      }
      .square-container {
        align-items: center;
        display: flex;
        justify-content: center;
        height: 280px;
        width: 100%;
        .profile-image {
          align-items: flex-end;
          background-color: whitesmoke;
          border-radius: 50%;
          display: flex;
          height: 240px;
          max-height: 240px;
          max-width: 240px;
          min-height: 240px;
          min-width: 240px;
          position: relative;
          width: 240px;
        }
      }
    }
  }
`;

const AccountProfileContainerDesktop = styled(AccountProfileContainerTablet)`
  @media (min-width: 1025px) { }
`;

const AccountProfileContainer = styled(AccountProfileContainerDesktop)``;

export default AccountProfileContainer;
