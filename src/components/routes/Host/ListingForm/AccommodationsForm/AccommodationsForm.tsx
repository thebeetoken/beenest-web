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
  const { setFieldTouched, setFieldValue, values } = props;
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
        <InputLabel htmlFor="sleepingArrangement">Sleeping Arrangement</InputLabel>
        <InputWrapper>
          <Field
            name="sleepingArrangement"
            placeholder="1 King, 2 Queens"
            type="text" />
        </InputWrapper>
        <ErrorMessageWrapper>
          <ErrorMessage name="sleepingArrangement" />
        </ErrorMessageWrapper>
      </div>

      <div className="form-item">
        <div className="input-number-container">
          <InputLabel>Number of Bedrooms</InputLabel>
          <NumberInput
            value={values.numberOfBedrooms}
            max={50}
            min={1}
            onChange={(value: number) => {
              setFieldValue('numberOfBedrooms', value);
              setFieldTouched('numberOfBedrooms');
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
              setFieldValue('numberOfBathrooms', value);
              setFieldTouched('numberOfBathrooms');
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
            setFieldValue('sharedBathroom', value);
            setFieldTouched('sharedBathroom', true);
          }}>
          Shared Bathroom
        </Checkbox>
      </div>

      <div className="form-item">
        <InputLabel htmlFor="amenities" subLabel="(separate by comma)">Amenities</InputLabel>
        <Textarea
          name="amenities"
          onBlur={() => setFieldTouched('amenities', true)}
          onChange={(event: TextareaEvent) => {
            setFieldValue('amenities', stringToArray(event.target.value));
          }}
          value={arrayToString(values.amenities)}
          placeholder="Towels, Soap, Detergent" />
          <ErrorMessageWrapper>
            <ErrorMessage name="amenities" />
          </ErrorMessageWrapper>
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
