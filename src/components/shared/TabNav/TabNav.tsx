import * as React from 'react';

import TabNavContainer from './TabNav.container';

import BeeLink from 'shared/BeeLink';

interface Props {
  config: Config[],
  height?: number;
  width?: number;
}

interface Config {
  showBadge?: boolean | null;
  title: string;
  to: string;
}


const TabNav = (props: Props): JSX.Element => {
  const renderTabNavItems = props.config.map(({ showBadge, title, to }: Config) => {
    if (showBadge) {
      return (
        <div className="verification-needed-container">
          <span className="verification-badge">!</span>
          <div className="bee-tab-nav--item" key={title}>
            <BeeLink isNav to={to}>
              {title}
            </BeeLink>
          </div>
        </div>
      );
    }

    return (
      <div className="bee-tab-nav--item" key={title}>
        <BeeLink isNav to={to}>
          {title}
        </BeeLink>
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
