import * as React from 'react';
import { Container, Input } from 'reactstrap';

import GoogleAutoComplete from 'components/shared/GoogleAutoComplete';

const TransitTime = () => {
  const [place, setPlace] = React.useState<google.maps.places.PlaceResult | null>(null);
  const inputRef = React.createRef();
  return <Container>
    <h5 className={place ? '' : 'text-muted'}>
      {place ? place.name : 'No place specified'}
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
        placeholder="Try &quot;Disneyland&quot;"
        defaultValue={''}
        required />
    </GoogleAutoComplete>
  </Container>;
}

export default TransitTime;
