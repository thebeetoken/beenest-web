import * as React from 'react';
import ContactHostFormContainer from './ContactHostForm.container';
import Button from 'shared/Button';
import Svg from 'shared/Svg';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import InputWrapper from 'components/shared/InputWrapper';
import Textarea from 'components/shared/Textarea';
import InputLabel from 'components/shared/InputLabel';
import ErrorMessageWrapper from 'components/shared/ErrorMessageWrapper';
import { TextareaEvent } from 'components/shared/Textarea/Textarea';
import { compose, graphql } from 'react-apollo';
import { CONTACT_USER } from 'networking/users';
import { User } from 'networking/listings';


interface Props {
  host: User;
  tripId: string;
  listingId: string;
  onClose: () => void;
  contactUser: (input: ContactHostInput) => Promise<boolean>;
}

interface ContactHostInput {
  bookingId: string;
  listingId: string;
  message: string;
  recipientId: string;
  subject: string;
}

const ContactHostSchema = Yup.object().shape({
  subject: Yup.string().required('Please fill out the subject.'),
  message: Yup.string().required('Please fill out the message field.'),
});

const ContactHostForm = (props: Props) => {
  const { host, listingId, onClose, tripId } = props;
    return (
      <ContactHostFormContainer>
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
            bookingId: tripId,
            listingId,
            recipientId: host.id,
          };
          console.log('input:', input);
        return props.contactUser(input)
            .then((returnedObject: any) => {
              console.log('returnedObject:', returnedObject);
              console.log('success (technically)');
            })
            .catch((error: Error) => {
              alert(`${error}. If this continues to occur, please contact us at support@beetoken.com`);
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
              <h2>Contact {host.firstName || 'Host'}</h2>
              
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
                  textareaHeight="200px"
                  name="message"
                  onBlur={() => setFieldTouched('message', true)}
                  onChange={(event: TextareaEvent) => {
                    setFieldValue('message', event.target.value);
                  }}
                  value={values.message}
                  placeholder="Let the host know of any questions or concerns you may have" />
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
        <div className="close" onClick={onClose}>
          <Svg src="utils/x" />
        </div>
      </ContactHostFormContainer>
    );
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