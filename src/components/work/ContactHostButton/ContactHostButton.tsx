import * as React from 'react';
import { Button, Fade } from 'reactstrap';

import ContactHostFormModal from '../ContactHostFormModal';

interface Props {
  bookingId?: string;
  listingId?: string;
  hostId: string;
}

const ContactHostButton = (props: Props) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return <Fade>
    <Button onClick={() => setOpen(true)}>
      Contact Host
      <span className="fas fa-envelope"></span>
    </Button>
    <ContactHostFormModal isOpen={isOpen} {...props} />
  </Fade>;
};
