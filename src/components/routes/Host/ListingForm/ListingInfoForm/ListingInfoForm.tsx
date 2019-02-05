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
  const { errors, LISTING_FIELDS, setFieldValue, setFieldTouched, setFocus, values } = props;
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
            id={LISTING_FIELDS.homeType}
            name={LISTING_FIELDS.homeType}
            onBlur={() => setFieldTouched(LISTING_FIELDS.homeType, true)}
            onFocus={() => setFocus(LISTING_FIELDS.homeType)}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setFieldValue(LISTING_FIELDS.homeType, event.target.value);
            }}
            value={values.homeType}>
            {Object.values(HomeTypeHostForm).map((value: HomeTypeHostForm) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
          <label htmlFor={LISTING_FIELDS.homeType}>
            <Svg className="suffix" src="utils/carat-down" />
          </label>
        </SelectBoxWrapper>
        <StyledErrorMessage name={LISTING_FIELDS.homeType} />
      </div>

      <div className="form-item">
        <InputLabel htmlFor={LISTING_FIELDS.title} subLabel="(required)">
          Listing Name
        </InputLabel>
        <InputWrapper>
          <Field
            onFocus={() => setFocus(LISTING_FIELDS.title)}
            name={LISTING_FIELDS.title}
            placeholder={LISTING_FIELDS.title}
            type="text" />
        </InputWrapper>
        <StyledErrorMessage name={LISTING_FIELDS.title} />
      </div>

      <div className="form-item">
        <InputLabel htmlFor={LISTING_FIELDS.description} subLabel="(required)">Listing Description</InputLabel>
        <Textarea
          html
          name={LISTING_FIELDS.description}
          onBlur={() => setFieldTouched(LISTING_FIELDS.description, true)}
          onChange={(event: TextareaEvent) => {
            setFieldValue(LISTING_FIELDS.description, event.target.value);
          }}
          onFocus={() => setFocus(LISTING_FIELDS.description)}
          value={values.description}
          placeholder="Tell us about your home"
        />
        <StyledErrorMessage name={LISTING_FIELDS.description} />
      </div>

      <div className="form-item address">
        <InputLabel htmlFor={LISTING_FIELDS.addressLine1} subLabel="(required)">Full Address</InputLabel>
        {[
          {
            name: LISTING_FIELDS.addressLine1,
            onFocus: () => setFocus(LISTING_FIELDS.addressLine1),
            placeholder: 'Address Line 1',
            type: 'text',
          },
          {
            name: LISTING_FIELDS.addressLine2,
            onFocus: () => setFocus(LISTING_FIELDS.addressLine2),
            placeholder: 'Address Line 2',
            type: 'text',
          },
          {
            className: 'city',
            name: LISTING_FIELDS.city,
            onFocus: () => setFocus(LISTING_FIELDS.city),
            placeholder: 'City',
            type: 'text',
          },
          {
            className: 'state',
            name: LISTING_FIELDS.state,
            onFocus: () => setFocus(LISTING_FIELDS.state),
            placeholder: LISTING_FIELDS.state,
            type: 'text',
          },
          {
            className: 'postal-code',
            name: LISTING_FIELDS.postalCode,
            onFocus: () => setFocus(LISTING_FIELDS.postalCode),
            placeholder: '88888',
            type: 'text',
          },
        ].map(({ className, name, onFocus, placeholder, type }) => (
          <InputWrapper key={name} className={className}>
            <Field name={name} onFocus={onFocus} placeholder={placeholder} type={type} />
          </InputWrapper>
        ))}
          {<StyledErrorMessage name={
            errors.addressLine1 ? LISTING_FIELDS.addressLine1 :
            errors.city ? LISTING_FIELDS.city :
            errors.state ? LISTING_FIELDS.state :
            errors.postalCode ? LISTING_FIELDS.postalCode : ''} />}
      </div>

      <div className="form-item">
        <InputLabel>Country</InputLabel>
        <SelectBoxWrapper suffixSize="tiny">
          <select
            id={LISTING_FIELDS.country}
            name={LISTING_FIELDS.country}
            onFocus={() => setFocus(LISTING_FIELDS.country)}
            onBlur={() => setFieldTouched(LISTING_FIELDS.country, true)}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFieldValue(LISTING_FIELDS.country, event.target.value)}
            value={values.country}
          >
            {COUNTRY_CODES.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          <label htmlFor={LISTING_FIELDS.country}>
            <Svg className="suffix" src="utils/carat-down" />
          </label>
        </SelectBoxWrapper>
        <StyledErrorMessage name={LISTING_FIELDS.country} />
      </div>

      <div className="form-item map-preview">
        <InputLabel>Location Preview on Map</InputLabel>
        <GoogleMaps
          address={address}
          getCoordinates={({ lat, lng }) => {
            if (isCoordinateValid(lat, values.lat)) {
              setFieldValue(LISTING_FIELDS.lat, lat);
            }
            if (isCoordinateValid(lng, values.lng)) {
              setFieldValue(LISTING_FIELDS.lng, lng);
            }
            return { lat, lng };
          }}
          showMarker
        />
        {<StyledErrorMessage name={
          errors.lat ? LISTING_FIELDS.lat :
          errors.lng ? LISTING_FIELDS.lng : ''} />}
      </div>

      <div className="form-item photo" onMouseEnter={() => setFocus(LISTING_FIELDS.listingPicUrl)}>
        <InputLabel htmlFor={LISTING_FIELDS.listingPicUrl} subLabel="(required)">Cover Photo</InputLabel>
        <PhotoUploader
          initialPhotos={values.listingPicUrl ? [{ url: values.listingPicUrl }] : []}
          maxFiles={1}
          onClick={() => setFocus(LISTING_FIELDS.listingPicUrl)}
          onPhotosUpdated={(photo: Photo[]) => {
            setFieldTouched(LISTING_FIELDS.listingPicUrl, true);
            setFieldValue(LISTING_FIELDS.listingPicUrl, photo[0] ? photo[0].url : '');
          }} />
        <StyledErrorMessage name={LISTING_FIELDS.listingPicUrl} />
      </div>

      <div className="form-item photo" onMouseEnter={() => setFocus(LISTING_FIELDS.photos)}>
        <InputLabel htmlFor={LISTING_FIELDS.photos} subLabel="(required, limit 25)">
          Listing Photos
        </InputLabel>
        <PhotoUploader
          initialPhotos={(values.photos || []).map((url: string) => {
            return { url };
          })}
          maxFiles={25}
          onClick={() => setFocus(LISTING_FIELDS.photos)}
          onPhotosUpdated={(photo: Photo[]) => {
            setFieldTouched(LISTING_FIELDS.photos, true);
            setFieldValue(LISTING_FIELDS.photos, photo.map(photo => photo.url));
          }} />
        <StyledErrorMessage name={LISTING_FIELDS.photos} />
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
