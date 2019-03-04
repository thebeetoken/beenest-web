import * as React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

interface Props {
  photos: string[];
}

// TODO: add a ref so that keyboard can be used immediately when carousel opens
// see: https://github.com/akiran/react-slick/issues/738

const ListingCarousel = ({ photos }: Props) => (
  <UncontrolledCarousel items={photos.map((url, index) => ({
    src: url,
    altText: `Image ${index + 1} of ${photos.length}`,
    caption: `Image ${index + 1} of ${photos.length}`
  }))} />
);

export default ListingCarousel;
