import * as React from 'react';
import Slider from 'react-slick';

import LazyImage from 'components/shared/LazyImage';

interface Props {
  photos: string[];
}

// TODO: add a ref so that keyboard can be used immediately when carousel opens
// see: https://github.com/akiran/react-slick/issues/738

const ListingCarousel = ({ photos }: Props) =>  (
  <Slider infinite speed={500} slidesToShow={1} slidesToScroll={1}>
    {photos.map((url: string, index: number) => (
      <figure key={url}>
        <LazyImage src={url} transition />
        <figcaption>Photo {index + 1} of {photos.length}</figcaption>
      </figure>
    ))}
  </Slider>
);

export default ListingCarousel;
