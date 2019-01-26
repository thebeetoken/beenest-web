import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { SETTINGS } from 'configs/settings';
import { ADMIN_CREATE_HOST, UPDATE_HOST, SEARCH_HOSTS } from 'networking/users';
import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import * as formHelper from 'utils/AdminFormHelper';
import PhotoUploadContainer from '../../adminShared/containers/PhotoUpload.container';
import { PhotoUploader, Photo } from 'shared/PhotoUploader';
import Svg from 'shared/Svg';
import AdminTextarea from 'shared/AdminTextarea';
import { getGraphQLErrorMessage, getInputValidationClass, FieldValidation } from 'utils/validators';
import AdminInputLabel from 'shared/AdminInputLabel';
import AdminInputWrapper from 'shared/AdminInputWrapper';
import { TextareaEvent } from 'shared/Textarea/Textarea';

const { BEENEST_HOST } = SETTINGS;

interface AdminCreateHostInput {
  about: string;
  btcWalletAddress: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  profilePicUrl: string;
  walletAddress: string;
}

interface Errors {
  about: HostFormErrorState;
  btcWalletAddress: HostFormErrorState;
  email: HostFormErrorState;
  firstName: HostFormErrorState;
  lastName: HostFormErrorState;
  phoneNumber: HostFormErrorState;
  profilePicUrl: HostFormErrorState;
  walletAddress: HostFormErrorState;
  [key: string]: string | HostFormErrorState;
}

interface Host {
  about: string;
  btcWalletAddress: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  profilePicUrl: string;
  stripeAccountDashboardLink: string;
  walletAddress: string;
  [key: string]: string;
}

interface HostFormErrorState {
  error: boolean;
  success: boolean;
  [key: string]: boolean;
}

interface HostFormState {
  formMessage: string;
  id: string;
  isSubmitClicked: boolean;
  errors: Errors;
  userForm: Host;
  [key: string]: boolean | string | Errors | Host;
}

interface IsValidInput {
  field: string;
  value: string;
}

interface HostProps extends RouterProps {
  host: Host;
  adminCreateHost: (host: AdminCreateHostInput) => Promise<Host>;
  updateHost: (host: UpdateHostInput) => Promise<Host>;
}

interface UpdateHostInput {
  about: string;
  btcWalletAddress: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  phoneNumber: string;
  profilePicUrl: string;
  walletAddress: string;
}

const HOST_PARAMS = {
  about: 'about',
  btcWalletAddress: 'btcWalletAddress',
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
  phoneNumber: 'phoneNumber',
  profilePicUrl: 'profilePicUrl',
  walletAddress: 'walletAddress',
};

class AdminUsersHostForm extends React.Component<HostProps, HostFormState> {
  state: any = {
    ...formHelper.generateDefaultState(),
    userForm: this.props.host
      ? this.props.host
      : formHelper.generateDefaultState().userForm,
  };

  componentDidMount() {
    if (this.isExistingHost()) {
      this.setState({
        id: this.props.host.id,
        isSubmitClicked: this.state.isSubmitClicked,
        errors: this.state.errors,
        userForm: this.props.host,
      });
    }
  }

  clearForm = () => this.setState(formHelper.generateDefaultState());

  handleInput = (event: React.ChangeEvent<HTMLInputElement> | TextareaEvent) => {
    const { name, value } = event.target;
    const isValidInput = this.isValidInput({ field: name, value });
    const status = { error: !isValidInput, success: isValidInput };
    this.setState(
      {
        userForm: { ...this.state.userForm, [name]: value },
        errors: {
          ...this.state.errors,
          [name]: status
        }
      },
      () => this.isFormValid()
    );
  }

  handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.currentTarget;
    const isValidInput = this.isValidInput({ field: 'phoneNumber', value });
    const status = { error: !isValidInput, success: isValidInput };

    // Make sure values is prefixed by '+' for area code
    // and filter out non-numeric characters from value
    if (!formHelper.isValidPhoneNumberInput(value)) {
      value = value.replace(/\D/g, '');
      value = '+' + value;
    }

