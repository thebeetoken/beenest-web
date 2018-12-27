import * as React from 'react';

import AccountProfileContainer from './AccountProfile.container';
import ProfilePhotoUploader from './ProfilePhotoUploader';

import { User } from 'networking/users';

interface Props {
  user: User;
}

const AccountProfile = ({ user }: Props) => (
  <AccountProfileContainer>
    <aside>
      <div className="top-bar" />
      <div className="square-container">
        <div className="profile-image">
          <ProfilePhotoUploader profilePicUrl={user.profilePicUrl} />
        </div>
      </div>
    </aside>
  </AccountProfileContainer>
);

export default AccountProfile;
