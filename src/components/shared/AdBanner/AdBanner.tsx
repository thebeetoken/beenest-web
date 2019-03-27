import * as React from 'react';

import AdBannerContainer from './AdBanner.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'legacy/Legacy.context';
import BeeLink from 'components/shared/BeeLink';
import LazyImage from 'components/shared/LazyImage';

type Props = Partial<{
  href: string;
  src: SrcProps;
  target: string;
}>;

type SrcProps = Partial<{
  mobile: string;
  tablet: string;
  desktop: string;
  huge: string;
}>;

const AdBanner = ({ href, src, target }: Props) => {
  if (!src || !src.mobile || !src.desktop) {
    return <></>;
  }

  return (
    <BeeLink href={href} target={target || '_self'}>
      <AdBannerContainer>
        <AppConsumer>
          {({ screenType }: AppConsumerProps) => {
            const getImgSrc = (() => {
              switch (screenType) {
                case ScreenType.MOBILE:
                  if (src.mobile) return src.mobile;
                case ScreenType.TABLET:
                  if (src.tablet) return src.tablet;
                case ScreenType.DESKTOP:
                  if (src.desktop) return src.desktop;
                case ScreenType.HUGE:
                  if (src.huge) return src.huge;
                default:
                  if (src.desktop) {
                    return src.desktop;
                  }
                  return '';
              }
            });

            return <LazyImage src={getImgSrc()} transition />
          }}
        </AppConsumer>
      </AdBannerContainer>
    </BeeLink>
  );
};

export default AdBanner;