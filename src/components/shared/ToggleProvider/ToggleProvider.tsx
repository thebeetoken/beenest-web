/**
 * This component is a flexbile toggle component.
 * @author https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935
 * implementers: kevin, andy
 **/

import * as React from 'react';

export interface ToggleProviderRef {
  show: boolean;
  toggle: () => void;
}

interface ToggleProviderProps {
  showing?: boolean;
  children: ({ show, toggle }: ToggleProviderRef) => React.ReactNode;
}

interface ToggleProviderState {
  show: boolean;
}

export class ToggleProvider extends React.Component<ToggleProviderProps, ToggleProviderState> {
  readonly state = { show: false };

  render(): JSX.Element {
    return React.Children.only(
      this.props.children({
        show: this.state.show !== (!!this.props.showing),
        toggle: this.toggle,
      })
    );
  }

  toggle = (): void => this.setState({ show: !this.state.show });
}
