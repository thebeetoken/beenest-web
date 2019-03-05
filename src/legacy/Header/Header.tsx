import * as React from 'react';
import { Query } from 'react-apollo';
import { Route, Switch } from 'react-router-dom';

import HeaderContainer from './Header.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'legacy/Legacy.context';
import { BannerConsumer, BannerConsumerProps } from 'HOCs/BannerProvider';
import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import { GET_USER } from 'networking/users';
import Banner from 'legacy/shared/Banner';
import BeeLink from 'legacy/shared/BeeLink';
import Button from 'legacy/shared/Button';
import Divider from 'legacy/shared/Divider';
import LazyImage from 'legacy/shared/LazyImage';
import ListItem from 'legacy/shared/ListItem';
import AudioLoading from 'legacy/shared/loading/AudioLoading';
import Svg from 'legacy/shared/Svg';

const DEFAULT_PROFILE_PHOTO = 'https://d9lhrxmc0upxv.cloudfront.net/fit-in/48x48/images/app/misc/profile.png';

const HEADER_HEIGHT = 64;
const HOST_INTEREST_LINK = '/legacy/hosts/signup?utm_source=header_host_signup_button';

const Header = () => (
  <AppConsumer>
    {({ screenType }: AppConsumerProps) => {
      if (screenType < ScreenType.TABLET) {
        return (
          <Switch>
            <Route exact path="/legacy/" component={MobileHomeHeader} />
            <Route exact path="/legacy/forgot_password" component={NoopComponent} />
            <Route exact path="/legacy/forgot_password_confirmation" component={NoopComponent} />
            <Route exact path="/legacy/hosts/onboarding/listed" component={NoopComponent} />
            <Route exact path="/legacy/hosts/onboarding/not_listed" component={NoopComponent} />
            <Route exact path="/legacy/hosts/signup" component={NoopComponent} />
            <Route exact path="/legacy/hosts/signup-outreach" component={NoopComponent} />
            <Route exact path="/legacy/hosts/onboarding/thank_you" component={NoopComponent} />
            <Route exact path="/legacy/hosts/signup/thank_you" component={NoopComponent} />
            <Route exact path="/legacy/hosts" component={NoopComponent} />
            <Route exact path="/legacy/login" component={NoopComponent} />
            <Route exact path="/legacy/signup" component={NoopComponent} />
            <Route path="/legacy/bookings" component={NoopComponent} />
            <Route path="/legacy/listings/:id/buy" component={NoopComponent} />
            <Route component={DefaultMobileHeader} />
          </Switch>
        );
      }

      return (
        <Switch>
          <Route exact path="/legacy/" component={HomeHeader} />
          <Route exact path="/legacy/forgot_password" component={HomeHeader} />
          <Route exact path="/legacy/forgot_password_confirmation" component={HomeHeader} />
          <Route exact path="/legacy/hosts/onboarding/listed" component={NoopComponent} />
          <Route exact path="/legacy/hosts/onboarding/not_listed" component={NoopComponent} />
          <Route exact path="/legacy/hosts/onboarding/thank_you" component={NoopComponent} />
          <Route exact path="/legacy/hosts/signup/thank_you" component={NoopComponent} />
          <Route exact path="/legacy/hosts/signup" component={NoopComponent} />
          <Route exact path="/legacy/hosts/signup-outreach" component={NoopComponent} />
          <Route exact path="/legacy/hosts" component={HostsHeader} />
          <Route exact path="/legacy/login" component={HomeHeader} />
          <Route exact path="/legacy/signup" component={HomeHeader} />
          <Route path="/legacy/bookings" component={BookingHeader} />
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
            return bannerState.showBanner ? <Banner {...bannerState} onClose={closeBanner} /> : <></>;
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
        return bannerState.showBanner ? <Banner {...bannerState} onClose={closeBanner} /> : <></>;
      }}
    </BannerConsumer>
    <HeaderContent />
  </HeaderContainer>
);

const HeaderContent = () => (
  <div className="header-wrapper">
    <BeeLink to="/legacy">
      <Svg className="header-logo" src="logo/beenest-horizontal" />
    </BeeLink>
    <Switch>
      <Route exact path="/legacy/forgot_password" component={NoopComponent} />
      <Route exact path="/legacy/forgot_password_confirmation" component={NoopComponent} />
      <Route exact path="/legacy/login" component={NoopComponent} />
      <Route exact path="/legacy/signup" component={NoopComponent} />
      <Route path="/legacy/listings/:id/buy" component={NoopComponent} />
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
            return bannerState.showBanner ? <Banner {...bannerState} onClose={closeBanner} /> : <></>;
          }}
        </BannerConsumer>
        <div className={`header-wrapper ${this.state.showMenu ? 'white' : ''}`.trim()}>
          <BeeLink to="/legacy">
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
                  <Query query={GET_USER}>
                    {({ loading, error, data }) => {
                      if (loading) {
                        return (
                          <div className="header-loading">
                            <AudioLoading height={48} width={96} />
                          </div>
                        );
                      }

                      if (error || !data) {
                        return <h1>{error ? error.message : 'Error / No Data'}</h1>;
                      }

                      if (!data) {
                        return <UnauthenticatedNavLinks />;
                      }

                      return (
                        <>
                          <div className="header-menu-container image" onClick={this.toggleMenu}>
                            <AppConsumer>
                              {({ screenType }: AppConsumerProps) => {
                                if (screenType < ScreenType.TABLET) {
                                  return (
                                    <LazyImage
                                      className={`${!showMenu ? 'show' : 'bee-lazy-image'}`}
                                      height="24"
                                      width="24"
                                      src={getProfilePhoto(data.user.profilePicUrl, user.photoURL)}
                                    />
                                  );
                                }

                                return (
                                  <LazyImage
                                    className={`${!showMenu ? 'show' : 'bee-lazy-image'}`}
                                    height="48"
                                    width="48"
                                    src={getProfilePhoto(data.user.profilePicUrl, user.photoURL)}
                                  />
                                );
                              }}
                            </AppConsumer>
                            <Svg className={`${showMenu ? 'show' : 'bee-svg'}`} src="utils/x" />
                          </div>
                          <MobileAuthenticatedHamburger closeMenu={this.closeMenu} showMenu={this.state.showMenu} />
                        </>
                      );
                    }}
                  </Query>
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
          <BeeLink href={HOST_INTEREST_LINK} target="_blank">
            <ListItem font="small-e" onClick={closeMenu} noHover suffixColor="secondary" textColor="secondary">
              <span>Become a Host</span>
              <Svg className="suffix" src="decorative/house" />
            </ListItem>
          </BeeLink>
          <BeeLink to="/legacy/trips">
            <ListItem font="small" onClick={closeMenu} noHover suffixColor="body">
              <span>Trips</span>
              <Svg className="suffix" src="decorative/location" />
            </ListItem>
          </BeeLink>
          <BeeLink to="/legacy/account">
            <ListItem font="small" onClick={closeMenu} noHover suffixColor="body">
              <span>Profile</span>
              <Svg className="suffix" src="decorative/profile" />
            </ListItem>
          </BeeLink>
          <BeeLink to="/legacy/help">
            <ListItem font="small" onClick={closeMenu} noHover suffixColor="body">
              <span>Help</span>
              <Svg className="suffix" src="utils/question" />
            </ListItem>
          </BeeLink>
          <Divider />
          <BeeLink to="/legacy/logout">
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
          <BeeLink to="/legacy/signup">
            <ListItem font="small-e" noHover textColor="secondary">
              <span>Sign Up</span>
            </ListItem>
          </BeeLink>
          <BeeLink to="/legacy/login">
            <ListItem font="small" noHover>
              <span>Login</span>
            </ListItem>
          </BeeLink>
          <BeeLink href={HOST_INTEREST_LINK} target="_blank">
            <ListItem font="small" noHover>
              <span>Become a Host</span>
            </ListItem>
          </BeeLink>
          <Divider />
          <BeeLink to="/legacy/help">
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
    <BeeLink to="/legacy/help">
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
        if (!user) {
          return <UnauthenticatedNavLinks />;
        }

        return (
          <Query query={GET_USER}>
            {({ loading, error, data }) => {
              if (loading) {
                return (
                  <div className="header-loading">
                    <AudioLoading height={48} width={96} />
                  </div>
                );
              }

              if (error) {
                return <h1>{error ? error.message : 'Error / No Data'}</h1>;
              }

              if (!data) {
                return <UnauthenticatedNavLinks />;
              }

              return <AuthenticatedNavLinks profilePicUrl={getProfilePhoto(data.user.profilePicUrl, user.photoURL)} />;
            }}
          </Query>
        );
      }}
    </FirebaseConsumer>
  </div>
);

