import * as React from 'react';
import { branch, compose, lifecycle, renderComponent, withProps } from 'recompose';
import { Circle, GoogleMap, withGoogleMap, withScriptjs, Marker } from 'react-google-maps';
import debounce from 'lodash.debounce';

import { SETTINGS } from 'configs/settings';
const { GOOGLE_MAPS_KEY } = SETTINGS;

import GoogleMapsContainer from './GoogleMaps.container';
import AudioLoading from 'components/shared/loading/AudioLoading';

interface LatLng {
  lng: number | undefined;
  lat: number | undefined;
}

interface Props {
  address?: string;
  children?: React.ReactNode;
  className?: string;
  height?: string;
  lat?: number | undefined;
  lng?: number | undefined;
  getCoordinates?: (coordinates: LatLng) => LatLng;
  showMarker?: boolean;
  showCircle?: boolean;
  width?: string;
}

interface State extends LatLng {
  loading: boolean;
  error: boolean;
}

const circleOptions = {
  fillColor: '#FFC107',
  fillOpacity: 0.35,
  strokeColor: '#FFC107',
  strokeOpacity: 0.8,
  strokeWeight: 2,
};

class GoogleMaps extends React.Component<Props, State> {
  readonly state = {
    lat: this.props.lat,
    lng: this.props.lng,
    loading: false,
    error: false,
  }
  mounted: boolean;

  componentDidMount() {
    this.mounted = true;
    if ((this.state.lat === undefined || this.state.lng === undefined) && this.props.address) {
      this._updateCoordinates();
    }
  }

  componentDidUpdate = (prevProps: Props) => {
    if (this.props.address && (prevProps.address !== this.props.address)) {
      this._updateCoordinates();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { lat, lng } = this.state;
    if (this.state.loading) {
      return <AudioLoading height={48} width={96} />;
    }
    
    if (this.state.error) {
      return <h1>Error</h1>;
    }

    if (lat === undefined || lng === undefined) {
      return <h1>Please provide a valid address</h1>;
    }

    return (
      <GoogleMap defaultZoom={13.5} defaultCenter={{ lat, lng }}>
        {this.props.showCircle && <Circle center={{ lat, lng }} options={circleOptions} radius={900} />}
        {this.props.showMarker && <Marker position={{ lat, lng }} />}
      </GoogleMap>
    );
  }

  _debouncedFetchCoordinates = debounce(() => {
    this.mounted && fetchCoordinates(this.props.address || '').then(({ lat, lng }) => {
      this.props.getCoordinates && this.props.getCoordinates({ lat, lng });
      this.setState({
        lat,
        lng,
        error: false,
        loading: false,
      })
    }).catch(error => {
      console.error(error);
      this.setState({
        error: true,
        loading: false,
      })
    });
  }, 1000);

  _updateCoordinates = () => {
    this.setState({
      loading: true
    }, this._debouncedFetchCoordinates);
  }
}

export default compose<{}, Props>(
  withProps(({ className, height, width }: Props) => ({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
    containerElement: (
      <GoogleMapsContainer className={`bee-google-maps ${className || ''}`.trim()} height={height} width={width} />
    ),
  })),
  lifecycle({
    // @ts-ignore
    componentDidCatch(error: any, info: any) {
      console.log(error, info);
      this.setState({ error: true });
    }
  }),
  branch(
    ({ error }) => error,
    renderComponent(() => <h1>Error loading Google Maps.</h1>)
  ),
  withScriptjs,
  withGoogleMap
)(GoogleMaps);

function fetchCoordinates(address: string): Promise<LatLng> {
  if (!window.google || !window.google.maps) return Promise.reject(new Error('Google Maps does not exist.'));
  
  const geocoder = new google.maps.Geocoder();

  return new Promise<LatLng>((resolve, reject) => {
    geocoder.geocode({ address }, (res: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve({ lat: res[0].geometry.location.lat(), lng: res[0].geometry.location.lng() });
      } else {
        reject(new Error('Could not fetch coordinates.'));
      }
    });
  });
};
