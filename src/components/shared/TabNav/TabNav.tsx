import * as React from 'react';

import TabNavContainer from './TabNav.container';

import BeeLink from 'components/shared/BeeLink';
import Svg from 'components/shared/Svg';
import { AppConsumer, AppConsumerProps, ScreenType } from 'legacy/Legacy.context';

interface Props {
  badge?: string;
  height?: number;
  src?: string;
  title: string;
  to: string;
  width?: number;
}

const TabNav = (props: Props): JSX.Element => {
  const { badge, src, title, to } = props;
  return (
    <TabNavContainer {...props}>
      {!!badge && <span className="alert-badge">{badge}</span>}
      <BeeLink to={to} isNav activeClassName="active">
        <AppConsumer>
          {({ screenType }: AppConsumerProps) => {
            if (screenType < ScreenType.TABLET) {
              return src ? <Svg src={src} /> : <span>{title}</span>;
            }

            return <span>{title}</span>;
          }}
        </AppConsumer>
      </BeeLink>
    </TabNavContainer>
  );
}

export default TabNav;
