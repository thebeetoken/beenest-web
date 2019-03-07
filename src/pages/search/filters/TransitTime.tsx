import * as React from 'react';
import { Button, Container, Input, Row } from 'reactstrap';

import GoogleAutoComplete from 'components/shared/GoogleAutoComplete';

const TransitTime = () => {
  const [place, setPlace] = React.useState<google.maps.places.PlaceResult | null>(null);
  const inputRef: React.RefObject<HTMLInputElement | null> = React.createRef();
  return <Container>
    <h5 className={place ? '' : 'text-muted'}>
      {place ? place.name : 'No place specified'}
      <Button close className={place ? 'mt-2' : 'd-none'} onClick={() => setPlace(null)} />
    </h5>
    <GoogleAutoComplete
      types={[]}
      inputRef={inputRef}
      onPlaceChange={setPlace}>
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
