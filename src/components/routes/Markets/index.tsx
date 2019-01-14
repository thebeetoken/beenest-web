import * as React from 'react';
import NotFound from 'components/routes/NotFound';
import { Route, Redirect, Switch } from 'react-router-dom';

const generateSearchLink = (market:string, lat:number, lng:number) => (
  `/listings?locationQuery=${encodeURIComponent(market.replace(/-/g,' '))}&coordinates%5Blat%5D=${lat}&coordinates%5Blng%5D=${lng}`
);

const markets = [
    {id: 'san-francisco', lat: 37.7749295, lng: -122.41941550000001},
    {id: 'los-angeles', lat: 34.0522342, lng: -118.2436849},
    {id: 'new-york', lat: 40.7127753, lng: -74.0059728},
    {id: 'las-vegas', lat: 36.1699412, lng: -115.13982959999998},
    {id: 'miami', lat: 25.7616798, lng: -80.19179020000001},
    {id: 'hawaii', lat: 19.8967662, lng: -155.58278180000002},
    {id: 'denver', lat: 39.7392358,lng: -104.990251},
    {id: 'chicago', lat: 41.8781136,lng: -87.62979819999998},
    {id: 'san-diego', lat: 32.715738,lng: -117.16108380000003},
    {id: 'boston', lat: 42.3600825, lng:-71.05888010000001},
    {id: 'seattle', lat: 47.6062095, lng:-122.3320708},
    {id: 'austin', lat: 30.267153, lng:-97.74306079999997},
    {id: 'new-orleans', lat: 29.95106579999999, lng: -90.0715323},
    {id: 'houston', lat: 29.7604267, lng: -95.3698028},
    {id: 'orlando', lat: 28.5383355, lng: -81.37923649999999},
];

export default function Markets() {
  return (
    <Switch>
      {markets.map((market: {id:string, lat:number, lng:number}) => (
         <Redirect from={`/markets/${market.id}`} to={generateSearchLink(market.id, market.lat, market.lng)} key={market.id} />
        )
      )}
      <Route component={NotFound} />
    </Switch>
  );
};
