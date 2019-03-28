import * as React from 'react';
import DividerContainer from './Divider.container';
import { generateClassNamesFromProps } from 'styled/utils';

/**
 * This component is a general divider.
 *
 * @author kevin
 * 
 * Created: July 10, 2018
 **/

type DividerProps = Partial<{
  className: string;
  color: string;
  size: string;
}>

interface DividerClassesObjectProps { 
  [key: string]: string;
}

const Divider = (props: DividerProps) => {
  return (
    <DividerContainer className={getDividerContainerClasses(props)} />
  );
};

const getDividerContainerClasses = (props: DividerProps): string => {
  const { className, color, size } = props;
  const dividerClassesObject: DividerClassesObjectProps = { 
    color: !!color ? `bee-divider-color__${color}` : '',
    defaultClassName: 'bee-divider',
    size: !!size ? `bee-divider-size__${size}` : '',
    className: !!className ? className : ''
  };

  return generateClassNamesFromProps(dividerClassesObject);
};

/** @component */
export default Divider;