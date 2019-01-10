import * as React from 'react';

import InputLabel from 'shared/InputLabel';
import InputWrapper from 'shared/InputWrapper';
import NumberInput from 'shared/NumberInput';
import Textarea from 'shared/Textarea';
import { Field, ErrorMessage } from 'formik';
import { TextareaEvent } from 'shared/Textarea/Textarea';
import { stringToArray, arrayToString } from 'utils/formatter';
import ErrorMessageWrapper from 'shared/ErrorMessageWrapper/ErrorMessageWrapper';

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
          <InputLabel htmlFor="numberOfBedrooms">Bedrooms</InputLabel>
          <InputWrapper>
            <Field
              name="numberOfBedrooms"
              placeholder="# of Bedrooms"
              type="number" />
          </InputWrapper>
          <ErrorMessageWrapper>
            <ErrorMessage name="numberOfBedrooms" />
          </ErrorMessageWrapper>
        </div>

        <div className="input-container">
          <InputLabel htmlFor="sleepingArrangement">Beds</InputLabel>
          <InputWrapper>
            <Field
              name="sleepingArrangement"
              placeholder="# of Beds"
              type="text" />
          </InputWrapper>
        </div>
      </div>

      <div className="form-item">
        <div className="input-container">
          <InputLabel>Testing Number Input 123</InputLabel>
          <NumberInput
            defaultValue={1}
            max={50}
            min={1} />
        </div>
      </div>

      <div className="form-item row">
        <div className="input-container">
          <InputLabel htmlFor="numberOfBathrooms">Bathrooms</InputLabel>
          <InputWrapper>
            <Field
              name="numberOfBathrooms"
              placeholder="# of Bathrooms"
              step={0.5}
              type="number" />
          </InputWrapper>
          <ErrorMessageWrapper>
            <ErrorMessage name="numberOfBathrooms" />
          </ErrorMessageWrapper>
        </div>
        
        <div className="input-container">
          <InputLabel htmlFor="sharedBathroom">Shared Bathroom</InputLabel>
          <InputWrapper>
            <Field
              name="sharedBathroom"
              placeholder="Yes or No"
              type="text" />
          </InputWrapper>
        </div>
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
      </div>
    </>
  );
};

export default AccommodationsForm;
