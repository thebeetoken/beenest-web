import { LocationDescriptor } from 'history';
import * as React from 'react';

export const BannerContext = React.createContext({});
const { Consumer, Provider } = BannerContext;
export interface BannerProps {
  message: string;
  href?: string | null;
  background?: string;
  textColor?: string;
  to?: LocationDescriptor | null;
}

export interface BannerConsumerProps {
  bannerState: {
    href: string | null;
    message: string;
    to: LocationDescriptor | null;
    showBanner: boolean;
  },
  bannerActions: {
    closeBanner: () => void,
    openBanner: () => void,
    setBannerOptions: (options: BannerProps) => void,
  },
}

export { Consumer as BannerConsumer };
export class BannerProvider extends React.Component {
  readonly state = {
    href: null,
    message: '',
    to: null,
    showBanner: false,
  }

  render() {
    return (
      <Provider value={
        {
          bannerState: this.state,
          bannerActions: {
            closeBanner: () => this.setState({ showBanner: false }),
            openBanner: () => this.setState({ showBanner: true }),
            setBannerOptions: (options: BannerProps) => this.setState({
              href: options.href || null,
              message: options.message,
              to: options.to || null,
            }),
          }
        }
      }>
        {this.props.children}
      </Provider>
    );
  }
}




