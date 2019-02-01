import * as React from 'react';

import InputLabel from 'shared/InputLabel';
import InputWrapper from 'shared/InputWrapper';
import Textarea from 'shared/Textarea';
import { TextareaEvent } from 'shared/Textarea/Textarea';
import { Field, ErrorMessage } from 'formik';
import { stringToArray, arrayToString } from 'utils/formatter';
import ErrorMessageWrapper from 'shared/ErrorMessageWrapper/ErrorMessageWrapper';
import NumberInput from 'shared/NumberInput';

const PricingAvailabilityForm = (props: any): JSX.Element => {
  const { setFocus, setFieldTouched, setFieldValue, values } = props;
  return (
    <>
      <div className="form-item">
        <div className="input-container max-guests">
          <InputLabel htmlFor="maxGuests">Max Guests</InputLabel>
          <NumberInput
            value={values.maxGuests}
            max={16}
            min={1}
            onChange={(value: number) => {
              setFieldValue('maxGuests', value);
              setFieldTouched('maxGuests');
              setFocus('maxGuests');
            }}
          />
        </div>
      </div>

      <div className="form-item short">
        <div className="input-container">
          <InputLabel htmlFor="minimumNights">Min Nights</InputLabel>
          <InputWrapper>
            <Field
              onFocus={() => setFocus('minimumNights')}
              name="minimumNights"
              placeholder="# of nights"
              type="number" />
          </InputWrapper>
          <ErrorMessageWrapper>
            <ErrorMessage name="minimumNights" />
          </ErrorMessageWrapper>
        </div>
      </div>

      <div className="form-item short">
        <div className="input-container">
          <InputLabel htmlFor="pricePerNightUsd" subLabel="(USD)">Price Per Night</InputLabel>
          <InputWrapper>
            <Field
              onFocus={() => setFocus('pricePerNightUsd')}
              name="pricePerNightUsd"
              placeholder="$"
              type="number" />
          </InputWrapper>
          <ErrorMessageWrapper>
            <ErrorMessage name="pricePerNightUsd" />
          </ErrorMessageWrapper>
        </div>
      </div>
      
      <div className="form-item short">
        <div className="input-container security-deposit">
          <InputLabel htmlFor="securityDepositUsd" subLabel="(USD)">Security Deposit</InputLabel>
          <InputWrapper>
            <Field
              onFocus={() => setFocus('securityDepositUsd')}
              name="securityDepositUsd"
              placeholder="$"
              type="number" />
          </InputWrapper>
          <ErrorMessageWrapper>
            <ErrorMessage name="securityDepositUsd" />
          </ErrorMessageWrapper>
        </div>
      </div>

      <div className="form-item">
        <InputLabel htmlFor="icalUrls" subLabel="(separate by comma)">iCal URLs:</InputLabel>
        <Textarea
          textareaHeight="80px"
          name="icalUrls"
          onBlur={() => setFieldTouched('icalUrls', true)}
          onFocus={() => setFocus('icalUrls')}
          onChange={(event: TextareaEvent) => {
            setFieldValue('icalUrls', stringToArray(event.target.value));
          }}
          value={arrayToString(values.icalUrls)}
          placeholder="https://www.airbnb.com/calendar/ical/XXX" />
      </div>
    </>
  );
}

export default PricingAvailabilityForm;
