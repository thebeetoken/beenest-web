import * as React from 'react';
import Loading from 'legacy/shared/loading/Loading';
import { auth } from 'utils/firebase';
import { Container, Fade, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import {
  CONTAINER_CLASSES,
  CONTENT_CLASSES,
  PRIMARY_BUTTON_CLASSES
} from 'styled/custom.styled';
import { VIEWPORT_CENTER_LAYOUT } from 'styled/sharedClasses/layout';

interface State {
  isSubmitting: boolean;
  hasError: boolean;
  showVerifyEmailSuccess: boolean;
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
  };

  componentDidMount() {
    const oobCode = this.props.oobCode;

    if (!oobCode) {
      alert('Error, no oobCode defined.');
    }

    this.handleVerifyEmail(oobCode);
  }

  handleVerifyEmail(oobCode: string) {
    auth
      .applyActionCode(oobCode)
      .then(() => {
        this.setState({
          showVerifyEmailSuccess: true,
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          hasError: true,
          errorMessage: 'There was an error verifying your email.',
        });
      })
      .finally(() => this.setState({ isSubmitting: false }));
  }

  renderError() {
    return (
      <Container tag={Fade} className={CONTAINER_CLASSES}>
        <h2 className={CONTENT_CLASSES.TITLE}>Sorry, there was an error</h2>
        <p className={CONTENT_CLASSES.SUBTITLE}>{this.state.errorMessage}</p>
        <Row>
          <a target="_blank" href="https://support.beenest.com/" className={PRIMARY_BUTTON_CLASSES}>
            Contact us for further help
          </a>
        </Row>
      </Container>
    );
  }

  renderVerifyEmailSuccess() {
    return (
      <>
        <FirebaseConsumer>
          {({ loading, user, completedVerification }: FirebaseUserProps) => {
            if (loading) {
              return (
                <Container tag={Fade} className={VIEWPORT_CENTER_LAYOUT}>
                  <Loading height="8rem" width="8rem" />
                </Container>
              );
            }

            if (user && !completedVerification) {
              return (
                <Container tag={Fade} className={CONTAINER_CLASSES}>
                  <h2 className={CONTENT_CLASSES.TITLE}>Thank you</h2>
                  <p className={CONTENT_CLASSES.SUBTITLE}>
                    Finish your account verification by confirming your phone number to book a rental.
                  </p>
                  <Link to="/account/verification" className={PRIMARY_BUTTON_CLASSES}>
                    Verify Here
                  </Link>
                </Container>
              );
            }

            if (user && !!completedVerification) {
              return (
                <Container tag={Fade} className={CONTAINER_CLASSES}>
                  <h2 className={CONTENT_CLASSES.TITLE}>Thank you</h2>
                  <p className={CONTENT_CLASSES.SUBTITLE}>
                    You can now
                  </p>
                  <a href="/host/listings" className={PRIMARY_BUTTON_CLASSES}>
                    List your home to rent
                  </a>
                  <p className={`${CONTENT_CLASSES.SUBTITLE} my-3`}>
                    or
                  </p>
                  <Link to="/" className={PRIMARY_BUTTON_CLASSES}>
                    Find a place to stay at
                  </Link>
                </Container>
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
      return (
        <Container tag={Fade} className={VIEWPORT_CENTER_LAYOUT}>
          <Loading height="8rem" width="8rem" />
        </Container>
      );
    }

    return (
      <Fade>
        {this.state.hasError && this.renderError()}
        {this.state.showVerifyEmailSuccess && this.renderVerifyEmailSuccess()}
      </Fade>
    );
  }
}