const AuthenticatedNavLinks = ({ profilePicUrl }: any) => (
  <div className="header-authenticated">
    <BeeLink to="/legacy/trips">
      <span>Trips</span>
    </BeeLink>
    <div className="header-authenticated--profile">
      <BeeLink to="/legacy/account/general">
        <AppConsumer>
          {({ screenType }: AppConsumerProps) => {
            if (screenType < ScreenType.TABLET) {
              return (
                <LazyImage
                  src={profilePicUrl}
                  height="24"
                  width="24"
                />
              );
            }

            return (
              <LazyImage
                src={profilePicUrl}
                height="48"
                width="48"
              />
            );
          }}
        </AppConsumer>
      </BeeLink>
      <BeeLink to="/logout">
        <span>Log Out</span>
      </BeeLink>
    </div>
  </div>
);

const UnauthenticatedNavLinks = () => (
  <div className="header-unauthenticated">
    <BeeLink to="/legacy/login">
      <span>Login</span>
    </BeeLink>
    <BeeLink to="/legacy/signup">
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
    <BeeLink to="/legacy">
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
    <BeeLink to="/legacy">
      <Svg className="header-logo" src="logo/beenest-horizontal" />
    </BeeLink>
    <BeeLink href={HOST_INTEREST_LINK} target="_blank">
      <Button border="white" radius="4px" size="small">
        List Your Home
      </Button>
    </BeeLink>
  </div>
);


// healper functions

const getProfilePhoto = (photo: string | null | undefined, firebasePhoto: string | null | undefined): string => {
  if(photo) {
    return photo;
  } else if (firebasePhoto) {
    return firebasePhoto;
  }

  return DEFAULT_PROFILE_PHOTO;
}
export default Header;
