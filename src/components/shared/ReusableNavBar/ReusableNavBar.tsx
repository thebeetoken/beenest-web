import * as React from 'react';

import ReusableNavBarContainer from './ReusableNavBar.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import BeeLink from 'shared/BeeLink';
import Svg from 'shared/Svg';
import TabNav from 'shared/TabNav/TabNav';

interface Props {
  config: TabNavItem[];
}

interface TabNavItem {
  badge?: string;
  src?: string;
  title: string;
  to: string;
}

const ReusableNavBar = ({ config }: Props): JSX.Element => (
  <ReusableNavBarContainer>
    <AppConsumer>
      {({ screenType }: AppConsumerProps) => {
        if (screenType < ScreenType.TABLET) {
          return (
            <>
              {config.map(({ badge, src, title, to}: TabNavItem)=> {
                return (
                  <div className="bee-tab-nav-item--container" key={to}>
                    {!!badge && <span className="alert-badge">{badge}</span>}
                    <BeeLink to={to} isNav activeClassName="active">
                    {src
                      ? <Svg src={src} />
                      : <span>{title}</span>
                    }
                    </BeeLink>
                  </div>
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
  </ReusableNavBarContainer>
);

export default ReusableNavBar;
