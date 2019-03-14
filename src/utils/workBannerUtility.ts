import { WorkBannerConsumerProps } from 'HOCs/WorkBannerProvider';

export const ACCOUNT_VERIFICATION = 'Click here to verify your email and phone number to start booking!';

export const showAccountVerificationBanner = (
  isUserVerified: boolean,
  bannerDispatch: WorkBannerConsumerProps['bannerDispatch'],
  bannerState: WorkBannerConsumerProps['bannerState']): void => {
  const userVerified = isUserVerified && bannerState.show;
  const userUnverified = !isUserVerified && !bannerState.show;
  const options = {
    message: ACCOUNT_VERIFICATION,
    background: 'secondary',
    textColor: 'white',
    to: '/account/verification',
  }

  if (userVerified) {
    bannerDispatch({ type: 'close' });
  }

  if (userUnverified) {
    bannerDispatch({ type: 'set', payload: options });
    bannerDispatch({ type: 'open' });
  }
}