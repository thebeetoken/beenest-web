import * as React from 'react';
import { compose, graphql } from 'react-apollo';

import ProfilePhotoUploaderContainer from './ProfilePhotoUploader.container';

import { GET_USER, UPDATE_USER } from 'networking/users';
import { PhotoUploader, Photo } from 'shared/PhotoUploader';
import Snackbar from 'shared/Snackbar';

const SNACKBAR_DURATION_MS = 5000;

class ProfilePhotoUploader extends React.Component<any, any> {
  readonly state = {
    isUploadSuccessful: false,
    snackbar: {
      autoHideDuration: SNACKBAR_DURATION_MS,
      message: '',
      open: false,
    },
  };

  render() {
    const hideUploaderClass = this.state.isUploadSuccessful ? 'hide-uploader' : '';
    const profilePicUrl = this.props.profilePicUrl || 'https://static.beenest.com/images/app/misc/profile.png';
    const { snackbar } = this.state;
    return (
      <ProfilePhotoUploaderContainer>
        <div className="photo-uploader-container"
          style={{backgroundImage: `url(${profilePicUrl})`}}>
          <div className={hideUploaderClass}>
            <PhotoUploader
              maxFiles={1}
              message="Change Photo"
              onPhotosUpdated={this.handlePhotoChange} />
          </div>
        </div>
        {snackbar.open &&
          <Snackbar
            autoHideDuration={snackbar.autoHideDuration}
            open={snackbar.open}
            onClose={this.closeSnackbar}>
            {snackbar.message}
          </Snackbar>
        }
      </ProfilePhotoUploaderContainer>
    );
  }

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false,
      }
    });
    window.location.reload();
  }

  handlePhotoChange = (value: Photo[]) => {
    const profilePicUrl = value && value.length ? value[0].url : '';
    this.props.updateUser({ profilePicUrl })
      .then(() => {
        this.setState({
          isUploadSuccessful: true,
          snackbar: {
            autoHideDuration: SNACKBAR_DURATION_MS,
            message: 'Your photo was updated succesfully.',
            open: true,
          }
        });
      })
      .catch((error: Error) => {
        this.setState({
          isUploadSuccessful: false,
          snackbar: {
            autoHideDuration: SNACKBAR_DURATION_MS,
            message: `There was an error updating your photo. ${error.message}`,
            open: true,
          }
        });
      });
  }
}

export default compose(
  graphql(UPDATE_USER, {
    props: ({ mutate }: any) => ({
      updateUser: (input: any): Promise<any> => {
        return mutate({
          variables: { input },
          refetchQueries: [{ query: GET_USER }],
          update: (store: any, { data: updateUser }: any) => {
            const { user } = store.readQuery({
              query: GET_USER
            });
            store.writeQuery({
              query: GET_USER,
              data: {
                user: {
                  ...user,
                  ...updateUser
                }
              }
            });
          }
        });
      },
    }),
  }),
)(ProfilePhotoUploader);
