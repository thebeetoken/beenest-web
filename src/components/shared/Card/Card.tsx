import * as React from 'react';

import CardContainer from './Card.container';

import CloseButton from 'components/shared/CloseButton';

type Props = Partial<{
  children: React.ReactNode;
  className: string;
  height: string;
  onClose: () => void;
  padding: string;
  width: string;
}>

const Card = (props: Props) => {
  const { children, onClose } = props;
  return (
    <CardContainer className={`bee-card ${props.className || ''}`.trim()} {...props}>
      <CloseButton
        height="64px"
        onClose={onClose}
        width="64px" />
      {children}
    </CardContainer>
  );
};

export default Card;