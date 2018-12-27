import styled from 'styled-components';
import { BANNER_HEIGHT, HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from 'styled/utils';

interface Props {
  showBanner: boolean;
}

const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100%;


  > *:not(.bee-authentication):not(.bee-booking) {
    padding-top: ${({ showBanner }: Props) => showBanner ? `${BANNER_HEIGHT}px` : '0'};
  }

  @media (max-width: 767px) {
    > *:not(.bee-authentication):not(.bee-home):not(.conference-payment):not(.hosts-page-container):not(.bee-booking) {
      padding-top: ${({ showBanner }: Props) => showBanner ? `${BANNER_HEIGHT + MOBILE_HEADER_HEIGHT}px` : `${MOBILE_HEADER_HEIGHT}px`};
    }
  }

  @media (min-width: 768px) {
    > *:not(.bee-home):not(.hosts-page-container) {
      padding-top: ${({ showBanner }: Props) => showBanner ? `${BANNER_HEIGHT + HEADER_HEIGHT}px` : `${HEADER_HEIGHT}px`};
    }
  }
`;

export default AppContainer;
