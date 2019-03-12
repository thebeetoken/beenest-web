import * as React from 'react';
import { Col, Container, Input, Row } from 'reactstrap';

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
  <Row tag="form" className="form-check">
    {HOME_TYPES.map(({ name, value }) => (<Col key={name}>
      <Input
        className="form-check-input"
        id={name.toLowerCase()}
        type="radio"
        name="homeType"
        value={value}
        checked={homeType === value}
        onChange={() => onChange(value)}
      />
      <label className="form-check-label" htmlFor={name.toLowerCase()}>{name}</label>
    </Col>))}
  </Row>
</Container>;

export default HomeType;
