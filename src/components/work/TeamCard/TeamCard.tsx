import * as React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Fade,
} from 'reactstrap';

interface Props {
  name: string;
  title: string;
  avatar: string;
  handle?: string;
  social: {
    iconClass: string;
    link: string;
  }[];
}

const TEAM_CARD_STYLES = {
  height: '310px',
}

const TEAM_IMG_STYLES = {
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'white',
  overflow: 'hidden',
}

const TeamCard = (props: Props) => {
  const { name, title, avatar, handle, social } = props;
  return (
    <Card tag={Fade} className="mb-5 border-0 shadow" style={TEAM_CARD_STYLES}>
      <CardBody className="p-6 d-flex flex-column align-items-center justify-content-center">
        <div
          className="bg-img-hero d-flex align-items-center justify-content-center rounded-circle u-lg-avatar mb-3"
          style={{ ...TEAM_IMG_STYLES, backgroundImage: `url(${avatar})` }} />
        <CardTitle className="mb-2">{name}</CardTitle>
        <CardSubtitle className="small mb-2">{title}</CardSubtitle>
        {handle &&
          <a className="small" href={handle} target="_blank">
            <CardSubtitle>{handle.substring(handle.lastIndexOf('/') + 1, (handle.length))}</CardSubtitle>
          </a>
        }
        <ul className="list-inline mt-4">
          {social.map(profile => (
            <li className="list-inline-item" key={profile.link}>
              <a href={profile.link} className="btn btn-sm btn-icon btn-soft-secondary rounded-circle">
                <span className={`fab btn-icon__inner ${profile.iconClass}`} />
              </a>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default TeamCard;