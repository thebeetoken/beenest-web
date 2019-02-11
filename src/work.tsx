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
import 'styled/theme/theme.scss';

// Inject Global Styles
import GlobalStyles from 'styled/globalStyles';
import ApolloWrapper from 'HOCs/ApolloWrapper';
import ErrorBoundaryWrapper from 'HOCs/ErrorBoundaryWrapper';
import { FirebaseProvider } from 'HOCs/FirebaseProvider';
import Work from './pages';

ReactDOM.render(
  <>
    <ErrorBoundaryWrapper>
      <ApolloWrapper>
        <FirebaseProvider>
          <BrowserRouter>
            <Work />
          </BrowserRouter>
        </FirebaseProvider>
      </ApolloWrapper>
    </ErrorBoundaryWrapper>
    <GlobalStyles />
  </>,
  document.getElementById('root') as HTMLElement
);
