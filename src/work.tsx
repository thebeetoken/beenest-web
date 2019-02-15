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

// Inject Global Styles
import ApolloWrapper from 'HOCs/ApolloWrapper';
import ErrorBoundaryWrapper from 'HOCs/ErrorBoundaryWrapper';
import { FirebaseProvider } from 'HOCs/FirebaseProvider';
import Work from './pages';
import '../src/styled/customStyles.scss';

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
  </>,
  document.getElementById('root') as HTMLElement
);
