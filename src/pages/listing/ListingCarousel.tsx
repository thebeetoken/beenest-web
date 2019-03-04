import * as React from 'react';
import { Carousel, CarouselItem } from 'reactstrap';

import LazyImage from 'components/shared/LazyImage';

interface Props {
  photos: string[];
}

// TODO: add a ref so that keyboard can be used immediately when carousel opens
// see: https://github.com/akiran/react-slick/issues/738

const ListingCarousel = ({ photos }: Props) =>  {
  const [index, setIndex] = React.useState<number>(0);
  const next = () => setIndex(Math.min(index + 1, photos.length - 1));
  const previous = () => setIndex(Math.max(index - 1, 0));
  return <Carousel activeIndex={index} next={next} previous={previous}>
    {photos.map((url: string, index: number) => (
      <CarouselItem key={url}>
        <figure>
          <LazyImage src={url} transition />
          <figcaption>Photo {index + 1} of {photos.length}</figcaption>
        </figure>
      </CarouselItem>
    ))}
  </Carousel>;
};

export default ListingCarousel;
