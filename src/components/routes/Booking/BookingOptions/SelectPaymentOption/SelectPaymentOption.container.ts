import styled from 'styled-components';

const SelectPaymentOptionContainerMobile = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 32px 24px;
  height: 100%;
  width: 100%;
  

  .select-payment-left {
    width: 368px;
    .payment-options-container {
      display: flex;
      flex-direction: column;
      margin-bottom: 32px;
      width: 100%;
    }
    .select-container {
      padding-bottom: 24px;
    }
  }
`;

const SelectPaymentOptionContainerTablet = styled(SelectPaymentOptionContainerMobile)`
  @media (min-width: 768px) {
    padding: 0 0;
    padding-bottom: 100px;


    .select-payment-left {
      .payment-options-container {

      }
      .select-container {
        padding-bottom: 32px;
      }
    }


    .select-payment-quote-desktop {
      height: auto;
      width: 352px;
    }
  }
`

const SelectPaymentOptionContainer = styled(SelectPaymentOptionContainerTablet)`
  @media (min-width: 1025px) {
    max-width: 978px;


    .select-payment-quote-desktop {
      width: 352px;
    }
  }
`


export default SelectPaymentOptionContainer;
