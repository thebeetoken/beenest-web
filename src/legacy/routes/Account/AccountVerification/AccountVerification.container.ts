import styled from 'styled-components';

const AccountVerificationContainerMobile = styled.section`
  padding: 32px 24px 0;
  width: 100%;


  .bee-list-button + .bee-list-button {
    margin-top: 32px;
  }
  
  
  .bee-list-button {
    span {
      text-align: left;
    }
  }
`;

const AccountVerificationContainer = styled(AccountVerificationContainerMobile)`
  @media (min-width: 768px) {
    padding: 40px 0 0;
    width: auto;
  }
`;

export default AccountVerificationContainer;
