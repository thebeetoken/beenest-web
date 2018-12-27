import * as React from 'react';

import ErrorBoundaryWrapper from 'HOCs/ErrorBoundaryWrapper';
import Checkbox from 'shared/Checkbox';
import GoogleMapsWithMarkers from 'components/shared/GoogleMapsWithMarkers';
import { ListingShort } from 'networking/listings';

interface Props {
  toggle: () => void;
  show: boolean;
  listings: ListingShort[];
}

interface State {
  error?: Error;
}

export default class ListingsResultMap extends React.Component<Props, State> {
  readonly state = { error: undefined };

  handleError = (error: Error) => {
    this.setState({ error });
    if (this.props.show) {
      this.props.toggle();
    }
  }

  render() {
    const { show, toggle, listings } = this.props;
    if (this.state.error) {
      return <></>;
    }
    return (
      <>
        <form className="listing-query-body--map-toggle">
          <Checkbox checked={show} onChange={toggle}>
            Show Map
          </Checkbox>
        </form>
        <ErrorBoundaryWrapper onError={this.handleError}>
          {show && <GoogleMapsWithMarkers listings={listings} />}
        </ErrorBoundaryWrapper>
      </>
    );
  }
}
