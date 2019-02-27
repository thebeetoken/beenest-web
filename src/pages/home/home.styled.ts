import { FLEX_CENTER } from 'styled/sharedClasses/layout';

export const CONTENT_CLASSES = {
  TITLE: 'font-weight-regular text-center text-lh-sm',
  SUBTITLE: 'small text-center',
  FEATURES_CONTAINER: {
    LAYOUT: 'd-flex flex-column align-items-center mt-7 mt-md-8 pb-lg-10',
  },
  FEATURES: {
    LAYOUT: 'flex-column flex-md-row justify-content-center mt-5 mt-md-8 mt-lg-10',
    COLUMN_LAYOUT: 'mb-3 mb-lg-0',
  }
};

export const JUMBOTRON_CLASSES = "bee-home-hero-img bg-img-hero d-flex flex-column align-items-center justify-content-center height-md-60vh gradient-overlay-half-primary-v1 pt-8 pb-6 pt-md-0 pb-md-0";

export const AFFILIATE_CLASSES = `${FLEX_CENTER} mb-4 mb-lg-0`;
export const TESTIMONIAL_CLASSES = `${FLEX_CENTER} mb-6 mb-lg-0`;
