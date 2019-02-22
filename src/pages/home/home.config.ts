import { CONTENT_CLASSES } from './home.styled';

export enum HomeUser {
  GUEST,
  HOST,
}

export const guestValueProps = [
  {
    alt: '',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    className: CONTENT_CLASSES.FEATURES.COLUMN_LAYOUT,
    title: 'High Quality Places',
    body:
      'We are highly selective of places we list to fit your needs. Feel free to apply any filters such as Wifi, Amenities, Close to locations.',
  },
  {
    alt: '',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    className: CONTENT_CLASSES.FEATURES.COLUMN_LAYOUT,
    title: 'Best Price, Best Consistency',
    body:
      'We list places that match with your price, and we make sure that every stay for your business trips are perfect consistently.',
  },
  {
    alt: '',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    className: CONTENT_CLASSES.FEATURES.COLUMN_LAYOUT,
    title: 'Fast and Intuative Booking',
    body:
      'We make sure that you can browse and select a place within few clicks. We also make sure that payment is smooth.',
  },
];

export const hostValueProps = [
  {
    alt: '',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    className: CONTENT_CLASSES.FEATURES.COLUMN_LAYOUT,
    title: 'Professional Guests',
    body:
      'We only accept business travelers who are looking for a quality place and will not leave any mess for your rooms.',
  },
  {
    alt: '',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    className: CONTENT_CLASSES.FEATURES.COLUMN_LAYOUT,
    title: 'Increase Your Income',
    body:
      'You will be able to maximize your profit, as our target users are business travelers. Simply list your place, sit back and enjoy.',
  },
  {
    alt: '',
    src: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
    className: CONTENT_CLASSES.FEATURES.COLUMN_LAYOUT,
    title: 'Easy Set Up and Tracking',
    body:
      'We make sure that you can list your place in few steps. We also have an advanced dashboard for you to track your houses.',
  },
];