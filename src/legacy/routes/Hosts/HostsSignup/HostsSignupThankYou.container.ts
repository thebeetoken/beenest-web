import styled from 'styled-components';

import { color, typography } from 'styled/utils';

const HostsSignupThankYouContainerMobile = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  min-height: 100vh;
  padding: 24px;

  h1,
  h2,
  p {
    text-align: center;
  }
  h1 {
    ${typography('emp', 1)}
    color: ${color('core')};
  }
  h2 {
    ${typography('title', 7)}
    color: ${color('core')};
    margin-top: 16px;
  }
  p {
    ${typography('read', 2)}
    color: ${color('top')};
    margin-top: 8px;
  }
`;
const HostsSignupThankYouContainerTablet = styled(HostsSignupThankYouContainerMobile)`
  @media (min-width: 768px) {
    padding: 64px;
    width: 560px;


    h2 {
      ${typography('title', 6)}
    }
    p {
      ${typography('read', 1)}
      margin-top: 16px;
    }
  }
`;
const HostsSignupThankYouContainer = styled(HostsSignupThankYouContainerTablet)`
  @media (min-width: 1025px) {
    width: 688px;
  }
`;

export default HostsSignupThankYouContainer;
