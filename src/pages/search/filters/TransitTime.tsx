import * as React from 'react';
import { Alert, Col, Container, Input, Row } from 'reactstrap';

import GoogleAutoComplete from 'components/shared/GoogleAutoComplete';

interface Props {
  place?: google.maps.places.PlaceResult;
  onPlaceChange?: (place: google.maps.places.PlaceResult | null) => void;
  onTravelModeChange?: (travelMode: google.maps.TravelMode) => void;
  travelMode?: google.maps.TravelMode;
}

const TransitTime = ({ place, onPlaceChange, onTravelModeChange, travelMode }: Props) => {
  const travelModes = typeof google !== 'undefined' ? {
    'Driving': google.maps.TravelMode.DRIVING,
    'Transit': google.maps.TravelMode.TRANSIT,
    'Walking': google.maps.TravelMode.WALKING,
    'Cycling': google.maps.TravelMode.BICYCLING
  } : {};
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
  const handleTravelMode = (mode: google.maps.TravelMode) => {
    if (onTravelModeChange) {
      onTravelModeChange(mode);
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
    <h6 className="mt-3">Travel Mode</h6>
    <Row tag="form" className="form-check form-check-inline">
      {Object.entries(travelModes).map(([name, mode], index) => <Col xs="6" key={mode}>
        <Input
          className="form-check-input"
          id={name.toLowerCase()}
          type="radio"
          name="travelMode"
          value={mode}
          checked={(mode === travelMode) || (!travelMode && index === 0)}
          onChange={() => mode && handleTravelMode(mode)}
        />
        <label className="form-check-label" htmlFor={name.toLowerCase()}>{name}</label>
      </Col>)}
    </Row>
  </Container>;
}

export default TransitTime;
