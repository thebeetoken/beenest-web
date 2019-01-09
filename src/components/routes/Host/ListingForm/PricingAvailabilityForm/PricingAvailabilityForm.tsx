import * as React from 'react';

import InputLabel from 'shared/InputLabel';
import InputWrapper from 'shared/InputWrapper';
import Textarea from 'shared/Textarea';
import { TextareaEvent } from 'shared/Textarea/Textarea';
import { Field, ErrorMessage } from 'formik';
import { stringToArray, arrayToString } from 'utils/formatter';
import ErrorMessageWrapper from 'shared/ErrorMessageWrapper/ErrorMessageWrapper';

const PricingAvailabilityForm = (props: any): JSX.Element => {
  const { setFieldTouched, setFieldValue, values } = props;
  return (
    <>
      <div className="form-item row">
        <div className="input-container max-guests">
          <InputLabel htmlFor="maxGuests">Max Guests</InputLabel>
          <InputWrapper>
            <Field
              name="maxGuests"
              placeholder="# of Guests"
              type="number" />
          </InputWrapper>
          <ErrorMessageWrapper>
            <ErrorMessage name="maxGuests" />
          </ErrorMessageWrapper>
        </div>

        <div className="input-container min-nights">
          <InputLabel htmlFor="minimumNights">Min Nights</InputLabel>
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

      <div className="form-item row">
        <div className="input-container price-per-night">
          <InputLabel htmlFor="pricePerNightUsd" subLabel="(USD)">Price Per Night</InputLabel>
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

        <div className="input-container security-deposit">
          <InputLabel htmlFor="securityDepositUsd" subLabel="(USD)">Security Deposit</InputLabel>
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
      </div>
    </>
  );
}

export default PricingAvailabilityForm;
