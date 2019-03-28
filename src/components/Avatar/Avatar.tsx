import * as React from 'react';

import { Host } from 'networking/listings';
import LazyImage from 'components/LazyImage';

interface Props {
  user: Host;
  width?: string;
  height?: string;
}

const DEFAULT_PROFILE_URL = 'https://static.beenest.com/images/app/misc/profile.png';
const DEFAULT_WIDTH = "5rem";
const DEFAULT_HEIGHT = "5rem";

const Avatar = ({ user, width, height }: Props) => <LazyImage
 className="rounded-circle"
 src={(user && user.profilePicUrl) || DEFAULT_PROFILE_URL}
 width={width || DEFAULT_WIDTH}
 height={height || DEFAULT_HEIGHT}
/>;

export default Avatar;