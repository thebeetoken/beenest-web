import * as React from 'react';

import AlertCardContainer from './AlertCard.container';
import Card from 'shared/Card';
import Svg from 'shared/Svg';
import Button from 'shared/Button';

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
    <Card
      height="208px"
      onClose={onClose}
      padding="32px 32px 30px 24px"
      width="620px">
      <AlertCardContainer srcColor={srcColor}>
        <div className="alert-card--header">
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
      </AlertCardContainer>
    </Card>
  );
};

export default AlertCard;