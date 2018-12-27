import * as React from 'react';

import CardContainer from './Card.container';

import Button from 'shared/Button';
import Svg from 'shared/Svg';

type Props = Partial<{
  buttonBackgroundColor: string;
  cta: string;
  ctaColor: string;
  message: string;
  onClose: () => void
  src: string;
  srcColor: string;
  title: string;
}>

const Card = (props: Props) => {
  const { buttonBackgroundColor, cta, ctaColor, message, onClose, src, srcColor, title } = props;
  return (
    <CardContainer {...{srcColor}}>
      <div className="card-container">
        <div className="close" onClick={onClose}>
          <Svg src="utils/x" />
        </div>
        <div className="complete-card-content">
          <div className="icon-container">
            <Svg src={src || 'utils/check-circle'} />
            {!!title && <h1>{title}</h1>}
          </div>
          {!!message && <p>{message}</p>}
          <div className="bee-flex-div" />
          {!!cta &&
            <Button
              background={buttonBackgroundColor || 'style'}
              onClick={onClose}
              color={ctaColor || 'body'}>
              {cta}
            </Button>
          }
        </div>
      </div>
    </CardContainer>
  );
};

export default Card;