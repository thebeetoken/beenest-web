import * as React from 'react';
import { Container, Fade } from 'reactstrap';
import { VIEWPORT_CENTER_LAYOUT } from 'styled/sharedClasses/layout';

import Loading from '../Loading';

const LoadingTakeover = () => (
  <Container tag={Fade} className={VIEWPORT_CENTER_LAYOUT}>
    <Loading height="8rem" width="8rem" />
  </Container>
);

export default LoadingTakeover;