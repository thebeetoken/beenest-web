import * as React from 'react';
import { Carousel, CarouselCaption, CarouselControl, CarouselItem } from 'reactstrap';

import LazyImage from 'components/shared/LazyImage';

interface Props {
  photos: string[];
}

const ListingCarousel = ({ photos }: Props) =>  {
  const [index, setIndex] = React.useState<number>(0);
  const next = () => setIndex((index + 1) % photos.length);
  const previous = () => setIndex((index - 1 + photos.length) % photos.length);
  return <Carousel activeIndex={index} next={next} previous={previous} interval={false}>
    {photos.map((url: string, index: number) => (
      <CarouselItem key={url}>
        <LazyImage src={url} transition />
        <CarouselCaption captionText={`Photo ${index + 1} of ${photos.length}`} />
      </CarouselItem>
    ))}
    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
  </Carousel>;
};

export default ListingCarousel;
