import * as React from 'react';
import OverlayContainer from './Overlay.container';

/**
 * The Overlay component is a flat
 * component that takes the full width and
 * height of its parent container
 *
 * @author kevin
 *
 * Created: July 12, 2018
 **/

type OverlayProps = Partial<{
  children: React.ReactNode;
  className: string;
  color: string;
  /** Takes a function, native onClick */
  onClick: () => void;
  opacity: number;
}>;

const Overlay = (props: OverlayProps): JSX.Element => (
  <OverlayContainer
    {...props}
    className={`bee-overlay ${props.className ? props.className : ''}`.trim()} />
);

/** @component */
export default Overlay;
