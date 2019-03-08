import * as React from 'react';
import Slider from 'react-slick';

import CarouselContainer from 'styled/containers/Carousel.container';
import LazyImage from 'legacy/shared/LazyImage';

interface Props {
  photos: string[];
}

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

// TODO: add a ref so that keyboard can be used immediately when carousel opens
// see: https://github.com/akiran/react-slick/issues/738

const ListingCarousel = ({ photos }: Props) => {
  const renderPhotos = (photos || []).map((url: string, index: number) => (
    <figure className="carousel-image-wrapper" key={url}>
      <LazyImage src={url} transition />
      <figcaption>Photo {index + 1} of {(photos || []).length}</figcaption>
    </figure>
  ));
  return (
    <CarouselContainer>
      <Slider {...settings}>
        {renderPhotos}
      </Slider>
    </CarouselContainer>
  );
};

export default ListingCarousel;
