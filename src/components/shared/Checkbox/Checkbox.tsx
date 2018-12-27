import * as React from 'react';
import Svg from 'shared/Svg';
import CheckboxContainer from './Checkbox.container';
import { generateClassNamesFromProps } from 'styled/utils';

/**
 * This component is a flexible checkbox.
 *
 * @author kevin
 * 
 * Created: July 10, 2018
 **/
interface CheckboxProps {
  checked: boolean;
  children?: any;
  className?: string;
  color?: string;
  hoverColor?: string;
  hoverOpacity?: number;
  icon?: string;
  name?: string;
  onBlur?: (event: React.ChangeEvent) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
}

interface CheckboxClassesObjectProps {
  readonly [key: string]: string;
}

const Checkbox = (props: CheckboxProps) => {
  const { checked, children, icon, name, onBlur, onChange } = props;
  return (
    <CheckboxContainer 
      className={children ? getCheckboxClasses(props, children) : getCheckboxClasses(props)} 
      {...props}>
      {!!children &&
        <div className="bee-checkbox--text-container">
          <span>{children}</span>
        </div>
      }
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onBlur={(event) => onBlur && onBlur(event)}
        onChange={onChange} />
      <div className="bee-checkmark--container">
        <Svg className="bee-checkbox--svg-container" src={icon ? icon : 'utils/check'} />
      </div>
    </CheckboxContainer>
  );
};

const getCheckboxClasses = (props: CheckboxProps, children?: string): string => {
  const { className, color } = props;
  const checkboxClassesObject: CheckboxClassesObjectProps = { 
    color: !!color ? `bee-checkbox-color__${color}` : '',
    children: !!children ? 'bee-checkbox__has-text' : '',
    default: 'bee-checkbox',
    className: !!className ? className : ''
  };

  return generateClassNamesFromProps(checkboxClassesObject);
};

/** @component */
export default Checkbox;