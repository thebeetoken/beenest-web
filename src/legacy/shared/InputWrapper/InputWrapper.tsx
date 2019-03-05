import * as React from 'react';

import InputWrapperContainer from './InputWrapper.container';
/**
 * This component is a 
 * customizable Input Wrapper.
 *
 * @author kevin
 * 
 * Created: Aug 23, 2018
 **/

type Props = Partial<{
  align: string;
  box: boolean;
  children: React.ReactNode;
  className: string;
  end: string;
  font: string;
  mobile: boolean;
  placeholderColor: string
  start: string;
  textColor: string;
  validated: string;
}>


const InputWrapper = (props: Props) => {
  const { className, children} = props;

  return (
    <InputWrapperContainer
      className={`bee-input-wrapper ${className || ''}`.trim()} 
      {...props}>
      {children}
    </InputWrapperContainer>
  );
};

/** @component */
export default InputWrapper;