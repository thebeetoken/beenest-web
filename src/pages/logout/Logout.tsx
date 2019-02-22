import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { signOutOfFirebase } from 'utils/firebase';

type Props = WithApolloClient<RouterProps>;

const Logout = (props: Props) => {
  signOut(props);
  return <></>;
};

const signOut = (props: Props) => {
  const { client } = props;
  signOutOfFirebase()
    .then((_) => client.resetStore())
    .then(() => window.location.assign('/work'));
};

export default withRouter(withApollo(Logout));
