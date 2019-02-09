import React, { useState, useEffect } from 'react';
import { branch, compose, lifecycle, renderComponent, withProps } from 'recompose';
import { Circle, GoogleMap, withGoogleMap, withScriptjs, Marker } from 'react-google-maps';

import { SETTINGS } from 'configs/settings';
const { GOOGLE_MAPS_KEY } = SETTINGS;

import GoogleMapsContainer from './GoogleMaps.container';
import AudioLoading from 'shared/loading/AudioLoading';

interface Props {
  address?: string;
  children?: React.ReactNode;
  className?: string;
  height?: string;
  lat?: number;
  lng?: number;
  getCoordinates?: (coordinates: google.maps.LatLngLiteral) => google.maps.LatLngLiteral;
  showMarker?: boolean;
  showCircle?: boolean;
  width?: string;
}

const circleOptions = {
  fillColor: '#FFC107',
  fillOpacity: 0.35,
  strokeColor: '#FFC107',
  strokeOpacity: 0.8,
  strokeWeight: 2,
};

function GoogleMaps(props: Props) {
  const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(true);

  const debouncedAddress = useDebounce(props.address, 500);

  useEffect(() => {
    setLoading(true);
    setIsMounted(true);

    fetchCoordinates(debouncedAddress || '')
      .then(({ lat, lng }: google.maps.LatLngLiteral) => {
        if (!isMounted) return;

        props.getCoordinates && props.getCoordinates({ lat, lng });
        setCoordinates({ lat, lng });
        setLoading(false);
        setError(false);
      })
      .catch(error => {
        if (!isMounted) return;

        console.error(error);
        setLoading(false);
        setError(true);
      });

    return cleanUp;
  }, [debouncedAddress]);

  function cleanUp() {
    setLoading(false);
    setError(false);
    setIsMounted(false);
  }

  if (loading) {
    return <AudioLoading height={48} width={96} />;
  }

  if (coordinates.lat === 0 && coordinates.lng === 0) {
    return <h1>Please provide a valid address</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <GoogleMap defaultZoom={13.5} defaultCenter={coordinates}>
      {props.showCircle && <Circle center={coordinates} options={circleOptions} radius={900} />}
      {props.showMarker && <Marker position={coordinates} />}
    </GoogleMap>
  );
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
    },
  }),
  branch(({ error }) => error, renderComponent(() => <h1>Error loading Google Maps.</h1>)),
  withScriptjs,
  withGoogleMap
)(GoogleMaps);

function fetchCoordinates(address: string): Promise<google.maps.LatLngLiteral> {
  if (!window.google || !window.google.maps) return Promise.reject(new Error('Google Maps does not exist.'));

  const geocoder = new window.google.maps.Geocoder();

  return new Promise<google.maps.LatLngLiteral>((resolve, reject) => {
    geocoder.geocode({ address }, (res: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve({ lat: res[0].geometry.location.lat(), lng: res[0].geometry.location.lng() });
      } else {
        reject(new Error('Could not fetch coordinates.'));
      }
    });
  });
}

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}
