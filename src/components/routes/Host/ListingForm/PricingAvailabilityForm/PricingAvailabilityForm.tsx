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
  const StyledErrorMessage = (props: { name: string }) => (
    <ErrorMessageWrapper>
      {props.name && <ErrorMessage {...props} />}
    </ErrorMessageWrapper>
  );
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
        <StyledErrorMessage name="maxGuests" />
      </div>

      <div className="form-item short">
        <div className="input-container">
          <InputLabel htmlFor="minimumNights" subLabel="(required)">Min Nights</InputLabel>
          <InputWrapper>
            <Field
              onFocus={() => setFocus('minimumNights')}
              name="minimumNights"
              placeholder="# of nights"
              type="number" />
          </InputWrapper>
          <StyledErrorMessage name="minimumNights" />
        </div>
      </div>

      <div className="form-item short">
        <div className="input-container">
          <InputLabel htmlFor="pricePerNightUsd" subLabel="(required)">Price Per Night USD</InputLabel>
          <InputWrapper>
            <Field
              onFocus={() => setFocus('pricePerNightUsd')}
              name="pricePerNightUsd"
              placeholder="$"
              type="number" />
          </InputWrapper>
          <StyledErrorMessage name="pricePerNightUsd" />
        </div>
      </div>
      
      <div className="form-item short">
        <div className="input-container security-deposit">
          <InputLabel htmlFor="securityDepositUsd" subLabel="(required)">Security Deposit USD</InputLabel>
          <InputWrapper>
            <Field
              onFocus={() => setFocus('securityDepositUsd')}
              name="securityDepositUsd"
              placeholder="$"
              type="number" />
          </InputWrapper>
          <StyledErrorMessage name="securityDepositUsd" />
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
        <StyledErrorMessage name="icalUrls" />
      </div>
    </>
  );
}

export default PricingAvailabilityForm;
