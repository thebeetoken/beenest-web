import * as React from 'react';

import AdminUsersDeleteCardContainer from './AdminUsersDeleteCard.container';
import Button from 'shared/Button';
import AudioLoading from 'shared/loading/AudioLoading';
import Svg from 'shared/Svg';
import { User } from 'networking/users';

interface Props extends User {
  completedVerification: boolean | null;
  onDeleteUser: (id: string) => Promise<any>;
  email: string | null;
  firstName: string;
  id: string;
  lastName: string;
  onClose: () => void;
}

interface State {
  loading: boolean;
}

class AdminUsersDeleteCard extends React.Component<Props, State> {
  readonly state = {
    loading: false,
  }
  handleConfirm = (): void => {
    this.setState({ loading: true });
    this.props.onDeleteUser(this.props.id)
      .then((data: any) => {
        const { firstName, id, lastName } = data.data.deleteUser;
        alert(`${firstName} ${lastName} with id: ${id} has been successfully deleted.`);
        window.location.reload();
      })
      .catch((error: Error) => {
        this.setState({ loading: false });
        console.error(error);
        alert(`Error: ${error.message}`);
      });
  }

  render() {
    const {
      completedVerification,
      email,
      firstName,
      id,
      lastName,
      onClose,
    } = this.props;

    return (
      <AdminUsersDeleteCardContainer>
        {this.state.loading 
          ?
            <AudioLoading height={48} width={96} />
          :
            <>
              <div className="status-options-card-upper">
                <div className="status-options-card-upper--top">
                  <h1>
                    Are you sure you want to
                    <span>DELETE</span>
                    this user?
                  </h1>
                </div>
                <div className="status-options-card-upper--bottom">
                  <div className="status-options-card-upper--bottom-id">
                    <h2>User ID</h2>
                    <h3>{id}</h3>
                  </div>
                  <div className="status-options-card-upper--bottom-id">
                    <h2>User Email</h2>
                    <h3>{email}</h3>
                  </div>
                </div>
              </div>
              <div className="status-options-card-lower">
                <div className="status-options-card-lower--left">
                  <span>First Name: {firstName}</span>
                  <span>Last Name: {lastName}</span>
                  <span>Account Status: {completedVerification ? 'Verified' : 'Not Verified' }</span>
                </div>
                <div className="status-options-card-lower--right">
                  <Button
                    className="cancel"
                    clear
                    color="white"
                    radius="4px"
                    onClick={onClose}
                    size="small">
                    Cancel
                  </Button>
                  <Button
                    className="confirmation"
                    clear
                    color="white"
                    radius="2px"
                    onClick={this.handleConfirm}
                    size="small">
                    Confirm
                  </Button>
                </div>
              </div>
              <div className="close" onClick={onClose}>
                <Svg src="utils/x" />
              </div>
            </>
        }
      </AdminUsersDeleteCardContainer>
    );
  }
}

export default AdminUsersDeleteCard;
