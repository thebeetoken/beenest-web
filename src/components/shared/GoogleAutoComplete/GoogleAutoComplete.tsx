import * as React from 'react';

import { compose, withProps } from 'recompose';
import { withScriptjs } from 'react-google-maps';

import GoogleAutoCompleteContainer from './GoogleAutoComplete.container';
import InputWrapper from 'shared/InputWrapper';

import { SETTINGS } from 'configs/settings';
const { GOOGLE_MAPS_KEY } = SETTINGS;

interface Props {
  defaultValue?: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onPlaceChange(place: google.maps.places.PlaceResult): void;
}

// needed since typescript doesn't recognize 'setFields' as a function
interface AutocompleteInterface extends google.maps.places.Autocomplete {
  setFields?(args: String[]): void; 
} 

class GoogleAutoComplete extends React.Component<Props, any> {
  autocomplete: AutocompleteInterface;
  
  componentDidMount() {
    if (!this.props.inputRef.current) return;

    this.autocomplete = new google.maps.places.Autocomplete(
      this.props.inputRef.current,
      {"types": ["(cities)"]}
    )
    if (this.autocomplete.setFields) this.autocomplete.setFields(['geometry', 'name']);
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged = () => {
    const a = this.autocomplete.getPlace();
    this.props.onPlaceChange(a);
  }

  render() {
    return (
      <GoogleAutoCompleteContainer>
        <InputWrapper box>
          <input
            ref={this.props.inputRef}
            id="locationQuery"
            name="locationQuery"
            placeholder="Try &quot;San Francisco&quot;"
            defaultValue={this.props.defaultValue}
            required
            type="text" />
        </InputWrapper>
      </GoogleAutoCompleteContainer>
    );
  }
}

export default compose<{}, Props>(
  withProps(() => ({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <React.Fragment />,
    containerElement: <React.Fragment />,
  })),
  withScriptjs
)(GoogleAutoComplete);
