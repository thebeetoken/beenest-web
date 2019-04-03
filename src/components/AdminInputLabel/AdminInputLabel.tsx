import * as React from 'react';

import AdminInputLabelContainer from './AdminInputLabel.container';
/**
 * This is a label that pairs
 * with the Admin Input Wrapper
 *
 * @author kevin
 *
 * Created: Aug 27, 2018
 **/

type Props = Partial<{
  children: React.ReactNode;
  className: string;
  htmlFor: string;
  subLabel: string;
}>;


const AdminInputLabel = (props: Props) => {
  const { className, children, htmlFor, subLabel } = props;

  return (
    <AdminInputLabelContainer
      className={`bee-admin-input-label ${className || ''}`.trim()}
      htmlFor={htmlFor || ''}>
      {children} {subLabel && <span>{subLabel}</span>}
    </AdminInputLabelContainer>
  );
};

/** @component */
export default AdminInputLabel;
