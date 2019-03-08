import * as React from 'react';
import { Container, Input } from 'reactstrap';

import GoogleAutoComplete from 'components/shared/GoogleAutoComplete';

import { ListingSearchCriteria } from 'networking/listings';

interface Props {
  place?: google.maps.places.PlaceResult;
  onPlaceChange?: (place: google.maps.places.PlaceResult | null) => void;
  onFilterChange?: (filter: ListingSearchCriteria) => void;
}

const TransitTime = ({ place, onFilterChange, onPlaceChange }: Props) => {
  const inputRef: React.RefObject<HTMLInputElement | null> = React.createRef();

  const handlePlace = (place: google.maps.places.PlaceResult) => {
    if (onPlaceChange) {
      onPlaceChange(place);
    }
    if (onFilterChange) {
      const { lat, lng } = place.geometry.location;
      onFilterChange({ near: { lat: lat(), lng: lng() }});
    }
  };
  const handleClear = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (onPlaceChange) {
      onPlaceChange(null);
    }
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  return <Container>
    <h5 className={place ? '' : 'text-muted'}>
      {place ? place.name : 'Add destination'}
      <small className={place ? 'ml-3 text-muted' : 'd-none'}>
        <a href="#" onClick={handleClear}>Clear</a>
      </small>
    </h5>
    <GoogleAutoComplete
      types={[]}
      inputRef={inputRef}
      onPlaceChange={handlePlace}>
      <Input
        tag="input"
        innerRef={inputRef}
        id="distanceFrom"
        name="distanceFrom"
        placeholder="Try &quot;Moscone Center&quot;"
        defaultValue={place ? place.name : ''}
        required />
    </GoogleAutoComplete>
  </Container>;
}

export default TransitTime;
