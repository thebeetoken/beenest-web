import * as React from 'react';
import { Button, Fade } from 'reactstrap';

import { Host } from 'networking/listings';

import ContactHostFormModal from '../ContactHostFormModal';

interface Props {
  bookingId?: string;
  listingId?: string;
  host: Host;
}

const ContactHostButton = (props: Props) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return <Fade>
    <Button onClick={() => setOpen(true)}>
      Contact Host
      <span className="fas fa-envelope pl-3"></span>
    </Button>
    <ContactHostFormModal isOpen={isOpen} onModalAction={() => setOpen(false)} {...props} />
  </Fade>;
};

export default ContactHostButton;
