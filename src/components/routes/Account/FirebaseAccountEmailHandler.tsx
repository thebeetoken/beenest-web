import * as React from 'react';
import { parseQueryString } from 'utils/queryParams';
import AudioLoading from 'shared/loading/AudioLoading';
import { verifyEmail } from 'utils/firebase';
import Button from 'shared/Button';
import BeeLink from 'shared/BeeLink';
import GeneralWrapper from 'shared/GeneralWrapper';
import styled from 'styled-components';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';

interface State {
  isSubmitting: boolean;
  hasError: boolean;
  errorMessage: string;
}

interface QueryParams {
  mode?: string;
  oobCode?: string;
  continueUrl?: string;
  lang?: string;
}

const DefaultContainer = styled.div`
    h2 {
      margin-top: 18px;
    }

    section {
      margin-top: 18px;
    }
  }
`;

export default class FirebaseAccountEmailHandler extends React.Component<RouterProps> {
  readonly state: State = {
    isSubmitting: true,
    hasError: false,
    errorMessage: ''
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

     if (mode === 'verifyEmail') {
       verifyEmail(oobCode).then(() => {
         this.setState({ isSubmitting: false });
       }).catch(err => {
         console.error(err);
         this.setState({ isSubmitting: false, hasError: true });
       });
     }
  }

  renderError() {
    return <>
      <h2>There was an error verifying your email.</h2>
      <p>{this.state.errorMessage}</p>
      <p>
        <BeeLink href="mailto:support@beenest.com">
          <Button>Contact us for further help.</Button>
        </BeeLink>
      </p>
    </>;
  }

  renderSuccess() {
     return <>
            <h2>Thanks for verifying your email.</h2>

            <FirebaseConsumer>
            {({ loading, user, completedVerification }: FirebaseUserProps) => {
              if (loading) {
                return <AudioLoading />;
              }

              if (user && !completedVerification) {
                return <section>
                        <BeeLink to="/account/verification">
                          <Button>Verify your phone number to book a rental</Button>
                        </BeeLink>
                      </section>;
              }

              if (user && !!completedVerification) {
                return <section>
                  <BeeLink to="/host/listings">
                    <Button>List your home for rent</Button>
                  </BeeLink>
                  or
                  <BeeLink to="/">
                    <Button border="black" background="white">Find a place to stay at</Button>
                  </BeeLink>
                </section>;
              }

              return <></>;
            }}
            </FirebaseConsumer>
          </>;
  }

  render() {
    if (this.state.isSubmitting) {
      return <AudioLoading height={48} width={96} />;
    }
    const { hasError } = this.state;

    return (
        <GeneralWrapper width={976}>
          <DefaultContainer>
          <div className="complete">
            {hasError ? this.renderError() : this.renderSuccess()}
          </div>
          </DefaultContainer>
        </GeneralWrapper>
    );
  }
};
