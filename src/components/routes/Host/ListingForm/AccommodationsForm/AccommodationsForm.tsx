import * as React from 'react';

import InputLabel from 'shared/InputLabel';
import InputWrapper from 'shared/InputWrapper';
import NumberInput from 'shared/NumberInput';
import Textarea from 'shared/Textarea';
import { TextareaEvent } from 'shared/Textarea/Textarea';
import { stringToArray, arrayToString } from 'utils/formatter';
import Checkbox from 'shared/Checkbox';
import { Field } from 'formik';

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

      <div className="form-item row">

        <div className="input-container">
          <InputLabel htmlFor="sleepingArrangement">Sleeping Arrangement</InputLabel>
          <InputWrapper>
            <Field
              name="sleepingArrangement"
              placeholder="# of Beds"
              type="text" />
          </InputWrapper>
        </div>
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
            min={1}
            onChange={(value: number) => {
              setFieldValue('numberOfBathrooms', value);
              setFieldTouched('numberOfBathrooms');
            }}
            step={0.5}
          />
        </div>
      </div>

      <Checkbox
        checked={values.sharedBathroom === 'Yes' || values.sharedBathroom === 'yes'}
        onChange={() => {
          const value = (values.sharedBathroom === 'Yes' || values.sharedBathroom === 'yes') ? 'No' : 'Yes';
          setFieldValue('sharedBathroom', value);
          setFieldTouched('sharedBathroom', true);
        }}>
        Shared Bathroom
      </Checkbox>

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
      </div>
    </>
  );
};

export default AccommodationsForm;
