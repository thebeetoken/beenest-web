import * as React from 'react';
import LazyImageContainer from './LazyImage.container';

/**
 * This component is a flexible checkbox.
 *
 * @author kevin
 * 
 * Created: July 10, 2018
 **/

interface LazyImageProps {
  alt?: string;
  className?: string;
  height?: string;
  position?: string;
  transition?: boolean;
  /** Takes a function, native onClick */
  onClick?: () => void;
  placeholder?: string;
  src: string;
  width?: string;
}

interface LazyImageStateType {
  loaded: boolean;
  error: boolean;
}

class LazyImage extends React.Component<LazyImageProps, LazyImageStateType> {
  readonly state = { loaded: false, error: false };
  lazyImageContainerClasses = 'bee-lazy-image';
  mounted = true;

  componentDidMount() {
    if (!this.props.src && this.mounted) {
      return this.setState({ error: true });
    }

    const image = new Image();
    image.onload = () => {
      this.lazyImageContainerClasses += ' bee-lazy-image-loaded';
      if (this.mounted) {
        this.setState({ loaded: true });
      }
    };
    image.onerror = () => this.setState({ error: true });
    image.src = this.props.src;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { alt, height, placeholder, className, onClick, width } = this.props;
    const src = (this.state.error || !this.state.loaded) && !!placeholder ? placeholder : this.props.src;
    if (!src) {
      return <></>;
    }

    return (
      <LazyImageContainer
        className={`${this.lazyImageContainerClasses} ${className ? className : ''}`.trim()}
        onClick={onClick}
        src={src.startsWith('http') ? src : require(`../assets/images/${src}`)}
        alt={alt}
        height={height}
        width={width}
        {...this.props} />
    );
  }
};

/** @component */
export default LazyImage;
