import * as React from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';

class AccountSecurity extends React.Component<any> {
  render() {
    return (
      <ListGroup className="mb-2 d-flex flex-column">
        <ListGroupItem className="w-100 d-flex flex-column">
          <h6 className="mb-0">Reset Password</h6>
          <div className="d-flex justify-content-between">
            <h6 className="mb-0 small text-muted">Click here to reset your password</h6>
            <i className="fa fa-lock"></i>
          </div>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default AccountSecurity;
