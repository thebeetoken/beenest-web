/**
 * Global React App level
 *
 * Global Header, Routes, and global footer is
 * rendered here.
 *
 * Google Analytics & screen type is utilized
 * as well.
 *
 * @author @tommy, @andy, @kevin
 **/

import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { AppProvider, AppState, getScreenType } from './Legacy.context';
import LegacyRoutes from './Legacy.routes';
import Footer from './Footer';
import Header from './Header';



class App extends React.Component<RouterProps, AppState> {
  readonly state = {
    screenType: getScreenType(),
  };

  componentDidMount(): void {
    window.addEventListener('resize', this.detectScreenType);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.detectScreenType);
  }

  shouldComponentUpdate(nextProps: RouterProps): boolean {
    if (nextProps.history.action === 'PUSH') {
      window.scrollTo(0, 0);
    }
    return true;
  }

  render(): JSX.Element {
    return (
      <AppProvider value={this.state}>
        <Header />
        <LegacyRoutes />
        <Footer />
      </AppProvider>
    );
  }

  detectScreenType = (): void => {
    const screenType = getScreenType();
    if (this.state.screenType !== screenType) {
      return this.setState({ screenType });
    }
  };
}

export default withRouter(App);
