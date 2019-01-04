import * as React from 'react';
import { Redirect, Switch } from 'react-router-dom';

const generateSearchLink = (city:string, lat:number, lng:number) => (
  `/listings?locationQuery=${encodeURIComponent(city)}&coordinates%5Blat%5D=${lat}&coordinates%5Blng%5D=${lng}`
);

export default function Markets() {
  return (
    <Switch>
      <Redirect from={`/markets/san-francisco`} to={generateSearchLink('san-francisco', 37.7749295, -122.41941550000001)} />
      <Redirect from={`/markets/los-angeles`} to={generateSearchLink('los-angeles', 34.0522342, -118.2436849)} />
      <Redirect from={`/markets/new-york`} to={generateSearchLink('new-york', 40.7127753, -74.0059728)} />
      <Redirect from={`/markets/denver`} to={generateSearchLink('denver', 39.7392358,-104.990251)} />
    </Switch>
  );
};
