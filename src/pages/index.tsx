import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home';
import Login from './login';

const Work = () => (
  <div>
    <Switch>
      <Route exact path="/work/login" component={Login} />
      <Route path="/work" component={Home} />
    </Switch>
  </div>
);

export default Work;