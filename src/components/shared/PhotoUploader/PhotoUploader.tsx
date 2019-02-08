/**
 * This component is a custom
 * PhotoUploader component
 * wrapper around React Dropzone
 * Component
 *
 * @author kevin
 * Created: August 9, 2018
 **/

import * as React from 'react';
import { DropzoneComponent } from 'react-dropzone-component';
import { SETTINGS } from 'configs/settings';
const { BEENEST_HOST_API } = SETTINGS;

import Svg from 'shared/Svg';

import PhotoUploaderContainer from './PhotoUploader.container';
import { getTokenFromFirebase } from 'utils/firebase';

interface Props {
  initialPhotos?: Photo[];
  maxFiles?: number;
  message?: string;
  onClick?: () => void;
  onPhotosUpdated: (value: Photo[]) => void;
}

export interface Photo {
  url: string;
}

interface State {
  token: string | null;
}

const CONFIG = {
  iconFiletypes: ['.jpg', '.png', '.jpeg'],
  postUrl: `${BEENEST_HOST_API}/beenest/v1/photos/upload`,
};

export class PhotoUploader extends React.Component<Props, State> {
  static defaultProps = {
    maxFiles: 10,
    message: 'Drag Cover Photo Here',
  };
  readonly state = {
    token: null,
  };

  async componentDidMount() {
    const token = await getTokenFromFirebase();
    return this.setState({ token });
  }

  render() {
    const djsConfig = {
      clickable: true,
      addRemoveLinks: true,
      acceptedFiles: 'image/jpeg,image/png,image/gif',
      autoProcessQueue: true,
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
      maxFiles: this.props.maxFiles || null,
      maxFilesize: 5,
      parallelUploads: 1,
    };
    return (
      <PhotoUploaderContainer onClick={this.props.onClick}>
        <DropzoneComponent
          config={CONFIG}
          eventHandlers={this.eventHandlers}
          djsConfig={djsConfig}>
          <div className="dz-message">
            <Svg className="photouploader-svg" src="logo/bee-circle" />
            <span>{this.props.message}</span>
          </div>
        </DropzoneComponent>
      </PhotoUploaderContainer>
    );
  }

  dropzone: any;
  photos: Photo[] = [];

  getPhotos = (): Photo[] => {
    return this.photos;
  };

  handleMaxFilesExceeded = (file: Photo) => {
    this.dropzone.removeFile(file);
  };

  handleRemovedFile = (file: Photo) => {
    this.photos = this.photos.filter(photo => photo.url !== file.url);
    this.props.onPhotosUpdated(this.getPhotos());
    console.log('Photo removed');
  };

  handleSuccess = (file: Photo, response: any) => {
    if (this.props.maxFiles && this.props.maxFiles < this.dropzone.files.length) {
      this.dropzone.removeFile(file);
      return;
    }

    file.url = response.photoUrl;
    this.photos.push(file);
    this.dropzone.processQueue();
  };

  handleError = ({}, message: string | Error) => {
    console.log('error', message);
    alert('Please remove all files and try again, if this continues please contact engineering');
  };

  handleQueueComplete = () => {
    console.log('Photo queue successfully uploaded');
    return this.props.onPhotosUpdated(this.getPhotos());
  };

  eventHandlers = {
    init: (dz: DropzoneComponent) => {
      this.dropzone = dz;
      this.preloadImages(dz);
    },
    success: this.handleSuccess,
    removedfile: this.handleRemovedFile,
    error: this.handleError,
    maxfilesexceeded: this.handleMaxFilesExceeded,
    queuecomplete: this.handleQueueComplete,
  };

  preloadImages = (dropzone: any) => {
    (this.props.initialPhotos || []).forEach(photo => {
      if (!photo || !photo.url) return;

      let mockPhoto = {
        name: 'Placeholder',
        accepted: true, // important for maxFiles to recognize file
        size: 99,
        ...photo,
      };
      dropzone.emit('addedfile', mockPhoto);
      dropzone.emit('thumbnail', mockPhoto, photo.url);
      dropzone.emit('complete', mockPhoto);
      dropzone.files.push(mockPhoto);
      this.photos.push(mockPhoto);
    });
  };
}
