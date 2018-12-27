import * as React from 'react';
import { Redirect } from 'react-router-dom';

import SignUpContainer from './SignUp.container';
import SignUpForm from './SignUpForm';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import AudioLoading from 'shared/loading/AudioLoading';
import BeeLink from 'shared/BeeLink';
import Overlay from 'shared/Overlay';
import Svg from 'shared/Svg';

const SignUp = () => (
  <FirebaseConsumer>
    {({ loading, user }: FirebaseUserProps) => {
      if(loading) {
        return (
          <SignUpContainer>
            <AudioLoading height={64} width={128} />
          </SignUpContainer>
        );
      }

      if (user) {
        return <Redirect to="/" />
      }
      
      return (
        <SignUpContainer className="bee-authentication">
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
          <div className="signup-container">
            <BeeLink className="close" to="/">
              <Svg src="utils/x" />
            </BeeLink>
            <div className="signup-container-header">
              <SignUpForm />
              <p>
                By signing up you agree that you are 18 years of age or older and to the
                <BeeLink
                  href="https://static.beenest.com/legal/Beenest+-+Privacy+Policy.pdf"
                  target="_blank">Privacy Policy
                </BeeLink>
                and
                <BeeLink
                  href="https://static.beenest.com/legal/Beenest+-+Platform+Terms+of+Service.pdf"
                  target="_blank">
                  Terms of Service
                </BeeLink>.
                </p>
                <AppConsumer>
                  {({ screenType }: AppConsumerProps) => {
                    if (screenType > ScreenType.MOBILE) return null;
                    return (
                      <>
                        <div className="bee-flex-div" />
                        <div className="signup-container-footer-mobile">
                          <p>
                            Already have an account?
                            <BeeLink to="/login">
                              Log In Here
                            </BeeLink>
                          </p>
                        </div>
                      </>
                    );
                  }}
                </AppConsumer>
            </div>
            <AppConsumer>
              {({ screenType }: AppConsumerProps) => {
                if (screenType < ScreenType.TABLET) return null;
                return (
                  <div className="authentication-container-footer">
                    <p>
                      Already have an account?
                      <BeeLink to="/login">
                        Log In Here
                      </BeeLink>
                    </p>
                  </div>
                );
              }}
            </AppConsumer>
          </div>
        </SignUpContainer>
      );
    }}
  </FirebaseConsumer>
);

export default SignUp;
