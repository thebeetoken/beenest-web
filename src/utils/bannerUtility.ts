import { BannerConsumerProps } from 'HOCs/BannerProvider';

export const ACCOUNT_VERIFICATION = 'Click here to verify your email and phone number to start booking!';

export const showAccountVerificationBanner = async (isUserVerified: boolean, bannerActions: BannerConsumerProps['bannerActions'], bannerState: BannerConsumerProps['bannerState']): Promise<void> => {
  const userVerified = isUserVerified && bannerState.showBanner;
  const userUnverified = !isUserVerified && !bannerState.showBanner;
  const options = {
    message: ACCOUNT_VERIFICATION,
    background: 'secondary',
    textColor: 'white',
    to: '/account/verification',
  }

  if (userVerified) {
    await bannerActions.closeBanner();
  }

  if (userUnverified) {
    await bannerActions.setBannerOptions(options);
    await bannerActions.openBanner();
  }
}