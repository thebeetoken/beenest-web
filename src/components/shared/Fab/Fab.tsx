import * as React from 'react';
import FabContainer from './Fab.container';
import Svg from 'shared/Svg';
import { generateClassNamesFromProps } from 'styled/utils';

/**
 * This component is a flexible checkbox.
 *
 * @author kevin
 *
 * Created: July 12, 2018
 **/

type FabProps = Partial<{
  /** Takes a color name as a string, will only take colors listed in styled/utils/color file */
  background: string;
  /** Takes a string, adds text to the Fab */
  children: string;
  /** Takes a string, will take multiple classNames seperated by a space */
  className: string;
  /** Takes a boolean, determines if the button should have no background */
  clear: boolean;
  /** Takes a color name as a string, will only take colors listed in styled/utils/color file */
  color: string;
  /** Takes a boolean, determines if the button is disabled */
  disabled: boolean;
  /** Takes a string, changes the default height of the Fab */
  height: string;
  /** Takes a string, adds a svg, will only take svg names starting from the svg folder (can go into nested folders inside svg) */
  icon: string;
  /** Takes a color name as a string, will only take colors listed in styled/utils/color file */
  iconColor: string;
  id: string;
  noPadding: boolean;
  /** Takes a function, native onClick */
  onClick: () => void;
  /** Takes a boolean, changes the default flex: 1 0 auto to -> flex: 0 1 auto */
  noFlex: boolean;
  /** Takes a string, changes the border radius of the button.  Will only accept valid border-radius css values  */
  radius: string;
  /** Takes a string, changes the default text style.  Will only accept styles added to the typography folder */
  textStyle: string;
  /** Takes a string, changes the button type, default is 'button' */
  type: string;
  /** Takes a string, changes the default width of the Fab */
  width: string;
}>;

interface FabClasses {
  readonly [key: string]: string;
}

const Fab = (props: FabProps): JSX.Element => {
  const { icon, children } = props;
  return (
    <FabContainer {...props} className={`bee-fab ${getFabClasses(props)}`}>
      <div className="bee-fab--container">
        {!!icon && <Svg className={getFabSvgContainerClasses(props)} src={icon} />}
        {!!children && (
          <div className={getFabContentClasses(props)}>
            <span className="bee-fab--text">{children}</span>
          </div>
        )}
      </div>
    </FabContainer>
  );
};

const getFabClasses = ({ background, className, clear, color, noPadding, textStyle }: FabProps): string => {
  const fabClasses: FabClasses = {
    background: !!background ? `bee-fab-background__${background}` : '',
    color: !!color ? `bee-fab-color__${color}` : '',
    clear: clear ? 'bee-fab__clear' : '',
    noPadding: noPadding ? 'bee-fab-no-padding' : '',
    textStyle: !!textStyle ? `bee-fab-typography__${textStyle}` : '',
    className: className || '',
  };
  return generateClassNamesFromProps(fabClasses);
};

const getFabContentClasses = ({ noFlex }: FabProps): string => {
  const fabClasses: FabClasses = {
    noFlex: noFlex ? 'bee-fab--content__no-flex' : 'bee-fab--content',
  };
  return generateClassNamesFromProps(fabClasses);
};

const getFabSvgContainerClasses = ({ iconColor }: FabProps): string => {
  const className = 'bee-fab--svg-container';
  const color = !!iconColor ? `bee-fab-svg-color__${iconColor}` : '';
  return `${className} ${color}`.trim();
};

/** @component */
export default Fab;
