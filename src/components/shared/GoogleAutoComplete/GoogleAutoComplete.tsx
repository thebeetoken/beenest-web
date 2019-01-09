import * as React from 'react';

import { compose, withProps } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';

import GoogleAutoCompleteContainer from './GoogleAutoComplete.container';
import InputWrapper from 'shared/InputWrapper';

import { SETTINGS } from 'configs/settings';
const { GOOGLE_MAPS_KEY } = SETTINGS;

interface Props {
  children?: React.ReactNode;
  defaultValue?: string;
  inputRef: React.RefObject<HTMLInputElement>;
  placesRef: React.RefObject<google.maps.places.SearchBox> | any;
}

interface BoundaryProps {
  placesRef: React.RefObject<google.maps.places.SearchBox> | any;
}

class StandaloneSearchBoxWithErrorBoundary extends React.Component<BoundaryProps> {
  state = { hasError: false };

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    return !(this.state.hasError) ?
      (<StandaloneSearchBox ref={this.props.placesRef}>
        {this.props.children}
      </StandaloneSearchBox>) :
      this.props.children;
  }
}

export default compose<{}, Props>(
  withProps(() => ({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <React.Fragment />,
    containerElement: <React.Fragment />,
  })),
  withScriptjs
)(({ inputRef, placesRef, defaultValue }: Props) => (
  <GoogleAutoCompleteContainer>
    <StandaloneSearchBoxWithErrorBoundary placesRef={placesRef}>
      <InputWrapper box>
        <input
          ref={inputRef}
          placeholder="Try &quot;San Francisco&quot;"
          type="text"
          name="locationQuery"
          id="locationQuery"
          defaultValue={defaultValue}
          required
        />
      </InputWrapper>
    </StandaloneSearchBoxWithErrorBoundary>
  </GoogleAutoCompleteContainer>
));
