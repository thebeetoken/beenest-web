import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Legacy from './Legacy';

describe('<Legacy />', () => {
  const wrapper = shallow(<Legacy />);

  it('renders Legacy component', () => {
    expect(wrapper).to.have.length(1);
  });
});
