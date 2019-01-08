import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import HeaderContainer from './Header.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import { BannerConsumer, BannerConsumerProps } from 'HOCs/BannerProvider';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import Banner from 'shared/Banner';
import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import Divider from 'shared/Divider';
import LazyImage from 'shared/LazyImage';
import ListItem from 'shared/ListItem';
import AudioLoading from 'shared/loading/AudioLoading';
import Svg from 'shared/Svg';

const HEADER_HEIGHT = 64;
const HOST_INTEREST_LINK = '/hosts/signup?utm_source=header_host_signup_button';

const Header = () => (
  <AppConsumer>
    {({ screenType }: AppConsumerProps) => {
      if (screenType < ScreenType.TABLET) {
        return (
          <Switch>
            <Route exact path="/" component={MobileHomeHeader} />
            <Route exact path="/forgot_password" component={NoopComponent} />
            <Route exact path="/forgot_password_confirmation" component={NoopComponent} />
            <Route exact path="/hosts/onboarding/listed" component={NoopComponent} />
            <Route exact path="/hosts/onboarding/not_listed" component={NoopComponent} />
            <Route exact path="/hosts/signup" component={NoopComponent} />
            <Route exact path="/hosts/signup-outreach" component={NoopComponent} />
            <Route exact path="/hosts/onboarding/thank_you" component={NoopComponent} />
            <Route exact path="/hosts/signup/thank_you" component={NoopComponent} />
            <Route exact path="/hosts" component={NoopComponent} />
            <Route exact path="/login" component={NoopComponent} />
            <Route exact path="/signup" component={NoopComponent} />
            <Route path="/bookings" component={NoopComponent} />
            <Route path="/listings/:id/buy" component={NoopComponent} />
            <Route component={DefaultMobileHeader} />
          </Switch>
        );
      }

      return (
        <Switch>
          <Route exact path="/" component={HomeHeader} />
          <Route exact path="/forgot_password" component={HomeHeader} />
          <Route exact path="/forgot_password_confirmation" component={HomeHeader} />
          <Route exact path="/hosts/onboarding/listed" component={NoopComponent} />
          <Route exact path="/hosts/onboarding/not_listed" component={NoopComponent} />
          <Route exact path="/hosts/onboarding/thank_you" component={NoopComponent} />
          <Route exact path="/hosts/signup/thank_you" component={NoopComponent} />
          <Route exact path="/hosts/signup" component={NoopComponent} />
          <Route exact path="/hosts/signup-outreach" component={NoopComponent} />
          <Route exact path="/hosts" component={HostsHeader} />
          <Route exact path="/login" component={HomeHeader} />
          <Route exact path="/signup" component={HomeHeader} />
          <Route path="/bookings" component={BookingHeader} />
          <Route component={DefaultHeader} />
        </Switch>
      );
    }}
  </AppConsumer>
);

interface State {
  transparentHeader: Boolean;
}

class HomeHeader extends React.Component {
  readonly state: State = {
    transparentHeader: true,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <HeaderContainer className={`header ${this.state.transparentHeader ? 'transparent' : ''}`.trim()}>
        <BannerConsumer>
          {({ bannerState, bannerActions: { closeBanner } }: BannerConsumerProps) => {
            return bannerState.showBanner ? <Banner {...bannerState} onClose={closeBanner} /> : <></>
          }}
        </BannerConsumer>
        <HeaderContent />
      </HeaderContainer>
    );
  }
  handleScroll = () => {
    const { transparentHeader } = this.state;
    if (window.scrollY > HEADER_HEIGHT && transparentHeader) {
      return this.setState({ transparentHeader: false });
    } else if (window.scrollY < HEADER_HEIGHT && !transparentHeader) {
      return this.setState({ transparentHeader: true });
    }
    return;
  };
}

const DefaultHeader = () => (
  <HeaderContainer className="header">
    <BannerConsumer>
      {({ bannerState, bannerActions: { closeBanner } }: BannerConsumerProps) => {
        return bannerState.showBanner ? <Banner {...bannerState} onClose={closeBanner} /> : <></>
      }}
    </BannerConsumer>
    <HeaderContent />
  </HeaderContainer>
);

