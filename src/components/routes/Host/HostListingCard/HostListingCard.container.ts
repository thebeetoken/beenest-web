import styled from 'styled-components';
import { color, typography } from 'styled/utils';


const HostListingCardContainer = styled.article`
  box-shadow: 0 2px 8px ${color('black', 0.1)};
  display: flex;
  height: 232px;
  justify-content: space-between;
  padding: 20px 32px 28px 24px;
  width: 100%;


  .host-listing-meta {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 436px;
    h1 {
      ${typography('title', 4)};
    }
    h2 {
      ${typography('read', 1)};
    }
    h3 {
      ${typography('caption', 1)};
      font-style: italic;
      margin-bottom: 14px;
    }
    &--button-container {
      display: flex;
      justify-content: space-between;
      width: 555px;
      a,
      button {
        min-width: 105px;
        width: 105px;
      }
      label {
        margin: 7px;
      }
    }
  }


  .host-listing-image {
    height: 100%;
    width: 340px;
  }
`;

export default HostListingCardContainer;