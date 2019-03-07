import * as React from 'react';

import { DateRangePicker, DateRangePickerShape } from 'react-dates';

import WorkDateRangePickerContainer from 'styled/containers/WorkDateRangePicker.container';

interface Props extends DateRangePickerShape {
  className?: string;
}

const WorkDateRangePicker = (props: Props) => (
  <WorkDateRangePickerContainer className={props.className}>
    <DateRangePicker {...props} />
  </WorkDateRangePickerContainer>
);

export default WorkDateRangePicker;