    this.setState({
      userForm: {
        ...this.state.userForm,
        phoneNumber: value,
      },
    });
    return status;
  };

  handlePhotoChange = (value: Photo[]) => {
    const url = value && value.length ? value[0].url : '';
    const isValidInput = this.isValidInput({ field: 'profilePicUrl', value: url });
    const status = { error: !isValidInput, success: isValidInput };

    this.setState({
      errors: {
        ...this.state.errors,
        profilePicUrl: status,
      },
      userForm: {
        ...this.state.userForm,
        profilePicUrl: url,
      },
    });
    return status;
  };

  handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const self = this;
    if (!this.isFormValid()) {
      this.setState({
        errors: this.state.errors,
        isSubmitClicked: true,
        userForm: this.state.userForm,
      });
      return;
    }
    const { userForm } = this.state;
    const host: any = {
      about: userForm.about,
      btcWalletAddress: userForm.btcWalletAddress,
      email: userForm.email,
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      phoneNumber: userForm.phoneNumber,
      profilePicUrl: userForm.profilePicUrl,
      walletAddress: userForm.walletAddress,
    };
    if (this.isExistingHost()) {
      host.id = this.state.id;
      this.props
        .updateHost(host)
        .then(() => {
          self.clearForm();
          alert(`Host ${host.firstName} ${host.lastName} was successfully updated!`);
          self.props.history.push('/admin/users/hosts');
        })
        .catch((error: any) => {
          console.error('error: ', error);
          const errorMsg = getGraphQLErrorMessage(error);
          alert(`There was an error: ${errorMsg}`);
        });
    } else {
      host.password = userForm.password;
      this.props
        .adminCreateHost(host)
        .then(() => {
          self.clearForm();
          alert(`Host ${host.firstName} ${host.lastName} was successfully created!`);
          self.props.history.push('/admin/users/hosts');
        })
        .catch((error: any) => {
          console.error('error: ', error);
          const errorMsg = getGraphQLErrorMessage(error);
          alert(`There was an error: ${errorMsg}`);
        });
    }
  };

  isExistingHost = (): boolean => this.props.host && !!this.props.host.id;

  isFormValid = (): boolean => {
    const { errors } = this.state;
    let isFormValid = true,
      fieldErrors;
    const requiredParams: any = { email: true, firstName: true, lastName: true };
    Object.keys(errors).forEach((field: string) => {
      fieldErrors = errors[field];
      if (this.isExistingHost()) {
        if (fieldErrors.error) {
          isFormValid = false;
        }
      } else {
        if (fieldErrors.error || (requiredParams[field] && !fieldErrors.success)) {
          isFormValid = false;
        }
      }
    });
    return isFormValid;
  };

  /** TODO: Move this into `formHelper.tsx` */
  isValidInput = (params: IsValidInput): boolean => {
    const { field, value } = params;
    switch (field) {
      case HOST_PARAMS.about:
        return formHelper.isOptional();
      case HOST_PARAMS.btcWalletAddress:
        return formHelper.isOptional();
      case HOST_PARAMS.email:
        return formHelper.isValidEmail(value);
      case HOST_PARAMS.firstName:
        return formHelper.isValidName(value);
      case HOST_PARAMS.lastName:
        return formHelper.isValidName(value);
      case HOST_PARAMS.phoneNumber:
        return formHelper.isValidPhoneNumber(value);
      case HOST_PARAMS.profilePicUrl:
        return formHelper.isValidUrl(value);
      case HOST_PARAMS.walletAddress:
        return formHelper.isValidWalletAddress(value);
      default:
        return false;
    }
  };

  render() {
    const { errors } = this.state;
    const { about, btcWalletAddress, email, firstName, lastName, phoneNumber, profilePicUrl, walletAddress } = errors;
    const { id, listingCount } = this.props.host;
    const nameError = firstName.error || lastName.error;
    const nameSuccess = firstName.success && lastName.success;
    const $formError = this.state.isSubmitClicked && !this.isFormValid() ? 'opacity--1' : '';

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="admin-form--body">
          <div className="admin-form--item row">
            <div className="admin-form--sub-item">
              <AdminInputLabel htmlFor="firstName">First Name:</AdminInputLabel>
              <AdminInputWrapper>
                <input
                  id="firstName"
                  name="firstName"
                  onChange={this.handleInput}
                  placeholder="Jane"
                  type="text"
                  value={this.state.userForm.firstName} />
              </AdminInputWrapper>
              {nameError && <p className="admin-input__error show">Please enter both first and last name</p>}
              {nameSuccess && <Svg className="admin-input__success show" src="utils/check-circle" />}
            </div>

            <div className="admin-form--sub-item">
              <AdminInputLabel htmlFor="lastName">Last Name:</AdminInputLabel>
              <AdminInputWrapper>
                <input
                  id="lastName"
                  name="lastName"
                  onChange={this.handleInput}
                  placeholder="Doe"
                  type="text"
                  value={this.state.userForm.lastName} />
              </AdminInputWrapper>
            </div>
          </div>

          <div className="admin-form--item">
            <AdminInputLabel htmlFor="email">Email Address:</AdminInputLabel>
            <AdminInputWrapper>
              <input
                id="email"
                name="email"
                onChange={this.handleInput}
                placeholder="hostemail@example.com"
                type="text"
                value={this.state.userForm.email} />
              {email.error && <p className="admin-input__error show">Not a valid email address</p>}
              {email.success && <Svg className="admin-input__success show" src="utils/check-circle" />}
            </AdminInputWrapper>
          </div>

          <div className="admin-form--item">
            <AdminInputLabel htmlFor="phoneNumber">Phone Number:</AdminInputLabel>
            <AdminInputWrapper>
              <input
                id="phoneNumber"
                name="phoneNumber"
                onChange={this.handlePhoneNumberChange}
                placeholder="+1 555 555 5555"
                type="text"
                value={this.state.userForm.phoneNumber} />
              {phoneNumber.error && <p className="admin-input__error show">Please enter a valid phone number</p>}
              {phoneNumber.success && <Svg className="admin-input__success show" src="utils/check-circle" />}
            </AdminInputWrapper>
          </div>

          <div className="admin-form--item">
            <AdminInputLabel htmlFor="walletAddress">Ethereum Wallet Address:</AdminInputLabel>
            <AdminInputWrapper>
              <input
                id="walletAddress"
                name="walletAddress"
                onChange={this.handleInput}
                placeholder="0x26e221b83e3342114b18C1D1699466E6E311b0123"
                type="text"
                value={this.state.userForm.walletAddress} />
              {walletAddress.error && <p className="admin-input__error show">Please enter a valid wallet address</p>}
              {walletAddress.success && <Svg className="admin-input__success show" src="utils/check-circle" />}
            </AdminInputWrapper>
          </div>

          <div className="admin-form--item">
            <AdminInputLabel htmlFor="btcWalletAddress">Bitcoin Wallet Address:</AdminInputLabel>
            <AdminInputWrapper>
              <input
                id="btcWalletAddress"
                name="btcWalletAddress"
                onChange={this.handleInput}
                placeholder="26e221b83e3342114b18C1D1699466E6E311b0123"
                type="text"
                value={this.state.userForm.btcWalletAddress} />
              {btcWalletAddress.error && <p className="admin-input__error show">Please enter a valid wallet address</p>}
              {btcWalletAddress.success && <Svg className="admin-input__success show" src="utils/check-circle" />}
            </AdminInputWrapper>
          </div>

          <div className="admin-form--item">
            <AdminInputLabel>About:</AdminInputLabel>
            <div className="single-input-validator-container">
              <AdminTextarea
                className={getInputValidationClass(about.success && FieldValidation.SUCCESS)}
                html
                name="about"
                onChange={this.handleInput}
                placeholder="I'm all about crypto"
                value={this.state.userForm.about}
              />
              {about.error && <p className="admin-input__error show">Please enter a valid host description</p>}
              {about.success && <Svg className="admin-input__success show" src="utils/check-circle" />}
            </div>
          </div>

          <div className="admin-form--item">
            <AdminInputLabel htmlFor="profilePicUrl">Profile Photo:</AdminInputLabel>
            <div className="single-input-validator-container">
              <PhotoUploadContainer>
                <PhotoUploader
                  initialPhotos={this.props.host ? [{ url: this.props.host.profilePicUrl }] : []}
                  maxFiles={1}
                  onPhotosUpdated={this.handlePhotoChange} />
              </PhotoUploadContainer>
              {profilePicUrl.error && <p className="admin-input__error show">Please upload a valid photo</p>}
              {profilePicUrl.success && <Svg className="admin-input__success show" src="utils/check-circle" />}
            </div>
          </div>

          <div className="admin-form--item-notice">
            <h4>Stripe Express Account:</h4>
            {(this.props.host && this.props.host.stripeAccountDashboardLink) ?
              <BeeLink href={this.props.host.stripeAccountDashboardLink} target="_blank">
                <span>Click here to go to Host's Stripe Express Account</span>
              </BeeLink>
              :
              <>
                <p>Host has not entered their banking info for payout, please ask the host to visit:</p>
                <BeeLink href={`${BEENEST_HOST}/host/payments`} target="_blank">
                  {`${BEENEST_HOST}/host/payments`}
                </BeeLink>
              </>
            }
          </div>

          {!!listingCount && listingCount > 0 && <div className="admin-form--item-link">
            <span><BeeLink to={`/admin/listings?userId=${id}`}>See {listingCount} listings</BeeLink></span>
          </div>}

        </div>
        <footer>
          <div className={`error-state ${$formError}`}>
            <span>{this.state.formMessage}</span>
          </div>
          <div className="form-actions">
            <div className="invisible">
              <Button background="top" color="white" noRadius onClick={this.clearForm} textStyle="welter-5">
                Cancel
              </Button>
            </div>
            <Button background="correct" color="white" noRadius textStyle="welter-5">
              Submit
            </Button>
          </div>
        </footer>
      </form>
    );
  }
}

