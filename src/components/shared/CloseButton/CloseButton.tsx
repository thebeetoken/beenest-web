import * as React from 'react';

import CloseButtonContainer from './CloseButton.container';

import Svg from 'shared/Svg';
/**
 * This component is a Close
 * Button component.
 *
 * @author all
 * Created: September 12, 2018
 **/

interface Props {
  background?: string;
  className?: string;
  height?: string;
  iconColor?: string;
  onClose?: () => void;
  width?: string;
}

const CloseButton = (props: Props): JSX.Element => (
  <CloseButtonContainer
    className={`bee-close-button ${props.className ? props.className : ''}`.trim()}
    {...props} onClick={props.onClose}>
    <Svg src="utils/x" />
  </CloseButtonContainer>
);

/** @component */
export default CloseButton;
