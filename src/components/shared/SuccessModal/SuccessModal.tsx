import * as React from 'react';

import SuccessModalContainer from './SuccessModal.container';
import Modal from 'shared/Modal';
import Svg from 'shared/Svg';
import Button from 'shared/Button';

type Props = Partial<{
  children: React.ReactNode;
  onClose: () => void;
}>

const SuccessModal = ({ children, onClose }: Props) => {
  return (
    <SuccessModalContainer>
      <Modal onClose={onClose}>
        <div className="success-modal--header">
          <Svg src="utils/check-circle" />
          <span>Success!</span>
        </div>
        <div className="success-modal--content">
          {children}
        </div>
        <Button
          color="brand"
          radius="4px"
          onClick={onClose}>
          OK
        </Button>
      </Modal>
    </SuccessModalContainer>
  );
};

export default SuccessModal;