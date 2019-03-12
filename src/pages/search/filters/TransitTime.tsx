import * as React from 'react';
import { Alert, Container, Input } from 'reactstrap';

import GoogleAutoComplete from 'components/shared/GoogleAutoComplete';

interface Props {
  place?: google.maps.places.PlaceResult;
  onPlaceChange?: (place: google.maps.places.PlaceResult | null) => void;
}

const TransitTime = ({ place, onPlaceChange }: Props) => {
  const [isAlertShowing, setAlertShowing] = React.useState<boolean>(false);
  const inputRef: React.RefObject<HTMLInputElement | null> = React.createRef();

  const handlePlace = (place: google.maps.places.PlaceResult) => {
    if (place && !place.geometry) {
      setAlertShowing(true);
      return;
    }
    if (onPlaceChange) {
      onPlaceChange(place);
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
  };

  return <Container>
    {place ? <h5>
      {place.name}
      <small className="ml-3">
        <a href="#" onClick={handleClear}>Clear</a>
       </small>
    </h5> : <>
      <h6>Examples:</h6>
      <ul>
        <li>Conference Centers</li>
        <li>Restaurants</li>
        <li>Landmarks</li>
      </ul>
    </>}
    <Alert color="warning" isOpen={isAlertShowing} toggle={() => setAlertShowing(false)}>
      Please select a destination from the list of suggestions.
    </Alert>
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
