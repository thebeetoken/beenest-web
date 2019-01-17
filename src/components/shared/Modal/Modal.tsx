import * as React from 'react';

import ModalContainer from './Modal.container';
import CloseButton from 'components/shared/CloseButton';

type Props = Partial<{
  children: React.ReactNode;
  height?: string;
  width?: string;
  onClose: () => void;
}>

const Modal = (props: Props) => {
  const { children, onClose } = props;
  return (
    <ModalContainer className="bee-modal" {...props}>
      {children}
      <CloseButton
        height="64px"
        onClose={onClose}
        width="64px" />
    </ModalContainer>
  );
};

export default Modal;