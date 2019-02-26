import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const ListingFormNavMobileContainer = styled.div`
  position: relative;
  background-color: ${color('lighter')};
  height: 116px;
  width: 100%;
  z-index: 10;
  
  .bee-general-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin: 0 auto;
    width: 100%;
    min-width: 100%;
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
      margin: 16px;
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
      min-width: 976px;
      nav {
        > div {
          width: 204px;
        }
      }
    }
  }
`;

export default ListingFormNavDesktopContainer;
