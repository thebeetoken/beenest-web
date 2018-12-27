import * as React from 'react';

import InputLabel from 'shared/InputLabel';
import InputWrapper from 'shared/InputWrapper';
import Textarea from 'shared/Textarea';
import { TextareaEvent } from 'components/shared/Textarea/Textarea';
import { Field } from 'formik';
import { stringToArray, arrayToString } from 'utils/formatter';

const PricingAvailabilityForm = (props: any): JSX.Element => {
  const { setFieldTouched, setFieldValue, values } = props;
  return (
    <>
      <div className="form-item max-guests">
        <InputLabel htmlFor="maxGuests">Max Guests</InputLabel>
        <InputWrapper>
          <Field
            name="maxGuests"
            placeholder="# of Guests"
            type="number" />
        </InputWrapper>
      </div>

      <div className="form-item min-nights">
        <InputLabel htmlFor="minimumNights">Min Nights</InputLabel>
        <InputWrapper>
          <Field
            name="minimumNights"
            placeholder="# of nights"
            type="number" />
        </InputWrapper>
      </div>

      <div className="form-item price-per-night">
        <InputLabel htmlFor="pricePerNightUsd" subLabel="(USD)">Price Per Night</InputLabel>
        <InputWrapper>
          <Field
            name="pricePerNightUsd"
            placeholder="$"
            type="number" />
        </InputWrapper>
      </div>

      <div className="form-item security-deposit">
        <InputLabel htmlFor="securityDepositUsd">Security Deposit</InputLabel>
        <InputWrapper>
          <Field
            name="securityDepositUsd"
            placeholder="$"
            type="number" />
        </InputWrapper>
      </div>

      <div className="form-item">
        <InputLabel htmlFor="icalUrls">iCal URL:</InputLabel>
        <Textarea
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
