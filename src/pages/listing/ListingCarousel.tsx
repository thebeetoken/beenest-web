import * as React from 'react';
import { Carousel, CarouselCaption, CarouselControl, CarouselItem } from 'reactstrap';

import LazyImage from 'components/shared/LazyImage';

interface Props {
  photos: string[];
}

// TODO: add a ref so that keyboard can be used immediately when carousel opens
// see: https://github.com/akiran/react-slick/issues/738

const ListingCarousel = ({ photos }: Props) =>  {
  const [index, setIndex] = React.useState<number>(0);
  const next = () => setIndex((index + 1) % photos.length);
  const previous = () => setIndex((index - 1 + photos.length) % photos.length);
  return <Carousel activeIndex={index} next={next} previous={previous}>
    {photos.map((url: string, index: number) => (
      <CarouselItem key={url}>
        <figure className="height-60vh max-height-60vh">
          <LazyImage src={url} transition />
        </figure>
        <CarouselCaption captionText={`Photo ${index + 1} of ${photos.length}`} />
      </CarouselItem>
    ))}
    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
  </Carousel>;
};

export default ListingCarousel;