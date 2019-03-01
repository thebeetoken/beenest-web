import * as React from 'react';
import sanitizeHtml from 'sanitize-html';

import HostsStartContainer from './HostsStart.container';
import Overlay from 'shared/Overlay';
import LazyImage from 'shared/LazyImage';
import Button from 'shared/Button';
import Svg from 'shared/Svg';
import GeneralWrapper from 'shared/GeneralWrapper';
import Divider from 'shared/Divider';
import BeeLink from 'shared/BeeLink';
import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';

const hostsStartPageContent = {
  banner: {
    header: 'Earn more when you\nlist your place on Beenest',
    tagline: 'Unlike other home sharing platforms, we don\'t charge our hosts fees.\nBeenest hosts get 100% of what guests pay to rent their place.',
    offer: 'For a limited time only, list your place and get $50*',
    cta: {
      buttonText: 'Get Started',
      link: '/hosts/signup',
    },
    disclaimer: '*Hosts who add listings to Beenest will receive a $50 Amazon gift card. Limited time offer, one gift card per host.',
    img: {
      url: 'https://static.beenest.com/images/hosts-page/hosts-hero.jpg'
    },
  },
  process: {
    header: 'How it Works',
    cards: [
      {
        svg: 'decorative/house',
        title: '1. List Your Place',
        description: 'Fill out our Host Form and we\'ll create your free listing for you. It\'s as easy at that.\n\n Do you have 3+ properties?\nEmail us directly at ',
        email: 'support@beenest.com.com',
        subjectLine: 'Questions about Beenest',
      },
      {
        svg: 'decorative/travel',
        title: '2. Get Bookings',
        description: 'You\'ll get an email when your place has been booked—reply to confirm the booking. Guests will be charged for their stay once you\'ve confirmed.\nIs your place listed on other home sharing sites? Beenest syncs with your iCal to help you avoid double bookings.',
      },
      {
        svg: 'decorative/earn',
        title: '3. Get Paid',
        description: 'Beenest doesn\'t charge hosts fees, so hosts get 100% of what their guests pay. Hosts are paid 72 hours after guests complete their stay.',
      },
    ],
    cta: {
      buttonText: 'Get Started',
      link: '/hosts/signup',
    },
  },
  security: {
    header: 'Safe and Secure',
    items: [
      {
        text: 'Guest Verification',
        svg: 'decorative/profile',
      },
      {
        text: 'Property Damage Protection',
        caption: '(up to $10,000 USD)',
        svg: 'decorative/lock',
      },
      {
        text: '24/7 Host Support',
        svg: 'decorative/chat',
      },
    ],
    img: {
      url: 'https://static.beenest.com/images/hosts-page/hosts-safe-and-secure.jpg'
    },
  },
  rewards: {
    header: 'Host Rewards',
    description: 'Beenest is a community-driven platform powered by our own native utility token, BEE.\n\nParticipants in our Host Rewards Program are awarded $50 worth of BEE every week, just for listing their homes on our platform.',
    cta: {
      buttonText: 'Learn More',
      link: '/hosts/signup',
    },
    svg: 'decorative/rewards-icon',
  },
  testimonials: {
    hostName: 'Brad Greiner',
    hostImgURL: 'https://s3-us-west-2.amazonaws.com/beenest-public/images/users/brad_greiner.png',
    testimony: '\"The short term rental industry has been built on the backs of countless hardworking hosts around the world.  Our 24/7 hard work as hosts has built this industry, and the time for a revolution for home sharing hosts is upon us.\n\nBeenest offers the best home-sharing platform for hosts. As a Beenest host, I earn about 20% more every time someone books one of my homes. They have my business as both a host and guest.\"',
    cta: {
      buttonText: 'Get Started',
      link: '/hosts/signup',
    },
    backgroundImg: {
      url: 'https://static.beenest.com/images/hosts-page/hosts-testimonials-2.jpg'
    },
  },
  contact: {
    header: 'Questions? Concerns?',
    description: 'We\'re here for you! Get in touch via email at ',
    email: 'support@beenest.com.com',
    subjectLine: 'Questions about Beenest',
  },
};

interface HostsBanner {
  disclaimer: string;
  cta: cta;
  header: string;
  img: img;
  offer: string;
  tagline: string
}

interface cta {
  buttonText: string;
  link: string;
};

interface img {
  url: string;
}

const HostsEarnPage = () => {
  const { banner, contact, process, rewards, security, testimonials } = hostsStartPageContent;
  return (
    <HostsStartContainer className="hosts-page-container">
      <HostsBanner { ...banner }/>
      <Process {...process} />
      <HostsSecurity {...security} />
      <HostsRewards {...rewards} />
      <Testimonials {...testimonials} />
      <HostsContact {...contact} />
    </HostsStartContainer>
  );
};

const HostsBanner = ({ disclaimer, cta, header, img, offer, tagline }: HostsBanner) => {
  return (
    <div className="hosts-banner-container">
      <Overlay>
        <LazyImage src={img ?  img.url : ''} transition />
      </Overlay>
      <AppConsumer>
        {({ screenType }: AppConsumerProps) => {
          const responsive = screenType < ScreenType.DESKTOP;
          console.log(screenType);
          return (
            <GeneralWrapper width={responsive ? '100%' : 1040} direction="column">
              <div className="text-container">
                <h1>{header}</h1>
                {!responsive && <h2>{tagline}</h2>}
                <h3>{offer}</h3>
                {cta &&
                  <BeeLink href={cta.link}>
                    <Button background="style" color="core" radius="4px">
                      {cta.buttonText}
                    </Button>
                  </BeeLink>
                }
              </div>
              <div className="disclaimer-container">
                <h4>{disclaimer}</h4>
              </div>
            </GeneralWrapper>
          );
        }}
      </AppConsumer>
    </div>
  );
}


