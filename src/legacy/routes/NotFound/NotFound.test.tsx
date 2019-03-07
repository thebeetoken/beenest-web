import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('renders NotFound', () => {
    const component = shallow(<NotFound />);
    expect(component).to.have.length(1);
  });
});
