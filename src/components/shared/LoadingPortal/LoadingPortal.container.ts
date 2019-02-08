import styled from 'styled-components';
import { color, typography } from 'styled/utils';

export default styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .loading-processing {
    align-items: center;
    background-color: ${color('white')};
    box-shadow: 0 4px 10px ${color('black', 0.1)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 36px;
    padding: 12px 18px 24px;
    h2 {
      ${typography('emp', 7)}
      margin-top: 8px;
      text-align: center;
    }
    p {
      ${typography('read', 3)}
      margin-top: 8px;
      text-align: center;
    }
  }
`;
