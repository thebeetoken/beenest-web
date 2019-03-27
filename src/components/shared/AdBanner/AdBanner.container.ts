import styled from 'styled-components';

const AdBannerContainerMobile = styled.section`
  object-fit: contain;
  width: 100%;
  img {
    height: 100%;
    width: 100%;
  }
`;

const AdBannerContainerTablet = styled(AdBannerContainerMobile)`
  @media (min-width: 768px) {
  }
`;

const AdBannerContainer = styled(AdBannerContainerTablet)`
  @media (min-width: 1025px) {
  }
`;

export default AdBannerContainer;
