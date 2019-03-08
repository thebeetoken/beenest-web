
import * as React from 'react';
import GridLoadingContainer from './GridLoading.container';

/**
 * This component is a flexible loader.
 *
 * @author http://tobiasahlin.com/spinkit/
 * Implemented by kevin
 *
 * Created: July 18, 2018
 **/

type GridLoadingProps = Partial<{
  color: string;
  height: number;
  width: number;
}>;

const GridLoading = (props: GridLoadingProps): JSX.Element => (
  <GridLoadingContainer {...props}>
    <div className="sk-cube-grid">
      <div className="sk-cube sk-cube1" />
      <div className="sk-cube sk-cube2" />
      <div className="sk-cube sk-cube3" />
      <div className="sk-cube sk-cube4" />
      <div className="sk-cube sk-cube5" />
      <div className="sk-cube sk-cube6" />
      <div className="sk-cube sk-cube7" />
      <div className="sk-cube sk-cube8" />
      <div className="sk-cube sk-cube9" />
    </div>
  </GridLoadingContainer>
);

/** @component */
export default GridLoading;
