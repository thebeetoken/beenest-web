import * as React from 'react';
import { compose, graphql } from 'react-apollo';

import AccountVerificationContainer from './AccountVerification.container';
import AccountVerificationPhoneCard from './AccountVerificationPhoneCard';

import { BannerContext } from 'HOCs/BannerProvider';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import { GET_USER, REFRESH_VERIFICATION_STATUS } from 'networking/users';
import ListButton from 'shared/ListButton';
import Snackbar from 'shared/Snackbar';
import { SnackbarState } from 'shared/Snackbar/types';
import Portal from 'shared/Portal';
import {
  ErrorMessage,
  getDisplayErrorMessage,
  getDisplaySuccessMessage,
  SuccessMessage,
} from 'utils/validators';
import { showAccountVerificationBanner } from 'utils/bannerUtility';
import {
  auth,
  facebookProvider,
  FirebaseUser,
} from 'utils/firebase';

interface Props {
  refreshVerificationStatus: () => Promise<any>;
}

interface State {
  showModal: boolean;
  snackbar: SnackbarState;
  submitStatus: SubmitStatus;
  verificationSnackbar: SnackbarState;
}

enum SubmitStatus {
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  PRISTINE = 'PRISTINE',
  SUCCESS = 'SUCCESS',
}

const VERIFICATION_STATUS = {
  NOT_VERIFIED: '(Not Verified)',
  VERIFIED: '(Verified)',
};

const SNACKBAR_DURATION_MS = 5000;
const EMAIL_SNACKBAR_DURATION_MS = 60000;

const VERIFICATION_MESSAGE = {
  EMAIL: {
    VERIFIED: 'Your email has been verified',
    VERIFY: 'Click here to verify your email address',
  },
  FACEBOOK: {
    LINK: 'Click here to link your Facebook account.',
    VERIFIED: 'Your Facebook has been verified',
  },
  LOADING: 'Loading',
  PHONE: {
    ADD: 'Click here to add and verify your phone number',
    CHANGE: 'Click here to change and verify your phone number',
  },
};

class AccountVerification extends React.Component<Props, State> {
  static contextType = BannerContext;
  readonly state = {
    showModal: false,
    snackbar: {
      autoHideDuration: SNACKBAR_DURATION_MS,
      message: '',
      open: false,
    },
    submitStatus: SubmitStatus.PRISTINE,
    verificationSnackbar: {
      autoHideDuration: SNACKBAR_DURATION_MS,
      message: getDisplayErrorMessage(ErrorMessage.GENERIC),
      open: false,
    },
  };
  
