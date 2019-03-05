import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import Svg from 'shared/Svg';

import AdminInputLabel from 'shared/AdminInputLabel';
import AdminInputWrapper from 'shared/AdminInputWrapper';
import AdminTextarea from 'shared/AdminTextarea';
import Button from 'shared/Button';
import Checkbox from 'shared/Checkbox';
import { CREATE_LISTING, GET_ALL_LISTINGS, Listing, UPDATE_LISTING, ListingInput } from 'networking/listings';
import { Photo, PhotoUploader } from 'shared/PhotoUploader';
import {
  bypass,
  errorMessages,
  FieldValidation,
  getFriendlyErrorMessage,
  getInputErrorClass,
  getInputSuccessClass,
  getInputValidationClass,
  HomeTypeAdminForm,
  isNonNegative,
  isNotEmpty,
  isOptional,
  isPositive,
  isValidCheckOutTime,
  isValidEmail,
  isValidHomeType,
  isValidIcalUrls,
  isValidPhotosArray,
  isValidTitle,
  isValidUrl,
  isValidOptionalUrl,
} from 'utils/validators';
import format from 'date-fns/format';
import Divider from 'shared/Divider';
import { TextareaEvent } from 'shared/Textarea/Textarea';
import SelectBoxWrapper from 'shared/SelectBoxWrapper';
import { COUNTRY_CODES } from 'utils/countryCodes';
import timeOptions from 'utils/timeOptions';
import { stringToArray, arrayToString } from 'utils/formatter';

interface AdminListingInput extends ListingInput {
  autoApprove: boolean;
  checkInDate: Date | string;
  checkOutDate: Date | string;
  totalQuantity: number;
}

interface LatLng {
  lng: number;
  lat: number;
}

interface Props {
  listing: Listing;
  createListing: (input: AdminListingInput) => Promise<Listing>;
  updateListing: (input: AdminListingInput) => Promise<Listing>;
}

interface State {
  inputForm: AdminListingInput;
  inputValidation: InputValidation;
  isSubmitClicked: boolean;
  incompleteField: String;
  redirectToAllListings: boolean;
}

interface Validation {
  [field: string]: (value: any) => FieldValidation;
}

interface InputValidation {
  [key: string]: FieldValidation;
}

const validationMap: Validation = {
  autoApprove: bypass,
  totalQuantity: isNonNegative,
  checkInDate: isOptional,
  checkInTime: isValidCheckOutTime,
  checkOutDate: isOptional,
  checkOutTime: isNotEmpty,
  country: isNotEmpty,
  homeType: isValidHomeType,
  hostEmail: isValidEmail,
  title: isValidTitle,
  description: isNotEmpty,
  pricePerNightUsd: isPositive,
  securityDepositUsd: isNonNegative,
  isActive: bypass,
  lat: bypass,
  listingPicUrl: isValidUrl,
  icalUrls: isValidIcalUrls,
  lng: bypass,
  photos: isValidPhotosArray,
  addressLine1: isNotEmpty,
  addressLine2: isOptional,
  city: isOptional,
  state: isOptional,
  postalCode: isNotEmpty,
  sleepingArrangement: isNotEmpty,
  numberOfBathrooms: isPositive,
  numberOfBedrooms: isPositive,
  sharedBathroom: isNotEmpty,
  minimumNights: isPositive,
  maxGuests: isPositive,
  amenities: isNotEmpty,
  houseRules: isNotEmpty,
  airbnbLink: isValidOptionalUrl,
  wifi: isOptional,
  adminNotes: isOptional,
};

const hotelFields = new Set([
  'autoApprove',
  'checkInDate',
  'checkOutDate',
  'totalQuantity'
]);

function convertToListingForm(listing = {} as Listing): AdminListingInput {
  return {
    adminNotes: listing.adminNotes || '',
    autoApprove: listing.autoApprove || false,
    addressLine1: listing.addressLine1 || '',
    addressLine2: listing.addressLine2 || '',
    airbnbLink: listing.airbnbLink || '',
    amenities: listing.amenities || [],
    checkInDate: listing.checkInDate ? format(listing.checkInDate, 'MM/DD/YYYY') : '',
    checkInTime: listing.checkInTime || { from: '1:00 p.m.', to: '10:00 p.m.' },
    checkOutDate: listing.checkOutDate ? format(listing.checkOutDate, 'MM/DD/YYYY') : '',
    checkOutTime: listing.checkOutTime || '11:00 a.m.',
    city: listing.city || '',
    country: listing.country || '',
    description: listing.description || '',
    homeType: listing.homeType || '',
    hostEmail: listing.host && listing.host.email ? listing.host.email : '',
    houseRules: listing.houseRules || '',
    isActive: listing.isActive !== undefined ? listing.isActive : true,
    lat: listing.lat,
    icalUrls: listing.icalUrls || [],
    listingPicUrl: listing.listingPicUrl || '',
    lng: listing.lng,
    maxGuests: listing.maxGuests || 1,
    minimumNights: listing.minimumNights || 1,
    numberOfBathrooms: listing.numberOfBathrooms || 0,
    numberOfBedrooms: listing.numberOfBedrooms || 0,
    photos: listing.photos || [],
    postalCode: listing.postalCode || '',
    pricePerNightUsd: listing.pricePerNightUsd || 0,
    sharedBathroom: listing.sharedBathroom || '',
    sleepingArrangement: listing.sleepingArrangement || '',
    securityDepositUsd: listing.securityDepositUsd || 0,
    state: listing.state || '',
    title: listing.title || '',
    totalQuantity: listing.totalQuantity || 0,
    wifi: listing.wifi || { photoUrl: '', mbps: 0 },
  }
};

