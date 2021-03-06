import * as React from 'react';
import { Alert, Button, Col, Container, Input, Row } from 'reactstrap';

import GoogleAutoComplete from 'components/GoogleAutoComplete';

import { NamedLatLng, TravelMode } from '../SearchCriteria';

interface Props {
  place?: NamedLatLng;
  onChange: (place?: NamedLatLng, travelMode?: TravelMode) => void;
  travelMode?: TravelMode;
}

const TransitTime = ({ place, onChange, travelMode }: Props) => {
  const travelModes = {
    'Driving': TravelMode.DRIVING,
    'Transit': TravelMode.TRANSIT,
    'Walking': TravelMode.WALKING,
    'Cycling': TravelMode.BICYCLING
  };
  const [isAlertShowing, setAlertShowing] = React.useState<boolean>(false);
  const [chosenPlace, setPlace] = React.useState(place);
  const [chosenMode, setTravelMode] = React.useState(travelMode);
  const inputRef: React.RefObject<HTMLInputElement | null> = React.createRef();
  const isDirty = (chosenPlace !== place) || (chosenMode !== travelMode);

  const handlePlace = (place: google.maps.places.PlaceResult) => {
    if (place && !place.geometry) {
      setAlertShowing(true);
      return;
    }
    setPlace({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      name: place.name
    });
  };
  const handleClear = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setPlace(undefined);
  };

  return <Container>
    {chosenPlace ? <h5>
      {chosenPlace.name}
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
        defaultValue={chosenPlace ? chosenPlace.name : ''}
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
          checked={(mode === chosenMode) || (!chosenMode && index === 0)}
          onChange={() => setTravelMode(mode)}
        />
        <label className="form-check-label" htmlFor={name.toLowerCase()}>{name}</label>
      </Col>)}
    </Row>
    <Row className="mt-3 justify-content-end" noGutters>
      <Button size="sm" disabled={!isDirty} onClick={() => onChange(chosenPlace, chosenMode)}>
        Apply
      </Button>
    </Row>
  </Container>;
}

export default TransitTime;
