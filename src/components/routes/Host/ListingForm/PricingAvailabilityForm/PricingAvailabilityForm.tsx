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
  const { LISTING_FIELDS, setFocus, setFieldTouched, setFieldValue, values } = props;
  const StyledErrorMessage = (props: { name: string }) => (
    <ErrorMessageWrapper>
      {props.name && <ErrorMessage {...props} />}
    </ErrorMessageWrapper>
  );
  return (
    <>
      <div className="form-item">
        <div className="input-container max-guests">
          <InputLabel htmlFor={LISTING_FIELDS.maxGuests}>Max Guests</InputLabel>
          <NumberInput
            value={values.maxGuests}
            max={16}
            min={1}
            onChange={(value: number) => {
              setFieldValue(LISTING_FIELDS.maxGuests, value);
              setFieldTouched(LISTING_FIELDS.maxGuests);
              setFocus(LISTING_FIELDS.maxGuests);
            }}
          />
        </div>
        <StyledErrorMessage name={LISTING_FIELDS.maxGuests} />
      </div>

      <div className="form-item short">
        <div className="input-container">
          <InputLabel htmlFor={LISTING_FIELDS.minimumNights} subLabel="(required)">Min Nights</InputLabel>
          <InputWrapper>
            <Field
              onFocus={() => setFocus(LISTING_FIELDS.minimumNights)}
              name={LISTING_FIELDS.minimumNights}
              placeholder="# of nights"
              type="number" />
          </InputWrapper>
          <StyledErrorMessage name={LISTING_FIELDS.minimumNights} />
        </div>
      </div>

      <div className="form-item short">
        <div className="input-container">
          <InputLabel htmlFor={LISTING_FIELDS.pricePerNightUsd} subLabel="(required)">Price Per Night USD</InputLabel>
          <InputWrapper>
            <Field
              onFocus={() => setFocus(LISTING_FIELDS.pricePerNightUsd)}
              name={LISTING_FIELDS.pricePerNightUsd}
              placeholder="$"
              type="number" />
          </InputWrapper>
          <StyledErrorMessage name={LISTING_FIELDS.pricePerNightUsd} />
        </div>
      </div>
      
      <div className="form-item short">
        <div className="input-container">
          <InputLabel htmlFor={LISTING_FIELDS.securityDepositUsd} subLabel="(required)">Security Deposit USD</InputLabel>
          <InputWrapper>
            <Field
              onFocus={() => setFocus(LISTING_FIELDS.securityDepositUsd)}
              name={LISTING_FIELDS.securityDepositUsd}
              placeholder="$"
              type="number" />
          </InputWrapper>
          <StyledErrorMessage name={LISTING_FIELDS.securityDepositUsd} />
        </div>
      </div>

      <div className="form-item">
        <InputLabel htmlFor={LISTING_FIELDS.icalUrls} subLabel="(separate by comma)">iCal URLs:</InputLabel>
        <Textarea
          textareaHeight="80px"
          name={LISTING_FIELDS.icalUrls}
          onBlur={() => setFieldTouched(LISTING_FIELDS.icalURls, true)}
          onFocus={() => setFocus(LISTING_FIELDS.icalURls)}
          onChange={(event: TextareaEvent) => {
            setFieldValue(LISTING_FIELDS.icalURls, stringToArray(event.target.value));
          }}
          value={arrayToString(values.icalUrls)}
          placeholder="https://www.airbnb.com/calendar/ical/XXX" />
        <StyledErrorMessage name={LISTING_FIELDS.icalUrls} />
      </div>
    </>
  );
}

export default PricingAvailabilityForm;
