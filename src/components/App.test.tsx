import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from './App';

describe('<App />', () => {
  const wrapper = shallow(<App />);

  it('renders App component', () => {
    expect(wrapper).to.have.length(1);
  });
});
