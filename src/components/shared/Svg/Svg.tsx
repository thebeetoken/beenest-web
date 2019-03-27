/**
 * This component is a Svg wrapper.
 *
 * @author andy, kevin
 * Created: July 12, 2018
 **/

import * as React from 'react';
import SvgContainer from './Svg.container';

interface SvgProps {
  className?: string;
  /** Takes a function, native onClick */
  onClick?: () => void;
  src: string;
}

const Svg = ({ className, onClick, src }: SvgProps): JSX.Element => {
 return (
  <SvgContainer
      className={`bee-svg ${className ? className : ''}`.trim()}
      dangerouslySetInnerHTML={{
        __html: require(`assets/svg/${src}.svg`),
      }}
      onClick={onClick} />
  );
};

/** @component */
export default Svg;
