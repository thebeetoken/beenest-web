import * as React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

import { BeenestSVGPrimary, BeenestSVGWhite } from 'shared/svgComponents/SvgComponents'

const AuthHeader = () => (
  <>
    <header className="custom-header-height fixed-top">
      <Navbar>
        <NavbarBrand
          tag={Link}
          to="/work"
          className="navbar-brand u-header__navbar-brand u-header__navbar-brand-center u-header__navbar-brand-default p-0 m-0"
        >
          <div className="d-none d-lg-flex">
            <BeenestSVGWhite />
          </div>
        </NavbarBrand>
      </Navbar>
    </header>

    <header className="custom-header-height fixed-top">
      <Navbar className="d-lg-none vw-100">
        <NavbarBrand
          tag={Link}
          to="/work"
          className="navbar-brand u-header__navbar-brand u-header__navbar-brand-center u-header__navbar-brand-default p-0 m-0"
        >
          <div className="d-lg-none">
            <BeenestSVGPrimary />
          </div>
        </NavbarBrand>
      </Navbar>
    </header>
  </>
);

export default AuthHeader;
