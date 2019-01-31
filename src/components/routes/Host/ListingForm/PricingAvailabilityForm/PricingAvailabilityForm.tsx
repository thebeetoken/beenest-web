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
  const { setFieldTouched, setFieldValue, values } = props;
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
            }}
          />
        </div>
        <ErrorMessageWrapper>
          <ErrorMessage name="maxGuests" />
        </ErrorMessageWrapper>
      </div>

      <div className="form-item short">
        <div className="input-container">
          <InputLabel htmlFor="minimumNights" subLabel="(required)">Min Nights</InputLabel>
          <InputWrapper>
            <Field
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
          <InputLabel htmlFor="pricePerNightUsd" subLabel="(required)">Price Per Night USD</InputLabel>
          <InputWrapper>
            <Field
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
          <InputLabel htmlFor="securityDepositUsd" subLabel="(required)">Security Deposit USD</InputLabel>
          <InputWrapper>
            <Field
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
          onChange={(event: TextareaEvent) => {
            setFieldValue('icalUrls', stringToArray(event.target.value));
          }}
          value={arrayToString(values.icalUrls)}
          placeholder="https://www.airbnb.com/calendar/ical/XXX" />
          <ErrorMessageWrapper>
            <ErrorMessage name="icalUrls" />
          </ErrorMessageWrapper>
      </div>
    </>
  );
}

export default PricingAvailabilityForm;
