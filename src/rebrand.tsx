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
import 'bootstrap/dist/css/bootstrap.css';

// Inject Global Styles
import GlobalStyles from 'styled/globalStyles';
import ApolloWrapper from 'HOCs/ApolloWrapper';
import ErrorBoundaryWrapper from 'HOCs/ErrorBoundaryWrapper';
import { FirebaseProvider } from 'HOCs/FirebaseProvider';
import Rebrand from './components/Rebrand';

ReactDOM.render(
  <>
    <ErrorBoundaryWrapper>
      <ApolloWrapper>
        <FirebaseProvider>
          <BrowserRouter>
            <Rebrand />
          </BrowserRouter>
        </FirebaseProvider>
      </ApolloWrapper>
    </ErrorBoundaryWrapper>
    <GlobalStyles />
  </>,
  document.getElementById('root') as HTMLElement
);
