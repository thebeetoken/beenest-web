import * as React from 'react';
import Loading from 'shared/loading/Loading';
import { auth } from 'utils/firebase';
import { Button, Container, Fade, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import { VIEWPORT_CENTER_LAYOUT } from 'styled/sharedClasses/layout';

import {
  FIREBASE_EMAIL_HANDLER_BUTTON,
  FIREBASE_EMAIL_HANDLER_CONTAINER_CLASSES,
  FIREBASE_EMAIL_HANDLER_TITLE_CLASSES,
  FIREBASE_EMAIL_HANDLER_SUBTITLE_CLASSES,
} from './firebaseEmailHandler.styled';

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
    }

    this.handleVerifyEmail(oobCode);
  }

  handleVerifyEmail(oobCode: string) {
    auth
      .applyActionCode(oobCode)
      .then(() => {
        this.setState({
          showVerifyEmailSuccess: true,
          successMessage: 'Thanks for verifying your email.',
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
      <Container tag={Fade} className={FIREBASE_EMAIL_HANDLER_CONTAINER_CLASSES}>
        <h2 className={FIREBASE_EMAIL_HANDLER_TITLE_CLASSES}>Sorry, there was an error</h2>
        <p className={FIREBASE_EMAIL_HANDLER_SUBTITLE_CLASSES}>{this.state.errorMessage}</p>
        <Row>
          <a target="_blank" href="https://support.beenest.com/">
            <Button color="primary" className={FIREBASE_EMAIL_HANDLER_BUTTON}>Contact us for further help.</Button>
          </a>
        </Row>
      </Container>
    );
  }

  renderVerifyEmailSuccess() {
    return (
      <>
        <h2>{this.state.successMessage}</h2>

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
                <Container tag={Fade} className={FIREBASE_EMAIL_HANDLER_CONTAINER_CLASSES}>
                  <h2 className={FIREBASE_EMAIL_HANDLER_TITLE_CLASSES}>Thank you</h2>
                  <p className={FIREBASE_EMAIL_HANDLER_SUBTITLE_CLASSES}>
                    Finish your account verification by confirming your phone number to book a rental.
                  </p>
                  <Link to="/work/account/verification">
                    <Button color="primary" className={FIREBASE_EMAIL_HANDLER_BUTTON}>Verify Here</Button>
                  </Link>
                </Container>
              );
            }

            if (user && !!completedVerification) {
              return (
                <Container tag={Fade} className={FIREBASE_EMAIL_HANDLER_CONTAINER_CLASSES}>
                  <h2 className={FIREBASE_EMAIL_HANDLER_TITLE_CLASSES}>Thank you</h2>
                  <p className={FIREBASE_EMAIL_HANDLER_SUBTITLE_CLASSES}>
                    You can now
                  </p>
                  <a href="/host/listings">
                    <Button color="primary" className={FIREBASE_EMAIL_HANDLER_BUTTON}>List your home to rent</Button>
                  </a>
                  <p className={`${FIREBASE_EMAIL_HANDLER_SUBTITLE_CLASSES} my-3`}>
                    or
                  </p>
                  <Link to="/work">
                    <Button color="primary" className={FIREBASE_EMAIL_HANDLER_BUTTON}>Find a place to stay at</Button>
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
