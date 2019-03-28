import * as React from 'react';

import ListButtonContainer from './ListButton.container';

import Svg from 'components/Svg';

/**
 * This component is a
 * List Button.
 *
 * @author kevin
 *
 * Created: August 30, 2018
 **/

type ListButtonProps = Partial<{
  children: string;
  className: string;
  disabled: boolean;
  label: string;
  onClick: () => void;
  subLabel: string;
  src: string;
  verified: boolean;
}>;

const ListButton = (props: ListButtonProps): JSX.Element => {
  const { children, className, disabled, label, onClick, subLabel, src, verified } = props;
  return (
    <ListButtonContainer
      className={`bee-list-button ${className || ''}`.trim()}
      disabled={disabled}
      onClick={onClick}
      {...{ verified }}>
      <div className="bee-list-item-button--content">
        <h4>{label || ''} <span>{subLabel || ''}</span></h4>
        <div className="bee-list-item-button--cta">
          <span>{children}</span>
          {!!src && <Svg src={src} />}
        </div>
      </div>
    </ListButtonContainer>
  );
};
/** @component */
export default ListButton;
