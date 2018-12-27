/**
 * This HOC captures and reports errors to Sentry.
 *
 * @author tommy
 *
 */

import * as React from 'react';
import Raven from 'raven-js';

import { AppEnv, APP_ENV, SETTINGS } from 'configs/settings';
const { SENTRY_CLIENT_DSN } = SETTINGS;

if (APP_ENV !== AppEnv.DEVELOPMENT) {
  Raven.config(SENTRY_CLIENT_DSN, {
    environment: APP_ENV,
  }).install();
}

interface Props {
  onError?: (error: Error) => void;
}

interface State {
  error: Error | undefined;
}

class ErrorBoundaryWrapper extends React.Component<Props, State> {
  readonly state = { error: undefined };

  componentDidCatch(error: Error, info: object) {
    this.setState({
      error: error || new Error('Internal Error'),
    });
    if (this.props.onError) {
      this.props.onError(error);
    }
    if (APP_ENV !== AppEnv.DEVELOPMENT) {
      Raven.captureException(error, { extra: info });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>We're sorry — something's gone wrong.</h2>
          <p>Our team has been notified and the problem will be fixed.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWrapper;
