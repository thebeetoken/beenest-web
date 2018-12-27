import * as React from 'react';
import { Query } from 'react-apollo';

import AccountNavContainer from './AccountNav.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import { GET_USER } from 'networking/users';
import BeeLink from 'shared/BeeLink';
import Svg from 'shared/Svg';
import TabNav from 'shared/TabNav/TabNav';

const tabNavConfig = [
  {
    title: 'General Info',
    to: '/account/general',
  },
  {
    title: 'Payment',
    to: '/account/payment',
  },
  {
    title: 'Security',
    to: '/account/security',
  },
]

const AccountNav = (): JSX.Element => (
  <AccountNavContainer>
    <AppConsumer>
      {({ screenType }: AppConsumerProps) => {
        if (screenType < ScreenType.TABLET) {
          return (
            <>
              <BeeLink to="/account/general" isNav activeClassName="active">
                <Svg src="decorative/profile" />
              </BeeLink>
              <BeeLink to="/account/payment" isNav activeClassName="active">
                <Svg src="decorative/card" />
              </BeeLink>
              <BeeLink to="/account/security" isNav activeClassName="active">
                <Svg src="decorative/lock" />
              </BeeLink>
              <Query query={GET_USER}>
              {({ data }) => {
                  if (data.user && !data.user.completedVerification) {
                    return (
                      <div className="verification-needed-container">
                        <span className="verification-badge">!</span>
                        <BeeLink to="/account/verification" isNav activeClassName="active">
                          <Svg src="utils/check-circle" />
                        </BeeLink>
                      </div>
                    );
                  }
          
                  return (
                    <BeeLink to="/account/verification" isNav activeClassName="active">
                      <Svg src="utils/check-circle" />
                    </BeeLink>
                  );
                }}
              </Query>
            </>
          );
        };

        return (
          <>
            <TabNav config={tabNavConfig} height={48} />
            <Query query={GET_USER}>
            {({ data }) => {
                if (data.user && !data.user.completedVerification) {
                  return (
                    <div className="verification-needed-container">
                      <span className="verification-badge">!</span>
                      <BeeLink to="/account/verification" isNav activeClassName="active">
                        Verification
                      </BeeLink>
                    </div>
                  );
                }
        
                return (
                  <BeeLink to="/account/verification" isNav activeClassName="active">
                    Verification
                  </BeeLink>
                );
              }}
            </Query>
          </>
        );
      }}
    </AppConsumer>
  </AccountNavContainer>
);

export default AccountNav;
