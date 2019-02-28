import * as React from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import { BeenestSVGPrimary } from 'shared/svgComponents/SvgComponents';
import Loading from 'shared/loading/Loading';

const helpNavItem = {
  header: 'Help',
  link: '/work',
}

const navItems = [
  helpNavItem,
  {
    header: 'Login',
    link: '/work/login',
  },
  {
    header: 'Signup',
    link: '/work/signup',
  },
];

const authNavItems = [
  helpNavItem,
  {
    header: 'Account',
    link: '/work/account',
  },
  {
    header: 'Logout',
    link: '/work/logout',
  },
];

const Header = () => {
  const [isOpen, toggleNavbar] = React.useState<boolean>(false);

  return (
    <header className="sticky-top bg-white custom-header-height" id="bee-main-header">
      <Navbar light expand="md">
        <NavbarBrand href="/work">
          <BeenestSVGPrimary />
        </NavbarBrand>
        <NavbarToggler onClick={handleToggleNavbar} className="mr-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto u-header__navbar-nav pt-5 pb-3 pt-md-0 pb-md-0" navbar>
            <a href="/hosts/signup">
              <Button className="mb-4 mb-md-0 mr-md-4" type="button" outline color="primary">
                Become a Host
              </Button>
            </a>
            <FirebaseConsumer>
              {({ loading, user }: FirebaseUserProps) => {
                if (loading) {
                  return <Loading />;
                }
                if (user) {
                  return (
                    authNavItems.map(item => (
                      <NavItem className="px-2" key={item.header}>
                        <NavLink to={item.link} tag={Link}>
                          {item.header}
                        </NavLink>
                      </NavItem>
                    ))
                  );
                }
                return (
                  navItems.map(item => (
                    <NavItem className="px-2" key={item.header}>
                      <NavLink to={item.link} tag={Link}>
                        {item.header}
                      </NavLink>
                    </NavItem>
                  ))
                );
              }}
            </FirebaseConsumer>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );

  function handleToggleNavbar() {
    toggleNavbar(!isOpen);
  }
};

export default Header;