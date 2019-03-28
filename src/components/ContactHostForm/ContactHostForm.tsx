import * as React from 'react';
import ContactHostFormContainer from './ContactHostForm.container';
import Button from 'components/Button';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import InputWrapper from 'components/InputWrapper';
import Textarea from 'components/Textarea';
import InputLabel from 'components/InputLabel';
import ErrorMessageWrapper from 'components/ErrorMessageWrapper';
import { TextareaEvent } from 'components/Textarea/Textarea';
import { compose, graphql } from 'react-apollo';
import { CONTACT_USER } from 'networking/users';
import { Host } from 'networking/listings';
import AlertCard from 'components/AlertCard';
import Card from 'components/Card';

interface Props {
  contactUser: (input: ContactHostInput) => Promise<EmailResponse>;
  host: Host;
  listingId?: string;
  onClose: () => void;
  bookingId?: string;
}

interface State {
  response: EmailResponse | null;
}

interface ContactHostInput {
  bookingId?: string;
  listingId?: string;
  message: string;
  recipientId: string;
  subject: string;
}

interface EmailResponse {
  bookingId: string;
  listingId: string;
  message: string;
  recipient: Host;
  subject: string;
}

const ContactHostSchema = Yup.object().shape({
  subject: Yup.string().required('Please fill out the subject field.'),
  message: Yup.string().required('Please fill out the message field.'),
});

class ContactHostForm extends React.Component<Props, State> {
  readonly state = {
    response: null
  }

  render () {
    const { contactUser, host, listingId, onClose, bookingId } = this.props;
    if (this.state.response) {
      const { subject, recipient } = this.state.response || { subject: '', recipient: { firstName: 'the host' }};
      return (
        <AlertCard
          buttonBackgroundColor="brand"
          cta="OK"
          message={`Your message ${subject ? `"${subject}" ` : ' '}was sent to ${recipient.firstName}.`}
          onClose={onClose}
          srcColor="secondary"
          title="Success!" />
      );
    }

    return (
      <ContactHostFormContainer>
        <Card
          onClose={onClose}>
          <Formik
            initialValues={{
              subject: '',
              message: '',
            }}
            isInitialValid
            validationSchema={ContactHostSchema}
            onSubmit={(values: ContactHostInput, actions) => {
            actions.setSubmitting(true);
            const input = {
              ...values,
              bookingId,
              listingId,
              recipientId: host.id,
            };
            return contactUser(input)
              .then((response: any) => {
                this.setState({ response: response.data.contactUser });
              })
              .catch((error: Error) => {
                alert(`${error}. If this continues to occur, please contact us at support@beenest.com`);
                console.error(error);
                return actions.setSubmitting(false);
              });
            }}
          >
            {({
              isSubmitting,
              setFieldTouched,
              setFieldValue,
              values,
            }) => (
              <Form>
                <h2>Contact {host.displayName || 'Host'}</h2>
                
                <div className="form-item">
                  <InputLabel htmlFor="subject">Subject</InputLabel>
                  <InputWrapper>
                    <Field
                      name="subject"
                      placeholder="Subject"
                      type="text" />
                  </InputWrapper>
                  <ErrorMessageWrapper>
                    <ErrorMessage name="subject" />
                  </ErrorMessageWrapper>
                </div>

                <div className="form-item">
                  <InputLabel>Message</InputLabel>
                  <Textarea
                    html
                    name="message"
                    onBlur={() => setFieldTouched('message', true)}
                    onChange={(event: TextareaEvent) => {
                      setFieldValue('message', event.target.value);
                    }}
                    placeholder="Your message here"
                    textareaHeight="164px"
                    value={values.message} />
                  <ErrorMessageWrapper>
                    <ErrorMessage name="message" />
                  </ErrorMessageWrapper>
                </div>

                <Button
                  disabled={isSubmitting}
                  type="submit">
                  Send Message
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </ContactHostFormContainer>
    );
  }
};

export default compose(
  graphql(CONTACT_USER, {
    props: ({ mutate }: any) => ({
      contactUser: (input: ContactHostInput) => {
        return mutate({
          variables: { input }
        });
      },
    }),
  })
)(ContactHostForm);
