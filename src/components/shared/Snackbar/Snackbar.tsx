import * as React from 'react';

import SnackbarContainer from './Snackbar.container';

import Svg from 'shared/Svg';

interface Props {
  autoHideDuration?: number; // milliseconds
  children?: React.ReactNode; // message
  className?: string;
  layout?: string; // top or bottom
  onClose: () => void; // usually the toggle that will close the snackbar
  open: boolean; // open/close snackbar
  textColor?: string; // any valid color specified in color.ts
  variant?: string; // mid or dark or light, light is default
}

const Snackbar = (props: Props) => {
  const { autoHideDuration, children, className, onClose } = props;
  if (autoHideDuration) {
    setTimeout(onClose, autoHideDuration);
  } else {
    setTimeout(onClose, 3000);
  }

  return (
    <SnackbarContainer
      className={`bee-snackbar ${className || ''}`.trim()}
      {...props}>
      <p>{children}</p>
      <div className="bee-snackbar-svg">
        <Svg src="utils/x-circle" onClick={onClose} />
      </div>
    </SnackbarContainer>
  );
};

export default Snackbar;
