import * as React from 'react';
import { parseQueryString } from 'utils/queryParams';
import GeneralWrapper from 'shared/GeneralWrapper';
import FirebaseEmailHandlerContainer from './FirebaseEmailHandler.container';
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

export default class FirebaseEmailHandler extends React.Component<RouterProps> {
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
      <GeneralWrapper width={976}>
        <FirebaseEmailHandlerContainer>
          <div className="complete">
            {this.state.renderEmailVerify && <EmailVerify oobCode={this.state.oobCode} />}
            {this.state.renderPasswordReset && <PasswordReset oobCode={this.state.oobCode} />}
          </div>
        </FirebaseEmailHandlerContainer>
      </GeneralWrapper>
    );
  }
}
