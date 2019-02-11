import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import WorkTest from './WorkTest';

const Work = () => (
  <div>
    <Switch>
      <Route path="/work" component={WorkTest} />
    </Switch>
  </div>
);

export default Work;