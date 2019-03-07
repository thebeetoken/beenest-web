import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const HostsStartContainerMobile = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  white-space: pre-line;
  width: 100%;

  
  .bee-general-wrapper {
    height: 100%;
    margin: 0 auto;
    padding: 0 24px;
  }
  

  .bee-divider {
    height: 4px;
    position: relative;
    ::before {
      display: block;
      height: 4px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
    }
  }

  .hosts-banner-container {
    background-color: ${color('black', 0.6)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 352px;
    min-height: 352px;
    position: relative;
    width: 100%;
    .bee-overlay {
      .bee-lazy-image-loaded {
        opacity: 0.3;
      }
    }
    .bee-general-wrapper {
      align-items: flex-start;
      padding-bottom: 24px;
      padding-top: 24px;
      .text-container {
        color: ${color('white')};
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        text-align: left;
        width: 100%;
        z-index: 1;
        h1 {
          ${typography('title', 5)};
        }
        h2 {
          ${typography('feather', 7)};
          margin-top: 8px;
        }
        h3 {
          ${typography('title', 9)};
          margin-top: 16px;
        }
        a {
          margin-top: 24px;
          width: 100%;
          .bee-button {
            width: 100%;
          }
        }
      }
      .disclaimer-container {
        width: 100%;
        z-index: 1;
        h4 {
          ${typography('caption', 3)};
          color: ${color('white')};
        }
      }
    }
  }

  
  .process-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-top: 48px;
    padding-bottom: 56px;
    position: relative;
    width: 100%;
    .bee-divider {
      opacity: 0.4;
      position: absolute;
      top: 54px;
      left: 0;
      width: calc((100vw - 1040px) / 2);
    }
    .bee-general-wrapper {
      align-items: center;
      header {
        ${typography('title', 4)}
        margin-bottom: 24px;
        text-align: left;
        width: 272px;
      }
      .card-group-container {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        .card-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          margin-bottom: 32px;
          max-width: 272px;
          .icon-container {
            color: ${color('secondary')};
            margin-bottom: 16px;
            .bee-svg {
              height: 56px;
              width: 56px;
            }
          }
          h2 {
            ${typography('heavy', 3)}
            color: ${color('black')};
            margin-bottom: 16px;
          }
          p {
            ${typography('read', 1)}
            color: ${color('core')};
            margin-bottom: 16px;
            a {
              font-weight: bold;
            }
          }
        }
      }
      a {
        width: 100%;
        .bee-button {
          width: 100%;
        }
      }
    }
  }


  .security-container {
    background-color: ${color('black')};
    height: 524px;
    min-height: 524px;
    position: relative;
    width: 100%;
    .bee-overlay {
      .bee-lazy-image-loaded {
        opacity: 0.5;
      }
    }
    .bee-divider {
      position: absolute;
      top: 82px;
      right: 0;
      width: calc((100vw - 1040px) / 2);
      z-index: 1;
    }
    .text-container {
      align-items: flex-end;
      color: ${color('white')};
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 64px 0 116px;
      text-align: right;
      width: 100%;
      z-index: 1;
      header {
        ${typography('light', 1)}
      }
      ul {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        margin-bottom: 0;
        margin-top: 116px;
        padding: 0;
        li {
          align-items: center;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          div {
            display: flex;
            flex-direction: column;
            h3 {
              ${typography('light', 3)}
            }
            h4 {
              ${typography('feather', 6)}
            }
          }
          .bee-svg {
            color: ${color('white')};
            height: 32px;
            margin-left: 16px;
            width: 32px;
          }
        }
      }
    }
  }


  .rewards-container {
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 400px;
    justify-content: space-between;
    position: relative;
    width: 100%;
    .bee-divider {
      left: 0;
      opacity: 0.4;
      position: absolute;
      top: 102px;
      width: calc((100vw - 1040px) / 2);
      z-index: 1;
    }
    .bee-general-wrapper {
      padding-bottom: 92px;
      padding-top: 88px;
      .text-container {
        align-items: flex-start;
        display: flex;
        flex: 2;
        flex-direction: column;
        justify-content: flex-start;
        max-width: 610px;
        text-align: left;
        width: 100%;
        z-index: 1;
        header {
          ${typography('heavy', 1)}
          color: ${color('core')};
          margin-bottom: 18px;
        }
        p {
          ${typography('read', 2)}
          margin-bottom: 40px;
        }
        a {
          width: 100%;
          .bee-button {
            width: 100%;
          }
        }
      }
      .icon-container {
        color: ${color('white')};
        flex: 1;
        .bee-svg {
          height: 208px;
          margin: 0 auto;
          width: 134px;
        }
      }
    }
  }


  .testimonials-container {
    align-items: center;
    background-color: ${color('black', 0.4)};
    display: flex;
    min-height: 400px;
    justify-content: center;
    position: relative;
    width: 100%;
    .bee-overlay {
      .bee-lazy-image-loaded {
        opacity: 0.5;
      }
    }
    .bee-general-wrapper {
      padding: 24px;
      .testimony {
        background-color: ${color('white')};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        padding: 24px;
        max-width: 942px;
        min-height: 226px;
        z-index: 1;
        .host-img-container {
          align-self: flex-start;
          border-radius: 50%;
          flex-shrink: 0;
          height: 122px;
          margin-bottom: 16px;
          margin-right: 22px;
          overflow: hidden;
          width: 122px;
        }
        .text-container {
          align-items: flex-start;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          text-align: left;
          h3 {
            ${typography('title', 5)}
            color: ${color('body')};
            margin-bottom: 8px;
          }
          p {
            ${typography('read', 2)}
            color: ${color('body')};
          }
        }
        .triangle {
          border-left: 58px solid transparent;
          border-top: 50px solid ${color('secondary')};
          height: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: 0;
        }
        a {
          margin-top: 24px;
          .bee-button {
            width: 240px;
            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
    .bee-overlay {
      .bee-lazy-image-loaded {
        opacity: 0.5;
      }
    }
  }


  .hosts-contact-container {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 200px;
    text-align: center;
    width: 100%;
    .hosts-contact-text {
      display: flex;
      flex-direction: column;
      padding: 24px;
      h3 {
        ${typography('welter', 2)}
        color: ${color('body')};
        word-spacing: 100vw;
      }
      h4 {
        ${typography('read', 2)}
        color: ${color('body')};
        margin-top: 16px;
        a {
          text-decoration: underline;
          font-weight: bold;
        }
      }
    }
  }
`;

const HostsStartContainerTablet = styled(HostsStartContainerMobile)`
  @media (min-width: 768px) {
    .hosts-banner-container {
      .bee-general-wrapper {
        .text-container {
          width: 300px;
          a {
            width: 240px;
            .bee-button {
              width: 240px;
            }
          }
        }
      }
    }
    .testimonials-container {
      .bee-general-wrapper {
        .testimony {
          flex-direction: row;
          padding: 32px 50px 40px 24px;
          a {
            bottom: -24px;
            position: absolute;
            right: 42px;
          }
        }
      }
    }


    .process-container {
      .bee-general-wrapper {
        a {
          width: 240px;
          .bee-button {
            width: 240px;
          }
        }
      }
    }


    .rewards-container {
      .bee-general-wrapper {
        .text-container {
          a {
            width: 240px;
            .bee-button {
              width: 240px;
            }
          }
        }
      }
    }


    .hosts-contact-container {
      .hosts-contact-text {
        h3 {
          word-spacing: normal;
        }
      }
    }
  }
`;

const HostsStartContainerDesktop = styled(HostsStartContainerTablet)`
  @media (min-width: 1025px) {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;


    .hosts-banner-container {
      height: 540px;
      min-height: 540px;
      .bee-general-wrapper {
        padding-left: 0;
        padding-right: 0;
        .text-container {
          width: 558px;
          h1 {
            ${typography('title', 2)};
          }
          h2 {
            ${typography('light', 5)};
            margin-top: 16px;
          }
          h3 {
            ${typography('title', 7)};
            margin-top: 16px;
          }
          a {
            margin-top: 24px;
          }
        }
        .disclaimer-container {
          h4 {
            ${typography('caption', 2)};
          }
        }
      }
    }

    
    .process-container {
      padding-top: 64px;
      .bee-divider {
        top: 83px;
      }
      .bee-general-wrapper {
        header {
          ${typography('heavy', 1)}
          margin-bottom: 40px;
          width: 100%;
        }
        .card-group-container {
          align-items: flex-start;
          flex-direction: row;
          .card-container {
            h2 {
              ${typography('heavy', 3)}
              color: ${color('black')};
              margin-bottom: 16px;
            }
            p {
              ${typography('read', 1)}
              margin-bottom: 16px;
            }
          }
        }
      }
    }


    .security-container {
      .text-container {
        header {
          ${typography('light', 1)}
        }
        ul {
          li {
            div {
              h3 {
                ${typography('light', 3)}
              }
              h4 {
                ${typography('feather', 6)}
              }
            }
          }
        }
      }
    }


    .rewards-container {
      .text-container {
        header {
          ${typography('heavy', 1)}
          margin-bottom: 18px;
        }
        p {
          ${typography('read', 2)}
          margin-bottom: 40px;
        }
      }
    }


    .testimonials-container {
      height: 524px;
      min-height: 524px;
      .bee-general-wrapper {
        .testimony {
          flex-direction: row;
          .host-img-container {
          }
          .text-container {
            h3 {
              ${typography('title', 5)}
              margin-bottom: 8px;
            }
            p {
              ${typography('read', 2)}
            }
          }
        }
      }
    }


    .hosts-contact-container {
      .hosts-contact-text {
        h3 {
          ${typography('welter', 1)}
        }
        h4 {
          ${typography('read', 1)}
          margin-top: 16px;
        }
      }
    }
  }
`;

const HostsStartContainer = styled(HostsStartContainerDesktop)``;

export default HostsStartContainer;
