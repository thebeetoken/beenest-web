import * as React from 'react';

import TabNavContainer from './TabNav.container';

import BeeLink from 'shared/BeeLink';

interface Props {
  config: Config[],
  height?: number;
  width?: number;
}

interface Config {
  badge?: string | boolean;
  title: string;
  to: string;
}

const TabNav = (props: Props): JSX.Element => {
  const renderTabNavItems = props.config.map(({ badge, title, to }: Config) => {
    return (
      <div className="bee-tab-nav-item--container">
        {!!badge && <span className="verification-badge">{badge}</span>}
        <div className="bee-tab-nav--item" key={title}>
          <BeeLink isNav to={to}>
            {title}
          </BeeLink>
        </div>
      </div>
    );
  });

  return (
    <TabNavContainer {...props}>
      {renderTabNavItems}
    </TabNavContainer>
  );
}

export default TabNav;
