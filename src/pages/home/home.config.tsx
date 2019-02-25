import * as React from 'react';

import { ForbesSVG, HuffPostSVG, FastCompanySvg, IncSVG, SFChronicalSVG } from 'shared/svgComponents/SvgComponents';
export enum HomeUser {
  GUEST,
  HOST,
}

export const guestValueProps = [
  {
    alt: '',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    title: 'High Quality Places',
    body:
      'We are highly selective of places we list to fit your needs. Feel free to apply any filters such as Wifi, Amenities, Close to locations.',
  },
  {
    alt: '',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    title: 'Best Price, Best Consistency',
    body:
      'We list places that match with your price, and we make sure that every stay for your business trips are perfect consistently.',
  },
  {
    alt: '',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    title: 'Fast and Intuative Booking',
    body:
      'We make sure that you can browse and select a place within few clicks. We also make sure that payment is smooth.',
  },
];

export const hostValueProps = [
  {
    alt: '',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    title: 'Professional Guests',
    body:
      'We only accept business travelers who are looking for a quality place and will not leave any mess for your rooms.',
  },
  {
    alt: '',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    title: 'Increase Your Income',
    body:
      'You will be able to maximize your profit, as our target users are business travelers. Simply list your place, sit back and enjoy.',
  },
  {
    alt: '',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    title: 'Easy Set Up and Tracking',
    body:
      'We make sure that you can list your place in few steps. We also have an advanced dashboard for you to track your houses.',
  },
];

export const testimonials = [
  {
    alt: '',
    body: 'I used Beenest 3 times, and all 3 times, the houses have been consistently well equipped with amenities.',
    subtitle: 'Frontend Engineer',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97400&w=350&h=400',
    title: 'Kevin Van',
  },
  {
    alt: '',
    body: 'I used Beenest 3 times, and all 3 times, the houses have been consistently well equipped with amenities.',
    subtitle: 'CTO',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97400&w=350&h=400',
    title: 'Tony Tran',
  },
  {
    alt: '',
    body: 'I used Beenest 3 times, and all 3 times, the houses have been consistently well equipped with amenities.',
    subtitle: 'Frontend Engineer',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97400&w=350&h=400',
    title: 'Jeremy Kwa',
  },
  {
    alt: '',
    body: 'I used Beenest 3 times, and all 3 times, the houses have been consistently well equipped with amenities.',
    subtitle: 'Head of Engineering',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97400&w=350&h=400',
    title: 'Tommy Chheng',
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