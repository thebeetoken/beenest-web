import * as React from 'react';
import { Col, Container, Input, Row } from 'reactstrap';

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
  const selectedMode = travelMode || google.maps.TravelMode.DRIVING;

  const inputRef: React.RefObject<HTMLInputElement | null> = React.createRef();

  const handlePlace = (place: google.maps.places.PlaceResult) => {
    if (onPlaceChange) {
      onPlaceChange(place && place.geometry ? place : null);
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
    <h6 className="mt-3">Travel Mode</h6>
    <Row tag="form" className="form-check form-check-inline">
      {Object.entries(travelModes).map(([name, mode]) => <Col xs="6" key={mode}>
        <Input
          className="form-check-input"
          id={name.toLowerCase()}
          type="radio"
          name="travelMode"
          value={mode}
          checked={mode === selectedMode}
          onChange={() => mode && handleTravelMode(mode)}
        />
        <label className="form-check-label" htmlFor={name.toLowerCase()}>{name}</label>
      </Col>)}
    </Row>
  </Container>;
}

export default TransitTime;
