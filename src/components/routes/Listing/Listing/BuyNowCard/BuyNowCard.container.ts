import styled from 'styled-components';
import { color, typography } from 'styled/utils';

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 440px;
  justify-content: center;
  width: 352px;

  .buy-now-card-wrapper {
    background-color: white;
    box-shadow: 0 4px 15px ${color('black', 0.1)};
    display: flex;
    flex-direction: column;
    padding: 16px 24px 40px;
    width: 352px;
    .pricing-container {
      align-items: flex-start;
      display: flex;
      flex-direction: row;
      height: 64px;
      min-height: 64px;
      justify-content: space-between;
      margin-bottom: 32px;
      .pricing-container--primary {
        align-items: center;
        align-self: center;
        display: flex;
        flex-direction: row;
        h4 {
          ${typography('title', 3)}
        }
        span {
          ${typography('caption', 2)}
          margin-left: 4px;
        }
      }
      .pricing-container--other-rates {
        align-self: flex-start;
        display: flex;
        flex-direction: column;
        padding-top: 21px;
        text-align: right;
        h5 {
          ${typography('emp', 6)}
          color: ${color('secondary')};
          span {
            ${typography('caption', 2)}
            color: ${color('secondary')};
            margin-left: 2px;
          }
        }
      }
    }
    form {
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
      button {
        width: 100%;
      }
    }
  }

  h3 {
    ${typography('caption', 1)}
    color: ${color('upper')};
    margin-top: 24px;
    text-align: center;
  }
`;
