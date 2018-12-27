import * as React from 'react';

import GridLoading from 'shared/loading/GridLoading';
import Portal from 'shared/Portal';

import CryptoLoadingContainer from './CryptoPortal.container';

export default () => (
  <Portal color="white" opacity={.95}>
    <CryptoLoadingContainer>
      <GridLoading height={105} width={105} />
      <div className="crypto-processing">
        <h2>Processing transaction...</h2>
        <p>Please Confirm this transaction with your wallet (e.g. MetaMask).</p>
        <p>Crypto transactions may take up to 30 seconds to complete.</p>
      </div>
    </CryptoLoadingContainer>
  </Portal>
);
