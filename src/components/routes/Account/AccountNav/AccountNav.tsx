import * as React from 'react';

import AccountNavContainer from './AccountNav.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import BeeLink from 'shared/BeeLink';
import Svg from 'shared/Svg';
import TabNav from 'shared/TabNav/TabNav';

interface Props {
  config: TabNavItem[];
}

interface TabNavItem {
  showBadge?: boolean | null;
  src?: string;
  title: string;
  to: string;
}

const AccountNav = ({ config }: Props): JSX.Element => (
  <AccountNavContainer>
    <AppConsumer>
      {({ screenType }: AppConsumerProps) => {
        if (screenType < ScreenType.TABLET) {
          return (
            <>
              {config.map(({ showBadge, src, title, to}: TabNavItem)=> {
                if (showBadge) {
                  return (
                    <div className="verification-needed-container" key={to}>
                      <span className="verification-badge">!</span>
                      <BeeLink to={to} isNav activeClassName="active">
                      {src
                        ? <Svg src={src} />
                        : <span>{title}</span>
                      }
                      </BeeLink>
                    </div>
                  );
                }

                return (
                  <BeeLink to={to} isNav activeClassName="active" key={to}>
                    {src
                      ? <Svg src={src} />
                      : <span>{title}</span>
                    }
                  </BeeLink>
                );
              })}
            </>
          );
        };

        return (
          <TabNav config={config} />
        );
      }}
    </AppConsumer>
  </AccountNavContainer>
);

export default AccountNav;
