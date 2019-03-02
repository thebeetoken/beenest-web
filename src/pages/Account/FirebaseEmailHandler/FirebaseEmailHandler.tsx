import * as React from 'react';
import { Container, Row, Button, Fade } from 'reactstrap';

import { parseQueryString } from 'utils/queryParams';
import EmailVerify from './EmailVerify';
import PasswordReset from './PasswordReset';

interface State {
  renderPasswordReset: boolean;
  renderEmailVerify: boolean;
  oobCode: string;
}

interface QueryParams {
  mode?: string;
  oobCode?: string;
  continueUrl?: string;
  lang?: string;
}

class FirebaseEmailHandler extends React.Component<RouterProps> {
  readonly state: State = {
    renderPasswordReset: false,
    renderEmailVerify: false,
    oobCode: '',
  };

  componentDidMount() {
    const queryParams: QueryParams = parseQueryString(this.props.location.search);
    const { mode, oobCode } = queryParams;

    if (!mode) {
      alert('Error, no mode defined.');
      return;
    }

    if (!oobCode) {
      alert('Error, no oobCode defined.');
      return;
    }

    // @see https://firebase.google.com/docs/auth/custom-email-handler
    switch (mode) {
      case 'resetPassword':
        this.setState({ oobCode, renderPasswordReset: true });
        break;
      case 'verifyEmail':
        this.setState({ oobCode, renderEmailVerify: true });
        break;
      default:
      // Error: invalid mode.
        alert('Error, invalid mode defined.');
    }
  }

  render() {
    return (
      <Container className="bee-without-header-height-container p-0" fluid>
        {this.state.renderEmailVerify 
          ? <EmailVerify oobCode={this.state.oobCode} />
          : this.state.renderPasswordReset
          ? <PasswordReset oobCode={this.state.oobCode} />
          : <ErrorMessage />
      }
      </Container>
    );
  }
}

const ErrorMessage = () => (
  <Container tag={Fade} className="d-flex bee-without-header-height-container flex-column align-items-center justify-content-center">
  <h2 className="font-weight-regular text-center text-lh-sm">Sorry, there was an error</h2>
  <Row>
    <a target="_blank" href="https://support.beenest.com/">
      <Button color="primary" className="btn-primary transition-3d-hover">Contact us for further help.</Button>
    </a>
  </Row>
</Container>
);

export default FirebaseEmailHandler;