const HeaderContent = () => (
  <div className="header-wrapper">
    <BeeLink to="/">
      <Svg className="header-logo" src="logo/beenest-horizontal" />
    </BeeLink>
    <Switch>
      <Route exact path="/forgot_password" component={NoopComponent} />
      <Route exact path="/forgot_password_confirmation" component={NoopComponent} />
      <Route exact path="/login" component={NoopComponent} />
      <Route exact path="/signup" component={NoopComponent} />
      <Route path="/listings/:id/buy" component={NoopComponent} />
      <Route component={NavigationItems} />
    </Switch>
  </div>
);

class MobileHomeHeader extends React.Component {
  readonly state: State = {
    transparentHeader: true,
  };
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  render() {
    return (
      <DefaultMobileHeader className={`header ${this.state.transparentHeader ? 'transparent' : 'header'}`.trim()} />
    );
  }
  handleScroll = () => {
    const { transparentHeader } = this.state;
    if (window.scrollY > HEADER_HEIGHT && transparentHeader) {
      return this.setState({ transparentHeader: false });
    } else if (window.scrollY < HEADER_HEIGHT && !transparentHeader) {
      return this.setState({ transparentHeader: true });
    }
    return;
  };
}

interface MobileHamburgerState {
  showMenu: boolean;
}

interface MobileHeaderProps {
  className: string;
}

class DefaultMobileHeader extends React.Component<MobileHeaderProps> {
  readonly state: MobileHamburgerState = { showMenu: false };
  render() {
    const { showMenu } = this.state;
    return (
      <HeaderContainer className={`header ${this.props.className}`.trim()}>
        <BannerConsumer>
          {({ bannerState, bannerActions: { closeBanner } }: BannerConsumerProps) => {
            return bannerState.showBanner ? <Banner {...bannerState} onClose={closeBanner} /> : <></>
          }}
        </BannerConsumer>
        <div className={`header-wrapper ${this.state.showMenu ? 'white' : ''}`.trim()}>
          <BeeLink to="/">
            <Svg className="header-logo" src="logo/beenest-horizontal" />
          </BeeLink>
          <FirebaseConsumer>
            {({ loading, user }: FirebaseUserProps) => {
              if (loading) {
                return (
                  <div className="header-loading-mobile">
                    <AudioLoading height={24} width={48} />
                  </div>
                );
              }
              if (user) {
                return (
                  <>
                    <div className="header-menu-container image" onClick={this.toggleMenu}>
                      <LazyImage
                        className={`${!showMenu ? 'show' : 'bee-lazy-image'}`}
                        src={user.photoURL ? user.photoURL : "https://static.beenest.com/images/app/misc/profile.png"} />
                      <Svg className={`${showMenu ? 'show' : 'bee-svg'}`} src="utils/x" />
                    </div>
                    <MobileAuthenticatedHamburger closeMenu={this.closeMenu} showMenu={this.state.showMenu} />
                  </>
                );
              }
              return (
                <>
                  <div className="header-menu-container" onClick={this.toggleMenu}>
                    <Svg className={`${!showMenu ? 'show' : ''}`} src="utils/hamburger" />
                    <Svg className={`${showMenu ? 'show' : 'bee-svg'}`} src="utils/x" />
                  </div>
                  <MobileUnauthenticatedHamburger closeMenu={this.closeMenu} showMenu={this.state.showMenu} />
                </>
              );
            }}
          </FirebaseConsumer>
        </div>
      </HeaderContainer>
    );
  }

  closeMenu = () => {
    this.setState({ showMenu: false });
  };

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };
}

interface MobileHamburgerProps {
  closeMenu: () => void;
  showMenu: boolean;
}

const MobileAuthenticatedHamburger = ({ closeMenu, showMenu }: MobileHamburgerProps) => {
  return (
    <>
      {showMenu && (
        <div className="header-menu-mobile">
          <BeeLink
            href={HOST_INTEREST_LINK}
            target="_blank"
          >
            <ListItem font="small-e" onClick={closeMenu} noHover suffixColor="secondary" textColor="secondary">
              <span>Become a Host</span>
              <Svg className="suffix" src="decorative/house" />
            </ListItem>
          </BeeLink>
          <BeeLink to="/trips">
            <ListItem font="small" onClick={closeMenu} noHover suffixColor="body">
              <span>Trips</span>
              <Svg className="suffix" src="decorative/location" />
            </ListItem>
          </BeeLink>
          <BeeLink to="/account">
            <ListItem font="small" onClick={closeMenu} noHover suffixColor="body">
              <span>Profile</span>
              <Svg className="suffix" src="decorative/profile" />
            </ListItem>
          </BeeLink>
          <BeeLink to="/help">
            <ListItem font="small" onClick={closeMenu} noHover suffixColor="body">
              <span>Help</span>
              <Svg className="suffix" src="utils/question" />
            </ListItem>
          </BeeLink>
          <Divider />
          <BeeLink to="/logout">
            <ListItem font="small" onClick={closeMenu} noHover suffixColor="body">
              <span>Logout</span>
              <Svg className="suffix" src="decorative/sign-out" />
            </ListItem>
          </BeeLink>
        </div>
      )}
    </>
  );
};

