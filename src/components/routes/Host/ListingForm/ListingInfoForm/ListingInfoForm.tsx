import * as React from 'react';
import { Field, ErrorMessage } from 'formik';

import { ListingField } from 'networking/listings';
import ErrorMessageWrapper from 'shared/ErrorMessageWrapper';
import InputLabel from 'shared/InputLabel';
import InputWrapper from 'shared/InputWrapper';
import GoogleMaps from 'shared/GoogleMaps';
import { PhotoUploader, Photo } from 'shared/PhotoUploader';
import SelectBoxWrapper from 'shared/SelectBoxWrapper';
import Svg from 'shared/Svg';
import Textarea from 'shared/Textarea';
import { TextareaEvent } from 'shared/Textarea/Textarea';
import { COUNTRY_CODES } from 'utils/countryCodes';
import { formatAddress } from 'utils/formatter';
import { HomeTypeHostForm } from 'utils/validators';

const LAT_LNG_EPSILON = Math.pow(10, -6); // decimal places stored in db

const ListingInfoForm = (props: any): JSX.Element => {
  const { errors, setFieldValue, setFieldTouched, setFocus, values } = props;
  const { addressLine1, city, country, postalCode, state } = values;
  const address = formatAddress(addressLine1, city, state, postalCode, country);
  const StyledErrorMessage = (props: { name: string }) => (
    <ErrorMessageWrapper>
      {props.name && <ErrorMessage {...props} />}
    </ErrorMessageWrapper>
  );
  return (
    <>
      <div className="form-item">
        <InputLabel>Type of Home</InputLabel>
        <SelectBoxWrapper
          borderColor="body"
          borderSize="1px"
          focusBorderColor="style"
          suffixSize="tiny">
          <select
            id={ListingField.HOME_TYPE}
            name={ListingField.HOME_TYPE}
            onBlur={() => setFieldTouched(ListingField.HOME_TYPE, true)}
            onFocus={() => setFocus(ListingField.HOME_TYPE)}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setFieldValue(ListingField.HOME_TYPE, event.target.value);
            }}
            value={values.homeType}>
            {Object.values(HomeTypeHostForm).map((value: HomeTypeHostForm) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
          <label htmlFor={ListingField.HOME_TYPE}>
            <Svg className="suffix" src="utils/carat-down" />
          </label>
        </SelectBoxWrapper>
        <StyledErrorMessage name={ListingField.HOME_TYPE} />
      </div>

      <div className="form-item">
        <InputLabel htmlFor={ListingField.TITLE} subLabel="(required)">
          Listing Name
        </InputLabel>
        <InputWrapper>
          <Field
            onFocus={() => setFocus(ListingField.TITLE)}
            name={ListingField.TITLE}
            placeholder={ListingField.TITLE}
            type="text" />
        </InputWrapper>
        <StyledErrorMessage name={ListingField.TITLE} />
      </div>

      <div className="form-item">
        <InputLabel htmlFor={ListingField.DESCRIPTION} subLabel="(required)">Listing Description</InputLabel>
        <Textarea
          html
          name={ListingField.DESCRIPTION}
          onBlur={() => setFieldTouched(ListingField.DESCRIPTION, true)}
          onChange={(event: TextareaEvent) => {
            setFieldValue(ListingField.DESCRIPTION, event.target.value);
          }}
          onFocus={() => setFocus(ListingField.DESCRIPTION)}
          value={values.description}
          placeholder="Tell us about your home"
        />
        <StyledErrorMessage name={ListingField.DESCRIPTION} />
      </div>

      <div className="form-item address">
        <InputLabel htmlFor={ListingField.ADDRESS_LINE_1} subLabel="(required)">Full Address</InputLabel>
        {[
          {
            name: ListingField.ADDRESS_LINE_1,
            onFocus: () => setFocus(ListingField.ADDRESS_LINE_1),
            placeholder: 'Address Line 1',
            type: 'text',
          },
          {
            name: ListingField.ADDRESS_LINE_2,
            onFocus: () => setFocus(ListingField.ADDRESS_LINE_2),
            placeholder: 'Address Line 2',
            type: 'text',
          },
          {
            className: 'city',
            name: ListingField.CITY,
            onFocus: () => setFocus(ListingField.CITY),
            placeholder: 'City',
            type: 'text',
          },
          {
            className: 'state',
            name: ListingField.STATE,
            onFocus: () => setFocus(ListingField.STATE),
            placeholder: 'State',
            type: 'text',
          },
          {
            className: 'postal-code',
            name: ListingField.POSTAL_CODE,
            onFocus: () => setFocus(ListingField.POSTAL_CODE),
            placeholder: '88888',
            type: 'text',
          },
        ].map(({ className, name, onFocus, placeholder, type }) => (
          <InputWrapper key={name} className={className}>
            <Field name={name} onFocus={onFocus} placeholder={placeholder} type={type} />
          </InputWrapper>
        ))}
        <SelectBoxWrapper
          borderColor="body"
          borderSize="1px"
          className="country"
          focusBorderColor="style"
          suffixSize="tiny">
          <select
            id={ListingField.COUNTRY}
            name={ListingField.COUNTRY}
            onFocus={() => setFocus(ListingField.COUNTRY)}
            onBlur={() => setFieldTouched(ListingField.COUNTRY, true)}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFieldValue(ListingField.COUNTRY, event.target.value)}
            value={values.country}>
            {COUNTRY_CODES.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          <label htmlFor={ListingField.COUNTRY}>
            <Svg className="suffix" src="utils/carat-down" />
          </label>
        </SelectBoxWrapper>
        {<StyledErrorMessage name={
            errors.addressLine1 ? ListingField.ADDRESS_LINE_1 :
            errors.city ? ListingField.CITY :
            errors.state ? ListingField.STATE :
            errors.postalCode ? ListingField.POSTAL_CODE :
            errors.country ? ListingField.COUNTRY : ''} />}
      </div>

      <div className="form-item map-preview">
        <InputLabel>Location Preview on Map</InputLabel>
        <GoogleMaps
          address={address}
          getCoordinates={({ lat, lng }) => {
            if (isCoordinateValid(lat, values.lat)) {
              setFieldValue(ListingField.LAT, lat);
            }
            if (isCoordinateValid(lng, values.lng)) {
              setFieldValue(ListingField.LNG, lng);
            }
            return { lat, lng };
          }}
          showMarker
        />
        {<StyledErrorMessage name={
          errors.lat ? ListingField.LAT :
          errors.lng ? ListingField.LNG : ''} />}
      </div>

      <div className="form-item photo" onMouseEnter={() => setFocus(ListingField.LISTING_PIC_URL)}>
        <InputLabel htmlFor={ListingField.LISTING_PIC_URL} subLabel="(required)">Cover Photo</InputLabel>
        <PhotoUploader
          initialPhotos={values.listingPicUrl ? [{ url: values.listingPicUrl }] : []}
          maxFiles={1}
          onClick={() => setFocus(ListingField.LISTING_PIC_URL)}
          onPhotosUpdated={(photo: Photo[]) => {
            setFieldTouched(ListingField.LISTING_PIC_URL, true);
            setFieldValue(ListingField.LISTING_PIC_URL, photo[0] ? photo[0].url : '');
          }} />
        <StyledErrorMessage name={ListingField.LISTING_PIC_URL} />
      </div>

      <div className="form-item photo" onMouseEnter={() => setFocus(ListingField.PHOTOS)}>
        <InputLabel htmlFor={ListingField.PHOTOS} subLabel="(required, limit 25)">
          Listing Photos
        </InputLabel>
        <PhotoUploader
          initialPhotos={(values.photos || []).map((url: string) => {
            return { url };
          })}
          maxFiles={25}
          onClick={() => setFocus(ListingField.PHOTOS)}
          onPhotosUpdated={(photo: Photo[]) => {
            setFieldTouched(ListingField.PHOTOS, true);
            setFieldValue(ListingField.PHOTOS, photo.map(photo => photo.url));
          }} />
        <StyledErrorMessage name={ListingField.PHOTOS} />
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
