import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const NotFoundContainer = styled.section`
  text-align: center;

  h1 {
    color: ${color('style', 0.5)};
    font-size: 200px;
    font-weight: 400;
  }

  p {
    ${typography('read', 2)}
  }
`;

export default NotFoundContainer;
