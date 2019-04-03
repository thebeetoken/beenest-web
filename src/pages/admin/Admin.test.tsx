import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Admin from './Admin';

describe('<Admin />', () => {
  const wrapper = shallow(<Admin />);

  it('renders Admin component', () => {
    expect(wrapper).to.have.length(1);
  });
});
