import * as React from 'react';
import { Container, Fade, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

import { BannerConsumerProps } from 'HOCs/BannerProvider';
import LoadingTakeover from 'components/loading/LoadingTakeover';
import { showAccountVerificationBanner } from 'utils/bannerUtility';
import { auth, hasCompletedVerification } from 'utils/firebase';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import {
  CONTAINER_CLASSES,
  CONTENT_CLASSES,
  PRIMARY_BUTTON_CLASSES
} from 'styled/custom.styled';

interface State {
  isSubmitting: boolean;
  hasError: boolean;
  showVerifyEmailSuccess: boolean;
  errorMessage: string;
}

interface Props {
  oobCode: string; //firebase code from email
  bannerDispatch: BannerConsumerProps['bannerDispatch'];
  bannerState: BannerConsumerProps['bannerState'];
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
            if (loading) return <LoadingTakeover />;

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
              showAccountVerificationBanner(hasCompletedVerification(user), this.props.bannerDispatch, this.props.bannerState);
              
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
    if (this.state.isSubmitting) return <LoadingTakeover />;

    return (
      <Fade>
        {this.state.hasError && this.renderError()}
        {this.state.showVerifyEmailSuccess && this.renderVerifyEmailSuccess()}
      </Fade>
    );
  }
}
