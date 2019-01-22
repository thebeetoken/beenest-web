import * as React from 'react';
import { parseQueryString } from 'utils/queryParams';
import AudioLoading from 'shared/loading/AudioLoading';
import { verifyEmail } from 'utils/firebase';
import Button from 'shared/Button';
import BeeLink from 'shared/BeeLink';
import GeneralWrapper from 'shared/GeneralWrapper';

interface State {
  isSubmitting: boolean;
  hasError: boolean;
  errorMessage: string;
}

interface QueryParams {
  mode?: string;
  actionCode?: string;
  continueUrl?: string;
  lang?: string;
}

export class FirebaseAccountEmailHandler extends React.Component<RouterProps> {
  readonly state: State = {
    isSubmitting: true,
    hasError: false,
    errorMessage: ''
  };

  componentDidMount() {
    const queryParams: QueryParams = parseQueryString(this.props.location.search);
    const { mode, actionCode } = queryParams;
    if (!mode) {
      alert('Error, no mode defined.');
      return;
    }

    if (!actionCode) {
      alert('Error, no actionCode defined.');
      return;
    }

    if (mode === 'verifyEmail') {
      verifyEmail(actionCode).then(() => {
        this.setState({ isSubmitting: false });
      }).catch(err => {
        console.error(err);
        this.setState({ isSubmitting: false, hasError: true });
      });
    }
  }

  render() {
    if (this.state.isSubmitting) {
      return <AudioLoading />;
    }

    const { hasError } = this.state;
    const renderBody = hasError ?
          <>
            <h1 >There was an error verifying your email.</h1>
            <p>{this.state.errorMessage}</p>
            <p>
              <BeeLink href="mailto:support@beenest.com">
                <Button>Contact us for further help.</Button>
              </BeeLink>
            </p>
          </>
          :
          <>
            <h1>You verified your email.</h1>

            <h2>Next Steps:</h2>
            <p>Thanks for verifying your email.</p>

            <BeeLink to="/host/listings">
              <Button>List your home for rent</Button>
            </BeeLink>
            or
            <BeeLink to="/">
              <Button>Book a rental</Button>
            </BeeLink>
          </>;

    return (
        <GeneralWrapper width={976}>
          <div className="complete">
            {renderBody}
          </div>
        </GeneralWrapper>
    );
  }
};
