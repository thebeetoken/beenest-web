import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const HelpContainerMobile = styled.div`
  h1 {
    ${typography('title', 5)};
    box-sizing: border-box;
    color: ${color('core')};
    height: 68px;
    margin-top: 64px;
    padding: 32px 24px 12px 24px;
    width: 100%;
  }
  .grey-divider {
    background-color: #fafafa;
    height: 4px;
    margin: 0 auto;
    width: calc(100% - 48px);
  }
  section {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-left: 24px;
    h2 {
      ${typography('title', 6)};
      color: ${color('link')};
      margin-left: 24px;
      margin-top: 24px;
    }
    article {
      display: flex;
      flex-direction: column;
      margin-left: 24px;
      padding-top: 40px;
      width: calc(100% - 48px);
      &:last-of-type {
        padding-bottom: 120px;
        padding-top: 72px;
        p {
          ${typography('light', 14)};
        }
      }
      h3, h4, a {
        color: ${color('core')};
      }
      a {
        ${typography('read', 1)};
      }
      h3, h4 {
        ${typography('emp', 6)};
      }
      h3 {
        ${typography('emp', 4)};
        line-height: 24px;
        margin-bottom: 30px;
        text-transform: uppercase;
      }
      p {
        ${typography('welter', 5)};
        color: ${color('body')};
        margin: 16px 0 40px;
      }
      button {
        height: 48px;
        width: 176px;
      }
    }
    .grey-line {
      background: ${color('middle')};
      height: 2px;
      margin: 0 auto;
      width: calc(100% - 48px);
    }
  }
`;

const HelpContainerTablet = styled(HelpContainerMobile)`
  @media (min-width: 768px) {
    h1 {
      ${typography('title', 5)};
      line-height: 44px;
      margin: 0 auto;
      width: 1036px;
    }
    .section {
      h2 {
        ${typography('title', 3)};
        line-height: 34px;
        margin-top: 40px;
      }
      article {
        width: 680px;
      }
    }
  }
`;

const HelpContainer = styled(HelpContainerTablet)`
  @media (min-width: 1025px) {
    h1 {
      height: 132px;
      padding: 80px 0 0;
      margin-top: 64px;
    }
    .grey-divider,
    section {
      margin: 0 auto;
      width: 1080px;
    }
    section {
      .grey-line {
        background: ${color('middle')};
        margin-left: 24px;
        width: 680px;
      }
    }
  }
`;

export default HelpContainer;
