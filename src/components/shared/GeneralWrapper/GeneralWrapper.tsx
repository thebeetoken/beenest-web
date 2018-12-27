import * as React from 'react';

import GeneralWrapperContainer from './GeneralWrapper.container';

type Props = Partial<{
  align: string;
  children: React.ReactNode;
  className: string;
  direction: string;
  justify: string;
  width: number | string;
}>

const GeneralWrapper = (props: Props) => (
  <GeneralWrapperContainer
    className={`bee-general-wrapper ${props.className || ''}`.trim()}
    {...props}>
    {props.children}
  </GeneralWrapperContainer>
);

export default GeneralWrapper;