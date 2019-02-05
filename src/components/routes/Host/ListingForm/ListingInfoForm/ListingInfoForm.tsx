import * as React from 'react';

import InputLabel from 'shared/InputLabel';
import InputWrapper from 'shared/InputWrapper';
import SelectBoxWrapper from 'shared/SelectBoxWrapper';
import Svg from 'shared/Svg';
import { COUNTRY_CODES } from 'utils/countryCodes';
import Textarea from 'shared/Textarea';
import { formatAddress } from 'utils/formatter';
import { HomeTypeHostForm } from 'utils/validators';
import { PhotoUploader, Photo } from 'components/shared/PhotoUploader';
import GoogleMaps from 'components/shared/GoogleMaps';
import { Field, ErrorMessage } from 'formik';
import { TextareaEvent } from 'components/shared/Textarea/Textarea';
import ErrorMessageWrapper from 'components/shared/ErrorMessageWrapper';

const LAT_LNG_EPSILON = Math.pow(10, -6); // decimal places stored in db

const ListingInfoForm = (props: any): JSX.Element => {
  const { errors, setFieldValue, setFieldTouched, setFocus, values } = props;
  const { addressLine1, city, postalCode, state } = values;
  const address = formatAddress(addressLine1, city, state, postalCode);
  const StyledErrorMessage = (props: { name: string }) => (
    <ErrorMessageWrapper>
      {props.name && <ErrorMessage {...props} />}
    </ErrorMessageWrapper>
  );
  return (
    <>
      <div className="form-item">
        <InputLabel>Type of Home</InputLabel>
        <SelectBoxWrapper suffixSize="tiny">
          <select
            id="homeType"
            name="homeType"
            onBlur={() => setFieldTouched('homeType', true)}
            onFocus={() => setFocus('homeType')}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setFieldValue('homeType', event.target.value);
            }}
            value={values.homeType}>
            {Object.values(HomeTypeHostForm).map((value: HomeTypeHostForm) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
          <label htmlFor="homeType">
            <Svg className="suffix" src="utils/carat-down" />
          </label>
        </SelectBoxWrapper>
        <StyledErrorMessage name="homeType" />
      </div>

      <div className="form-item">
        <InputLabel htmlFor="title" subLabel="(required)">
          Listing Name
        </InputLabel>
        <InputWrapper>
          <Field
            onFocus={() => setFocus('title')}
            name="title"
            placeholder="Title"
            type="text" />
        </InputWrapper>
        <StyledErrorMessage name="title" />
      </div>

      <div className="form-item">
        <InputLabel htmlFor="description" subLabel="(required)">Listing Description</InputLabel>
        <Textarea
          html
          name="description"
          onBlur={() => setFieldTouched('description', true)}
          onChange={(event: TextareaEvent) => {
            setFieldValue('description', event.target.value);
          }}
          onFocus={() => setFocus('description')}
          value={values.description}
          placeholder="Tell us about your home"
        />
        <StyledErrorMessage name="description" />
      </div>

      <div className="form-item address">
        <InputLabel htmlFor="addressLine1" subLabel="(required)">Full Address</InputLabel>
        {[
          {
            name: 'addressLine1',
            onFocus: () => setFocus('addressLine1'),
            placeholder: 'Address Line 1',
            type: 'text',
          },
          {
            name: 'addressLine2',
            onFocus: () => setFocus('addressLine2'),
            placeholder: 'Address Line 2',
            type: 'text',
          },
          {
            className: 'city',
            name: 'city',
            onFocus: () => setFocus('city'),
            placeholder: 'City',
            type: 'text',
          },
          {
            className: 'state',
            name: 'state',
            onFocus: () => setFocus('state'),
            placeholder: 'State',
            type: 'text',
          },
          {
            className: 'postal-code',
            name: 'postalCode',
            onFocus: () => setFocus('postalCode'),
            placeholder: '88888',
            type: 'text',
          },
        ].map(({ className, name, onFocus, placeholder, type }) => (
          <InputWrapper key={name} className={className}>
            <Field name={name} onFocus={onFocus} placeholder={placeholder} type={type} />
          </InputWrapper>
        ))}
          {<StyledErrorMessage name={
            errors.addressLine1 ? 'addressLine1' :
            errors.city ? 'city' :
            errors.state ? 'state' :
            errors.postalCode ? 'postalCode' : ''} />}
      </div>

      <div className="form-item">
        <InputLabel>Country</InputLabel>
        <SelectBoxWrapper suffixSize="tiny">
          <select
            id="country"
            name="country"
            onFocus={() => setFocus('country')}
            onBlur={() => setFieldTouched('country', true)}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFieldValue('country', event.target.value)}
            value={values.country}
          >
            {COUNTRY_CODES.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          <label htmlFor="country">
            <Svg className="suffix" src="utils/carat-down" />
          </label>
        </SelectBoxWrapper>
        <StyledErrorMessage name="country" />
      </div>

      <div className="form-item map-preview">
        <InputLabel>Location Preview on Map</InputLabel>
        <GoogleMaps
          address={address}
          getCoordinates={({ lat, lng }) => {
            if (isCoordinateValid(lat, values.lat)) {
              setFieldValue('lat', lat);
            }
            if (isCoordinateValid(lng, values.lng)) {
              setFieldValue('lng', lng);
            }
            return { lat, lng };
          }}
          showMarker
        />
        {<StyledErrorMessage name={
          errors.lat ? 'lat' :
          errors.lng ? 'lng' : ''} />}
      </div>

      <div className="form-item photo" onMouseEnter={() => setFocus('listingPicUrl')}>
        <InputLabel htmlFor="listingPicUrl" subLabel="(required)">Cover Photo</InputLabel>
        <PhotoUploader
          initialPhotos={values.listingPicUrl ? [{ url: values.listingPicUrl }] : []}
          maxFiles={1}
          onClick={() => setFocus('listingPicUrl')}
          onPhotosUpdated={(photo: Photo[]) => {
            setFieldTouched('listingPicUrl', true);
            setFieldValue('listingPicUrl', photo[0] ? photo[0].url : '');
          }} />
        <StyledErrorMessage name="listingPicUrl" />
      </div>

      <div className="form-item photo" onMouseEnter={() => setFocus('photos')}>
        <InputLabel htmlFor="photos" subLabel="(required, limit 25)">
          Listing Photos
        </InputLabel>
        <PhotoUploader
          initialPhotos={(values.photos || []).map((url: string) => {
            return { url };
          })}
          maxFiles={25}
          onClick={() => setFocus('photos')}
          onPhotosUpdated={(photo: Photo[]) => {
            setFieldTouched('photos', true);
            setFieldValue('photos', photo.map(photo => photo.url));
          }} />
        <StyledErrorMessage name="photos" />
      </div>
    </>
  );
};

export default ListingInfoForm;

function isCoordinateValid(coordinate: number | undefined, previousCoordinate: number | undefined): boolean  {
  return !!(coordinate || coordinate === 0) &&
    !!(previousCoordinate || previousCoordinate === 0) &&
    Math.abs(coordinate - previousCoordinate) > LAT_LNG_EPSILON;
}
