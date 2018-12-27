import styled from 'styled-components';
import { typography } from 'styled/utils';

const ListingsContainerContainerMobile = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 64px;
  width: 100%;
  

  .listing-results-header-container {
    display: flex;
    flex-wrap: wrap;
    height: 334px;
    justify-content: center;
    position: relative;
    text-align: center;
    width: 100%;
    z-index: 1;
  }


  .listing-results-wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 40px 24px 0 24px;
  }

  .listing-query-body--map {
    margin: 0 auto;
  }

  .listing-query-body--map-toggle {
    display: none;
  }
`;

const ListingsContainerContainerTablet = styled(ListingsContainerContainerMobile)`
  @media (min-width: 768px) {
    .listing-results-header-container {
      margin-top: 24px;
      margin-bottom: 35px;
    }
    .listing-results-wrapper {
      margin-bottom: 75px;
      padding: 0;
    }
    .listing-query-body--map-toggle {
      display: block;
      margin-bottom: 35px;
      text-align: right;
      width: 100%;
    }
    .listing-query-body.listing-query-body--map-showing {
      .bee-google-maps-markers {
        height: 400px;
        width: 100%;
      }
      .listing-query-body--map {
        margin-bottom: 35px;
      }
    }
  }
`;

const ListingsContainerContainerDesktop = styled(ListingsContainerContainerTablet)`
  @media (min-width: 1025px) {
    .listing-results-header-container {
      height: 124px;
    }
    .listing-query-body {
      width: 1024px;
    }
    .listing-query-body--cards {
      margin: 0 auto;
      width: 976px;
    }
    .listing-query-body.listing-query-body--map-showing {
      .bee-google-maps-markers {
        height: calc(100vh - 320px);
        width: 100%;
      }
      .bee-listing-card {
        width: 247px;
        .listing-card-price-container {
          h2 {
            ${typography('title', 5)}
            span {
              ${typography('caption', 3)}
            }
          }
        }
        h1 {
          ${typography('title', 7)}
          height: 32px;
        }
        h4 {
          ${typography('emp', 7)}
        }
      }
      .listing-query-body--map {
        float: right;
        margin-bottom: 0;
        position: sticky;
        top: 80px;
        width: 400px;
      }
      .listing-query-body--cards {
        margin-left: 0;
        margin-right: auto;
        margin-top: 60px;
        width: 624px;
        a {
          margin-left: 0;
          margin-right: 65px;
        }
      }
    }
  }
`;

const ListingsContainerContainer= styled(ListingsContainerContainerDesktop)``;

export default ListingsContainerContainer;
