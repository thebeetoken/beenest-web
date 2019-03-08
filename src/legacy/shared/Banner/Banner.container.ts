import { LocationDescriptor } from 'history';
import styled from 'styled-components';

import { BANNER_HEIGHT, color, typography } from 'styled/utils';

type Props = Partial<{
  background: string;
  href: string | null;
  textColor: string;
  to: LocationDescriptor | null;
}>

const BannerContainerMobile = styled.section`
  position: relative;
  .bee-banner-content {
    align-items: center;
    background-color: ${({ background }: Props) =>  color('secondary' || background)};
    color: ${({ textColor }: Props) =>  color('white' || textColor)};
    display: flex;
    height: ${BANNER_HEIGHT}px;
    justify-content: center;
    text-align: center;
    
    a {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    span {
      ${typography('read', 3)}
      padding: 16px 32px;
    }
  }


  .close {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    z-index: 1;
  }
`;

const BannerContainerTablet = styled(BannerContainerMobile)`
  @media (min-width: 768px) {
    .bee-banner-content {
      span {
        ${typography('read', 2)}
        padding: 16px 48px;
      }
    }
  }
`;

const BannerContainer = styled(BannerContainerTablet)`
  @media (min-width: 1024px) {
    .bee-banner-content {
      cursor: ${({ href, to }: Props) =>  (href || to) ? 'pointer' : 'auto'};
      span {
        padding: 16px 64px;
      }
    }
  }
`;

export default BannerContainer;