import * as React from 'react'

import BeeLink from 'shared/BeeLink';
import LazyImage from 'shared/LazyImage';
import ListItem from 'shared/ListItem';
import Overlay from 'shared/Overlay';
import Svg from 'shared/Svg';

interface Props {
  city: string;
  country: string;
  coverImage: {
    url: string;
  };
  description: string;
  id: string;
  state: string;
  title: string;
}

export const HomeFeaturedConference = (props: Props) => {
  const { city, country, coverImage, id, state, title } = props;
  return (
    <article className="featured-conference-card">
      <div className="featured-conference-image">
        <Overlay color="white" opacity={0.22}>
          <LazyImage src={coverImage && coverImage.url} transition />
        </Overlay>
      </div>
      <div className="featured-conference-meta">
        <h1>{title}</h1>
        {country.toUpperCase() === 'USA' ? <h2>{city}, {state}</h2> : <h2>{city}, {country.toUpperCase()}</h2>}
        <div className="bee-flex-div" />
        <BeeLink className="book-now-button" to={`/conferences/${id}`}>
          <ListItem
            font="small"
            suffixColor="secondary"
            textColor="secondary"
            textTransform="uppercase"
            transparent>
            <span>Book Today</span>
            <Svg className="suffix" src="utils/arrow-right" />
          </ListItem>
        </BeeLink>
      </div>
    </article>
  )
}

export const HomeFeaturedConferencePlaceholder = () => (
  <article className="featured-conference-card-placeholder">
    <div className="featured-conference-image-placeholder" />
    <div className="featured-conference-meta-placeholder" />
  </article>
);


