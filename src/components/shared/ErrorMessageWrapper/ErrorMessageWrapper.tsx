import * as React from 'react';

import ErrorMessageWrapperContainer from './ErrorMessageWrapper.container';
/**
 * This component is a 
 * customizable Error Message Wrapper.
 *
 * @author jeremy
 * 
 * Created: Jan 7, 2019
 **/

type Props = Partial<{
  children: React.ReactNode;
  className: string;
}>


const ErrorMessageWrapper = (props: Props) => {
  const { className, children} = props;

  return (
    <ErrorMessageWrapperContainer
      className={`bee-error-message-wrapper ${className || ''}`.trim()} 
      {...props}>
      {children}
    </ErrorMessageWrapperContainer>
  );
};

/** @component */
export default ErrorMessageWrapper;