interface Process {
  cards: ProcessCard[];
  cta: cta;
  header: string;
}

interface ProcessCard {
  description: string;
  email?: string;
  subjectLine?: string;
  svg: string;
  title: string;
}

const Process = ({cards, cta, header}: Process) => {
  const processCards = (cards || []).map(card => {
    return <ProcessCard key={card.title} {...card} />
  });

  return (
    <div className="process-container">
      <AppConsumer>
        {({ screenType }: AppConsumerProps) => {
          const responsive = screenType < ScreenType.DESKTOP;
          return (
            <GeneralWrapper width={responsive ? '100%' : 1040} direction="column">
              <Divider color="style"/>
              <header>{header}</header>
              <div className="card-group-container">
                {processCards}
              </div>
              {cta &&
                <BeeLink href={cta.link}>
                  <Button background="style" color="core" radius="4px">
                    {cta.buttonText}
                  </Button>
                </BeeLink>
              }
            </GeneralWrapper>
          );
        }}
      </AppConsumer>
    </div>
  );
}

const ProcessCard = ({description, email, subjectLine, svg, title}: ProcessCard) => {
  return (
    <div className="card-container">
      <div className="icon-container">
        <Svg src={svg || 'utils/check-circle'} />
      </div>
      {!!title && <h2>{title}</h2>}
      {!!description &&
        <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) + (
          email 
            ? `<a href={mailto:${email}?Subject=${encodeURIComponent(subjectLine || '')} target="_blank"}>${email}.</a>`
            : ''
        )}}>
        </p>
      }
    </div>
  );
};


interface HostsSecurity {
  header: string;
  items: SecurityItem[];
  img: img;
}

interface SecurityItem {
  caption?: string;
  svg: string;
  text: string;
}

const HostsSecurity = ({ header, items, img }: HostsSecurity) => {
  return (
    <div className="security-container">
      <Overlay>
        <LazyImage src={img ?  img.url : ''} transition />
      </Overlay>
      <AppConsumer>
        {({ screenType }: AppConsumerProps) => {
          const responsive = screenType < ScreenType.DESKTOP;
          return (
            <GeneralWrapper width={responsive ? '100%' : 1040} direction="column">
              <Divider color="style"/>
              <div className="text-container">
                <header>{header}</header>
                <ul>
                  {(items || []).map((item: SecurityItem) => item && item.text &&
                    <li key={item.text}>
                      <div>
                        <h3>{item.text}</h3>
                        {item.caption && <h4>{item.caption}</h4>}
                      </div>
                      {item.svg && <Svg src={item.svg} />}
                    </li>
                  )}
                </ul>
              </div>
            </GeneralWrapper>
          );
        }}
      </AppConsumer>
    </div>
  );
};


interface HostsRewards {
  cta: cta;
  description: string;
  header: string;
  svg: string;
}

const HostsRewards = ({ cta, description, header, svg }: HostsRewards) => (
  <div className="rewards-container">
    <AppConsumer>
      {({ screenType }: AppConsumerProps) => {
        const responsive = screenType < ScreenType.DESKTOP;
        return (
          <GeneralWrapper width={responsive ? '100%' : 1040}>
            <Divider color="style" />
            <div className="text-container">
              <header>{header}</header>
              <p>{description}</p>
              {cta &&
                <BeeLink href={cta.link}>
                  <Button background="style" color="core" radius="4px">
                    {cta.buttonText}
                  </Button>
                </BeeLink>
              }
            </div>
            {!responsive &&
              <div className="icon-container">
                <Svg src={svg} />
              </div>
            }
          </GeneralWrapper>
        );
      }}
    </AppConsumer>
  </div>
);


interface Testimonials {
  backgroundImg: img;
  cta: cta;
  hostName: string;
  hostImgURL: string;
  testimony: string;
}

const Testimonials = ({ backgroundImg, cta, hostName, hostImgURL, testimony }: Testimonials) => (
  <div className="testimonials-container">
    <Overlay>
      <LazyImage src={backgroundImg ?  backgroundImg.url : ''} transition />
    </Overlay>
    <AppConsumer>
      {({ screenType }: AppConsumerProps) => {
        const responsive = screenType < ScreenType.DESKTOP;
        return (
          <GeneralWrapper width={responsive ? '100%' : 1040} direction="column">
            <div className="testimony">
              <div className="host-img-container">
                <LazyImage src={hostImgURL || ''} transition />
              </div>
              <div className="text-container">
                <h3>Beenest Host | {hostName}</h3>
                <p>{testimony}</p>
              </div>
              <div className="triangle"></div>
              {cta &&
                <BeeLink href={cta.link}>
                  <Button background="style" color="core" radius="4px">
                    {cta.buttonText}
                  </Button>
                </BeeLink>
              }
            </div>
          </GeneralWrapper>
        );
      }}
    </AppConsumer>
  </div>
);


interface HostsContact {
  header: string;
  description: string;
  email: string;
  subjectLine: string;
}

const HostsContact = ({ header, description, email, subjectLine }: HostsContact) => (
  <div className="hosts-contact-container">
    <GeneralWrapper className="hosts-contact-text" width="100%">
      <h3>{header}</h3>
      <h4>{description}
        <BeeLink href={`mailto:${email}?Subject=${encodeURIComponent(subjectLine || '')}`} target="_blank">{email}</BeeLink>
      </h4>
    </GeneralWrapper>
  </div>
);

export default HostsEarnPage;
