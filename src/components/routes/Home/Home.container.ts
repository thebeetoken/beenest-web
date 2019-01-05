import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const HomeContainerMobile = styled.section`
  height: 100%;
  min-height: 100%;
  width: 100%;

  .home-hero {
    align-items: flex-end;
    display: flex;
    height: 43.06vh;
    min-height: 560px;
    position: relative;
    width: 100%;
    z-index: 2;
    .bee-overlay {
      .bee-lazy-image {
        height: 256px;
      }
    }
    .text-container {
      left: 50%;
      position: absolute;
      top: 64px;
      transform: translate3d(-50%, 0, 0);
      z-index: 1;
      width: 264px;
      h1 {
        ${typography('title', 6)};
        color: ${color('white')};
        font-weight: 400;
        position: relative;
        width: 100%;
        &::before {
          background-color: ${color('style')};
          content: '';
          height: 18px;
          left: -10px;
          position: absolute;
          top: 2px;
          width: 4px;
        }
      }
      p {
        ${typography('read', 3)};
        color: ${color('up')};
        font-weight: 300;
      }
    }
    .search-bar {
      position: relative;
      z-index: 1;
    }
  }


  .home-content {
    margin: 0 auto;
    .bee-divider {
      margin: 24px auto 32px;
      width: calc(100% - 48px);
    }
    .host-cta {
      display: flex;
      flex-direction: column;
      padding: 0 24px 48px;
      .host-cta-image-container {
        flex-shrink: 0;
        min-height: 162px;
        position: relative;
      }
      .host-cta-content {
        display: flex;
        flex-direction: column;
        h2,
        p {
          color: ${color('body')};
        }
        h2 {
          ${typography('emp', 6)};
          margin: 24px 0 0;
        }
        p {
          ${typography('read', 3)};
          margin: 14px 0 0;
        }
        a {
          margin: 26px 0 0;
          .bee-button {
            width: 100%;
          }
        }
      }
    }
    .featured-conference {
      padding: 12px 24px 48px;
      > h1 {
        ${typography('title', 5)};
        margin-bottom: 24px;
      }
      .featured-conference-card {
        box-shadow: 0 0 15px ${color('black', 0.15)};
        display: flex;
        flex-direction: column;
        height: 316px;
        .featured-conference-image {
          height: 166px;
          position: relative;
          width: 100%;
        }
        .featured-conference-meta {
          animation: fade-in 0.5s ease-in-out forwards;
          border-top: 4px solid ${color('style')}; 
          display: flex;
          flex-direction: column;
          height: 150px;
          padding: 18px 16px 8px;
          width: 100%;
          h1 {
            ${typography('title', 6)};
            color: ${color('body')};
            margin-bottom: 8px;
          }
          h2 {
            ${typography('emp', 7)};
            color: ${color('secondary')};
            margin-bottom: 8px;
            text-transform: uppercase;
          }
          .book-now-button {
            width: 132px;
          }
        }
      }
      .featured-conference-card-placeholder {
        box-shadow: 0 0 15px ${color('black', 0.15)};
        display: flex;
        flex-direction: column;
        height: 316px;
        .featured-conference-image-placeholder {
          height: 166px;
          width: 100%;
        }
        .featured-conference-meta-placeholder {
          height: 150px;
          width: 100%;
        }
      }
    }
    .featured-listings {
      background-color: ${color('light')};
      padding: 32px 24px 32px;
      width: 100%;
      > h1 {
        ${typography('title', 5)};
        margin: 0 0 24px;
      }
      .featured-listings-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        a:not(:last-of-type),
        .listing-card-placeholder {
          display: flex;
          margin-bottom: 40px;
        }
      }
    }
    .popular-cities {
      background-color: ${color('light')};
      padding: 24px 32px 48px;
      width: 100%;
      > h1 {
        ${typography('emp', 5)};
        margin: 0 0 24px;
      }
      .popular-cities-container {
        align-items: center;
        display: flex;
        flex-direction: column;
        width: 100%;
        a {
          margin-bottom: 40px;
        }
        .popular-city-card {
          align-items: center;
          box-shadow: 0 2px 15px ${color('black', 0.15)};
          display: flex;
          height: 256px;
          justify-content: center;
          position: relative;
          width: 280px;
          .popular-city-card--light-box {
            align-items: center;
            background-color: ${color('white', 0.4)};
            border-radius: 4px;
            display: flex;
            height: 72px;
            justify-content: center;
            width: 208px;
            z-index: 1;
            .popular-city-card--text {
              text-align: center;
              h3 {
                ${typography('read', 3)}
                color: ${color('secondary')};
                letter-spacing: 8px;
                text-indent: 8px;
              }
              h4 {
                ${typography('title', 6)}
                color: ${color('core')};
              }
            }
          }
        }
      }
    }
    .social-banner {
      align-items: center;
      background-color: ${color('light', 0.4)};
      box-sizing: border-box;
      display: flex;
      height: 240px;
      justify-content: center;
      padding: 0 24px;
      position: relative;
      a {
        align-items: center;
        display: flex;
        justify-content: center;
      }
      .social-wrapper {
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        height: 141px;
        justify-content: space-between;
        -webkit-box-pack: justify;
        .bee-svg {
          align-items: center;
          display: flex;
          height: 24px;
          justify-content: center;
        }
      }
    }
  }
`;

