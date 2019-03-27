import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { branch, compose, lifecycle, renderComponent, withProps } from 'recompose';
import { DirectionsRenderer, InfoWindow, Marker, GoogleMap, OverlayView, withGoogleMap, withScriptjs } from 'react-google-maps';

import { SETTINGS } from 'configs/settings';
const { GOOGLE_MAPS_KEY } = SETTINGS;

import { ListingCard } from 'components/shared/ListingCard';
import { LatLng, LatLngBounds, ListingShort } from 'networking/listings';
import { formatPriceShort } from 'utils/formatter';

import GoogleMapsWithMarkersContainer from './GoogleMapsWithMarkers.container';

const nearMarker = require('assets/images/iconmonstr-location-13-32.png');

// https://github.com/tomchentw/react-google-maps/issues/405
const keyFactory = {
  counter: 0,
  next() { return this.counter++; }
};

interface NamedLatLng extends LatLng {
  name: string;
}

interface Props extends RouterProps {
  bounds?: LatLngBounds;
  children?: React.ReactNode;
  className?: string;
  height?: string;
  selectedListing?: ListingShort;
  listings: ListingShort[];
  near?: NamedLatLng;
  travelMode?: google.maps.TravelMode;
  width?: string;
  onSelect: (listing: ListingShort | null) => void;
}

interface State {
  directions?: google.maps.DirectionsResult;
}

class GoogleMapsWithMarkers extends React.Component<Props, State> {
  state: State = {}

  handleMapMounted = (map: GoogleMap) => {
    if (!map) {
      return;
    }
    const { bounds, listings } = this.props;
    if (bounds) {
      map.fitBounds(bounds);
      return;
    }
    if (listings && listings.length > 1) {
      map.fitBounds(listings.reduce(({north, south, east, west}, {lat, lng}) => ({
        north: Math.max(north, lat),
        south: Math.min(south, lat),
        east: Math.max(east, lng),
        west: Math.min(west, lng)
      }), {
        north: -90,
        south: 90,
        east: -180,
        west: 180
      }));
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.near === this.props.near &&
      prevProps.selectedListing === this.props.selectedListing &&
      prevProps.travelMode === this.props.travelMode
    ) {
      return;
    }
    const { near, selectedListing, travelMode } = this.props;
    if (selectedListing && near) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route({
        origin: { lat: selectedListing.lat, lng: selectedListing.lng },
        destination: near,
        travelMode: travelMode || google.maps.TravelMode.DRIVING
      }, (directions, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({ directions });
        } else {
          console.log(`Failed to retrieve directions: ${status}`);
        }
      });
    } else {
      this.setState({ directions: undefined });
    }
  }

  render() {
    const { listings, near, selectedListing, onSelect } = this.props;
    const { directions } = this.state;
    const nearIcon: google.maps.Icon = {
      url: nearMarker,
      labelOrigin: new google.maps.Point(16, -12)
    };
    const deselectedListings = listings.filter(
      listing => !selectedListing || listing.id !== selectedListing.id
    );
    return (
      <GoogleMap
        defaultClickableIcons={false}
        defaultZoom={10}
        defaultCenter={getCenterCoordinates(listings)}
        ref={this.handleMapMounted}
      >
        {near && <Marker
          icon={nearIcon}
          label={{
            color: '#333',
            fontSize: '1rem',
            text: near.name
          }}
          position={near}
          title={near.name}
        />}
        {deselectedListings.map((listing, index) => (
          <OverlayView
            key={keyFactory.next()}
            position={{ lat: listing.lat, lng: listing.lng }}
            mapPaneName={OverlayView.OVERLAY_LAYER}
          >
            <button className="popover p-1 bs-popover-top" style={{
              transform: 'translate(-50%, -100%)',
              zIndex: listings.length - index
            }} onClick={() => onSelect(listing)}>
              <strong>{formatPriceShort(listing.pricePerNightUsd)}</strong>
              <div className="arrow" style={{ left: 'calc(50% - 12px)' }}></div>
            </button>
          </OverlayView>
        ))}
        {deselectedListings.map((listing, index) => (
          <OverlayView
            key={keyFactory.next()}
            position={{ lat: listing.lat, lng: listing.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <button className="popover p-1 bs-popover-top" style={{
              opacity: 0,
              transform: 'translate(-50%, -100%)',
              zIndex: listings.length - index
            }} onClick={() => onSelect(listing)}>
              <strong>{formatPriceShort(listing.pricePerNightUsd)}</strong>
              <div className="arrow" style={{ left: 'calc(50% - 12px)' }}></div>
            </button>
          </OverlayView>
        ))}
        {!!selectedListing && <InfoWindow
          position={{ lat: selectedListing.lat, lng: selectedListing.lng }}
          onCloseClick={() => onSelect(null)} >
          <ListingCard target="_blank" {...selectedListing} />
        </InfoWindow>}
        {directions && <DirectionsRenderer
          directions={directions}
          options={{ suppressMarkers: true }}
        />}
      </GoogleMap>
    );
  }
}

export default withRouter(
  compose<{}, Props>(
    withProps(({ className, height, width }: Props) => ({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: '100%' }} />,
      mapElement: <div style={{ height: '100%' }} />,
      containerElement: (
        <GoogleMapsWithMarkersContainer
          className={`bee-google-maps-markers ${className || ''}`.trim()}
          height={height}
          width={width}
        />
      ),
    })),
    lifecycle({
      // @ts-ignore
      componentDidCatch(error: any, info: any) {
        console.log(error, info);
        this.setState({ error: true });
      },
    }),
    branch(({ error }) => error, renderComponent(() => <h1>Error loading Google Maps.</h1>)),
    withScriptjs,
    withGoogleMap
  )(GoogleMapsWithMarkers)
);

// Depreciate later and use google api for getting center;
function getCenterCoordinates(listings: ListingShort[]) {
  let lat = 0;
  let lng = 0;
  const length = listings.length;
  for (let i = 0; i < length; i++) {
    lat += listings[i].lat;
    lng += listings[i].lng;
  }
  return {
    lat: lat / (length || 1),
    lng: lng / (length || 1),
  };
}
