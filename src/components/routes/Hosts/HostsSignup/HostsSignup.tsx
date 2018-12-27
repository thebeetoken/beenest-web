import * as React from 'react';

import HostsSignupContainer from './HostsSignup.container';
import SignUpForm from './HostsSignupForm';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import AudioLoading from 'shared/loading/AudioLoading';
import BeeLink from 'shared/BeeLink';

export const HostsSignup = () => (
  <FirebaseConsumer>
    {({ loading }: FirebaseUserProps) => {
      if(loading) {
        return (
          <HostsSignupContainer>
            <AudioLoading height={64} width={128} />
          </HostsSignupContainer>
        );
      }
      
      return (
        <HostsSignupContainer className="bee-authentication">
          <div className="signup-container">
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
        </HostsSignupContainer>
      );
    }}
  </FirebaseConsumer>
);
