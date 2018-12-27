import styled from 'styled-components';
import { color, cover, typography } from 'styled/utils';

const ListingFormNavContainer = styled.div`
  background-color: ${color('lighter')};
  height: 64px;


  .bee-general-wrapper {
    display: flex;
    justify-content: space-between;
    height: 100%;
    margin: 0 auto;

    nav {
      display: flex;
      height: inherit;
      width: 180px;
      .host-listings-navigation--items {
        align-items: center;
        cursor: pointer;
        display: flex;
        height: inherit;
        justify-content: center;
        width: inherit;
        a {
          ${typography('title', 7)}
          display: flex;
          height: inherit;
          justify-content: center;
          position: relative;
          width: inherit;
          align-items: center;
          transition: all 0.2s ease-in-out;
          &:hover:not(.active) {
            opacity: 0.5;
          }
          &.active {
            background-color: transparent;
            color: ${color('white')};
            justify-content: center;
            position: relative;
            z-index: 1;
            &::before {
              ${cover(true)}
              background-color: ${color('secondary')};
              border-radius: 2px;
              box-shadow: 0 0 10px ${color('black', 0.2)};
              z-index: -1;
            }
          }
        }
      }
    }


    nav + a {
      ${typography('read', 2)}
      transition: opacity 0.2s ease-in-out;
      text-decoration: underline;
      &:hover {
        opacity: 0.5;
      }
    }

    
    > a {
      ${typography('title', 8)}
      cursor: pointer;
      text-decoration: underline;
      transition: opacity 0.2s ease-in-out;
      &:hover {
        opacity: 0.5;
      }
    }
  }
`;

export default ListingFormNavContainer;