import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home';
import WorkAccount from './WorkAccount';

const Work = () => (
  <div>
    <Switch>
      <Route path="/work/account" component={WorkAccount} />
      <Route path="/work" component={Home} />
    </Switch>
  </div>
);

export default Work;