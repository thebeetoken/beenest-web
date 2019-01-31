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
import { Field, FormikProps } from 'formik';
import { TextareaEvent } from 'components/shared/Textarea/Textarea';
import { ListingInput } from 'networking/listings';

const LAT_LNG_EPSILON = Math.pow(10, -6); // decimal places stored in db

const ListingInfoForm = (props: any): JSX.Element => {
  const { setFocus, setFieldValue, setFieldTouched, values } = props;
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
      </div>

      <div className="form-item">
        <InputLabel htmlFor="title">Listing Name</InputLabel>
        <InputWrapper>
          <Field
            onFocus={() => setFocus('title')}
            name="title"
            placeholder="Title"
            type="text" />
        </InputWrapper>
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
          onFocus={() => setFocus('description')}
          value={values.description}
          placeholder="Tell us about your home" />
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
          onPhotosUpdated={(photo: Photo[]) => setFieldValue('listingPicUrl', photo[0] ? photo[0].url : '')} />
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
          onPhotosUpdated={(photo: Photo[]) => setFieldValue('photos', photo.map(photo => photo.url))} />
      </div>
    </>
  );
}

export default ListingInfoForm;
