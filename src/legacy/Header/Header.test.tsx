import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Header from './Header';

describe('<Header />', () => {
  it('renders Header', () => {
    const component = shallow(<Header />);
    expect(component).to.have.length(1);
  });
});
