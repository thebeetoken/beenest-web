import * as React from 'react';
import LazyImage from 'legacy/shared/LazyImage';
import ImageGridContainer from './ImageGrid.container';

interface Props {
  images: string[];
  onClick?: (url: string) => void;
}

const ImageGrid = ({ images, onClick }: Props) => (
  <ImageGridContainer count={Math.min(images.length, 5)}>
    {images.slice(0, Math.min(images.length, 5)).map((url, index) => (<LazyImage
      src={url}
      key={index}
      onClick={() => onClick && onClick(url)}
      transition
    />))}
  </ImageGridContainer>
);

export default ImageGrid;
