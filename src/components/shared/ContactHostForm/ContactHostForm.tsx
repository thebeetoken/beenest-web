import * as React from 'react';
import ContactHostFormContainer from './ContactHostForm.container';
import Svg from 'shared/Svg';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface Props {
  firstName: string;
  hostEmail: string;
  listingId: string;
  onClose: () => void;
}

interface State {

}

const ContactHostSchema = Yup.object().shape({
  subject: Yup.string().min(1, 'Too Short!'),
  message : Yup.string(),
});

class ContactHostForm extends React.Component<Props, State> {
  render () {
    const { firstName, onClose } = this.props;
    return (
      <ContactHostFormContainer>
        <Formik
          initialValues={{
            subject: '',
            message: '',
          }}
          validationSchema={ContactHostSchema}
          onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          // return contactHost(id, values)
          //   .then(() => {
          //     // Success Message / Screen, then toggle close
          //   })
          //   .catch((error: Error) => {
          //     alert(`${error}. If this continues to occur, please contact us at support@beetoken.com`);
          //     console.error(error);
          //     return actions.setSubmitting(false);
          //   });
          }}
        >


        </Formik>
        <h2>Contact {firstName}</h2>
        <h2>Contact {firstName}</h2>
        <div>I LIKE BURRITOS</div>
        <div className="close" onClick={onClose}>
          <Svg src="utils/x" />
        </div>
      </ContactHostFormContainer>
    );
  }
};

export default ContactHostForm;