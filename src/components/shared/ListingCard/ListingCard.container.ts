import styled from 'styled-components';
import { color, typography } from 'styled/utils';

type Props = Partial<{
  hover: boolean;
}>;

const ListingCardContainerMobile = styled.article`
  animation: fade-in 0.5s ease-in-out forwards;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;


  .listing-card--image {
    flex-shrink: 0;
    height: 56.25vw;
    width: 100%;
  }


  .listing-card--meta {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    height: 126px;
    padding-top: 8px;
    width: 100%;
    .listing-card-price-container {
      display: flex;
      height: 28px;
      justify-content: space-between;
      h2 {
        ${typography('title', 4)}
        align-items: center;
        color: ${color('body')};
        display: flex;
        margin-bottom: 0;
        span {
          ${typography('caption', 2)}
          margin-left: 6px;
        }
      }
      h3 {
        ${typography('emp', 6)}
        align-items: center;
        color: ${color('secondary')};
        display: flex;
        span {
          ${typography('caption', 3)}
          margin: 1px 0 0 3px;
        }
      }
    }
    h1 {
      ${typography('title', 6)}
      align-items: center;
      color: ${color('body')};
      display: flex;
      height: 48px;
      margin-top: 8px;
    }
    h4 {
      ${typography('emp', 7)}
      color: ${color('secondary')};
      text-transform: uppercase;
    }
  }
`;

const ListingCardContainerTablet = styled(ListingCardContainerMobile)`
  @media (min-width: 768px) {
    height: 352px;
    width: 282px;

    .listing-card--image {
      height: 210px;
    }
  }
`;

const ListingCardContainerDesktop = styled(ListingCardContainerTablet)`
  @media (min-width: 1025px) {
    .listing-card--image {
      transition: all 0.15s ease-in-out;
      ${({ hover }: Props) => {
        return hover
          ? `
            &:hover {
              opacity: 0.52;
            }
          `
          : '';
      }};
    }
  }
`;

export const ListingCardContainer = styled(ListingCardContainerDesktop)`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ListingCardPlaceholderContainerMobile = styled.article`
  animation: fade-in 0.5s ease-in-out forwards;

  .listing-card--image-placeholder {
    flex-shrink: 0;
    height: 210px;
    transition: opacity 0.15s ease-in-out;
    width: 100%;
  }

  .listing-card--meta-placeholder {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    height: 126px;
    padding-top: 8px;
    width: 100%;
  }
`;

const ListingCardPlaceholderContainerTablet = styled(ListingCardPlaceholderContainerMobile)`
  @media (min-width: 768px) {
    height: 352px;
    width: 282px;

    .listing-card-image-placeholder {
      height: 210px;
    }
  }
`;

const ListingCardPlaceholderContainerDesktop = styled(ListingCardPlaceholderContainerTablet)`
  @media (min-width: 1025px) {
  }
`;

export const ListingCardPlaceholderContainer = styled(ListingCardPlaceholderContainerDesktop)`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
