import styled from 'styled-components';

const BuyNowPaymentContainerMobile = styled.div`
  width: 100%;
  height: 100%;


  .buy-now-payment--row {
    height: 100%;
    padding-bottom: 80px;
  }
`;

const BuyNowPaymentContainerTablet = styled(BuyNowPaymentContainerMobile)`
  @media (min-width: 768px) { }
`;

const BuyNowPaymentContainer = styled(BuyNowPaymentContainerTablet)`
  @media (min-width: 1025px) {
    .buy-now-payment--row {
      display: flex;
      align-items: flex-start;
    }
  }
`;

export default BuyNowPaymentContainer;
