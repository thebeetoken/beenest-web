import * as React from 'react';
import { Button, Container, Input, Row } from 'reactstrap';

import GoogleAutoComplete from 'components/shared/GoogleAutoComplete';

interface Props {
  onFilterChange?: () => void;
}

const TransitTime = ({ onFilterChange }: Props) => {
  const [place, setPlace] = React.useState<google.maps.places.PlaceResult | null>(null);
  const inputRef: React.RefObject<HTMLInputElement | null> = React.createRef();

  const handlePlace = place => {
    const { lat, lng } = place.geometry.location;
    setPlace(place);
    if (onFilterChange) {
      onFilterChange({ near: { lat, lng }});
    }
  };
  const handleClear = event => {
    event.preventDefault();
    inputRef.current.value = "";
    setPlace(null);
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
        defaultValue={''}
        required />
    </GoogleAutoComplete>
  </Container>;
}

export default TransitTime;
