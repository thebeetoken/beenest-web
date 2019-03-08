import * as React from 'react';

import GridLoading from 'legacy/shared/loading/GridLoading';
import Portal from 'legacy/shared/Portal';
import { Currency } from 'networking/bookings';
import LoadingPortalContainer from './LoadingPortal.container';

interface Props {
  currency?: Currency | null;
  message?: string;
}

const SUPPORT_EMAIL = 'support@beenest.com';
const ContactSupport = (): JSX.Element => <p>If you have any issues, please contact support at {SUPPORT_EMAIL}.</p>;

export default ({ currency, message }: Props) => (
  <Portal color="white" opacity={.95}>
    <LoadingPortalContainer>
      <GridLoading height={105} width={105} />
      <div className="loading-processing">
        {currency === (Currency.USD || Currency.BTC)
          ?
          <>
            <h2>Processing request...</h2>
            {!!message && <p>{message}</p>}
            <p>Please wait while we process your request.</p>
            <p>This may take up to 30 seconds to complete.</p>
            <ContactSupport />
          </>
          :
          <>
            <h2>Processing transaction...</h2>
            {!!message && <p>{message}</p>}
            <p>Please Confirm this transaction with your wallet (e.g. MetaMask).</p>
            <p>Crypto transactions may take up to 30 seconds to complete.</p>
            <ContactSupport />
          </>
        }
      </div>
    </LoadingPortalContainer>
  </Portal>
);
