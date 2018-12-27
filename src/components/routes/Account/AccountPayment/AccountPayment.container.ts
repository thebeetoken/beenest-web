import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const AccountPaymentContainerMobile = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 112px;
  width: 100%;
  padding: 40px 24px 0;

  .credit-balance-container {
    display: flex;
    h1 {
      ${typography('emp', 7)};
      color: ${color('core')};
    }
    p {
      ${typography('read', 3)};
      color: ${color('secondary')};
      margin-left: 12px;
    }
  }
`;

const AccountPaymentContainerTablet = styled(AccountPaymentContainerMobile)`
  @media (min-width: 768px) {
    width: 528px;
    padding: 40px 24px 0;
  }
`;

const AccountPaymentContainer = styled(AccountPaymentContainerTablet)`
  @media (min-width: 1025px) { }
`;

export default AccountPaymentContainer;
