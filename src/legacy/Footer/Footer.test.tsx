import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Footer from './Footer';

describe('<Footer />', () => {
  it('renders Footer', () => {
    const component = shallow(<Footer />);
    expect(component).to.have.length(1);
  });
});
