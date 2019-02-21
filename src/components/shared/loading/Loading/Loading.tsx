import * as React from 'react';
import { Spinner } from 'reactstrap';

type Props = Partial<{
  color: string; // 'primary'
  height: string; // '8rem'
  type: string; // 'grow' or 'border'
  width: string; // '8rem'
}>;

const PulseLoading = (props: Props) => {
  const { color, height, type, width } = props;
  const style = {
    height: height || '3rem',
    width: width || '3rem',
  };

  return <Spinner color={color || 'primary'} style={style} type={type || 'grow'} />;
};

export default PulseLoading;