export default compose(
  graphql(ADMIN_CREATE_HOST, {
    props: ({ mutate }: any) => ({
      adminCreateHost: (input: AdminCreateHostInput): Promise<any> => {
        return mutate({
          variables: { input },
          refetchQueries: [{ query: SEARCH_HOSTS }],
          update: (store: any, { data }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.searchHosts) {
              return;
            }

            const { adminCreateHost } = data;
            const { searchHosts } = store.readQuery({ query: SEARCH_HOSTS });
            store.writeQuery({
              query: SEARCH_HOSTS,
              data: {
                searchHosts: {
                  users: [ adminCreateHost, ...searchHosts ],
                  count: searchHosts.count + 1
                }
              }
            });
          },
        });
      },
    }),
  }),
  graphql(UPDATE_HOST, {
    props: ({ mutate }: any) => ({
      updateHost: (input: UpdateHostInput): Promise<any> => {
        const { id } = input;
        return mutate({
          variables: { input },
          refetchQueries: [{ query: SEARCH_HOSTS }],
          update: (store: any, { data }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.searchHosts) {
              return;
            }

            const { updateHost } = data;
            const { searchHosts } = store.readQuery({ query: SEARCH_HOSTS });
            const index = searchHosts.users.findIndex((user: Host) => user.id === id);
            store.writeQuery({
              query: SEARCH_HOSTS,
              data: {
                searchHosts: {
                  users: [
                    ...searchHosts.users.slice(0, index),
                    {
                      ...searchHosts.users[index],
                      ...updateHost,
                    },
                    ...searchHosts.users.slice(index + 1),
                  ],
                  count: searchHosts.count + 1
                }
              },
            });
          },
        });
      },
    }),
  })
)(withRouter(AdminUsersHostForm));
