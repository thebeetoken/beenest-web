import * as React from 'react';
import { Alert, Button, Col, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
interface Props {
  isOpen: boolean;
  toggle: () => void;
  url: string;
  title?: string;
}

const ShareModal = (props: Props) => {
  const [isAlertOpen, setAlert] = React.useState<boolean>(false);
  const { isOpen, toggle, url, title } = props;
  return (
    <Modal isOpen={isOpen} toggle={() => toggle()}>
      <ModalHeader className="text-primary" toggle={() => toggle()}>Share Listing</ModalHeader>
      <ModalBody>
        <Row className="d-flex align-items-center" noGutters>
          <a className="d-flex align-items-center w-100" href={`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title && title}`} target="_blank">
            <Col xs="2" md="1" className="p-0">
              <Button className="btn btn-icon transition-3d-hover btn-facebook" size="sm" type="button">
                <span className="fab btn-icon__inner fab fa-facebook-f" />
              </Button>
            </Col>
            <Col className="">
              <h5 className="small mb-0 text-secondary">Facebook</h5>
            </Col>
          </a>
        </Row>
        <Row className="d-flex align-items-center mt-3" noGutters>
          <a className="d-flex align-items-center w-100" href={`https://twitter.com/intent/tweet?url=${url}&text=${title && title}`} target="_blank">
            <Col xs="2" md="1" className="p-0">
              <Button className="btn btn-icon transition-3d-hover btn-twitter" size="sm" type="button">
                <span className="fab btn-icon__inner fab fa-twitter" />
              </Button>
            </Col>
            <Col className="">
              <h5 className="small mb-0 text-secondary">Twitter</h5>
            </Col>
          </a>
        </Row>
        <Row className="d-flex align-items-center mt-3" noGutters>
          <CopyToClipboard text={url} onCopy={() => toggleAlert()}>
            <div className="d-flex align-items-center w-100 pointer">
              <Col xs="2" md="1" className="p-0">
                <Button className="btn btn-icon transition-3d-hover" size="sm" type="button">
                  <span className="fab btn-icon__inner far fa-copy" />
                </Button>
              </Col>
              <Col className="">
                <h5 className="small mb-0 text-secondary">Copy Link</h5>
              </Col>
            </div>
          </CopyToClipboard>
        </Row>
        <Row className="mt-3" noGutters>
          <Alert className="mb-0" color="success" isOpen={isAlertOpen} toggle={toggleAlert}>
            Copied to clipboard.
          </Alert>
        </Row>
      </ModalBody>
    </Modal>
  );

  function toggleModal() {
    console.log('hi');
    toggle();
    setAlert(!isAlertOpen);
  }

  function toggleAlert() {
    setAlert(!isAlertOpen);
  }
}

export default ShareModal;