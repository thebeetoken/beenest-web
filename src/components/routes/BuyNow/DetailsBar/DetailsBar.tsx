import * as React from 'react';

import BuyNowQuote from '../BuyNowQuote';
import DetailsBarContainer from './DetailsBar.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import { PaymentInfo } from 'networking/listings';
import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import Divider from 'shared/Divider';
import Fab from 'shared/Fab';
import PopUpCard from 'shared/PopUpCard';
import { ToggleProvider, ToggleProviderRef } from 'shared/ToggleProvider';

interface Props {
  paymentInfo: PaymentInfo;
  isDisabled: boolean;
}

const DetailsBar = ({ paymentInfo, isDisabled = false }: Props) => (
  <DetailsBarContainer>
    <div className="bottom-bar">
      <AppConsumer>
        {({ screenType }: AppConsumerProps) => {
          if (screenType > ScreenType.TABLET) {
            return <Divider />;
          } else if (screenType < ScreenType.TABLET) {
            return (
              <ToggleProvider>
                {({ show, toggle }: ToggleProviderRef) => (
                  <>
                    <Fab
                      background="white"
                      className="booking-details"
                      color="secondary"
                      height="72px"
                      iconColor="secondary"
                      icon="decorative/receipt"
                      noFlex={true}
                      onClick={toggle}
                      width="128px">
                      Booking Details
                    </Fab>
                    {show && (
                      <PopUpCard peekHeight={100} showCard={show} toggleCard={toggle}>
                        <BuyNowQuote paymentInfo={paymentInfo} />
                      </PopUpCard>
                    )}
                  </>
                )}
              </ToggleProvider>
            );
          }
          return <></>;
        }}
      </AppConsumer>
      <div className="bottom-bar--content">
        <Button radius="4px" type='submit' disabled={isDisabled}>
          Purchase Package
        </Button>
        <PurchaseInfo />
      </div>
    </div>
  </DetailsBarContainer>
);

export default DetailsBar;

const PurchaseInfo = () => (
  <aside>
    <h6>Important Information:</h6>
    <p>
      By clicking "Purchase Package" you are agreeing to the <BeeLink to='https://static.beenest.com/legal/Beenest+-+Platform+Terms+of+Service.pdf'>Terms & Conditions</BeeLink> and our <BeeLink to='https://static.beenest.com/legal/Beenest+-+Privacy+Policy.pdf'>Privacy Policy</BeeLink>
    </p>
  </aside>
);
