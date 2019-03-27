import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const AdminInputLabelContainer = styled.label`
  ${typography('welter', 5)}
  align-items: center;
  color: ${color('body')};
  display: flex;
  height: 24px;
  margin-bottom: 8px;
  span {
    ${typography('light', 7)}
    color: ${color('top')};
    margin-left: 8px;
  }
`;

/** @component */
export default AdminInputLabelContainer;
