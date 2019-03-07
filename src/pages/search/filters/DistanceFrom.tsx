import * as React from 'react';
import { Container, Input } from 'reactstrap';

import GoogleAutoComplete from 'components/shared/GoogleAutoComplete';

const DistanceFrom = () => {
  const inputRef = React.createRef();
  return <Container>
    <GoogleAutoComplete
      types={[]}
      inputRef={inputRef}
      onPlaceChange={event => console.log(event)}>
      <Input
        onChange={event => console.log(event)}
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

export default DistanceFrom;
