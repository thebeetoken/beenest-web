import * as React from 'react';
import { Col, Container, Input, Row } from 'reactstrap';

import GoogleAutoComplete from 'components/shared/GoogleAutoComplete';

const TRAVEL_MODES = [ 'Driving', 'Transit', 'Walking', 'Bicycling' ];

interface Props {
  place?: google.maps.places.PlaceResult;
  onPlaceChange?: (place: google.maps.places.PlaceResult | null) => void;
  onTravelModeChange?: (travelMode: string) => void;
  travelMode: string;
}

const TransitTime = ({ place, onPlaceChange, travelMode }: Props) => {
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
      {TRAVEL_MODES.map(mode => <Col xs="6" key={mode}>
        <Input
          className="form-check-input"
          id={mode.toLowerCase()}
          type="radio"
          name="travelMode"
          value={mode.toUpperCase()}
          checked={mode.toUpperCase() === travelMode}
        />
        <label className="form-check-label" htmlFor={mode.toLowerCase()}>{mode}</label>
      </Col>)}
    </Row>
  </Container>;
}

export default TransitTime;
