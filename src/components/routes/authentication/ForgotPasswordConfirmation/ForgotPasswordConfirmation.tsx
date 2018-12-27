import * as React from 'react';

import ForgotPasswordConfirmationContainer from './ForgotPasswordConfirmation.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import Overlay from 'shared/Overlay';
import Svg from 'shared/Svg';

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
      <BeeLink className="close" href="/">
        <Svg src="utils/x" />
      </BeeLink>
      <div className="bee-flex-div" />
      <h1>Forgot Password</h1>
      <p>
        Your request has been successfully sent to the email you provided. Please
        make sure to check your email for confirmation link to change your password.
      </p>
      <BeeLink to="/">
        <Button>
          Finish
        </Button>
      </BeeLink>
      <div className="bee-flex-div" />
    </div>
  </ForgotPasswordConfirmationContainer>
);

export default ForgotPasswordConfirmation;
