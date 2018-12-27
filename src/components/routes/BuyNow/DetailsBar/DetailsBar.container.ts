import styled from 'styled-components';
import { color } from 'styled/utils';

const DetailsBarContainerMobile = styled.div`
  .bottom-bar {
    align-items: center;
    bottom: 0;
    box-shadow: 0 -2px 5px ${color('black', 0.3)};
    display: flex;
    height: 72px;
    justify-content: space-between;
    left: 0;
    padding: 16px 16px 16px 0;
    position: fixed;
    right: 0;
    width: 100vw;
    z-index: 2;
    aside {
      height: 56px;
      left: 24px;
      position: absolute;
      top: -95px;
      width: 272px;


      h6 {
        font-size: 14px;
        font-weight: 400;
        margin: 0 0 7px;
      }
      p {
        height: 32px;
        font-size: 12px;
        font-weight: 300;
        a {
          text-decoration: underline;
        }
      }
    }
    .booking-details {
      align-items: center;
      color: ${color('secondary')};
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 72px;
      width: 128px;
      .bee-svg {
        height: 24px;
        width: 24px;
      }
      h5 {
        font-size: 12px;
        font-weight: 300;
      }
    }
  }
`;

const DetailsBarContainerTablet = styled(DetailsBarContainerMobile)`
  @media (min-width: 768px) {
    .bottom-bar {
      align-items: flex-start;
      box-shadow: none;
      flex-direction: column;
      height: 106px;
      position: static;
      width: 521px;
      aside {
        position: static;
      }
      .bottom-bar--content {
        display: flex;
        justify-content: space-between;
        margin-top: 32px;
        width: 100%;
        .bee-button {
          height: 56px;
          margin-right: 31px;
          width: 200px;
        }
      }
    }
  }
`;

const DetailsBarContainer = styled(DetailsBarContainerTablet)`
  @media (min-width: 1025px) { }
`;

export default DetailsBarContainer;
