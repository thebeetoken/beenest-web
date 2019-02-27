import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { Card, Alert } from 'reactstrap';
import { GET_USER, UPDATE_USER } from 'networking/users';
import Container from 'reactstrap/lib/Container';

import { PhotoUploader, Photo } from 'shared/PhotoUploader';
import { AlertProperties } from 'components/work/Alert/Alert';
import ProfilePhotoUploaderContainer from 'components/work/ProfilePhotoUploader/ProfilePhotoUploader.container';


const ProfilePhotoUploader = ({ profilePicUrl, updateUser }: any) => {
  const [isUploadSuccessful, setUploadSuccessful] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<AlertProperties>({ color: '', msg: '', show: false });

  const hideUploaderClass = isUploadSuccessful ? 'hide-uploader' : '';
  return (
    <Container className="d-flex flex-column align-items-center">
      <Card className="p-3 mb-3 rounded-0">
        <ProfilePhotoUploaderContainer>
          <div
            className="photo-uploader-container"
            style={{
            backgroundImage: `url(${profilePicUrl || 'https://static.beenest.com/images/app/misc/profile.png'})`,
            }}>
            <div className={hideUploaderClass}>
              <PhotoUploader maxFiles={1} message="Change Photo" onPhotosUpdated={handlePhotoChange} />
            </div>
          </div>
          </ProfilePhotoUploaderContainer>
      </Card>
      <Alert color={alert.color} isOpen={alert.show} toggle={() => setAlert({ ...alert, show: !alert.show })}>
          {alert.msg}
      </Alert>
    </Container>
  );

  function handlePhotoChange(value: Photo[]) {
    const profilePicUrl = value && value.length ? value[0].url : '';
    updateUser({ profilePicUrl })
      .then(() => {
        setUploadSuccessful(true);
        setAlert({
          color: 'success',
          msg: 'Your photo was updated succesfully.',
          show: true,
        });
      })
      .catch((error: Error) => {
        setUploadSuccessful(false);
        setAlert({
          color: 'danger',
          msg: `There was an error updating your photo. ${error.message}`,
          show: true,
        });
      });
  }
};

export default compose(
  graphql(UPDATE_USER, {
    props: ({ mutate }: any) => ({
      updateUser: (input: any): Promise<any> => {
        return mutate({
          variables: { input },
          refetchQueries: [{ query: GET_USER }],
          update: (store: any, { data: updateUser }: any) => {
            const { user } = store.readQuery({
              query: GET_USER,
            });
            store.writeQuery({
              query: GET_USER,
              data: {
                user: {
                  ...user,
                  ...updateUser,
                },
              },
            });
          },
        });
      },
    }),
  })
)(ProfilePhotoUploader);
