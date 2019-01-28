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
import { Field, FormikProps, ErrorMessage } from 'formik';
import { TextareaEvent } from 'components/shared/Textarea/Textarea';
import { ListingInput } from 'networking/listings';
import ErrorMessageWrapper from 'components/shared/ErrorMessageWrapper';

const LAT_LNG_EPSILON = Math.pow(10, -6); // decimal places stored in db

const ListingInfoForm = (props: FormikProps<ListingInput>): JSX.Element => {
  const { errors, setFieldValue, setFieldTouched, values } = props;
  const { addressLine1, city, postalCode, state } = values;
  const address = formatAddress(addressLine1, city, state, postalCode);
  return (
    <>
      <div className="form-item">
        <InputLabel>Type of Home</InputLabel>
        <SelectBoxWrapper suffixSize="tiny">
          <select 
            id="homeType"
            name="homeType"
            onBlur={() => setFieldTouched('homeType', true)}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFieldValue('homeType', event.target.value)}
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
        <ErrorMessageWrapper>
          <ErrorMessage name="homeType" />
        </ErrorMessageWrapper>
      </div>

      <div className="form-item">
        <InputLabel htmlFor="title">Listing Name</InputLabel>
        <InputWrapper>
          <Field
            name="title"
            placeholder="Title"
            type="text" />
        </InputWrapper>
        <ErrorMessageWrapper>
          <ErrorMessage name="title" />
        </ErrorMessageWrapper>
      </div>

      <div className="form-item">
        <InputLabel htmlFor="description">Listing Description</InputLabel>
        <Textarea
          html
          name="description"
          onBlur={() => setFieldTouched('description', true)}
          onChange={(event: TextareaEvent) => {
            setFieldValue('description', event.target.value);
          }}
          value={values.description}
          placeholder="Tell us about your home" />
          <ErrorMessageWrapper>
            <ErrorMessage name="description" />
          </ErrorMessageWrapper>
      </div>

      <div className="form-item address">
        <InputLabel htmlFor="addressLine1">Full Address</InputLabel>
        <InputWrapper>
          <Field
            name="addressLine1"
            placeholder="Address Line 1"
            type="text" />
        </InputWrapper>

        <InputWrapper>
          <Field
            name="addressLine2"
            placeholder="Address Line 2"
            type="text" />
        </InputWrapper>

        <div className="row-address">
          <InputWrapper>
            <Field
              name="city"
              placeholder="City"
              type="text" />
          </InputWrapper>
          <InputWrapper>
            <Field
              name="state"
              placeholder="State"
              type="text" />
          </InputWrapper>
          <InputWrapper>
            <Field
              name="postalCode"
              placeholder="88888"
              type="text" />
          </InputWrapper>
        </div>
        <ErrorMessageWrapper>
          {errors.addressLine1 && <ErrorMessage name="addressLine1" /> ||
            errors.city && <ErrorMessage name="city" /> ||
            errors.state && <ErrorMessage name="state" /> ||
            errors.postalCode && <ErrorMessage name="postalCode" />}
        </ErrorMessageWrapper>
      </div>

      <div className="form-item">
        <InputLabel>Country</InputLabel>
        <SelectBoxWrapper suffixSize="tiny">
          <select 
            id="country"
            name="country"
            onBlur={() => setFieldTouched('country', true)}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFieldValue('country', event.target.value)}
            value={values.country}>
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
        <ErrorMessageWrapper>
          <ErrorMessage name="country" />
        </ErrorMessageWrapper>
      </div>

      <div className="form-item map-preview">
        <InputLabel>Location Preview on Map</InputLabel>
        <GoogleMaps
          address={address}
          getCoordinates={({ lat, lng }) => {
            if ((lat || lat === 0) && (values.lat || values.lat === 0) && Math.abs(lat - values.lat) > LAT_LNG_EPSILON) {
              setFieldValue('lat', lat);
            }
            if ((lng || lng === 0) && (values.lng || values.lng === 0) && Math.abs(lng - values.lng) > LAT_LNG_EPSILON) {
              setFieldValue('lng', lng);
            }
            return { lat, lng };
          }}
          showMarker />
      </div>

      <div className="form-item photo">
        <InputLabel htmlFor="listingPicUrl">Cover Photo:</InputLabel>
        <PhotoUploader
          initialPhotos={values.listingPicUrl ? [{ url: values.listingPicUrl }] : []}
          maxFiles={1}
          onPhotosUpdated={(photo: Photo[]) => {
            setFieldTouched('listingPicUrl', true);
            setFieldValue('listingPicUrl', photo[0] ? photo[0].url : '');
          }} />
          <ErrorMessageWrapper>
            <ErrorMessage name="listingPicUrl" />
          </ErrorMessageWrapper>
      </div>

      <div className="form-item photo">
        <InputLabel htmlFor="photos" subLabel="(limit 25)">
          Listing Photos:
        </InputLabel>
        <PhotoUploader
          initialPhotos={(values.photos || []).map((url: string) => {
              return { url };
            })
          }
          maxFiles={25}
          onPhotosUpdated={(photo: Photo[]) => {
            setFieldTouched('photos', true);
            setFieldValue('photos', photo.map(photo => photo.url));
          }} />
          <ErrorMessageWrapper>
            <ErrorMessage name="photos" />
          </ErrorMessageWrapper>
      </div>
    </>
  );
}

export default ListingInfoForm;
