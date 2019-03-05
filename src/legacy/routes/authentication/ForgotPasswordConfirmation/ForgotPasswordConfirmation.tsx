import * as React from 'react';

import ForgotPasswordConfirmationContainer from './ForgotPasswordConfirmation.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'legacy/Legacy.context';
import BeeLink from 'legacy/shared/BeeLink';
import Button from 'legacy/shared/Button';
import Overlay from 'legacy/shared/Overlay';
import Svg from 'legacy/shared/Svg';

const ForgotPasswordConfirmation = () => (
  <ForgotPasswordConfirmationContainer className="bee-authentication">
    <AppConsumer>
      {({ screenType }: AppConsumerProps) => {
        if (screenType < ScreenType.TABLET) return null;
        return (
          <Overlay
            className="authentication-background-overlay"
            color="dark"
            opacity={0.7}>
            <div className="auth-background" />
          </Overlay>
        );
      }}
    </AppConsumer>
    <div className="forgot-password-confirmation-container">
      <BeeLink className="close" href="/legacy">
        <Svg src="utils/x" />
      </BeeLink>
      <div className="bee-flex-div" />
      <h1>Forgot Password</h1>
      <p>
        Your request has been successfully sent to the email you provided. Please
        make sure to check your email for confirmation link to change your password.
      </p>
      <BeeLink to="/legacy">
        <Button>
          Finish
        </Button>
      </BeeLink>
      <div className="bee-flex-div" />
    </div>
  </ForgotPasswordConfirmationContainer>
);

export default ForgotPasswordConfirmation;
