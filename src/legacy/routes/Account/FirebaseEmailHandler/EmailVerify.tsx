import * as React from 'react';
import AudioLoading from 'legacy/shared/loading/AudioLoading';
import { auth } from 'utils/firebase';
import Button from 'legacy/shared/Button';
import BeeLink from 'legacy/shared/BeeLink';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';

interface State {
  isSubmitting: boolean;
  hasError: boolean;
  showVerifyEmailSuccess: boolean;
  successMessage: string;
  errorMessage: string;
}

interface Props {
  oobCode: string; //firebase code from email
}

export default class EmailVerify extends React.Component<Props> {
  readonly state: State = {
    isSubmitting: true,
    hasError: false,
    showVerifyEmailSuccess: false,
    errorMessage: '',
    successMessage: '',
  };

  componentDidMount() {
    const oobCode = this.props.oobCode;

    if (!oobCode) {
      alert('Error, no oobCode defined.');
      return;
    }

    this.handleVerifyEmail(oobCode);
  }

  handleVerifyEmail(oobCode: string) {
    auth
      .applyActionCode(oobCode)
      .then(() => {
        this.setState({
          isSubmitting: false,
          showVerifyEmailSuccess: true,
          successMessage: 'Thanks for verifying your email.',
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          isSubmitting: false,
          hasError: true,
          errorMessage: 'There was an error verifying your email.',
        });
      });
  }

  renderError() {
    return (
      <>
        <h2>Sorry, there was an error.</h2>
        <p>{this.state.errorMessage}</p>
        <p>
          <BeeLink target="_blank" href="https://support.beenest.com/">
            <Button>Contact us for further help.</Button>
          </BeeLink>
        </p>
      </>
    );
  }

  renderVerifyEmailSuccess() {
    return (
      <>
        <h2>{this.state.successMessage}</h2>

        <FirebaseConsumer>
          {({ loading, user, completedVerification }: FirebaseUserProps) => {
            if (loading) {
              return <AudioLoading height={48} width={96} />;
            }

            if (user && !completedVerification) {
              return (
                <section>
                  <BeeLink href="/legacy/account/verification">
                    <Button>Verify your phone number to book a rental</Button>
                  </BeeLink>
                </section>
              );
            }

            if (user && !!completedVerification) {
              return (
                <section>
                  <BeeLink to="/legacy/host/listings">
                    <Button>List your home for rent</Button>
                  </BeeLink>
                  or
                  <BeeLink to="/legacy">
                    <Button border="black" background="white">
                      Find a place to stay at
                    </Button>
                  </BeeLink>
                </section>
              );
            }

            return <></>;
          }}
        </FirebaseConsumer>
      </>
    );
  }

  render() {
    if (this.state.isSubmitting) {
      return <AudioLoading height={48} width={96} />;
    }

    return (
      <>
        {this.state.hasError && this.renderError()}
        {this.state.showVerifyEmailSuccess && this.renderVerifyEmailSuccess()}
      </>
    );
  }
}
