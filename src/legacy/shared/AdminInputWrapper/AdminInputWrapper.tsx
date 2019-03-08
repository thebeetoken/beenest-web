import * as React from 'react';

import AdminInputWrapperContainer from './AdminInputWrapper.container';
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
  placeholderColor: string
  start: string;
  textColor: string;
  validated: string;
}>


const AdminInputWrapper = (props: Props) => {
  const { className, children} = props;

  return (
    <AdminInputWrapperContainer
      className={`bee-admin-input-wrapper ${className || ''}`.trim()} 
      {...props}>
      {children}
    </AdminInputWrapperContainer>
  );
};

/** @component */
export default AdminInputWrapper;