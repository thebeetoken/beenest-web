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
  const { ListingField, setFocus, setFieldTouched, setFieldValue, values } = props;
  const StyledErrorMessage = (props: { name: string }) => (
    <ErrorMessageWrapper>
      {props.name && <ErrorMessage {...props} />}
    </ErrorMessageWrapper>
  );
  return (
    <>
      <div className="form-item">
        <div className="input-container max-guests">
          <InputLabel htmlFor={ListingField.MAX_GUESTS}>Max Guests</InputLabel>
          <NumberInput
            value={values.maxGuests}
            max={16}
            min={1}
            onChange={(value: number) => {
              setFieldValue(ListingField.MAX_GUESTS, value);
              setFieldTouched(ListingField.MAX_GUESTS);
              setFocus(ListingField.MAX_GUESTS);
            }}
          />
        </div>
        <StyledErrorMessage name={ListingField.MAX_GUESTS} />
      </div>

      <div className="form-item short">
        <div className="input-container">
          <InputLabel htmlFor={ListingField.MINIMUM_NIGHTS} subLabel="(required)">Minimum Nights</InputLabel>
          <InputWrapper>
            <Field
              onFocus={() => setFocus(ListingField.MINIMUM_NIGHTS)}
              name={ListingField.MINIMUM_NIGHTS}
              placeholder="# of nights"
              type="number" />
          </InputWrapper>
          <StyledErrorMessage name={ListingField.MINIMUM_NIGHTS} />
        </div>
      </div>

      <div className="form-item short">
        <div className="input-container">
          <InputLabel htmlFor={ListingField.PRICE_PER_NIGHT_USD} subLabel="(required)">Price Per Night USD</InputLabel>
          <InputWrapper>
            <Field
              onFocus={() => setFocus(ListingField.PRICE_PER_NIGHT_USD)}
              name={ListingField.PRICE_PER_NIGHT_USD}
              placeholder="$"
              type="number" />
          </InputWrapper>
          <StyledErrorMessage name={ListingField.PRICE_PER_NIGHT_USD} />
        </div>
      </div>
      
      <div className="form-item short">
        <div className="input-container">
          <InputLabel htmlFor={ListingField.SECURITY_DEPOSIT_USD} subLabel="(required)">Security Deposit USD</InputLabel>
          <InputWrapper>
            <Field
              onFocus={() => setFocus(ListingField.SECURITY_DEPOSIT_USD)}
              name={ListingField.SECURITY_DEPOSIT_USD}
              placeholder="$"
              type="number" />
          </InputWrapper>
          <StyledErrorMessage name={ListingField.SECURITY_DEPOSIT_USD} />
        </div>
      </div>

      <div className="form-item">
        <InputLabel htmlFor={ListingField.ICAL_URLS} subLabel="(separate by comma)">iCal URLs:</InputLabel>
        <Textarea
          textareaHeight="80px"
          name={ListingField.ICAL_URLS}
          onBlur={() => setFieldTouched(ListingField.ICAL_URLS, true)}
          onFocus={() => setFocus(ListingField.ICAL_URLS)}
          onChange={(event: TextareaEvent) => {
            setFieldValue(ListingField.ICAL_URLS, stringToArray(event.target.value));
          }}
          value={arrayToString(values.icalUrls)}
          placeholder="https://www.airbnb.com/calendar/ical/XXX" />
        <StyledErrorMessage name={ListingField.ICAL_URLS} />
      </div>
    </>
  );
}

export default PricingAvailabilityForm;
