import styled from 'styled-components';
import { typography } from 'styled/utils';

const BuyNowContainerMobile = styled.div`
  height: 100vh;
  padding: 24px;
  width: 100%;


  .row {
    align-items: flex-start;
    display: flex;
    height: 100%;
    padding-top: 40px;
    width: 100%;


    h6 {
      ${typography('read', 6)};
    }
    ul {
      padding: none;
      li {
        ${typography('read', 2)};
        list-style-type: disc;
      }
    }
  }
`;

const BuyNowContainer = styled(BuyNowContainerMobile)`
  @media (min-width: 1025px) {
    margin: 0 auto;
    width: 1008px;
  }
`;

export default BuyNowContainer;
