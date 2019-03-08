import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, withRouter } from 'react-router-dom';

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

class ScrollToTop extends React.Component<RouterProps, {}> {
  componentDidUpdate(prevProps: RouterProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const ScrollToTopWithRouter = withRouter(ScrollToTop);

ReactDOM.render(
  <>
    <ErrorBoundaryWrapper>
      <ApolloWrapper>
        <FirebaseProvider>
          <BrowserRouter>
            <ScrollToTopWithRouter>
              <App />
            </ScrollToTopWithRouter>
          </BrowserRouter>
        </FirebaseProvider>
      </ApolloWrapper>
    </ErrorBoundaryWrapper>
  </>,
  document.getElementById('root') as HTMLElement
);
