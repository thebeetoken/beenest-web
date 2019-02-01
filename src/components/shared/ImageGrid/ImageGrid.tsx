import * as React from 'react';
import LazyImage from 'shared/LazyImage';

interface Props {
  images: string[];
  onClick?: (url: string) => void;
}

const ImageGrid = (({ images, onClick }): Props) => (<>
  {images.map((url, index) => (<LazyImage
    src={url}
    key={index}
    onClick={() => onClick(url)}
  />))}
</>);

export default ImageGrid;