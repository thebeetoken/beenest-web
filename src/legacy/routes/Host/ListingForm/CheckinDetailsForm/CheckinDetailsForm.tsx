import * as React from 'react';
import { ErrorMessage } from 'formik';

import { ListingField } from 'networking/listings';
import ErrorMessageWrapper from 'components/shared/ErrorMessageWrapper';
import InputLabel from 'components/shared/InputLabel';
import SelectBoxWrapper from 'components/shared/SelectBoxWrapper';
import Svg from 'components/shared/Svg';
import Textarea from 'components/shared/Textarea';
import { TextareaEvent } from 'components/shared/Textarea/Textarea';
import timeOptions from 'utils/timeOptions';

const CheckinDetailsForm = (props: any): JSX.Element => {
  const { setFocus, setFieldTouched, setFieldValue, values } = props;
  const StyledErrorMessage = (props: { name: string }) => (
    <ErrorMessageWrapper>
      {props.name && <ErrorMessage {...props} />}
    </ErrorMessageWrapper>
  );
  return (

    <>
      <div className="form-item">
        <InputLabel htmlFor="from" subLabel="(from)">Check-in</InputLabel>
        <SelectBoxWrapper suffixSize="tiny">
          <select
            id="from"
            name="from"
            value={values.checkInTime.from}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setFieldTouched(ListingField.CHECK_IN_TIME, true);
              setFieldValue(ListingField.CHECK_IN_TIME, { ...values.checkInTime, from: event.target.value });
            }}
            onFocus={() => setFocus(ListingField.CHECK_IN_TIME)}>
            {timeOptions.map(
              time => <option key={time} value={time}>{time}</option>
            )}
          </select>
          <label htmlFor="from">
            <Svg className="suffix" src="utils/carat-down" />
          </label>
        </SelectBoxWrapper>
      </div>

      <div className="form-item">
        <InputLabel htmlFor="to" subLabel="(to)">Check-in</InputLabel>
        <SelectBoxWrapper suffixSize="tiny">
          <select
            id="to"
            name="to"
            value={values.checkInTime.to}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setFieldTouched(ListingField.CHECK_IN_TIME, true);
              setFieldValue(ListingField.CHECK_IN_TIME, { ...values.checkInTime, to: event.target.value })
            }}
            onFocus={() => setFocus(ListingField.CHECK_IN_TIME)}>
            {timeOptions.map(
              time => <option key={time} value={time}>{time}</option>
            )}
          </select>
          <label htmlFor="to">
            <Svg className="suffix" src="utils/carat-down" />
          </label>
        </SelectBoxWrapper>
        <StyledErrorMessage name={ListingField.CHECK_IN_TIME} />
      </div>

      <div className="form-item">
        <InputLabel htmlFor={ListingField.CHECK_OUT_TIME} subLabel="(before)">Check-out</InputLabel>
        <SelectBoxWrapper suffixSize="tiny">
          <select
            id={ListingField.CHECK_OUT_TIME}
            name={ListingField.CHECK_OUT_TIME}
            value={values.checkOutTime}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFieldValue(ListingField.CHECK_OUT_TIME, event.target.value)}
            onFocus={() => setFocus(ListingField.CHECK_OUT_TIME)}>
            {timeOptions.map(
              time => <option key={time} value={time}>{time}</option>
            )}
          </select>
          <label htmlFor={ListingField.CHECK_OUT_TIME}>
            <Svg className="suffix" src="utils/carat-down" />
          </label>
        </SelectBoxWrapper>
      </div>

      <div className="form-item check-in-details">
        <InputLabel htmlFor={ListingField.HOUSE_RULES} subLabel="(required)">House Rules</InputLabel>
        <Textarea
          html
          name={ListingField.HOUSE_RULES}
          onBlur={() => setFieldTouched(ListingField.HOUSE_RULES, true)}
          onFocus={() => setFocus(ListingField.HOUSE_RULES)}
          onChange={(event: TextareaEvent) => {
            setFieldValue(ListingField.HOUSE_RULES, event.target.value);
          }}
          value={values.houseRules}
          placeholder="Let your guests know about quiet hours, pets, etc." />
        <StyledErrorMessage name={ListingField.HOUSE_RULES} />
      </div>
    </>
  );
}

export default CheckinDetailsForm;
