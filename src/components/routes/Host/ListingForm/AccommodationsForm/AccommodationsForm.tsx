import * as React from 'react';

import InputLabel from 'shared/InputLabel';
import InputWrapper from 'shared/InputWrapper';
import NumberInput from 'shared/NumberInput';
import Textarea from 'shared/Textarea';
import { TextareaEvent } from 'shared/Textarea/Textarea';
import { stringToArray, arrayToString } from 'utils/formatter';
import Checkbox from 'shared/Checkbox';
import { Field, ErrorMessage } from 'formik';
import ErrorMessageWrapper from 'shared/ErrorMessageWrapper';

const AccommodationsForm = (props: any): JSX.Element => {
  const { LISTING_FIELDS, setFocus, setFieldTouched, setFieldValue, values } = props;
  const StyledErrorMessage = (props: { name: string }) => (
    <ErrorMessageWrapper>
      {props.name && <ErrorMessage {...props} />}
    </ErrorMessageWrapper>
  );
  return (
    <>
      {/* <div className="form-item">
        <InputLabel>Housing Accommodation</InputLabel>
        <SelectBoxWrapper suffixSize="tiny">
          <select id="homeType" name="homeType" value={props.inputForm.homeType} onChange={onInput}>
            <option value={undefined}>
              Choose the Accommodation
            </option>
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
      </div> */}

      <div className="form-item">
        <InputLabel htmlFor={LISTING_FIELDS.sleepingArrangement} subLabel="(required)">Sleeping Arrangement</InputLabel>
        <InputWrapper>
          <Field
            name={LISTING_FIELDS.sleepingArrangement}
            onFocus={() => setFocus(LISTING_FIELDS.sleepingArrangement)}
            placeholder="1 King, 2 Queens"
            type="text" />
        </InputWrapper>
        <StyledErrorMessage name={LISTING_FIELDS.sleepingArrangement} />
      </div>

      <div className="form-item">
        <div className="input-number-container">
          <InputLabel>Number of Bedrooms</InputLabel>
          <NumberInput
            value={values.numberOfBedrooms}
            max={50}
            min={1}
            onChange={(value: number) => {
              setFieldValue(LISTING_FIELDS.numberOfBedrooms, value);
              setFieldTouched(LISTING_FIELDS.numberOfBedrooms);
              setFocus(LISTING_FIELDS.numberOfBedrooms);
            }}
          />
        </div>
      </div>

      <div className="form-item">
        <div className="input-number-container">
          <InputLabel>Number of Bathrooms</InputLabel>
          <NumberInput
            value={values.numberOfBathrooms}
            max={50}
            min={0}
            onChange={(value: number) => {
              setFieldValue(LISTING_FIELDS.numberOfBathrooms, value);
              setFieldTouched(LISTING_FIELDS.numberOfBathrooms);
              setFocus(LISTING_FIELDS.numberOfBathrooms);
            }}
            step={0.5}
          />
        </div>
      </div>

      <div className="form-item">
        <Checkbox
          checked={isSharedBathroom(values.sharedBathroom)}
          onChange={() => {
            const value = isSharedBathroom(values.sharedBathroom) ? 'No' : 'Yes';
            setFieldValue(LISTING_FIELDS.sharedBathroom, value);
            setFieldTouched(LISTING_FIELDS.sharedBathroom, true);
            setFocus(LISTING_FIELDS.sharedBathroom);
          }}>
          <InputLabel subLabel="(click box to confirm bathroom is shared)">
            Shared Bathroom
          </InputLabel>
        </Checkbox>
      </div>

      <div className="form-item">
        <InputLabel htmlFor={LISTING_FIELDS.amenities} subLabel="(required, separate by comma)">Amenities</InputLabel>
        <Textarea
          name={LISTING_FIELDS.amenities}
          onBlur={() => setFieldTouched(LISTING_FIELDS.amenities, true)}
          onFocus={() => setFocus(LISTING_FIELDS.amenities)}
          onChange={(event: TextareaEvent) => {
            setFieldValue(LISTING_FIELDS.amenities, stringToArray(event.target.value));
          }}
          value={arrayToString(values.amenities)}
          placeholder="Wifi, Towels, Soap, TV, Coffee..." />
          <StyledErrorMessage name={LISTING_FIELDS.amenities} />
      </div>
    </>
  );
};

export default AccommodationsForm;

// Temporary fix until sharedBathroom is changed into a boolean
function isSharedBathroom(input: string): boolean {
  if (!input) return false;
  if (parseInt(input) && (parseInt(input) !== 0)) {
    return true;
  }
  const normalizedInput = input.toLowerCase();
  return normalizedInput === 'yes';
}
