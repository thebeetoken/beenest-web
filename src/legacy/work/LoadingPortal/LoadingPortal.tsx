import * as React from 'react';

import { Currency } from 'networking/bookings';
import Loading from 'components/shared/loading/Loading';
import { Container, Modal } from 'reactstrap';
import { VIEWPORT_CENTER_LAYOUT } from 'styled/sharedClasses/layout';

interface Props {
  currency?: Currency | null;
  message?: string;
}

const SUPPORT_EMAIL = 'support@beenest.com';
const ContactSupport = (): JSX.Element => <p>If you have any issues, please contact support at {SUPPORT_EMAIL}.</p>;

export default ({ currency, message }: Props) => (
  <Modal isOpen className={VIEWPORT_CENTER_LAYOUT}>
    <Container className="text-center p-6">
      <Loading className="mb-4" height="6rem" width="6rem" />
      {currency === (Currency.USD || Currency.BTC)
        ?
        <>
          <h2>Processing request...</h2>
          {!!message && <p className="mb-0">{message}</p>}
          <p className="mb-0">Please wait while we process your request.</p>
          <p className="mb-0">This may take up to 30 seconds to complete.</p>
          <ContactSupport />
        </>
        :
        <>
          <h2>Processing transaction...</h2>
          {!!message && <p className="mb-0">{message}</p>}
          <p className="mb-0">Please Confirm this transaction with your wallet (e.g. MetaMask).</p>
          <p className="mb-0">Crypto transactions may take up to 30 seconds to complete.</p>
          <ContactSupport />
        </>
      }
    </Container>
  </Modal>
);
