import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const ExpiredTripCardContainer = styled.div`
  box-shadow: 0 4px 15px 0 ${color('middle')};
  display: flex;
  flex-direction: column;
  height: 426px;
  margin-bottom: 48px;
  width: 272px;
  .trip-card--img {
    height: 142px;
  }
  .trip-card-section {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 16px;
    padding-bottom: 0;
    min-height: 142px;
    h2 {
      ${typography('read', 3)};
      color: ${color('secondary')};
      margin-bottom: 8px;
    }
    h3 {
      ${typography('title', 7)};
      align-items: center;
      color: ${color('body')};
      display: flex;
      line-height: 22px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    > h4 {
      ${typography('emp', 7)};
      color: ${color('secondary')};
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    h5 {
      ${typography('read', 3)};
      color: ${color('body')};
      margin-bottom: 8px;
      span {
        ${typography('emp', 7)};
      }
    }
  }
  .trip-card--cancelled-bar {
    h4 {
      ${typography('title', 8)};
      color: ${color('error')};
      line-height: 24px;
    }
  }
  .actions {
    align-items: center;
    display: flex;
    height: 72px;
    justify-content: space-around;
    padding: 0;
    margin: 0;
    .bee-fab {
      height: 72px;
      width: 72px;
    }
  }
`;

export default ExpiredTripCardContainer;
