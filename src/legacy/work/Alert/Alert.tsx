import * as React from 'react';
import { Alert as ReactStrapAlert } from 'reactstrap';

export interface AlertProperties {
  msg: string,
  color: string,
  show: boolean,
}

const Alert = (props: AlertProperties) => (
  <ReactStrapAlert {...props} />
);

export default Alert;