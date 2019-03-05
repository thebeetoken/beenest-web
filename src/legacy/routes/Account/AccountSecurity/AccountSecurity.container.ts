import styled from 'styled-components';

const AccountSecurityContainerMobile = styled.section`
  padding: 32px 24px 0;
  width: 100%;
`;

const AccountSecurityContainer = styled(AccountSecurityContainerMobile)`
  @media (min-width: 768px) {
    padding: 40px 0 0;
    width: auto;
  }
`;

export default AccountSecurityContainer;
