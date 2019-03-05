import * as React from 'react';

import ForgotPasswordContainer from './ForgotPassword.container';
import ForgotPasswordForm from './ForgotPasswordForm';

import { AppConsumer, AppConsumerProps, ScreenType } from 'legacy/Legacy.context';
import BeeLink from 'legacy/shared/BeeLink';
import Overlay from 'legacy/shared/Overlay';
import Svg from 'legacy/shared/Svg';

const ForgotPassword = () => (
  <ForgotPasswordContainer className="bee-authentication">
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
    <div className="forgot-password-container">
      <BeeLink className="close" href="/legacy">
        <Svg src="utils/x" />
      </BeeLink>
      <div className="bee-flex-div" />
      <h1>Forgot Password</h1>
      <h2>Request password change.</h2>
      <ForgotPasswordForm />
      <div className="bee-flex-div" />
    </div>
  </ForgotPasswordContainer>
);

export default ForgotPassword;
