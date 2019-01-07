import styled from 'styled-components';
import { color } from 'styled/utils';

const SearchBarContainerMobile = styled.div`
  align-items: flex-end;
  background-color: ${color('white')};
  display: flex;
  height: 334px;
  justify-content: center;
  width: 100%;
  padding: 24px;

  .search-bar-form {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    width: 100%;
    label {
      height: 24px;
    }
    .bee-input-wrapper {
      > input {
        border: none;
        border-bottom: 1px solid ${color('body')};
        padding: 0;
        &:focus {
          border-bottom: 1px solid ${color('style')};
        }
      }
    }
    .search-bar-form--location,
    .search-bar-form--guests,
    .search-bar-form--date-range {
      display: flex;
      flex-direction: column;
      margin-bottom: 8px;
    }
    .search-bar-form--location {
      width: 100%;
      .search-bar-autocomplete-container {
        height: 40px;
      }
    }
    .search-bar-form--date-range {
      margin-left: 32px;
      width: 230px;
      .calendar-labels-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .bee--input-label {
          width: calc((100% - 24px) / 2);
        }
      }
    }
    .search-bar-form--guests {
      width: 100%;
    }
    .search-button {
      align-self: flex-end;
      height: 40px;
      width: 100%;
    }
  }
`;

const SearchBarContainerTablet = styled(SearchBarContainerMobile)`
  @media (min-width: 768px) {
    box-shadow: 0 4px 15px ${color('black', 0.15)};
    max-width: 500px;
  }
`;

const SearchBarContainerDesktop = styled(SearchBarContainerTablet)`
  @media (min-width: 1025px) {
    height: 92px;
    padding: 26px 30px 26px 34px;
    max-width: 960px;
    width: 960px;
    z-index: 1;

    .search-bar-form {
      display: flex;
      flex-direction: row;
      .search-bar-form--location,
      .search-bar-form--guests,
      .search-bar-form--date-range {
        margin-bottom: 0;
      }
      .search-bar-form--location {
        width: 256px;
      }
      .search-bar-form--date-range {
        margin-left: 64px;
        width: 230px;
      }
      .search-bar-form--guests {
        margin-left: 64px;
        width: 80px;
      }
      .search-button {
        width: 160px;
      }
    }
  }
`;

const SearchBarContainer = styled(SearchBarContainerDesktop)``;

export default SearchBarContainer;
