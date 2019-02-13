import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home';
import Account from './Account';

const Work = () => (
  <div>
    <Switch>
      <Route path="/work/account" component={Account} />
      <Route path="/work" component={Home} />
    </Switch>
  </div>
);

export default Work;