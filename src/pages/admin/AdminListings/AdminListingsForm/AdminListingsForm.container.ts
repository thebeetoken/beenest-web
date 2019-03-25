import styled from 'styled-components';

import AdminOverflowContainer from '../../adminShared/containers/AdminOverflow.container';

import { color, typography } from 'styled/utils';

const AdminListingsFormContainer = styled(AdminOverflowContainer)`
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
  width: 100%;


  header {
    ${typography('welter', 1)}
    color: ${color('body')};
    margin-bottom: 48px;
  }
`;

export default AdminListingsFormContainer;
