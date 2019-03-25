import * as React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs } from 'react-google-maps';

import { SETTINGS } from 'configs/settings';
const { GOOGLE_MAPS_KEY } = SETTINGS;

interface Props {
  onPlaceChange(place: google.maps.places.PlaceResult): void;
  inputRef: React.RefObject<HTMLInputElement>;
  children: React.ReactNode;
  types?: string[];
}


// needed since typescript doesn't recognize 'setFields' as a function
interface AutocompleteInterface extends google.maps.places.Autocomplete {
  setFields?(args: String[]): void; 
} 

class GoogleAutoComplete extends React.Component<Props, any> {
  autocomplete: AutocompleteInterface;
  
  componentDidMount() {
    if (!this.props.inputRef.current) return;
    if (!window.google) return;

    const types = this.props.types || ['(regions)'];
    this.autocomplete = new google.maps.places.Autocomplete(
      this.props.inputRef.current,
      { types }
    );
    if (this.autocomplete.setFields) this.autocomplete.setFields(['geometry', 'name']);
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged = () => {
    this.props.onPlaceChange(this.autocomplete.getPlace());
  }

  render() {
    return this.props.children;
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
