import styled from 'styled-components';

import { color, typography } from 'styled/utils';

const AccountContainerMobile = styled.section`
  align-items: center;
  display: flex;
  min-height: 100vh;
  width: 100%;


  .account-body {
    align-items: flex-start;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    margin: 0 auto;
    min-height: 100%;
    padding: 24px 0 40px;
    position: relative;
    .account-header-container {
      display: flex;
      flex-direction: column;
      padding: 0 24px;
      width: 100%;
      header {
        ${typography('title', 4)}
        color: ${color('body')};
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        height: 42px;
        width: 100%;
      }
      .bee-divider {
        flex-shrink: 0;
      }
    }
    .content {
      display: flex;
      height: 100%;
      justify-content: space-between;
      margin-top: 16px;
      width: 100%;
      .left {
        width: 100%;
      }
    }
  }
`;

const AccountContainerTablet = styled(AccountContainerMobile)`
  @media (min-width: 768px) {
    width: auto;


    .account-body {
      min-width: 640px;
      padding: 40px 0 80px;
      width: 640px;
      .account-header-container {
        padding: 0;
        header {
          ${typography('title', 3)}
          padding-left: 8px;
        }
      }
    }
  }
`;

const AccountContainerDesktop = styled(AccountContainerTablet)`
  @media (min-width: 1025px) {
    .account-body {
      min-width: 976px;
      width: 976px;
      .content {
        .right {
          display: block;
        }
      }
    }
  }
`;

const AccountContainer = styled(AccountContainerDesktop)``;

export default AccountContainer;
