import styled from 'styled-components';

const ListingCarouselPortalContainerMobile = styled.div`
  .bee-close-button {
    position: absolute;
    right: 24px;
    top: 24px;
    z-index: 10;
  }
`;


const ListingCarouselPortalContainerTablet = styled(ListingCarouselPortalContainerMobile)`
  @media (min-width: 768px) {
    .bee-close-button {
      height: 48px;
      width: 48px;
      .bee-svg {
        height: 48px;
        width: 48px;
      }
    }
  }
`;

const ListingCarouselPortalContainerDesktop = styled(ListingCarouselPortalContainerTablet)`
  @media (min-width: 1025px) {
    .bee-close-button {
      height: 64px;
      width: 64px;
      .bee-svg {
        height: 64px;
        width: 64px;
      }
    }
  }
`;

const ListingCarouselPortalContainer = styled(ListingCarouselPortalContainerDesktop)``;

export default ListingCarouselPortalContainer;
