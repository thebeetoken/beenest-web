import * as React from 'react';
import format from 'date-fns/format';

import HostListingCardContainer from './HostListingCard.container';

import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import LazyImage from 'shared/LazyImage';
import { HostListingShort } from 'networking/listings';
import { formatAddress } from 'utils/formatter';

const HostListingCard = (props: HostListingShort): JSX.Element => {
  const { city, country, id, idSlug, listingPicUrl, state, title, updatedAt } = props;
  return (
    <HostListingCardContainer className="host-listing-card">
      <div className="host-listing-meta">
        <h1>{title}</h1>
        {(city || state || country) && <h2>{formatAddress(city, state, country)}</h2>}
        <div className="bee-flex-div" />
        <h3>Last edited: {format(updatedAt, 'MM/DD/YY [at] hh:mmA')}</h3>
        <div className="host-listing-meta--button-container">
          <BeeLink to={`/host/listings/${id}/edit`}>
            <Button background="core" color="white" size="small">
              Edit
            </Button>
          </BeeLink>
          <BeeLink to={`/host/listings/${id}/calendar`}>
            <Button background="core" color="white" size="small">
              Calendar
            </Button>
          </BeeLink>
          <BeeLink target="_blank" to={`/listings/${idSlug}`}>
            <Button background="core" color="white" size="small">
              Preview
            </Button>
          </BeeLink>
        </div>
      </div>
      <div className="host-listing-image">
        <LazyImage src={listingPicUrl} />
      </div>
    </HostListingCardContainer>
  );
}

export default HostListingCard;