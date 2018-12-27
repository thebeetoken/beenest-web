import * as React from 'react';
import ButtonContainer from './Button.container';
import Svg from 'shared/Svg';
import { generateClassNamesFromProps } from 'styled/utils';

/**
 * This component is a flexible button component.
 *
 * @author kevin
 *
 * Created: July 11, 2018
 **/

type ButtonProps = Partial<{
  children: React.ReactNode;
  /** Takes a color name as a string, will only take colors listed in styled/utils/color file */
  background: string;
  /** Takes a string, will take multiple classNaes seperated by a space */
  className: string;
  /** Takes a boolean, determines if the button should have no background */
  clear: boolean;
  /** Takes a color name as a string, will only take colors listed in styled/utils/color file */
  color: string;
  /** Takes a color name as a string, will only take colors listed in styled/utils/color file */
  border: string;
  /** Takes a boolean, determines if the button is disabled */
  disabled: boolean;
  /** Takes a boolean, determines if the button should have the default right padding */
  noEndPadding: boolean;
  /** Takes a boolean, determines if the button should have the default left/right padding */
  noExtraPadding: boolean;
  /** Takes a boolean, determines if the button should have the default left padding */
  noStartPadding: boolean;
  /** Takes a boolean, determines if the button should have rounded corners */
  noRadius: boolean;
  /** Takes a function, native onClick */
  onClick: () => void;
  /** Takes a string, will determine the height of the button */
  size: string;
  /** Takes a string, will only take text values that are from the typography file */
  textStyle: string;
  /** Takes a string, adds a prefix svg, will only take svg names starting from the svg folder (can go into nested folders inside svg) */
  prefix: string;
  /** Takes a string, determines the width of the svg prefix container (svg size stays the same) */
  prefixSize: string;
  /** Takes a string, adds a suffix svg, will only take svg names starting from the svg folder (can go into nested folders inside svg) */
  suffix: string;
  /** Takes a string, determines the width of the svg suffix container (svg size stays the same) */
  suffixSize: string;
  /** Takes a string, determines the right padding between the text and suffix svg (if svg is supplied) */
  end: string;
  /** Takes a string, determines the layout of the button text and svg (if svg/text is applied) */
  layout: string;
  /** Takes a boolean, changes the default flex: 1 0 auto to -> flex: 0 1 auto */
  noFlex: boolean;
  /** Takes a string, changes the border radius of the button.  Will only accept valid border-radius css values  */
  radius: string;
  /** Takes a string, determines the left padding between the text and prefix svg (if svg is supplied) */
  start: string;
  /** Takes a string, changes the button type, default is 'button' */
  type: string;
}>;

interface ButtonClasses {
  [key: string]: string;
}

const Button = (props: ButtonProps) => {
  const { prefix, suffix, children, onClick, disabled, radius, type } = props;
  const buttonContainerProps = { disabled, onClick, radius, type };
  return (
    <ButtonContainer {...buttonContainerProps} className={getButtonClasses(props)}>
      <div className="bee-button--container">
        {!!prefix && <Svg className={getSvgPrefixClasses(props)} src={prefix} />}
        {!!children && (
          <div className={getButtonContentClasses(props)}>
            <span className="bee-button--text">{children}</span>
          </div>
        )}
        {!!suffix && <Svg className={getSvgSuffixClasses(props)} src={suffix} />}
      </div>
    </ButtonContainer>
  );
};

const getButtonClasses = ({
  background,
  border,
  clear,
  color,
  className,
  noEndPadding,
  noExtraPadding,
  noRadius,
  noStartPadding,
  size,
  textStyle,
}: ButtonProps): string => {
  const buttonClassesObject: ButtonClasses = {
    background: !!background ? `bee-button-background__${background}` : '',
    border: !!border ? `bee-button-border__${border}` : '',
    clear: clear ? 'bee-button__clear' : '',
    color: !!color ? `bee-button-color__${color}` : '',
    defaultClassName: 'bee-button',
    noEndPadding: noEndPadding ? 'bee-button__remove-end-padding' : '',
    noExtraPadding: noExtraPadding ? 'bee-button__remove-default-padding' : '',
    noRadius: noRadius ? 'bee-button__remove-border-radius' : '',
    noStartPadding: noStartPadding ? 'bee-button__remove-start-padding' : '',
    size: !!size ? `bee-button-size__${size}` : '',
    textStyle: !!textStyle ? `bee-button-typography__${textStyle}` : '',
    className: className || '',
  };

  return generateClassNamesFromProps(buttonClassesObject);
};

const getSvgPrefixClasses = ({ prefixSize }: ButtonProps): string => {
  const className = 'bee-button--svg-prefix-container';
  const size = !!prefixSize ? `bee-button-svg-prefix__${prefixSize}` : '';
  return `${className} ${size}`.trim();
};

const getSvgSuffixClasses = ({ suffixSize }: ButtonProps): string => {
  const className = 'bee-button--svg-suffix-container';
  const size = !!suffixSize ? `bee-button-svg-suffix__${suffixSize}` : '';
  return `${className} ${size}`.trim();
};

const getButtonContentClasses = (props: ButtonProps): string => {
  const { end, layout, noFlex, start } = props;
  const buttonContentClassesObject: ButtonClasses = {
    defaultClassName: 'bee-button--content',
    end: !!end ? `bee-button-content-end__${props.end}` : '',
    layout: !!layout ? `bee-button-content-layout__${props.layout}` : '',
    noFlex: noFlex ? 'bee-button-content__no-flex' : '',
    start: !!start ? `bee-button-content-start__${props.start}` : '',
  };

  return generateClassNamesFromProps(buttonContentClassesObject);
};

/** @component */
export default Button;
