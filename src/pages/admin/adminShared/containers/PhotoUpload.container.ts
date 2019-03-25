import styled from 'styled-components';

import AdminOverflowContainer from './AdminOverflow.container';

import { color, typography } from 'styled/utils';

const PhotoUploadContainer = styled(AdminOverflowContainer)`
  display: flex;
  flex-direction: column;
  width: 400px;
  header {
    ${typography('welter', 1)}
    color: ${color('body')};
    margin-bottom: 48px;
  }
`;

export default PhotoUploadContainer;
