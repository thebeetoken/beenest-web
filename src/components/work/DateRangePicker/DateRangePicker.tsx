import * as React from 'react';
import omit from 'lodash.omit';

import { DateRangePicker, DateRangePickerShape } from 'react-dates';

import WorkDateRangePickerContainer from 'styled/containers/WorkDateRangePicker.container';

interface Props extends DateRangePickerShape {
  className?: string;
}

const WorkDateRangePicker = (props: Props) => (
  <WorkDateRangePickerContainer className={props.className}>
    <DateRangePicker {...omit(props, ['className'])} />
  </WorkDateRangePickerContainer>
);

export default WorkDateRangePicker;
