import styled from 'styled-components';
import { typography } from 'styled/utils';
import { color } from 'styled/utils';

const ListingBottomBarMobileContainer = styled.div`
  align-items: center;
  background-color: ${color('white')};
  display: flex;
  flex-direction: row;
  height: 88px;
  justify-content: space-between;
  min-height: 88px;
  padding: 20px 16px;
  text-align: center;
  width: 100%;
  .pricing-container {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    .pricing-container--primary {
      display: flex;
      flex-direction: row;
      h4 {
        display: flex;
        flex-direction: row;
        align-items: center;
        ${typography('title', 6)}
        span {
          ${typography('caption', 4)}
          margin-left: 4px;
        }
      }
    }
    .pricing-container--other-rates {
      display: flex;
      flex-direction: row;
      h5 {
        display: flex;
        flex-direction: row;
        align-items: center;
        ${typography('emp', 6)}
        color: ${color('secondary')};
        span {
          ${typography('caption', 4)}
          color: ${color('secondary')};
          margin-left: 2px;
        }
      }
    }
  }
  .bee-button {
    width: 160px;
  }
`;


const ListingBottomBarTabletContainer = styled(ListingBottomBarMobileContainer)`
  @media (min-width: 768px) {
    padding: 16px 40px;
    .bee-button {
      width: 300px;
    }
  }
`;

const ListingBottomBarContainer = styled(ListingBottomBarTabletContainer)``;

export default ListingBottomBarContainer;
