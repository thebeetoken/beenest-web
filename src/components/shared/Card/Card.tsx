import * as React from 'react';

import CardContainer from './Card.container';

import CloseButton from 'components/shared/CloseButton';

type Props = Partial<{
  children: React.ReactNode;
  height: string;
  onClose: () => void;
  padding: string;
  width: string;
}>

const Card = (props: Props) => {
  const { children, onClose } = props;
  return (
    <CardContainer {...props}>
      <CloseButton
        height="64px"
        onClose={onClose}
        width="64px" />
      <div className="bee-flex-div" />
      {children}
      <div className="bee-flex-div" />
    </CardContainer>
  );
};

export default Card;