function initializeValidation (validationMap: Validation): InputValidation {
  return Object.keys(validationMap).reduce(function(result: any, key) {
    result[key] = FieldValidation.PRISTINE;
    return result;
  }, {});
};

function getInitialState(listing: Listing): State {
  return {
    inputForm: convertToListingForm(listing),
    inputValidation: initializeValidation(validationMap),
    incompleteField: 'homeType',
    isSubmitClicked: false,
    redirectToAllListings: false,
  }
};

class AdminListingsForm extends React.Component<Props, State> {
  readonly state: State = getInitialState(this.props.listing);

  isEditMode = (): boolean => !!(this.props.listing && this.props.listing.id);

  validateForm = (): void => {
    const { inputForm } = this.state;
    let incompleteField = '';
    for (const field in inputForm) {
      if (inputForm.homeType !== HomeTypeAdminForm.HOTEL_ROOM && hotelFields.has(field)) continue;

      const validFunc = validationMap[field];
      const value = this.state.inputForm[field];
      if (validFunc(value) !== FieldValidation.SUCCESS) {
        incompleteField = field;
        break;
      }
    }
    this.setState({
      incompleteField
    });
  };

  validateAndUpdate = (name: string, value: any) => {
    const { inputForm, inputValidation } = this.state;
    const validationFunction = validationMap[name];
    this.setState(
      {
        inputForm: { ...inputForm, [name]: value },
        inputValidation: {
          ...inputValidation,
          [name]: validationFunction(value),
        },
      },
      () => this.validateForm()
    );
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | TextareaEvent) => {
    const { name, value } = event.target;
    if (name === 'amenities' || name === 'icalUrls') {
      this.validateAndUpdate(name, stringToArray(value));
    }
    else {
      this.validateAndUpdate(name, value);
    }
  };

  handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.validateAndUpdate(event.target.name, event.target.checked);
  }

  setCoverPhoto = (photos: Photo[]) => {
    const url = photos[0] ? photos[0].url : '';
    this.validateAndUpdate('listingPicUrl', url);
  };

  setWifiPhoto = (photos: Photo[]) => {
    const url = photos[0] ? photos[0].url : '';
    this.validateAndUpdate('wifi', { ...this.state.inputForm.wifi, photoUrl: url });
  }

  setListingPhotos = (photos: Photo[]) => {
    const urls = photos.map(photo => photo.url);
    this.validateAndUpdate('photos', urls);
  };

  handleReset() {
    window.location.reload();
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.setState({
      isSubmitClicked: true
    }, () => {
      if (this.isEditMode()) {
        const { updateListing } = this.props;
        return compileListing(this.state.inputForm)
          .then((input: AdminListingInput) => {
            if (!!this.state.incompleteField && input.isActive) {
              alert('Form is incomplete. Please review each form field.');
              this.setState({ isSubmitClicked: false });
              return Promise.reject(new Error('Form is incomplete. Please review each form field.'));
            }
            const updatedListing: AdminListingInput = { ...input, id: this.props.listing.id };
            return updateListing(updatedListing);
          })
          .then((listing: Listing) => {
            if (listing) {
              this.setState({ redirectToAllListings: true });
            }
          })
          .catch((error: Error) => {
            console.error(error);
            alert(`There was a problem saving these changes: ${getFriendlyErrorMessage(error)}`);
            this.setState({ isSubmitClicked: false });
          });
      }

      const { createListing } = this.props;
      return compileListing(this.state.inputForm)
        .then((input: AdminListingInput) => {
          if (!!this.state.incompleteField) {
            alert('Form is incomplete. Please review each form field.');
            this.setState({
              isSubmitClicked: false,
            });
            return Promise.reject(new Error('Form is incomplete. Please review each form field.'));
          }
          return createListing(input);
        })
        .then((listing: Listing) => {
          if (listing) {
            this.setState({ redirectToAllListings: true });
          }
        })
        .catch((error: Error) => {
          this.setState({
            isSubmitClicked: false,
          });
          console.error(error);
          alert(`There was a problem creating this listing: ${getFriendlyErrorMessage(error)}`);
        });
    });
  };

  render() {
    if (this.state.redirectToAllListings) {
      return <Redirect to="/admin/listings/all" />;
    }
    const { incompleteField, inputForm, inputValidation, isSubmitClicked } = this.state;
    const {
      addressLine1,
      addressLine2,
      adminNotes,
      airbnbLink,
      amenities,
      autoApprove,
      checkInDate,
      checkInTime,
      checkOutDate,
      checkOutTime,
      city,
      country,
      description,
      homeType,
      hostEmail,
      houseRules,
      isActive,
      icalUrls,
      maxGuests,
      minimumNights,
      numberOfBathrooms,
      numberOfBedrooms,
      postalCode,
      pricePerNightUsd,
      sharedBathroom,
      sleepingArrangement,
      securityDepositUsd,
      state,
      title,
      totalQuantity,
      wifi,
    } = inputForm;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="admin-form--item">
          <div className="single-input-validator-container">
            <Checkbox
              checked={!!isActive}
              name="isActive"
              onChange={this.handleCheckbox}>
              Active
            </Checkbox>
            <Svg
              className={`admin-input__success ${getInputSuccessClass(inputValidation.isActive)}`.trim()}
              src="utils/check-circle"
            />
            <span className={`admin-input__error ${getInputErrorClass(inputValidation.isActive)}`.trim()}>
              {errorMessages.generic}
            </span>
          </div>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="homeType">Home Type:</AdminInputLabel>
          <div className="single-input-validator-container">
            <SelectBoxWrapper suffixSize="tiny">
              <select 
                id="homeType"
                name="homeType"
                value={homeType}
                onChange={this.handleInput}>
                <option value="">Select a Home Type</option>
                {Object.values(HomeTypeAdminForm).map((homeType: HomeTypeAdminForm) => (
                  <option key={homeType} value={homeType}>{homeType}</option>
                ))}
              </select>
              <Svg className="suffix" src="utils/carat-down" />
            </SelectBoxWrapper>
            <Svg
              className={`admin-input__success ${getInputSuccessClass(inputValidation.homeType)}`.trim()}
              src="utils/check-circle"
            />
            <span className={`admin-input__error ${getInputErrorClass(inputValidation.homeType)}`.trim()}>
              {errorMessages.generic}
            </span>
          </div>
        </div>

        {homeType === HomeTypeAdminForm.HOTEL_ROOM && (
          <>
            <div className="admin-form--item">
              <div className="single-input-validator-container">
                <Checkbox
                  checked={!!autoApprove}
                  name="autoApprove"
                  onChange={this.handleCheckbox}>
                  Auto Approve
                </Checkbox>
                <Svg
                  className={`admin-input__success ${getInputSuccessClass(inputValidation.autoApprove)}`.trim()}
                  src="utils/check-circle"
                />
                <span className={`admin-input__error ${getInputErrorClass(inputValidation.autoApprove)}`.trim()}>
                  {errorMessages.generic}
                </span>
              </div>
            </div>

            <div className="admin-form--item">
              <AdminInputLabel htmlFor="totalQuantity">Total Quantity:</AdminInputLabel>
              <div className="single-input-validator-container">
                <AdminInputWrapper>
                  <input
                    className={getInputValidationClass(inputValidation.totalQuantity)}
                    onChange={this.handleInput}
                    id="totalQuantity"
                    placeholder="20"
                    type="number"
                    name="totalQuantity"
                    value={totalQuantity}
                  />
                </AdminInputWrapper>
                <Svg
                  className={`admin-input__success ${getInputSuccessClass(inputValidation.totalQuantity)}`.trim()}
                  src="utils/check-circle"
                />
                <span className={`admin-input__error ${getInputErrorClass(inputValidation.totalQuantity)}`.trim()}>
                  {errorMessages.generic}
                </span>
              </div>
            </div>

            <div className="admin-form--item">
              <div className="multiple-input-container">
                <div className="admin-form--sub-item">
                  <AdminInputLabel htmlFor="checkInDate">Check-in Date:</AdminInputLabel>
                  <div className="single-input-validator-container">
                    <AdminInputWrapper>
                      <input
                        className={getInputValidationClass(inputValidation.checkInDate)}
                        onChange={this.handleInput}
                        id="checkInDate"
                        placeholder="5/20/2019"
                        type="text"
                        name="checkInDate"
                        value={checkInDate.toString()} />
                    </AdminInputWrapper>
                    <Svg
                      className={`admin-input__success ${getInputSuccessClass(
                        inputValidation.checkInDate === FieldValidation.SUCCESS
                          && inputValidation.checkOutDate === FieldValidation.SUCCESS ? FieldValidation.SUCCESS : ''
                      )}`.trim()}
                      src="utils/check-circle" />
                    <span className={`admin-input__error ${getInputErrorClass(
                      inputValidation.checkInDate === FieldValidation.ERROR
                        || inputValidation.checkOutDate === FieldValidation.ERROR ? FieldValidation.ERROR : '')}`.trim()}>
                      {errorMessages.generic}
                    </span>
                  </div>
                </div>

                <div className="admin-form--sub-item">
                  <AdminInputLabel htmlFor="checkOutDate">Check-out Date:</AdminInputLabel>
                  <AdminInputWrapper>
                    <input
                      className={getInputValidationClass(inputValidation.checkOutDate)}
                      onChange={this.handleInput}
                      id="checkOutDate"
                      placeholder="5/24/2019"
                      type="text"
                      name="checkOutDate"
                      value={checkOutDate.toString()} />
                  </AdminInputWrapper>
                </div>
              </div>
            </div>

            <Divider />
          </>
        )}

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="hostEmail">Host Email Address:</AdminInputLabel>
          <div className="single-input-validator-container">
            <AdminInputWrapper>
              <input
                className={getInputValidationClass(inputValidation.hostEmail)}
                onChange={this.handleInput}
                id="hostEmail"
                placeholder="test@beenest.com"
                type="text"
                name="hostEmail"
                value={hostEmail}
              />
            </AdminInputWrapper>
            <Svg
              className={`admin-input__success ${getInputSuccessClass(inputValidation.hostEmail)}`.trim()}
              src="utils/check-circle"
            />
            <span className={`admin-input__error ${getInputErrorClass(inputValidation.hostEmail)}`.trim()}>
              {errorMessages.generic}
            </span>
          </div>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="title" subLabel="(60 character limit)">
            Listing Title:
          </AdminInputLabel>
          <div className="single-input-validator-container">
            <AdminInputWrapper>
              <input
                className={getInputValidationClass(inputValidation.title)}
                onChange={this.handleInput}
                id="title"
                placeholder="Beautiful Scenic Views of Los Angeles"
                type="text"
                name="title"
                value={title}
              />
            </AdminInputWrapper>
            <Svg
              className={`admin-input__success ${getInputSuccessClass(inputValidation.title)}`.trim()}
              src="utils/check-circle"
            />
            <span className={`admin-input__error ${getInputErrorClass(inputValidation.title)}`.trim()}>
              {errorMessages.generic}
            </span>
          </div>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="description">Listing Description:</AdminInputLabel>
          <div className="single-input-validator-container">
            <AdminTextarea
              className={getInputValidationClass(inputValidation.description)}
              html
              name="description"
              onChange={this.handleInput}
              placeholder="This is the Description"
              value={description}
            />
            <Svg
              className={`admin-input__success ${getInputSuccessClass(inputValidation.description)}`.trim()}
              src="utils/check-circle"
            />
            <span className={`admin-input__error ${getInputErrorClass(inputValidation.description)}`.trim()}>
              {errorMessages.generic}
            </span>
          </div>
        </div>

        <div className="admin-form--item">
          <div className="multiple-input-container">
            <div className="admin-form--sub-item">
              <AdminInputLabel htmlFor="pricePerNightUsd" subLabel="(USD)">
                Price Per Night:
              </AdminInputLabel>
              <div className="single-input-validator-container">
                <AdminInputWrapper>
                  <input
                    className={getInputValidationClass(inputValidation.pricePerNightUsd)}
                    onChange={this.handleInput}
                    id="pricePerNightUsd"
                    placeholder="$1000.00"
                    type="number"
                    name="pricePerNightUsd"
                    value={pricePerNightUsd}
                  />
                </AdminInputWrapper>
                <Svg
                  className={`admin-input__success ${getInputSuccessClass(
                    inputValidation.pricePerNightUsd === FieldValidation.SUCCESS &&
                    inputValidation.securityDepositUsd === FieldValidation.SUCCESS
                      ? FieldValidation.SUCCESS
                      : ''
                  )}`.trim()}
                  src="utils/check-circle"
                />
                <span
                  className={`admin-input__error ${getInputErrorClass(
                    inputValidation.pricePerNightUsd === FieldValidation.ERROR ||
                    inputValidation.securityDepositUsd === FieldValidation.ERROR
                      ? FieldValidation.ERROR
                      : ''
                  )}`.trim()}
                >
                  {errorMessages.generic}
                </span>
              </div>
            </div>

            <div className="admin-form--sub-item">
              <AdminInputLabel htmlFor="securityDepositUsd" subLabel="(USD)">
                Security Deposit:
              </AdminInputLabel>
              <AdminInputWrapper>
                <input
                  className={getInputValidationClass(inputValidation.securityDepositUsd)}
                  onChange={this.handleInput}
                  id="securityDepositUsd"
                  placeholder="$100.00"
                  type="number"
                  name="securityDepositUsd"
                  value={securityDepositUsd}
                />
              </AdminInputWrapper>
            </div>
          </div>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="listingPicUrl">Cover Photo:</AdminInputLabel>
          <div className="single-input-validator-container">
            <PhotoUploader
              initialPhotos={this.props.listing ? [{ url: this.props.listing.listingPicUrl }] : []}
              maxFiles={1}
              onPhotosUpdated={(photos: Photo[]) => this.setCoverPhoto(photos)}
            />
            <Svg
              className={`admin-input__success ${getInputSuccessClass(inputValidation.listingPicUrl)}`.trim()}
              src="utils/check-circle"
            />
            <span className={`admin-input__error ${getInputErrorClass(inputValidation.listingPicUrl)}`.trim()}>
              {errorMessages.generic}
            </span>
          </div>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="photos" subLabel="(limit 25)">
            Upload Listing Photos:
          </AdminInputLabel>
          <PhotoUploader
            initialPhotos={
              this.props.listing
                ? (this.props.listing.photos || []).map(url => {
                    return { url };
                  })
                : []
            }
            maxFiles={25}
            onPhotosUpdated={this.setListingPhotos}
          />
          <Svg
            className={`admin-input__success ${getInputSuccessClass(inputValidation.photos)}`.trim()}
            src="utils/check-circle"
          />
          <span className={`admin-input__error ${getInputErrorClass(inputValidation.photos)}`.trim()}>
            {errorMessages.generic}
          </span>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="addressLine1">Listing Address:</AdminInputLabel>
          <div className="multi-line-group-spacing">
            <div className="single-input-validator-container">
              <AdminInputWrapper>
                <input
                  className={getInputValidationClass(inputValidation.addressLine1)}
                  onChange={this.handleInput}
                  id="addressLine1"
                  placeholder="Street Address Line 1"
                  type="text"
                  name="addressLine1"
                  value={addressLine1}
                />
              </AdminInputWrapper>
              <Svg
                className={`admin-input__success ${getInputSuccessClass(inputValidation.addressLine1)}`.trim()}
                src="utils/check-circle"
              />
              <span className={`admin-input__error ${getInputErrorClass(inputValidation.addressLine1)}`.trim()}>
                {errorMessages.generic}
              </span>
            </div>
          </div>

          <div className="multi-line-group-spacing">
            <div className="single-input-validator-container">
              <AdminInputWrapper>
                <input
                  className={getInputValidationClass(inputValidation.addressLine2)}
                  onChange={this.handleInput}
                  placeholder="Street Address Line 2"
                  type="text"
                  name="addressLine2"
                  value={addressLine2}
                />
              </AdminInputWrapper>
              <Svg
                className={`admin-input__success ${getInputSuccessClass(inputValidation.addressLine2)}`.trim()}
                src="utils/check-circle"
              />
              <span className={`admin-input__error ${getInputErrorClass(inputValidation.addressLine2)}`.trim()}>
                {errorMessages.generic}
              </span>
            </div>
          </div>

          <div className="row-address">
            <div className="admin-form--sub-item">
              <div className="single-input-validator-container">
                <AdminInputWrapper>
                  <input
                    className={getInputValidationClass(inputValidation.city)}
                    onChange={this.handleInput}
                    placeholder="City"
                    type="text"
                    name="city"
                    value={city}
                  />
                </AdminInputWrapper>
                <Svg
                  className={`admin-input__success ${getInputSuccessClass(
                    inputValidation.city === FieldValidation.SUCCESS &&
                    inputValidation.state === FieldValidation.SUCCESS &&
                    inputValidation.postalCode === FieldValidation.SUCCESS
                      ? FieldValidation.SUCCESS
                      : ''
                  )}`.trim()}
                  src="utils/check-circle"
                />
                <span
                  className={`admin-input__error ${getInputErrorClass(
                    inputValidation.city === FieldValidation.ERROR ||
                    inputValidation.state === FieldValidation.ERROR ||
                    inputValidation.postalCode === FieldValidation.ERROR
                      ? FieldValidation.ERROR
                      : ''
                  )}`.trim()}
                >
                  {errorMessages.generic}
                </span>
              </div>
            </div>

            <div className="admin-form--sub-item">
              <AdminInputWrapper>
                <input
                  className={getInputValidationClass(inputValidation.state)}
                  onChange={this.handleInput}
                  placeholder="State"
                  type="text"
                  name="state"
                  value={state}
                />
              </AdminInputWrapper>
            </div>

            <div className="admin-form--sub-item">
              <AdminInputWrapper>
                <input
                  className={getInputValidationClass(inputValidation.postalCode)}
                  onChange={this.handleInput}
                  placeholder="ZIP"
                  type="text"
                  name="postalCode"
                  value={postalCode}
                />
              </AdminInputWrapper>
            </div>
          </div>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="country">Country:</AdminInputLabel>
          <div className="single-input-validator-container">
            <SelectBoxWrapper suffixSize="tiny">
              <select 
                id="country"
                name="country"
                value={country}
                onChange={this.handleInput}>
                <option value="">Select a Country</option>
                {COUNTRY_CODES.map(country => (
                  <option
                    key={country.code}
                    value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <label htmlFor="country">
                <Svg className="suffix" src="utils/carat-down" />
              </label>
            </SelectBoxWrapper>
            <Svg
              className={`admin-input__success ${getInputSuccessClass(inputValidation.country)}`.trim()}
              src="utils/check-circle"
            />
            <span className={`admin-input__error ${getInputErrorClass(inputValidation.country)}`.trim()}>
              {errorMessages.generic}
            </span>
          </div>
        </div>

        <div className="admin-form--item">
          <div className="row-bed-and-bathroom">
            <div className="admin-form--sub-item">
              <AdminInputLabel htmlFor="sleepingArrangement">Beds:</AdminInputLabel>
              <div className="single-input-validator-container">
                <AdminInputWrapper>
                  <input
                    className={getInputValidationClass(inputValidation.sleepingArrangement)}
                    onChange={this.handleInput}
                    id="sleepingArrangement"
                    placeholder="1 King, 2 Queens, etc."
                    type="text"
                    name="sleepingArrangement"
                    value={sleepingArrangement}
                  />
                </AdminInputWrapper>
                <Svg
                  className={`admin-input__success ${getInputSuccessClass(
                    inputValidation.sleepingArrangement === FieldValidation.SUCCESS &&
                    inputValidation.numberOfBathrooms === FieldValidation.SUCCESS &&
                    inputValidation.numberOfBedrooms === FieldValidation.SUCCESS &&
                    inputValidation.sharedBathroom === FieldValidation.SUCCESS
                      ? FieldValidation.SUCCESS
                      : ''
                  )}`.trim()}
                  src="utils/check-circle"
                />
                <span
                  className={`admin-input__error ${getInputErrorClass(
                    inputValidation.sleepingArrangement === FieldValidation.ERROR ||
                    inputValidation.numberOfBathrooms === FieldValidation.ERROR ||
                    inputValidation.numberOfBedrooms === FieldValidation.ERROR ||
                    inputValidation.sharedBathroom === FieldValidation.ERROR
                      ? FieldValidation.ERROR
                      : ''
                  )}`.trim()}
                >
                  {errorMessages.generic}
                </span>
              </div>
            </div>

            <div className="admin-form--sub-item">
              <AdminInputLabel htmlFor="numberOfBedrooms">Bedrooms:</AdminInputLabel>
              <div className="single-input-validator-container">
                <AdminInputWrapper>
                  <input
                    className={getInputValidationClass(inputValidation.numberOfBedrooms)}
                    onChange={this.handleInput}
                    id="numberOfBedrooms"
                    placeholder="2"
                    type="number"
                    name="numberOfBedrooms"
                    value={numberOfBedrooms}
                  />
                </AdminInputWrapper>
              </div>
            </div>
          </div>
          <div className="row-bed-and-bathroom">
            <div className="admin-form--sub-item">
              <AdminInputLabel htmlFor="numberOfBathrooms">Bathrooms:</AdminInputLabel>
              <div className="single-input-validator-container">
                <AdminInputWrapper>
                  <input
                    className={getInputValidationClass(inputValidation.numberOfBathrooms)}
                    onChange={this.handleInput}
                    id="numberOfBathrooms"
                    placeholder="2"
                    type="number"
                    name="numberOfBathrooms"
                    value={numberOfBathrooms}
                  />
                </AdminInputWrapper>
              </div>
            </div>

            <div className="admin-form--sub-item">
              <AdminInputLabel htmlFor="sharedBathroom">Shared:</AdminInputLabel>
              <div className="single-input-validator-container">
                <AdminInputWrapper>
                  <input
                    className={getInputValidationClass(inputValidation.sharedBathroom)}
                    onChange={this.handleInput}
                    id="sharedBathroom"
                    placeholder="Yes/No"
                    type="text"
                    name="sharedBathroom"
                    value={sharedBathroom}
                  />
                </AdminInputWrapper>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-form--item">
          <div className="multiple-input-container">
            <div className="admin-form--sub-item">
              <AdminInputLabel htmlFor="maxGuests">Max Guests</AdminInputLabel>
              <div className="single-input-validator-container">
                <AdminInputWrapper>
                  <input
                    className={getInputValidationClass(inputValidation.maxGuests)}
                    onChange={this.handleInput}
                    id="maxGuests"
                    placeholder="# of max guests"
                    type="number"
                    name="maxGuests"
                    value={maxGuests}
                  />
                </AdminInputWrapper>
                <Svg
                  className={`admin-input__success ${getInputSuccessClass(
                    inputValidation.maxGuests === FieldValidation.SUCCESS &&
                    inputValidation.minimumNights === FieldValidation.SUCCESS
                      ? FieldValidation.SUCCESS
                      : ''
                  )}`.trim()}
                  src="utils/check-circle"
                />
                <span
                  className={`admin-input__error ${getInputErrorClass(
                    inputValidation.maxGuests === FieldValidation.ERROR ||
                    inputValidation.minimumNights === FieldValidation.ERROR
                      ? FieldValidation.ERROR
                      : ''
                  )}`.trim()}
                >
                  {errorMessages.generic}
                </span>
              </div>
            </div>

            <div className="admin-form--sub-item">
              <AdminInputLabel htmlFor="minimumNights">Min Nights</AdminInputLabel>
              <AdminInputWrapper>
                <input
                  className={getInputValidationClass(inputValidation.minimumNights)}
                  onChange={this.handleInput}
                  id="minimumNights"
                  placeholder="Min Nights"
                  type="number"
                  name="minimumNights"
                  value={minimumNights}
                />
              </AdminInputWrapper>
            </div>
          </div>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="amenities">Amenities:</AdminInputLabel>
          <div className="single-input-validator-container">
            <AdminTextarea
              className={getInputValidationClass(inputValidation.amenities)}
              name="amenities"
              onChange={this.handleInput}
              placeholder="Towels, Soap, Laundry Detergent"
              value={arrayToString(amenities || [])}
            />
            <Svg
              className={`admin-input__success ${getInputSuccessClass(inputValidation.amenities)}`.trim()}
              src="utils/check-circle"
            />
            <span className={`admin-input__error ${getInputErrorClass(inputValidation.amenities)}`.trim()}>
              {errorMessages.generic}
            </span>
          </div>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="wifi" subLabel="(in Mbps)">Wifi Speed:</AdminInputLabel>
          <div className="single-input-validator-container">
            <AdminInputWrapper>
              <input
                className={getInputValidationClass(inputValidation.wifi)}
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  this.validateAndUpdate('wifi', { ...this.state.inputForm.wifi, mbps: event.currentTarget.value || 0 });
                }}
                id="wifi"
                placeholder="20"
                type="number"
                name="wifi"
                value={wifi.mbps || ''}
              />
            </AdminInputWrapper>
            <Svg
              className={`admin-input__success ${getInputSuccessClass(inputValidation.wifi)}`.trim()}
              src="utils/check-circle"
            />
            <span className={`admin-input__error ${getInputErrorClass(inputValidation.wifi)}`.trim()}>
              {errorMessages.generic}
            </span>
          </div>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="wifi">Wifi Screenshot:</AdminInputLabel>
          <div className="single-input-validator-container">
            <PhotoUploader
              initialPhotos={this.props.listing && this.props.listing.wifi && this.props.listing.wifi.photoUrl ? [{ url: this.props.listing.wifi.photoUrl }] : []}
              maxFiles={1}
              onPhotosUpdated={(photos: Photo[]) => this.setWifiPhoto(photos)}
            />
            <Svg
              className={`admin-input__success ${getInputSuccessClass(inputValidation.wifi)}`.trim()}
              src="utils/check-circle"
            />
            <span className={`admin-input__error ${getInputErrorClass(inputValidation.wifi)}`.trim()}>
              {errorMessages.generic}
            </span>
          </div>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="from" subLabel="(From)">Check-in</AdminInputLabel>
          <SelectBoxWrapper suffixSize="tiny">
            <select
              id="from"
              name="from"
              value={checkInTime.from}
              onChange={event => this.validateAndUpdate('checkInTime', {
                ...checkInTime,
                from: event.target.value,
              })}>
              {timeOptions.map(
                time => <option key={time} value={time}>{time}</option>
              )}
            </select>
            <label htmlFor="from">
              <Svg className="suffix" src="utils/carat-down" />
            </label>
          </SelectBoxWrapper>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="to" subLabel="(To)">Check-in</AdminInputLabel>
          <SelectBoxWrapper suffixSize="tiny">
            <select
              id="to"
              name="to"
              value={checkInTime.to}
              onChange={event => this.validateAndUpdate('checkInTime', {
                ...checkInTime,
                to: event.target.value,
              })}>
              {timeOptions.map(
                time => <option key={time} value={time}>{time}</option>
              )}
            </select>
            <label htmlFor="to">
              <Svg className="suffix" src="utils/carat-down" />
            </label>
          </SelectBoxWrapper>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="checkOutTime" subLabel="(Before)">Check-out</AdminInputLabel>
          <SelectBoxWrapper suffixSize="tiny">
            <select
              id="checkOutTime"
              name="checkOutTime"
              value={checkOutTime}
              onChange={this.handleInput}>
              {timeOptions.map(
                time => <option key={time} value={time}>{time}</option>
              )}
            </select>
            <label htmlFor="checkOutTime">
              <Svg className="suffix" src="utils/carat-down" />
            </label>
          </SelectBoxWrapper>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="houseRules">House Rules:</AdminInputLabel>
          <div className="single-input-validator-container">
            <AdminTextarea
              className={getInputValidationClass(inputValidation.houseRules)}
              html
              name="houseRules"
              onChange={this.handleInput}
              placeholder="Check-in: 12:00pm"
              value={houseRules}
            />
            <Svg
              className={`admin-input__success ${getInputSuccessClass(inputValidation.houseRules)}`.trim()}
              src="utils/check-circle"
            />
            <span className={`admin-input__error ${getInputErrorClass(inputValidation.houseRules)}`.trim()}>
              {errorMessages.generic}
            </span>
          </div>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="icalUrls" subLabel="(optional, separate by comma)">
            iCal URLs:
          </AdminInputLabel>
          <div className="single-input-validator-container">
            <AdminTextarea
              className={getInputValidationClass(inputValidation.icalUrls)}
              name="icalUrls"
              onChange={this.handleInput}
              placeholder="https://icallink.com/l09102ip91j0d91j/lijasdflijasdlkfj"
              value={arrayToString(icalUrls || [])}
            />
            <Svg
              className={`admin-input__success ${getInputSuccessClass(inputValidation.icalUrls)}`.trim()}
              src="utils/check-circle"
            />
            <span className={`admin-input__error ${getInputErrorClass(inputValidation.icalUrls)}`.trim()}>
              {errorMessages.generic}
            </span>
          </div>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="airbnbLink" subLabel="(optional)">Airbnb Link:</AdminInputLabel>
          <div className="single-input-validator-container">
            <AdminInputWrapper>
              <input
                className={getInputValidationClass(inputValidation.airbnbLink)}
                onChange={this.handleInput}
                placeholder="https://www.airbnb.com/"
                type="text"
                name="airbnbLink"
                value={airbnbLink}
              />
            </AdminInputWrapper>
            <Svg
              className={`admin-input__success ${getInputSuccessClass(inputValidation.airbnbLink)}`.trim()}
              src="utils/check-circle"
            />
            <span className={`admin-input__error ${getInputErrorClass(inputValidation.airbnbLink)}`.trim()}>
              {errorMessages.generic}
            </span>
          </div>
        </div>

        <div className="admin-form--item">
          <AdminInputLabel htmlFor="adminNotes" subLabel="(optional)">Admin Notes:</AdminInputLabel>
          <div className="single-input-validator-container">
            <AdminTextarea
              className={getInputValidationClass(inputValidation.adminNotes)}
              html
              name="adminNotes"
              onChange={this.handleInput}
              placeholder="Type in notes about this listing"
              value={adminNotes}
            />
            <Svg
              className={`admin-input__success ${getInputSuccessClass(inputValidation.adminNotes)}`.trim()}
              src="utils/check-circle"
            />
            <span className={`admin-input__error ${getInputErrorClass(inputValidation.adminNotes)}`.trim()}>
              {errorMessages.generic}
            </span>
          </div>
        </div>

        <div className="admin-form-submit-wrapper">
          <div className="admin-form-submit--container">
            <div className="admin-form-submit--status">
              <h4 className={`admin-form-submit${!incompleteField ? '__success' : '__error'}`}>
                {!incompleteField
                  ? 'Everything looks good. Ready to submit.'
                  : `*Form is incomplete. ${incompleteField} is missing or incorrect.`}
              </h4>
            </div>
            <div className="button-group-container">
              <Button
                background="top"
                color="white"
                noRadius
                onClick={this.handleReset}
                textStyle="welter-5"
                type="button">
                Reset
              </Button>
              <Button
                background="correct"
                color="white"
                disabled={(!!incompleteField && isActive) || isSubmitClicked}
                noRadius
                textStyle="welter-5"
                type="submit">
                {this.isEditMode() ? 'Save' : 'Submit'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

function compileListing(inputForm: AdminListingInput): Promise<AdminListingInput> {
  const amenities = stringToArray(String(inputForm.amenities));
  const icalUrls = stringToArray(String(inputForm.icalUrls));
  const { addressLine1, autoApprove, checkInDate, checkOutDate, city, country, homeType, postalCode, state, totalQuantity} = inputForm;
  const address = `${addressLine1}, ${city}, ${state} ${postalCode} ${country}`;
  const hotelParams = homeType === HomeTypeAdminForm.HOTEL_ROOM
    ? { 
      autoApprove,
      checkInDate: checkInDate && new Date(checkInDate),
      checkOutDate: checkOutDate && new Date(checkOutDate),
      totalQuantity,
    } : {};

  return fetchCoordinates(address).then(
    (coordinates: LatLng): AdminListingInput => {
      return {
        ...inputForm,
        ...coordinates,
        ...hotelParams,
        amenities,
        icalUrls,
      };
    }
    );
  };

function fetchCoordinates(address: string): Promise<LatLng> {
  if (!window.google || !window.google.maps) return Promise.reject(new Error('Google Maps does not exist.'));

  const geocoder = new google.maps.Geocoder();

  return new Promise<LatLng>((resolve, reject) => {
    geocoder.geocode({ address }, (res: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve({ lat: res[0].geometry.location.lat(), lng: res[0].geometry.location.lng() });
      } else {
        reject(new Error('Could not fetch coordinates.'));
      }
    });
  });
};

export default compose(
  graphql(CREATE_LISTING, {
    props: ({ mutate }: any) => ({
      createListing: (input: AdminListingInput) => {
        return mutate({
          variables: { input },
          refetchQueries: [{ query: GET_ALL_LISTINGS }],
          // sometimes deconstructing at the `update: data` level double-nests the object  (i.e createListing: { createListing: PAYLOAD })
          // recommend to leave { data } as is and deconstruct after
          update: (store: any, { data }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.allListings) {
              return;
            }
            const { createListing } = data;
            const { allListings } = store.readQuery({ query: GET_ALL_LISTINGS });
            store.writeQuery({
              query: GET_ALL_LISTINGS,
              data: {
                allListings: [
                  ...allListings,
                  createListing
                ]
              }
            });
            // TODO: createListing lacks fields such as createdAt, hostNameSlug, etc. because those fields are created in the backend
            // GQL says these fields are missing in the console -- need to find a workaround (maybe mock the data or make them optional?)
            // However, these fields are not important for the Form
          },
        });
      },
    }),
  }),
  graphql(UPDATE_LISTING, {
    props: ({ mutate }: any) => ({
      updateListing: (listing: AdminListingInput) => {
        const { id } = listing;
        const input = JSON.parse(JSON.stringify(listing), omitFields);
        return mutate({
          variables: { id, input },
          refetchQueries: [{ query: GET_ALL_LISTINGS }],
          update: (store: any, { data }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.allListings) {
              return;
            }

            const { updateListing } = data;
            const { allListings } = store.readQuery({ query: GET_ALL_LISTINGS });
            const index = allListings.findIndex((listing: Listing) => listing.id === id);
            store.writeQuery({
              query: GET_ALL_LISTINGS,
              data: {
                allListings: [
                  ...allListings.slice(0, index),
                  {
                    ...allListings[index],
                    ...updateListing,
                  },
                  ...allListings.slice(index + 1),
                ],
              },
            });
          },
        });
      },
    }),
  })
)(AdminListingsForm);

function omitFields(key: string, value: any) {
  return ['id', '__typename', 'createdAt'].includes(key) ? undefined : value;
}