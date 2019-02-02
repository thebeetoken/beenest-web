import styled from 'styled-components';
import { color, cover, typography } from 'styled/utils';

const ListingFormNavMobileContainer = styled.div`
  background-color: ${color('lighter')};
  height: 90px;
  width: 100%;

  .bee-general-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin: 0 auto;
    min-width: auto;
    nav {
      display: flex;
      height: inherit;
      > div {
        a {
          color: ${color('black')};
          &.active {
            color: ${color('white')};
          }
        }
      }
    }

    
    > a {
      ${typography('read', 2)}
      align-self: flex-end;
      cursor: pointer;
      margin: 8px 16px;
      text-align: center;
      text-decoration: underline;
      transition: opacity 0.2s ease-in-out;
      &:hover {
        opacity: 0.5;
      }
    }
  }
`;


const ListingFormNavTabletContainer = styled(ListingFormNavMobileContainer)`
  @media (min-width: 768px) {
    height: 64px;
    .bee-general-wrapper {
      width: 100%;
      flex-direction: row;
      nav {
        > div {
          width: 180px;
        }
      }
      > a {
        align-self: auto;
      }
    }
  }
`;

const ListingFormNavDesktopContainer = styled(ListingFormNavTabletContainer)`
  @media (min-width: 1025px) {
    .bee-general-wrapper {
      width: 976px;
      nav {
        > div {
          width: 204px;
        }
      }
    }
  }
`;

export default ListingFormNavDesktopContainer;
