import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const TripsReceiptMobileContainer = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  width: 100%;

  .bee-general-wrapper {
    align-self: flex-start;
    padding: 32px 24px 138px;
    .trips-receipt-content {
      width: 100%;
      h1 {
        ${typography('title', 4)}
        color: ${color('body')};
      }
      .bee-divider {
        margin-bottom: 24px;
        opacity: 0.4;
      }


      .trips-receipt-meta {
        h2 {
          ${typography('title', 5)}
          color: ${color('body')};
          margin-bottom: 16px;
        }
        h3 {
          ${typography('title', 7)}
          color: ${color('secondary')};
          margin-bottom: 24px;
          text-transform: uppercase;
        }
        h4 {
          ${typography('read', 4)}
          color: ${color('secondary')};
        }
        .bee-divider {
          margin: 24px 0;
        }


        .trips-receipt-host-profile {
          align-items: center;
          display: flex;
          height: 90px;
          .trips-receipt-host-profile-image {
            border-radius: 50%;
            height: 100%;
            overflow: hidden;
            width: 90px;
          }
          .trips-receipt-host-profile-meta {
            display: flex;
            flex-direction: column;
            margin-left: 16px;
            h5 {
              ${typography('read', 1)}
              color: ${color('body')};
              span {
                text-transform: capitalize;
              }
            }
            h6 {
              ${typography('caption', 2)}
              color: ${color('upper')};
              margin-top: 6px;
            }
          }
        }


        .trips-receipt-booked {
          display: flex;
          flex-direction: column;
          .bee-list-item {
            height: 32px;
          }
          .bee-list-item + .bee-list-item {
            margin-top: 8px;
          }
        }


          .trips-receipt-paid {
            .trips-receipt-paid--line-items {
              display: flex;  
            }
          }


        .trips-receipt-location {
          display: flex;
          flex-direction: column;
          .bee-list-item {
            margin-bottom: 24px;
          }
          .bee-google-maps {
            height: 136px;
            width: 100%;
          }
        }
      }
    }
  }
`;

const TripsReceiptTabletContainer = styled(TripsReceiptMobileContainer)`
  @media (min-width: 768px) {
    .bee-general-wrapper {
      padding: 64px 64px 56px;
      .trips-receipt-content {
        h1 {
          ${typography('title', 2)}
        }
        .bee-divider {
          margin-bottom: 32px;
        }
        .trips-receipt-meta {
          min-width: 584px;
          width: 584px;
          h2 {
            ${typography('title', 3)}
            margin-bottom: 9px;
          }
          h3 {
            ${typography('emp', 6)}
          }


          .trips-receipt-transaction {
            &__secondary {
              ${typography('read', 1)}
              color: ${color('secondary')};
              margin: 32px 0 8px;
            }
            &__body {
              ${typography('title', 7)}
              color: ${color('body')};
            }
          }


          .trips-receipt-paid {
            display: flex;
            flex-direction: column;
            .trips-receipt-paid--line-items {
              align-items: center;
            }
            .trips-receipt-paid--line-items:first-of-type {
              .bee-list-item {
                width: auto;
              }
            }
          }


          .trips-receipt-location {
            .bee-google-maps {
              height: 300px;
            }
          }
        }
      }
    }
  }
`;

const TripsReceiptContainer = styled(TripsReceiptTabletContainer)`
  @media (min-width: 1025px) {
    .bee-general-wrapper {
      margin: 0 auto;
      padding: 64px 0 56px;
    }
  }
`;

export default TripsReceiptContainer;