  componentDidMount() {
    const { bannerActions, bannerState } = this.context;
    this.props.refreshVerificationStatus()
      .then((result) => {
        showAccountVerificationBanner(result.data.refreshVerificationStatus.completedVerification, bannerActions, bannerState);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }

  componentWillUnmount() {
    const { snackbar, verificationSnackbar } = this.state;
    this.setState({ 
      showModal: false,
      snackbar: {
        ...snackbar,
        open: false,
      },
      verificationSnackbar: {
        ...verificationSnackbar,
        open: false,
      }
    });
  }


  render() {
    return (
      <AccountVerificationContainer>
        <FirebaseConsumer>
          {({ user }: FirebaseUserProps) => {
            const { showModal, snackbar, submitStatus, verificationSnackbar } = this.state;
            const { EMAIL, FACEBOOK, PHONE } = VERIFICATION_MESSAGE;
            if (user && (submitStatus !== SubmitStatus.LOADING)) {
              const { emailVerified } = user;
              const phoneVerified = (user.providerData || []).some((provider: FirebaseUser) => provider && provider.providerId === 'phone');
              const facebookVerified = (user.providerData || []).some((provider: FirebaseUser) => provider && provider.providerId === 'facebook.com');

              return (
                <>
                  <ListButton
                    label="Phone (Required)"
                    onClick={this.handlePhoneVerification}
                    src="decorative/mobile"
                    subLabel={phoneVerified ? VERIFICATION_STATUS.VERIFIED : VERIFICATION_STATUS.NOT_VERIFIED}
                    verified={phoneVerified}>
                    {phoneVerified ? PHONE.CHANGE : PHONE.ADD}
                  </ListButton>

                  {showModal && 
                    <Portal color="up" opacity={0.9} onClick={this.closeModal}>
                      <AccountVerificationPhoneCard
                        onClose={this.closeModal}
                        showSnackBarSuccess={this.closeModalAndShowSuccessSnackbar}
                        refreshVerificationStatus={this.props.refreshVerificationStatus}
                        user={user} />
                    </Portal>
                  }

                  <ListButton
                    label="Email (Required)"
                    disabled={emailVerified}
                    onClick={this.handleEmailVerification}
                    src="decorative/email"
                    subLabel={emailVerified ? VERIFICATION_STATUS.VERIFIED : VERIFICATION_STATUS.NOT_VERIFIED}
                    verified={emailVerified}>
                    {emailVerified ? EMAIL.VERIFIED : EMAIL.VERIFY}
                  </ListButton>

                  <ListButton
                    label="Facebook"
                    disabled={facebookVerified}
                    onClick={this.handleFacebookVerification}
                    src="social/facebook"
                    subLabel={facebookVerified ? VERIFICATION_STATUS.VERIFIED : VERIFICATION_STATUS.NOT_VERIFIED}
                    verified={facebookVerified}>
                    {facebookVerified ? FACEBOOK.VERIFIED : FACEBOOK.LINK}
                  </ListButton>

                  {snackbar.open &&
                    <Snackbar
                      autoHideDuration={snackbar.autoHideDuration}
                      open={snackbar.open}
                      onClose={this.closeSnackbar}>
                      {snackbar.message}
                    </Snackbar>
                  }

                  {verificationSnackbar.open &&
                    <Snackbar
                      autoHideDuration={verificationSnackbar.autoHideDuration}
                      open={verificationSnackbar.open}
                      onClose={this.closeVerificationSnackbar}>
                      {verificationSnackbar.message}
                    </Snackbar>
                  }
                </>
              );
            }

            return (
              <>
                <ListButton
                  label="Phone"
                  disabled
                  src="decorative/mobile">
                  VERIFICATION_MESSAGE.LOADING
                </ListButton>

                <ListButton
                  label="Email"
                  disabled
                  src="decorative/email">
                  VERIFICATION_MESSAGE.LOADING
                </ListButton>

                <ListButton
                  label="Facebook"
                  disabled
                  src="social/facebook">
                  VERIFICATION_MESSAGE.LOADING
                </ListButton>

              </>
            );
          }}
        </FirebaseConsumer>
      </AccountVerificationContainer>
    );
  }

  closeModal = () => {
    this.setState({ showModal: false })
  };

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false,
      }
    });
  }

  closeVerificationSnackbar = () => {
    this.setState({ 
      verificationSnackbar: {
        ...this.state.verificationSnackbar,
        open: false,
      }
    });
  }

  handleEmailVerification = () => {
    const { snackbar } = this.state;
    if (!auth.currentUser) {
      return this.setState({
        snackbar: {
          ...snackbar,
          open: true,
        },
        verificationSnackbar: {
          ...this.state.verificationSnackbar,
          open: false,
        }
      });
    }

    auth.currentUser.sendEmailVerification()
      .then(() => {
        this.setState({ 
          snackbar: {
            autoHideDuration: EMAIL_SNACKBAR_DURATION_MS,
            message: getDisplaySuccessMessage(SuccessMessage.EMAIL_VERIFICATION_SENT),
            open: true,
          },
          verificationSnackbar: {
            ...this.state.verificationSnackbar,
            open: false,
          }
        });
      })
      .catch(() => {
        const { snackbar } = this.state;
        this.setState({ 
          snackbar: {
            ...snackbar,
            open: true,
          },
          verificationSnackbar: {
            ...this.state.verificationSnackbar,
            open: false,
          }
        });
      });
  }

  handleFacebookVerification = () => {
    const { snackbar } = this.state;
    if (!auth.currentUser) {
      return this.setState({ 
        snackbar: {
          ...snackbar,
          open: true,
        },
        verificationSnackbar: {
          ...this.state.verificationSnackbar,
          open: false,
        }
      });
    }

    auth.currentUser.linkWithPopup(facebookProvider)
      .then(() => this.props.refreshVerificationStatus())
      .then(() => {
        this.setState({ 
          snackbar: {
            autoHideDuration: SNACKBAR_DURATION_MS,
            message: getDisplaySuccessMessage(SuccessMessage.FACEBOOK_LINKED),
            open: true,
          },
          verificationSnackbar: {
            ...this.state.verificationSnackbar,
            open: false,
          }
        });
      })
      .catch(() => {
        const { snackbar } = this.state;
        this.setState({ 
          snackbar: {
            ...snackbar,
            open: true,
          },
          verificationSnackbar: {
            ...this.state.verificationSnackbar,
            open: false,
          }
        });
      });
  }

  handlePhoneVerification = () => this.setState({ showModal: true });

  closeModalAndShowSuccessSnackbar = () => {
    this.setState({ 
      showModal: false,
      snackbar: {
        autoHideDuration: SNACKBAR_DURATION_MS,
        message: getDisplaySuccessMessage(SuccessMessage.PHONE_VERIFIED),
        open: true,
      },
      verificationSnackbar: {
        ...this.state.verificationSnackbar,
        open: false,
      }
    });
  }
}

export default compose(
  graphql(REFRESH_VERIFICATION_STATUS, {
    props: ({ mutate }: any) => ({
      refreshVerificationStatus: () => {
        return mutate({
          refetchQueries: [{ query: GET_USER }],
          update: (store: any, { data: refreshVerificationStatus }: any) => {
            const { user } = store.readQuery({ query: GET_USER });
            const updatedUser = {...user, ...refreshVerificationStatus};
            store.writeQuery({ query: GET_USER, data: { user: updatedUser} });
          },
        });
      },
    }),
  }),
)(AccountVerification);
