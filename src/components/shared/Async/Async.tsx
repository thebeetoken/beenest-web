import * as React from 'react';

interface AsyncProps<T> {
  promise: Promise<T>;
  then: (value?: T) => JSX.Element | undefined;
}

// This implements an API-compatible subset of the react-promise module.
export default class Async<T> extends React.Component<AsyncProps<T>> {
  readonly state = { waiting: true, value: undefined };

  handlePromise() {
    this.setState({ waiting: true, value: undefined });
    this.props.promise.then(value => this.setState({ waiting: false, value }));
  }

  componentDidMount() {
    this.handlePromise();
  }

  componentDidUpdate(prevProps: AsyncProps<T>) {
    if (this.props.promise !== prevProps.promise) {
      this.handlePromise();
    }
  }

  render() {
    return this.state.waiting ? <div></div> : this.props.then(this.state.value);
  }
}
