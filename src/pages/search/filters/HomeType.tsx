import * as React from 'react';
import { Alert, Col, Container, Input, Row } from 'reactstrap';

import { HomeTypeAdminForm } from 'utils/validators';

const HOME_TYPES = [
  { name: 'Any', value: undefined },
  ...(Object.values(HomeTypeAdminForm).map(
    value => ({ name: value, value })
  ))
];

interface Props {
  homeType?: string;
  onChange: (homeType?: string) => void;
}

const HomeType = ({ homeType, onChange }: Props) => <Container>
  {HOME_TYPES.map(({ name, value }) => <h5 key={name}>
    {name} <small>{value}</small>
  </h5>)}
</Container>;

export default HomeType;
