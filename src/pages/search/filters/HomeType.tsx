import * as React from 'react';
import { Container, Input } from 'reactstrap';

import { HomeTypeAdminForm } from 'utils/validators';

const ANY_HOME = 'Any Home Type';
const HOME_TYPES = [
  { name: 'Any', value: ANY_HOME },
  ...(Object.values(HomeTypeAdminForm).map(
    value => ({ name: value, value })
  ))
];

interface Props {
  homeType?: string;
  onChange: (homeType?: string) => void;
}

function toHomeType(value: string) {
  return value === ANY_HOME ? undefined : value;
}

const HomeType = ({ homeType, onChange }: Props) => <Container>
  <Input
    type="select"
    name="homeType"
    value={homeType}
    onChange={event => onChange(toHomeType(event.target.value))}>
    {HOME_TYPES.map(({ name, value }) => (
      <option key={name} value={value}>
        {name}
      </option>
    ))}
  </Input>
</Container>;

export default HomeType;
