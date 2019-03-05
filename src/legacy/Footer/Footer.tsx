import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import FooterContainer from './Footer.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'legacy/Legacy.context';
import BeeLink from 'legacy/shared/BeeLink';
import Divider from 'legacy/shared/Divider';

const HOST_INTEREST_LINK = '/legacy/hosts/signup';

const Footer = () => (
  <AppConsumer>
    {({ screenType }: AppConsumerProps) => {
      if (screenType < ScreenType.TABLET) {
        return (
          <Switch>
            <Route path="/legacy/bookings" component={NoopComponent} />
            <Route exact path="/legacy/forgot_password" component={NoopComponent} />
            <Route exact path="/legacy/forgot_password_confirmation" component={NoopComponent} />
            <Route exact path="/legacy/hosts/onboarding/listed" component={NoopComponent} />
            <Route exact path="/legacy/hosts/onboarding/not_listed" component={NoopComponent} />
            <Route exact path="/legacy/hosts/onboarding/thank_you" component={NoopComponent} />
            <Route exact path="/legacy/hosts/signup/thank_you" component={NoopComponent} />
            <Route exact path="/legacy/hosts/signup" component={NoopComponent} />
            <Route exact path="/legacy/hosts/signup-outreach" component={NoopComponent} />
            <Route path="/legacy/listings/" component={NoopComponent} />
            <Route exact path="/legacy/login" component={NoopComponent} />
            <Route exact path="/legacy/signup" component={NoopComponent} />
            <Route component={MobileFooter} />
          </Switch>
        );
      }

      return (
        <Switch>
          <Route path="/legacy/bookings" component={ShortFooter} />
          <Route exact path="/legacy/forgot_password" component={NoopComponent} />
          <Route exact path="/legacy/forgot_password_confirmation" component={NoopComponent} />
          <Route exact path="/legacy/hosts/onboarding/listed" component={NoopComponent} />
          <Route exact path="/legacy/hosts/onboarding/not_listed" component={NoopComponent} />
          <Route exact path="/legacy/hosts/onboarding/thank_you" component={NoopComponent} />
          <Route exact path="/legacy/hosts/signup/thank_you" component={NoopComponent} />
          <Route exact path="/legacy/hosts/signup" component={NoopComponent} />
          <Route exact path="/legacy/hosts/signup-outreach" component={NoopComponent} />
          <Route exact path="/legacy/login" component={NoopComponent} />
          <Route exact path="/legacy/signup" component={NoopComponent} />
          <Route component={DefaultFooter} />
        </Switch>
      );
    }}
  </AppConsumer>
);

const DefaultFooter = () => (
  <FooterContainer className="footer">
    <div className="footer-wrapper">
      <div className="footer--top-links">
        <BeeLink
          href={HOST_INTEREST_LINK}
          target="_blank">
          Become a Host
        </BeeLink>
        <BeeLink
          href="https://beetoken.com"
          rel="external"
          target="_blank">
          Bee Token Site
        </BeeLink>
        <div className="bee-flex-div" />
        <BeeLink
          target="_blank"
          href="https://support.beenest.com/">
          Have Feedback? Help Us Improve!
        </BeeLink>
      </div>
      <div className="bee-flex-div" />
      <Divider color="core" />
      <div className="footer--bottom-meta">
        <h1>&copy;Beenest Inc 2017-2019. All Rights Reserved.</h1>
        <div className="bee-flex-div" />
        <BeeLink
          href="https://static.beenest.com/legal/Beenest+-+Platform+Terms+of+Service.pdf"
          rel="external"
          target="_blank">
          Terms of Service
        </BeeLink>
        <BeeLink
          href="https://static.beenest.com/legal/Beenest+-+Privacy+Policy.pdf"
          rel="external"
          target="_blank">
          Privacy Policy
        </BeeLink>
      </div>
    </div>
  </FooterContainer>
);

const MobileFooter = () => (
  <FooterContainer className="footer">
    <div className="footer-wrapper">
      <div className="footer--top-mobile">
        <BeeLink
          href="https://static.beenest.com/legal/Beenest+-+Platform+Terms+of+Service.pdf"
          rel="external"
          target="_blank">
          Terms of Service
        </BeeLink>
        <BeeLink
          href="https://static.beenest.com/legal/Beenest+-+Privacy+Policy.pdf"
          rel="external"
          target="_blank">
          Privacy Policy
        </BeeLink>
      </div>
      <Divider color="middle" />
      <div className="bee-flex-div" />
      <div className="footer--bottom-mobile">
        <h1>&copy;Beenest Inc 2017-2019. All Rights Reserved.</h1>
      </div>
    </div>
  </FooterContainer>
);

const NoopComponent = () => (
  null
);

const ShortFooter = () => (
  <FooterContainer className="footer short">
    <div className="footer-wrapper">
      <h1>&copy;Beenest Inc 2017-2019. All Rights Reserved.</h1>
    </div>
  </FooterContainer>
);

export default Footer;
