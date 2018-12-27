import * as React from 'react';

import SelectBoxWrapperContainer from './SelectBoxWrapper.container';
/**
 * This component is a 
 * customizable SelectBox Wrapper.
 *
 * @author kevin
 * 
 * Created: Oct 25, 2018
 **/

type Props = Partial<{
  background: string;
  box: boolean;
  children: React.ReactNode;
  className: string;
  end: string;
  font: string;
  mobile: boolean;
  noFlex: boolean;
  placeholderColor: string;
  prefixColor: string;
  prefixSize: string;
  start: string;
  suffixColor: string;
  suffixSize: string;
  textAlign: string;
  textColor: string;
  textTransform?: string;
}>


const SelectBoxWrapper = (props: Props) => {
  const { className, children } = props;

  return (
    <SelectBoxWrapperContainer
      className={`bee-select-box-wrapper ${className || ''}`.trim()} 
      {...props}>
      {children}
    </SelectBoxWrapperContainer>
  );
};

/** @component */
export default SelectBoxWrapper;