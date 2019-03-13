import { WorkBannerConsumerProps } from 'HOCs/WorkBannerProvider';

export const ACCOUNT_VERIFICATION = 'Click here to verify your email and phone number to start booking!';

export const showAccountVerificationBanner = async (
  isUserVerified: boolean,
  bannerDispatch: WorkBannerConsumerProps['bannerDispatch'],
  bannerState: WorkBannerConsumerProps['bannerState']): Promise<void> => {
  const userVerified = isUserVerified && bannerState.show;
  const userUnverified = !isUserVerified && !bannerState.show;
  const options = {
    message: ACCOUNT_VERIFICATION,
    background: 'secondary',
    textColor: 'white',
    to: '/account/verification',
  }

  if (userVerified) {
    await bannerDispatch({ type: 'close' });
  }

  if (userUnverified) {
    await bannerDispatch({ type: 'set', payload: options });
    await bannerDispatch({ type: 'open' });
  }
}