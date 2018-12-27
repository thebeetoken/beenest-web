/**
 * This HOC starts a Web3 listener and passes user's wallet info.
 *
 *
 * @author andy
 *
 */

import * as React from 'react';
import { loadWeb3, getUsersWeb3Data, Web3Data, NetworkType } from 'utils/web3';

const { Provider, Consumer } = React.createContext({});
export { Consumer as Web3Consumer };

function setInitialWeb3State(): Web3Data {
  return {
    networkType: NetworkType.NOTCONNECTED,
    accounts: undefined,
    connecting: true,
  };
}

export class Web3Provider extends React.Component {
  readonly state: Web3Data = setInitialWeb3State();

  readonly web3 = loadWeb3();

  readonly web3Listener = setInterval(() => {
    // We check if Web3 is available
    if (this.web3.currentProvider) {
      getUsersWeb3Data(this.web3.eth)
        .then((web3data: Web3Data) => {
          // We check if web3 data has changed from the current state
          // to see if we should update the state and trigger re-render
          clearInterval(this.web3Listener);
          return this.setState(web3data);
        })
        .catch(error => {
          console.warn('error in web3Listener', error);
          this.setState(setInitialWeb3State());
        });
    } else {
      this.setState({ connecting: false });
    }
  }, 1000);

  componentDidMount(): void {
    this.web3Listener;
  }

  componentWillUnmount(): void {
    clearInterval(this.web3Listener);
  }

  render(): React.ReactNode {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
