/**
 * This script is the React rendering engine.
 *
 *
 * @author @andy, @tommy
 **/

// Core React libraries
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from 'styled/globalStyles';
import ApolloWrapper from 'HOCs/ApolloWrapper';
import { BannerProvider, BannerConsumer, BannerConsumerProps } from 'HOCs/BannerProvider';
import ErrorBoundaryWrapper from 'HOCs/ErrorBoundaryWrapper';
import { FirebaseProvider } from 'HOCs/FirebaseProvider';
import Legacy from 'legacy/Legacy';

// Google Analytics to only work on production
import { AppEnv, APP_ENV } from 'configs/settings';
if (APP_ENV === AppEnv.PRODUCTION) {
  require('autotrack/autotrack.js');
  window.ga('create', 'UA-106852049-2', 'auto');
  window.ga('require', 'autotrack');
  window.ga('send', 'pageview');
}

ReactDOM.render(
  <>
    <ErrorBoundaryWrapper>
      <ApolloWrapper>
        <BannerProvider>
          <BannerConsumer>
            {({ bannerActions, bannerState }: BannerConsumerProps) => {
              const bannerData = {
                bannerActions,
                bannerState
              }
              return (
                <FirebaseProvider {...bannerData}>
                  <BrowserRouter>
                    <Legacy />
                  </BrowserRouter>
                </FirebaseProvider>
              );
            }}
          </BannerConsumer>
        </BannerProvider>
      </ApolloWrapper>
    </ErrorBoundaryWrapper>
    <GlobalStyles />
  </>,
  document.getElementById('root') as HTMLElement
);
