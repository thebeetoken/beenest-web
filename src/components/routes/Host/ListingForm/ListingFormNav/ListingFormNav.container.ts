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
    max-width: 976px;
    nav {
      height: inherit;
    }

    
    > a {
      ${typography('title', 8)}
      align-self: flex-end;
      cursor: pointer;
      margin-top: 16px;
      margin-right: 16px;
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
      flex-direction: row;
      > a {
        align-self: auto;
        margin-top: 0;
      }
    }
  }
`;

export default ListingFormNavTabletContainer;