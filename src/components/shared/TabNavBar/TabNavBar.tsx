import * as React from 'react';

import TabNavBarContainer from './TabNavBar.container';

import TabNav from 'components/shared/TabNav/TabNav';

interface Props {
  config: TabNavItem[];
}

interface TabNavItem {
  badge?: string;
  src?: string;
  title: string;
  to: string;
}

const TabNavBar = ({ config }: Props): JSX.Element => (
  <TabNavBarContainer>
    {config.map((tabNavItemProps: TabNavItem) => {
      return <TabNav {...tabNavItemProps} key={tabNavItemProps.to} />
    })}
  </TabNavBarContainer>
);

export default TabNavBar;