const HomeContainerTablet = styled(HomeContainerMobile)`
  @media (min-width: 768px) {
    .home-hero {
      min-height: 620px;
      .bee-overlay {
      .bee-lazy-image {
          height: 100%;
        }
      }
      .text-container {
        left: 50%;
        position: absolute;
        top: 102px;
        transform: translate3d(-50%, 0, 0);
        z-index: 1;
        width: 500px;
        h1 {
          ${typography('title', 3)};
          width: 95%;
          .stick {
            height: 32px;
            left: -15px;
            top: 11px;
            width: 6px;
          }
        }
        p {
          ${typography('read', 1)};
          color: ${color('up')};
        }
      }
      .search-bar {
        bottom: 48px;
        left: 50%;
        position: absolute;
        transform: translate3d(-50%, 0, 0);
      }
    }

    .home-content {
      display: flex;
      flex-direction: column;
      padding: 48px 64px;
      .host-cta {
        flex-direction: row;
        padding: 0 16px 48px;
        .host-cta-image-container {
          height: 154px;
          width: 256px;
        }
        .host-cta-content {
          margin: 0 0 0 24px;
          h2 {
            ${typography('emp', 5)};
            margin: 4px 0 0;
          }
          p {
            ${typography('read', 2)};
            margin: 12px 0 0;
          }
          a {
            margin: 18px 0 0;
            .bee-button {
              width: 182px;
            }
          }
        }
      }
      .featured-conference {
        padding: 0 0 72px;
        > h1 {
          ${typography('title', 4)};
          margin: 24px 0;
        }
        .featured-conference-card {
          box-shadow: none;
          height: 264px;
          margin: 0 auto;
          position: relative;
          width: 544px;
          .featured-conference-image {
            box-shadow: 0 0 15px ${color('black', 0.15)};
            height: 100%;
            width: 100%;
          }
          .featured-conference-meta {
            background-color: ${color('white')};
            box-shadow: 0 0 15px ${color('black', 0.15)};
            bottom: -60px;
            height: 142px;
            position: absolute;
            right: -16px;
            width: 362px;
            z-index: 1;
            .book-now-button {
              align-self: flex-end;
              width: 154px;
            }
          }
        }
        .featured-conference-card-placeholder {
          box-shadow: none;
          height: 264px;
          margin: 0 auto;
          position: relative;
          width: 544px;
          .featured-conference-image-placeholder {
            box-shadow: 0 0 15px ${color('black', 0.15)};
            height: 100%;
            width: 100%;
          }
          .featured-conference-meta-placeholder {
            background-color: ${color('white')};
            border-top: 4px solid ${color('style')};
            box-shadow: 0 0 15px ${color('black', 0.15)};
            bottom: -60px;
            height: 142px;
            position: absolute;
            right: -16px;
            width: 362px;
            z-index: 1;
          }
        }
      }
      .featured-listings {
        background-color: transparent;
        padding: 0 0 32px;
        > h1 {
          ${typography('title', 4)};
          margin: 24px 0;
        }
        .featured-listings-container {
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
        }
      }
      .popular-cities {
        background-color: transparent;
        padding: 0 0 32px;
        .popular-cities-container {
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
        }
      }
      .social-banner {
        background-color: ${color('white')};
        height: 160px;
        .social-wrapper {
          height: 100px;
          max-width: 976px;
          width: 976px;
          a:last-of-type {
            margin: 0 auto;
          }
        }
      }
    }
  }
`;

const HomeContainer = styled(HomeContainerTablet)`
  @media (min-width: 1025px) {
    .home-hero {
      .text-container {
        width: 940px;
        top: 168px;
        h1 {
          ${typography('title', 2)};
          width: 605px;
        }
        p {
          ${typography('title', 6)};
        }
      }
      .search-bar {
        bottom: 121px;
      }
    }

    .home-content {
      padding: 48px 0 0;
      .host-cta {
        padding: 0 16px 48px;
        .host-cta-image-container {
          height: 177px;
          width: 294px;
        }
        .host-cta-content {
          margin: 0 0 0 24px;
          h2 {
            ${typography('emp', 2)};
            margin: 0;
          }
          p {
            ${typography('read', 1)};
            margin: 12px 0 0;
          }
          a {
            margin: 18px 0 0;
            .bee-button {
              width: 182px;
            }
          }
        }
      }
      .featured-listings {
        padding: 0 0 32px;
        > h1 {
          margin: 32px 0 24px;
        }
        .featured-listings-container {
          justify-content: flex-start;
          a,
          .listing-card-placeholder {
            margin-bottom: 40px;
          }
          a:not(:first-of-type),
          .listing-card-placeholder:not(:first-of-type) {
            margin-left: 65px;
          }
        }
      }
      .featured-conference {
        .featured-conference-card {
          height: 330px;
          width: 900px;
          .featured-conference-meta {
            bottom: -54px;
            height: 166px;
            padding: 18px 24px 8px;
            right: -14px;
            width: 374px;
            h1 {
              ${typography('title', 5)};
            }
            h2 {
              ${typography('emp', 6)};
            }
          }
        }
        .featured-conference-card-placeholder {
          height: 330px;
          width: 900px;
          .featured-conference-meta-placeholder {
            bottom: -54px;
            height: 166px;
            padding: 18px 24px 8px;
            right: -14px;
            width: 374px;
          }
        }
      }
      .popular-cities {
        .popular-cities-container {
          flex-direction: row;
          .popular-city-card {
            height: 220px;
            width: 300px;
            overflow: hidden;
            .bee-overlay {
              .bee-lazy-image {
                transition: transform 10s cubic-bezier(0,.5,0,1);
              }
            }
            &:hover {
              .bee-overlay {
                .bee-lazy-image {
                  transform: scale(1.15);
                }
              }
            }
            .popular-city-card--light-box {
              width: 344px;
              .popular-city-card--text {
                h3 {
                  ${typography('read', 3)}
                }
                h4 {
                  ${typography('title', 4)}
                }
              }
            }
          }
        }
      }
      .social-banner {
        .social-wrapper {
          height: auto;
          a:last-of-type {
            margin: 0;
          }
        }
      }
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default HomeContainer;
