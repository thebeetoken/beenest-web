import * as React from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { BeenestSVGPrimary } from 'shared/svgComponents/SvgComponents';

const navItems = [
  {
    header: 'Help',
    link: '/work',
  },
  {
    header: 'Login',
    link: '/work/login',
  },
  {
    header: 'Signup',
    link: '/work/signup',
  },
];

const Header = () => {
  const [isOpen, toggleNavbar] = React.useState<boolean>(false);

  return (
    <header className="fixed-top bg-white">
      <Navbar light expand="md">
        <NavbarBrand href="/work">
          <BeenestSVGPrimary />
        </NavbarBrand>
        <NavbarToggler onClick={handleToggleNavbar} className="mr-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto u-header__navbar-nav pt-5 pt-md-0" navbar>
            <Button type="button" outline color="primary" className="mb-4 mb-md-0 mr-md-4">
              Become a Host
            </Button>
            {navItems.map(item => (
              <NavItem className="px-2" key={item.header}>
                <NavLink to={item.link} tag={Link}>
                  {item.header}
                </NavLink>
              </NavItem>
            ))}
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
