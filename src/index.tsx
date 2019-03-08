import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import ApolloWrapper from 'HOCs/ApolloWrapper';
import ErrorBoundaryWrapper from 'HOCs/ErrorBoundaryWrapper';
import { FirebaseProvider } from 'HOCs/FirebaseProvider';

// Google Analytics to only work on production
import { AppEnv, APP_ENV } from 'configs/settings';
if (APP_ENV === AppEnv.PRODUCTION) {
  require('autotrack/autotrack.js');
  window.ga('create', 'UA-106852049-2', 'auto');
  window.ga('require', 'autotrack');
  window.ga('send', 'pageview');
}
import App from './pages';
import '../src/styled/customStyles.scss';

ReactDOM.render(
  <>
    <ErrorBoundaryWrapper>
      <ApolloWrapper>
        <FirebaseProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FirebaseProvider>
      </ApolloWrapper>
    </ErrorBoundaryWrapper>
  </>,
  document.getElementById('root') as HTMLElement
);
