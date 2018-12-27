import * as React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import BookingNavBarContainer from './BookingNavBar.container';
import Fab from 'shared/Fab';
import Svg from 'shared/Svg';

interface Props extends RouterProps {
  listingId?: string;
}

const BookingNavBar = (props: Props) => (
  <BookingNavBarContainer>
    <AppConsumer>
      {({ screenType }: AppConsumerProps) =>
        screenType < ScreenType.TABLET ? <NavBarMobile {...props} /> : <NavBarDesktop {...props} />
      }
    </AppConsumer>
  </BookingNavBarContainer>
);

enum Steps {
  OPTIONS = 1,
  PAYMENT = 2,
  RECEIPT = 3,
}

const CRUMBS = [
  { path: '/bookings/:id/options', step: Steps.OPTIONS, title: 'Method of Payment' },
  { path: '/bookings/:id/payment', step: Steps.PAYMENT, title: 'Terms & Submit Payment' },
  { path: '/bookings/:id/receipt', step: Steps.RECEIPT, title: 'Confirmation' },
];

const NavBarMobile: React.SFC<Props> = ({ listingId, match }) => {
  const crumb = CRUMBS.find(p => p.path === match.path);
  if (!crumb) {
    return <div>Error</div>;
  }
  const navLinkTo = crumb.step === Steps.OPTIONS ? `/listings/${listingId}` : `/bookings/${match.params.id}/options`;
  return (
    <div className="booking-nav-mobile">
      {crumb.step !== Steps.RECEIPT && (
        <NavLink to={navLinkTo}>
          <Fab clear color="upper" height="64px" icon="utils/arrow-left" noPadding width="64px" />
        </NavLink>
      )}
      <div className="booking-nav-mobile-crumb">
        <div className="booking-nav-mobile-step">
          Step {crumb.step} of {CRUMBS.length}
        </div>
        <div className="booking-nav-mobile-title">{crumb.title}</div>
      </div>
    </div>
  );
};

const NavBarDesktop: React.SFC<Props> = ({ match }) => (
  <div className="booking-nav-desktop">
    {CRUMBS.map((crumb, index) => {
      if (match.path === '/bookings/:id/payment' && index === 0) {
        return (
          <NavLink to={`/bookings/${match.params.id}/options`} key={crumb.path}>
            <div>
              {crumb.step}
              &#46; {crumb.title}
            </div>
          </NavLink>
        );
      }
      const matchClassName = match.path === crumb.path ? 'booking-nav-crumb match' : 'booking-nav-crumb';
      return (
        <React.Fragment key={crumb.step}>
          {index > 0 && <Svg className="booking-nav-carat" src="utils/carat-right" />}
          <div className={matchClassName} key={crumb.path}>
            <div>
              {crumb.step}
              &#46; {crumb.title}
            </div>
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

export default withRouter(BookingNavBar);
