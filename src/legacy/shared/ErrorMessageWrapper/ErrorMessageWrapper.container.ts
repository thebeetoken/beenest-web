import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const ErrorMessageWrapperContainer = styled.div`
  ${typography('light', 7)}
  color: ${color('error')};
  height: 32px;
`;

/** @component */
export default ErrorMessageWrapperContainer;