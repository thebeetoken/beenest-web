import { LocationDescriptor } from 'history';
import * as React from 'react';
import { withRouter } from 'react-router-dom';

import BannerContainer from './Banner.container';
import BeeLink from 'components/shared/BeeLink';
import CloseButton from 'components/shared/CloseButton';

interface Props extends RouterProps {
  background?: string;
  href?: string | null;
  message: string;
  onClose: () => void;
  textColor?: string;
  to?: LocationDescriptor | null;
}

const MOBILE_BUTTON_SIZE = '32px';
const DEFAULT_BUTTON_SIZE = '56px';

const Banner = (props: Props) => {
  return (
    <BannerContainer className="bee-banner" {...props}>
      <div className="bee-banner-content">
        {props.href &&
          <BeeLink
            href={props.href}
            target={props.href ? '_blank' : '_self'}>
            <span>{props.message}</span>
          </BeeLink>
        }

        {props.to &&
          <a onClick={() => props.history.push(`${props.to}`)}>
            <span>{props.message}</span>
          </a>
        }

        {(!props.to && !props.href) &&
          <span>{props.message}</span>
        }
      </div>
      <CloseButton
        className="d-flex d-md-none close"
        height={MOBILE_BUTTON_SIZE}
        iconColor="upper"
        onClose={props.onClose}
        width={MOBILE_BUTTON_SIZE} />
      <CloseButton
        className="d-none d-md-flex close"
        height={DEFAULT_BUTTON_SIZE}
        iconColor="upper"
        onClose={props.onClose}
        width={DEFAULT_BUTTON_SIZE} />
    </BannerContainer>
  );
};

export default withRouter(Banner);