const MobileUnauthenticatedHamburger = ({ closeMenu, showMenu }: MobileHamburgerProps) => {
  return (
    <>
      {showMenu && (
        <div className="header-menu-mobile">
          <BeeLink to="/signup">
            <ListItem font="small-e" noHover textColor="secondary">
              <span>Sign Up</span>
            </ListItem>
          </BeeLink>
          <BeeLink to="/login">
            <ListItem font="small" noHover>
              <span>Login</span>
            </ListItem>
          </BeeLink>
          <BeeLink
            href={HOST_INTEREST_LINK}
            target="_blank"
          >
            <ListItem font="small" noHover>
              <span>Become a Host</span>
            </ListItem>
          </BeeLink>
          <Divider />
          <BeeLink to="/help">
            <ListItem font="small" onClick={closeMenu} noHover suffixColor="body">
              <span>Help</span>
              <Svg className="suffix" src="utils/question" />
            </ListItem>
          </BeeLink>
        </div>
      )}
    </>
  );
};

const NavigationItems = () => (
  <div className="header-navigation--items">
    <BeeLink href={HOST_INTEREST_LINK}>
      <HomeBecomeAHostButton />
    </BeeLink>
    <BeeLink to="/help">
      <span>Help</span>
    </BeeLink>
    <FirebaseConsumer>
      {({ loading, user }: FirebaseUserProps) => {
        if (loading) {
          return (
            <div className="header-loading">
              <AudioLoading height={48} width={96} />
            </div>
          );
        }
        return user ? <AuthenticatedNavLinks photoURL={user.photoURL} /> : <UnauthenticatedNavLinks />;
      }}
    </FirebaseConsumer>
  </div>
);

const AuthenticatedNavLinks = ({ photoURL }: any) => (
  <div className="header-authenticated">
    <BeeLink to="/trips">
      <span>Trips</span>
    </BeeLink>
    <div className="header-authenticated--profile">
      <BeeLink to="/account/general">
        <LazyImage src={photoURL ? photoURL : "https://static.beenest.com/images/app/misc/profile.png"} />
      </BeeLink>
      <BeeLink to="/logout">
        <span>Log Out</span>
      </BeeLink>
    </div>
  </div>
);

const UnauthenticatedNavLinks = () => (
  <div className="header-unauthenticated">
    <BeeLink to="/login">
      <span>Login</span>
    </BeeLink>
    <BeeLink to="/signup">
      <span>Sign Up</span>
    </BeeLink>
  </div>
);

const NoopComponent = () => null;

const HomeBecomeAHostButton = () => (
  <Button className="header-navigation--signup" border="white" color="white" size="small" textStyle="title-7">
    Become a Host
  </Button>
);

const BookingHeader = () => (
  <HeaderContainer className="header">
    <BeeLink to="/">
      <div className="header-wrapper">
        <Svg className="header-logo" src="logo/beenest-horizontal" />
      </div>
    </BeeLink>
  </HeaderContainer>
);

class HostsHeader extends React.Component {
  readonly state: State = {
    transparentHeader: true,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <HeaderContainer className={`header ${this.state.transparentHeader ? 'transparent' : ''}`.trim()}>
        <HostsHeaderContent />
      </HeaderContainer>
    );
  }
  handleScroll = () => {
    const { transparentHeader } = this.state;
    if (window.scrollY > HEADER_HEIGHT && transparentHeader) {
      return this.setState({ transparentHeader: false });
    } else if (window.scrollY < HEADER_HEIGHT && !transparentHeader) {
      return this.setState({ transparentHeader: true });
    }
    return;
  };
}

const HostsHeaderContent = () => (
  <div className="header-wrapper">
    <BeeLink to="/">
      <Svg className="header-logo" src="logo/beenest-horizontal" />
    </BeeLink>
    <BeeLink
      href={HOST_INTEREST_LINK}
      target="_blank">
      <Button
        border="white"
        radius="4px"
        size="small">
        List Your Home
      </Button>
    </BeeLink>
  </div>
);
export default Header;
