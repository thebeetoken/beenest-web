
import * as React from 'react';
import AudioLoadingContainer from './AudioLoading.container';

/**
 * This component is a flexible loader.
 *
 * @author http://tobiasahlin.com/spinkit/
 * Implemented by kevin
 *
 * Created: July 18, 2018
 **/

type AudioLoadingProps = Partial<{
  color: string;
  height: number;
  width: number;
}>;

const AudioLoading = (props: AudioLoadingProps): JSX.Element => (
  <AudioLoadingContainer {...props}>
    <div className="rect1" />
    <div className="rect2" />
    <div className="rect3" />
    <div className="rect4" />
    <div className="rect5" />
  </AudioLoadingContainer>
);

/** @component */
export default AudioLoading;
