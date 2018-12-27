import styled from 'styled-components';

const BuyNowQuoteContainerMobile = styled.div`
  @media (max-width: 768px) {
    .pricing-card-wrapper {
      width: 100vw !important;
      height: 100vh;
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      padding-top: 40px !important;
      box-sizing: border-box;
    }
  }
`;

const BuyNowQuoteContainerTablet = styled(BuyNowQuoteContainerMobile)`
  @media (min-width: 768px) {
    width: auto;
  }
`;

const BuyNowQuoteContainer = styled(BuyNowQuoteContainerTablet)`
  @media (min-width: 1025px) { }
`;

export default BuyNowQuoteContainer;
