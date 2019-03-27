import * as React from 'react';
import { Spinner } from 'reactstrap';

type Props = Partial<{
  color: string; // 'primary'
  className?: string;
  height: string; // '8rem'
  type: string; // 'grow' or 'border'
  width: string; // '8rem'
}>;

const Loading = (props: Props) => {
  const { className, color, height, type, width } = props;
  const style = {
    height: height || '3rem',
    width: width || '3rem',
  };

  return <Spinner className={`${className || ''}`.trim()} color={color || 'primary'} style={style} type={type || 'grow'} />;
};

export default Loading;
