import styled from 'styled-components';
import { color, typography } from 'styled/utils';

type Props = Partial<{
  hover: boolean;
}>

const HotelCardContainerMobile = styled.article`
  animation: fade-in 0.5s ease-in-out forwards;
  box-shadow: 0 4px 15px 0 rgba(0,0,0,0.20);
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;


  .hotel-card--image {
    flex-shrink: 0;
    height: 47.5vw;
    transition: opacity 0.15s ease-in-out;
    width: 100%;
  }


  .hotel-card--meta {
    display: flex;
    flex: 1;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: space-between;
    padding: 0 16px
    width: 100%;
    .hotel-card--heading-container {
      align-items: center;
      display: flex;
      flex-direction: row;
      height: 48px;
      justify-content: space-between;
      margin-top: 8px;
      h3 {
        ${typography('title', 5)}
        color: ${color('body')};
        margin-bottom: 0;
      }
      h4 {
        ${typography('title', 9)}
        color: ${color('upper')};
      }
    }
    .hotel-card--title {
      h3 {
        ${typography('title', 7)}
        color: ${color('body')};
      }
    }
    .hotel-card--purchase {
      align-items: center;
      align-self: flex-start;
      display: flex;
      flex-direction: row;
      height: 48px;
      h4 {
        ${typography('read', 2)}
        color: ${color('secondary')};
        text-transform: uppercase;
      }
      .bee-svg {
        color: ${color('secondary')};
        height: 24px;
        margin-left: 8px;
        width: 24px;
      }
    }
  }
`;

const HotelCardContainerTablet = styled(HotelCardContainerMobile)`
  @media (min-width: 768px) {
    height: 328px;
    width: 342px;
    .hotel-card--meta {
      margin-top: 0;
      .hotel-card--heading-container {
        height: 64px;
        h3 {
          ${typography('title', 3)};
        }
        h4 {
          ${typography('title', 8)};
        }
      }
      .hotel-card--title {
        h3 {
          ${typography('title', 6)};
        }
      }
      .hotel-card--purchase {
        height: 64px;
      }
    }

    .hotel-card--image {
      height: 208px;
    }
  }
`;

const HotelCardContainerDesktop = styled(HotelCardContainerTablet)`
  @media (min-width: 1025px) {
    height: 384px;
    width: 400px;


    ${({ hover }: Props) => {
      return hover
        ? `
      @media (min-width: 1025px) {
        &:hover {
          .hotel-card--image {
            opacity: 0.52;
          }
        }
      }
    `
        : '';
    }};
  }
`;

export const HotelCardContainer = styled(HotelCardContainerDesktop)`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const HotelCardPlaceholderContainerMobile = styled.article`
  animation: fade-in 0.5s ease-in-out forwards;


  .hotel-card--image-placeholder {
    flex-shrink: 0;
    height: 210px;
    transition: opacity 0.15s ease-in-out;
    width: 100%;
  }


  .hotel-card--meta-placeholder {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    height: 126px;
    padding-top: 8px;
    width: 100%;
  }
`;

const HotelCardPlaceholderContainerTablet = styled(HotelCardPlaceholderContainerMobile)`
  @media (min-width: 768px) {
    height: 352px;
    width: 282px;

    
    .hotel-card-image-placeholder {
      height: 210px;
    }
  }
`;

const HotelCardPlaceholderContainerDesktop = styled(HotelCardPlaceholderContainerTablet)`
  @media (min-width: 1025px) {
  }
`;

export const HotelCardPlaceholderContainer = styled(HotelCardPlaceholderContainerDesktop)`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
