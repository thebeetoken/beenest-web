import * as React from 'react';
import LazyImage from 'shared/LazyImage';
import ImageGridContainer from './ImageGrid.container';

interface Props {
  images: string[];
  onClick?: (url: string) => void;
}

const ImageGrid = ({ images, onClick }: Props) => (
  <ImageGridContainer count={images.length}>
    {images.map((url, index) => (<LazyImage
      src={url}
      key={index}
      onClick={() => onClick && onClick(url)}
      transition
    />))}
  </ImageGridContainer>
);

export default ImageGrid;
