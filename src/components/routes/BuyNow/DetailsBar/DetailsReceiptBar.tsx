import * as React from 'react';

import DetailsBarContainer from './DetailsBar.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import Divider from 'shared/Divider';

const DetailsReceiptBar = () => (
  <DetailsBarContainer>
    <div className="bottom-bar">
      <AppConsumer>
        {({ screenType }: AppConsumerProps) => screenType > ScreenType.TABLET ? <Divider/> : <></>}
      </AppConsumer>
      <div className="bottom-bar--content">
        <BeeLink to={`/trips`}><Button radius="4px">Finish</Button></BeeLink>
      </div>
    </div>
  </DetailsBarContainer>
);

export default DetailsReceiptBar;
