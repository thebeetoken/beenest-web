import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { DirectionsRenderer, InfoWindow, Marker, GoogleMap, OverlayView, withGoogleMap, withScriptjs } from 'react-google-maps';

import { SETTINGS } from 'configs/settings';
const { GOOGLE_MAPS_KEY } = SETTINGS;

import { ListingCard } from 'legacy/shared/ListingCard';
import { LatLngBounds, ListingShort } from 'networking/listings';
import { formatPrice } from 'utils/formatter';

import GoogleMapsWithMarkersContainer from './GoogleMapsWithMarkers.container';

const nearMarker = require('assets/images/iconmonstr-location-13-32.png');

interface Props extends RouterProps {
  bounds?: LatLngBounds;
  children?: React.ReactNode;
  className?: string;
  height?: string;
  selectedListing?: ListingShort;
  listings: ListingShort[];
  near?: google.maps.places.PlaceResult;
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
        destination: near.geometry.location,
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
    return (
      <GoogleMap
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
          position={near.geometry.location}
          title={near.name}
          zIndex={1000}
        />}
        {listings.filter(
          listing => !selectedListing || listing.id !== selectedListing.id
        ).map(listing => (
          <OverlayView
            key={listing.id}
            position={{ lat: listing.lat, lng: listing.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <button className="popover p-1 bs-popover-top" style={{ transform: 'translate(-50%, -100%)' }} onClick={() => onSelect(listing)}>
              <strong>{formatPrice(listing.pricePerNightUsd)}</strong>
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
