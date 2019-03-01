import * as React from 'react';

import { DateRangePicker, DateRangePickerShape } from 'react-dates';

import WorkDateRangePickerContainer from 'styled/containers/WorkDateRangePicker.container';

const WorkDateRangePicker = (props: DateRangePickerShape) => (
  <WorkDateRangePickerContainer>
    <DateRangePicker {...props} />
  </WorkDateRangePickerContainer>
);

export default WorkDateRangePicker;
