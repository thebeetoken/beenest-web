import * as React from 'react';

import InputLabelContainer from './InputLabel.container';
/**
 * This is a label that pairs
 * with the Input Wrapper
 *
 * @author kevin
 *
 * Created: Aug 30, 2018
 **/

type Props = Partial<{
  children: React.ReactNode;
  className: string;
  htmlFor: string;
  small: boolean;
  subLabel: string;
  textColor: string;
}>;


const InputLabel = (props: Props) => {
  const { className, children, htmlFor, small, subLabel, textColor } = props;

  return (
    <InputLabelContainer
      className={`bee--input-label ${className || ''}`.trim()}
      htmlFor={htmlFor || ''}
      {...{ small, textColor }}>
      {children} {subLabel && <span>{subLabel}</span>}
    </InputLabelContainer>
  );
};

/** @component */
export default InputLabel;
