import * as React from 'react';
import { Redirect, RouteProps } from 'react-router-dom';

import LoginContainer from './Login.container';
import LoginForm from './LoginForm';

import { AppConsumer, AppConsumerProps, ScreenType } from 'legacy/Legacy.context';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import AudioLoading from 'legacy/shared/loading/AudioLoading';
import BeeLink from 'legacy/shared/BeeLink';
import Overlay from 'legacy/shared/Overlay';
import Svg from 'legacy/shared/Svg';

const Login = (props: RouteProps) => (
  <FirebaseConsumer>
    {({ loading, user }: FirebaseUserProps) => {
      if(loading) {
        return (
          <LoginContainer>
            <AudioLoading height={64} width={128} />
          </LoginContainer>
        );
      }

      if (user) {
        const state = (props.location && props.location.state) || {};
        const destination = state.referrer || '/legacy';
        return <Redirect to={destination} />
      }
      
      return (
        <LoginContainer className="bee-authentication">
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
          <div className="login-container">
            <BeeLink className="close" to="/legacy">
              <Svg src="utils/x" />
            </BeeLink>
            <LoginForm />
            <AppConsumer>
              {({ screenType }: AppConsumerProps) => {
                if (screenType < ScreenType.TABLET) return null;
                return (
                  <div className="authentication-container-footer">
                    <p>
                      Don't have an account?
                      <BeeLink to="/legacy/signup">
                        Sign Up!
                      </BeeLink>
                    </p>
                  </div>
                );
              }}
            </AppConsumer>
          </div>
        </LoginContainer>
      );
    }}
  </FirebaseConsumer>
);

export default Login;
