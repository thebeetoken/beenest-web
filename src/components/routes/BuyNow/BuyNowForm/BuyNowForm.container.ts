import styled from 'styled-components';
import { typography } from 'styled/utils';

const BuyNowFormContainerMobile = styled.div`
  height: 100%;
  width: 100%;

  header {
    height: 60px;
    width: 100%;


    h2 {
      ${typography('title', 7)}
      height: 32px;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    height: calc(100% - 60px);
    justify-content: space-between;
    width: 100%;


    .input-container {
      display: flex;
      flex-direction: column;
    }
    .buy-now-form--item {
      position: relative;
    }
    .select {
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;
      select {
        width: calc(100% - 24px);
      }
    }
  }
`;

const BuyNowFormContainerTablet = styled(BuyNowFormContainerMobile)`
  @media (min-width: 768px) {
    padding-top: 54px;


    header {
      h2 {
        ${typography('title', 3)};
        width: 680px;
      }
    }
    form {
      width: 352px;
      .input-container {
        flex-direction: column;
      }
      .select {
        select {
          width: 328px;
        }
      }
    }
  }
`;

const BuyNowFormContainer = styled(BuyNowFormContainerTablet)`
  @media (min-width: 1025px) { }
`;

export default BuyNowFormContainer;
