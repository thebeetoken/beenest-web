import * as React from 'react';

import AlertCardContainer from './AlertCard.container';
import Card from 'legacy/shared/Card';
import Svg from 'legacy/shared/Svg';
import Button from 'legacy/shared/Button';

type Props = Partial<{
  buttonBackgroundColor: string;
  cta: string;
  ctaColor: string;
  message: string;
  onClose: () => void;
  src: string;
  srcColor: string;
  title: string;
}>

const AlertCard = ({ buttonBackgroundColor, cta, ctaColor, message, onClose, src, srcColor, title }: Props) => {
  return (
    <AlertCardContainer srcColor={srcColor}>
      <Card onClose={onClose}>
        <div className="alert-card--content">
          <div className="alert-card--title">
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
      </Card>
    </AlertCardContainer>
  );
};

export default AlertCard;