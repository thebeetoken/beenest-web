import * as React from 'react';

import FixedBottomBarContainer from './FixedBottomBar.container';

/**
 * The Fixed Bottom Bar component is component
 * which enables the pop-up card functionality
 * designed for mobile/tablet
 *
 * @author jeremy
 **/

interface Props {
  background?: string;
  children: React.ReactNode;
}

const FixedBottomBar = ({background, children}: Props) => 
  <FixedBottomBarContainer background={background}>
    {children}
  </FixedBottomBarContainer>
;
 
export default FixedBottomBar;
