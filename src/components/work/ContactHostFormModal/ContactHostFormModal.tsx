import * as React from 'react';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { compose, graphql } from 'react-apollo';

import { Booking } from 'networking/bookings';
import { CONTACT_USER, ContactUserField, User } from 'networking/users';
import { Button, Form, FormGroup, Label, FormFeedback, Input, ModalFooter, ModalBody, Modal, ModalHeader } from 'reactstrap';
import Textarea from 'components/shared/Textarea';
import { TextareaEvent } from 'components/shared/Textarea/Textarea';
import Loading from 'components/shared/loading/Loading';

interface Props {
  contactUser: (input: ContactUserInput) => Promise<EmailResponse>;
  booking: Booking;
  isOpen: boolean;
  onModalAction: () => void;
}

interface FormValues {
  [name: string]: string;
}

interface ContactUserInput {
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
  recipient: User;
  subject: string;
}

const defaultValues: FormValues = {
  [ContactUserField.SUBJECT]: '',
  [ContactUserField.MESSAGE]: '',
};

const ContactHostSchema = Yup.object({
  subject: Yup.string().required('Please fill out the subject field.'),
  message: Yup.string().required('Please fill out the message field.'),
});

function ContactHostForm({ booking, contactUser, isOpen, onModalAction }: Props) {
  const [successMessage, setSuccessMessage] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const { host, listingId, id } = booking;

  if (successMessage) {
    return (
      <Modal isOpen={isOpen} toggle={onModalAction}>
        <ModalHeader>Message Successfully Sent</ModalHeader>
        <ModalBody>
          <p>{successMessage}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={onModalAction}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
  return (
    <Formik
      initialValues={defaultValues}
      isInitialValid
      validationSchema={ContactHostSchema}
      onSubmit={({ message, subject }, actions) => {
        const input = {
          bookingId: id,
          listingId,
          message,
          recipientId: host.id,
          subject,
        };
        return contactUser(input)
          .then((response: any) => {
            const emailResponse: EmailResponse = response.data.contactUser;
            const { subject, recipient } = emailResponse || { subject: '', recipient: { firstName: 'the host' } };
            const success = `Your message ${subject ? `"${subject}" ` : ' '}was sent to ${recipient.firstName}.`;
            setSuccessMessage(success);
          })
          .catch((error: Error) => {
            console.error(error);
            setErrorMessage(`${error.message}. If this continues to occur, please contact us at support@beenest.com`);
          })
          .finally(() => actions.setSubmitting(false));
      }}
    >
      {({ errors, isSubmitting, setFieldTouched, setFieldValue, touched, values }) => (
        <Modal isOpen toggle={onModalAction}>
          <Form tag={FormikForm}>
            <ModalHeader>Contact {host.firstName || 'Host'}</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for={ContactUserField.SUBJECT}>Subject</Label>
                <Input
                  id={ContactUserField.SUBJECT}
                  invalid={!!errors.subject && !!touched.subject}
                  name={ContactUserField.SUBJECT}
                  placeholder="First name"
                  tag={Field}
                  type="text"
                />
                <FormFeedback>{errors.subject}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for={ContactUserField.MESSAGE}>Message</Label>
                <Textarea
                  className={`form-control${errors.message && touched.message ? ' is-invalid' : ''}`}
                  html
                  name={ContactUserField.MESSAGE}
                  onBlur={() => setFieldTouched(ContactUserField.MESSAGE, true)}
                  onChange={(event: TextareaEvent) => {
                    setFieldValue(ContactUserField.MESSAGE, event.target.value);
                  }}
                  placeholder="Type in your message here"
                  textareaHeight="164px"
                  value={values.message}
                />
                <FormFeedback>{errors.message}</FormFeedback>
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              {errorMessage && <FormFeedback className="d-block">{errorMessage.slice(0, 150)}</FormFeedback>}
              <Button
                color="secondary"
                className="d-flex align-items-center justify-content-center"
                disabled={isSubmitting}
                style={{ width: '180px' }}  // TODO: Make button full width for mobile
                type="submit">
                {isSubmitting
                  ? <Loading height="1.5rem" width="1.5rem" />
                  : 'Send Message'}
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  );
}

export default compose(
  graphql(CONTACT_USER, {
    props: ({ mutate }: any) => ({
      contactUser: (input: ContactUserInput) => {
        return mutate({
          variables: { input },
        });
      },
    }),
  })
)(ContactHostForm);
