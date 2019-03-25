import * as React from 'react';

import { ForbesSVG, HuffPostSVG, FastCompanySvg, IncSVG, SFChronicalSVG } from 'components/shared/svgComponents/SvgComponents';
export enum HomeUser {
  GUEST,
  HOST,
}

export const guestValueProps = [
  {
    alt: 'High Quality Prices',
    src: 'https://static.beenest.com/images/work/home/guestValue1.jpg',
    title: 'High Quality Places',
    body:
      'We are highly selective of places we list to fit your needs. Feel free to apply any filters such as Wifi, Amenities, Close to locations.',
  },
  {
    alt: 'Best Price',
    src: 'https://static.beenest.com/images/work/home/guestValue2.jpg',
    title: 'Best Price, Best Consistency',
    body:
      'We list places that match with your price, and we make sure that every stay for your business trips are perfect consistently.',
  },
  {
    alt: 'Intuitive Booking',
    src: 'https://static.beenest.com/images/work/home/guestValue3.jpg',
    title: 'Fast and Intuitive Booking',
    body:
      'We make sure that you can browse and select a place within a few clicks. We also make sure that payment is smooth.',
  },
];

export const hostValueProps = [
  {
    alt: 'Professional Guests',
    src: 'https://static.beenest.com/images/work/home/hostValue1.jpg',
    title: 'Professional Guests',
    body:
      'We only accept business travelers who are looking for a quality place and will not leave any of your accommodations a mess.',
  },
  {
    alt: 'Increase Your Income',
    src: 'https://static.beenest.com/images/work/home/hostValue2.jpg',
    title: 'Increase Your Income',
    body:
      'You will be able to maximize your profit, as our target users are business travelers. Simply list your place, sit back and enjoy.',
  },
  {
    alt: 'Easy Setup',
    src: 'https://static.beenest.com/images/work/home/hostValue3.jpg',
    title: 'Easy Setup and Tracking',
    body:
      'We make sure that you can list your place in a few steps. We also have an advanced dashboard for you to track your listings.',
  },
];

export const testimonials = [
  {
    alt: 'Janelle Testimonial',
    body: '"Booked for an executive team of 3 for a conference in LA, and I am very pleased with my experience. We saved money not having to reserve multiple hotel rooms and even enjoyed views of the beach!"',
    subtitle: 'Administrative Business Partner',
    src: 'https://static.beenest.com/images/work/home/janelle.jpg',
    title: 'Janelle',
    link: '',
  },
  {
    alt: 'Benedict Testimonial',
    body: '"Property damage is a major concern as a property manager. Beenest has always provided me with professional guests, and I worry less about things being broken. List on Beenest for better bookings."',
    subtitle: 'Property Manager',
    src: 'https://s3-us-west-2.amazonaws.com/beenest-public/images/work/home/benedict.jpg',
    title: 'Benedict',
    link: 'https://homevest.co/',
  },
  {
    alt: 'Kyle Testimonial',
    body: '"Booking with Beenest saved me so much time and headache! The site is designed well, doesn’t overwhelm you with information, and I was able to find both hotels and homes in New York City."',
    subtitle: 'Lead Customer Success Manager',
    src: 'https://static.beenest.com/images/work/home/kyle.jpg',
    title: 'Kyle',
    link: '',
  },
  {
    alt: 'Ben Testimonial',
    body: '"I travel a lot as a consultant and Beenest helped me immensely with accommodations. Such a great site and easy to use! My go-to option when I travel to conferences. Thanks and best of luck to the Beenest team!"',
    subtitle: `Marketing Consultant`,
    src: 'https://static.beenest.com/images/work/home/ben.jpg',
    title: 'Ben',
    link: '',
  },
];

export const affiliations = [
  {
    svg: <ForbesSVG />,
    href: 'https://www.forbes.com/sites/lorihil/2018/02/15/a-more-secure-way-to-home-share-blockchain-technology/#3891384c5e8b',
  },
  {
    svg: <HuffPostSVG />,
    href: 'https://www.huffingtonpost.com/entry/brain-drain-uber-google-facebook-engineers-create_us_5a4d4965e4b0df0de8b06f18',
  },
  {
    svg: <FastCompanySvg />,
    href: 'https://www.fastcompany.com/40524021/on-this-blockchain-based-version-of-airbnb-theres-no-middleman',
  },
  {
    svg: <IncSVG />,
    href: 'https://www.inc.com/darren-heitner/how-this-entrepreneur-is-fixing-250-billion-sharing-economy-with-blockchain-technology.html',
  },
  {
    svg: <SFChronicalSVG />,
    href: 'https://www.sfchronicle.com/business/article/Bitcoin-ethereum-can-pay-for-home-rentals-12526206.php',
  },
];