import { BannerConsumerProps } from 'HOCs/BannerProvider';

export const ACCOUNT_VERIFICATION = 'Click here to verify your email and phone number to start booking!';

export const showAccountVerificationBanner = (
  userVerified: boolean,
  bannerDispatch: BannerConsumerProps['bannerDispatch'],
  bannerState: BannerConsumerProps['bannerState']): void => {
  const options = {
    message: ACCOUNT_VERIFICATION,
    background: 'secondary',
    textColor: 'white',
    to: '/account/verification',
  }

  if (userVerified && bannerState.show) {
    bannerDispatch({ type: 'close' });
  }

  if (!userVerified && !bannerState.show) {
    bannerDispatch({ type: 'set', payload: options });
    bannerDispatch({ type: 'open' });
  }
}