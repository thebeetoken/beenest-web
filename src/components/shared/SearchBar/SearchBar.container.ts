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
    .search-bar-form--location,
    .search-bar-form--guests,
    .search-bar-form--check-out-date,
    .search-bar-form--check-in-date {
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
    .search-bar-form--check-out-date,
    .search-bar-form--check-in-date {
      width: 45%;
      .SingleDatePicker {
        width: 100%;
        .SingleDatePickerInput {
          width: 100%;
          .DateInput {
            width: 100%;
          }
        }
      }
    }
    .search-bar-form--guests {
      width: 100%;
    }
    .search-button {
      align-self: flex-end;
      width: 100%;
    }
    .search-bar-form--row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
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
    height: 124px;
    padding: 24px 30px 36px 34px;
    max-width: 960px;
    width: 960px;
    z-index: 1;

    .search-bar-form {
      display: flex;
      flex-direction: row;
      .search-bar-form--location,
      .search-bar-form--guests,
      .search-bar-form--check-out-date,
      .search-bar-form--check-in-date {
        margin-bottom: 0;
      }
      .search-bar-form--location {
        width: 272px;
      }
      .search-bar-form--check-out-date,
      .search-bar-form--check-in-date {
        width: 108px;
      }
      .search-bar-form--check-in-date {
        margin-left: 32px;
      }
      .search-bar-form--check-out-date {
        margin-left: 24px;
      }
      .search-bar-form--guests {
        margin-left: 32px;
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
