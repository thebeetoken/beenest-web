import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Overlay from 'shared/Overlay';
import PortalContainer from './Portal.container';

/**
 * The Portal component is a full screen take-over
 * that also utilizes the Overlay component
 *
 * @author andy, kevin
 **/

type PortalProps = Partial<{
  className: string;
  color: string;
  onClick: () => void;
  opacity: number;
}>;

class Portal extends React.Component<PortalProps> {
  container = document.createElement('div') as HTMLDivElement;
  modalRoot = document.getElementById('bee-modal-root') as HTMLElement;

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    this.modalRoot.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    this.modalRoot.removeChild(this.container);
  }

  render() {
    const { className, children, ...overlayProps } = this.props;
    return ReactDOM.createPortal(
      <PortalContainer className={`bee-portal ${className}`.trim()}>
        <Overlay {...overlayProps} />
        <div className="bee-portal--children">
          {children}
        </div>
      </PortalContainer>,
      this.container
    );
  }
}

/** @component */
export default Portal;
