import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const HostListingCalendarContainerMobile = styled.section`
  margin: 0 auto;
  padding: 0 24px 64px;
  width: 100%;


  .host-listing-calendar--back {
    a {
      button {
        width: 200px;
      }
    }
  }


  .host-listing-calendar {
    a {
      display: block;
    }

    header {
      display: flex;
      flex-direction: column;
      margin: 16px 0 0;
      position: relative;
      h1 {
        ${typography('title', 5)};
      }
      h2 {
        ${typography('read', 2)};
        margin: 8px 0 0;
      }
      a {
        margin: 12px 0 0;
        .bee-button {
          width: 100%;
        }
      }
    }


    .bee-divider {
      margin: 8px 0 0;
    }


    .bee-select-box-wrapper {
      margin: 16px 0 0;
    }


    .host-listing-calendar--ical {
      display: none;
      h4 {
        cursor: copy;
      }
    }

    .rc-calendar {
      margin: 32px 0 0;
      .rc-calendar-header {
        display: none;
      }
      .rc-calendar-table {
        border-collapse: collapse;
        width: 100%;
        tbody > tr {
          height: 48px;
        }
        td {
          border: 1px solid ${color('middle')};
          padding: 8px;
          text-align: right;
          vertical-align: top;
          width: 136px;
        }
      }
      .rc-calendar-disabled-cell {
        background: ${color('up')};
        color: ${color('dark')};
      }
    }
  }
`;

const HostListingCalendarContainerTablet = styled(HostListingCalendarContainerMobile)`
  @media (min-width: 768px) {
    padding: 0 64px 64px;


    .host-listing-calendar--back {
      height: 72px;
        a {
          height: 100%;
          button {
            ${typography('title', 6)};
            height: inherit;
            width: 264px;
          }
        }
      }


    .host-listing-calendar {
      .host-listing-calendar--ical {
        display: flex;
        margin: 16px 0 0;
        h3 {
          ${typography('emp', 6)};
          flex-shrink: 0;
        }
        h4 {
          ${typography('read', 2)};
          margin: 0 0 0 8px;
        }
      }


      .rc-calendar {
        .rc-calendar-table {
          tbody > tr {
            height: 80px;
          }
        }
      }
    }
  }
`;

const HostListingCalendarContainerDesktop = styled(HostListingCalendarContainerTablet)`
  @media (min-width: 1025px) {
    padding: 0 128px 128px;
    .host-listing-calendar {
      header {
        h1 {
          ${typography('title', 4)};
          max-width: 528px;
        }
        h2 {
          ${typography('read', 1)};
        }
        a {
          margin: 0;
          position: absolute;
          right: 0;
          top: 0;
          .bee-button {
            width: 200px;
          }
        }
      }

      .host-listing-calendar--ical {
        display: inline-flex;
        margin: 0 16px;
      }


      .bee-select-box-wrapper {
        display: inline-flex;
        width: 200px;
      }


      .rc-calendar {
        .rc-calendar-table {
          tbody > tr {
            height: 88px;
          }
        }

      }
    }
  }
`;


export default HostListingCalendarContainerDesktop;
