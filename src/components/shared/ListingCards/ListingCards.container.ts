import styled from 'styled-components';

const ListingCardsContainerMobile = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  a {
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 56px;
    }
  }
`;

const ListingCardsContainerTablet = styled(ListingCardsContainerMobile)`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: -40px;
    width: 644px;
    a {
      &:nth-of-type(2n) {
        margin-left: 80px;
      }
    }
  }
`;

const ListingCardsContainerDesktop = styled(ListingCardsContainerTablet)`
  @media (min-width: 1025px) {
    margin: 0 auto -60px;
    width: 100%;
    a {
      margin-bottom: 60px;
      &:nth-of-type(3n + 4),
      &:nth-of-type(3n + 5),
      &:nth-of-type(3n + 6) {
        margin-left: 0;
      }

      &:nth-of-type(3n + 2),
      &:nth-of-type(3n + 3) {
        margin-left: 65px;
      }
    }
  }
`;

const ListingCardsContainer = styled(ListingCardsContainerDesktop)``;

export default ListingCardsContainer;
