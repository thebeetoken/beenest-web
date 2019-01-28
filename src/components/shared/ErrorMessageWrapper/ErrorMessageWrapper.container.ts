import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const ErrorMessageWrapperContainer = styled.div`
  ${typography('light', 7)}
  color: ${color('incorrect')};
  height: 32px;
  transition: all 0.1s ease-in-out;
`;

/** @component */
export default ErrorMessageWrapperContainer;