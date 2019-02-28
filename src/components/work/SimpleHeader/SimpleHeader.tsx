import * as React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

import { BeenestSVGPrimary, BeenestSVGWhite } from 'shared/svgComponents/SvgComponents'

const HEADER_CLASSES = 'custom-header-height fixed-top';
const NAVBAR_BRAND_CLASSES = 'navbar-brand u-header__navbar-brand u-header__navbar-brand-center u-header__navbar-brand-default p-0 m-0 h-auto w-auto'
const BRAND_CONTAINER_STYLE = {
  height: '36px'
};

type Props = Partial<{
  primary: boolean;
  white: boolean
}>

const SimpleHeader = ({ primary = false, white = false }: Props) => {
  let mobileBrand = <BeenestSVGPrimary />;
  let brand = <BeenestSVGWhite />;

  if (primary) {
    brand = <BeenestSVGPrimary />;
  }

  if (white) {
    mobileBrand = <BeenestSVGWhite />;
  }

  return (
    <>
      <header className={HEADER_CLASSES}>
        <Navbar className="d-lg-none vw-100">
          <NavbarBrand
            tag={Link}
            to="/work"
            className={NAVBAR_BRAND_CLASSES}
          >
            <div className="d-lg-none" style={BRAND_CONTAINER_STYLE}>
              {mobileBrand}
            </div>
          </NavbarBrand>
        </Navbar>

        <Navbar className="d-none d-lg-flex">
          <NavbarBrand
            tag={Link}
            to="/work"
            className={NAVBAR_BRAND_CLASSES}
          >
            <div className="d-none d-lg-flex" style={BRAND_CONTAINER_STYLE}>
              {brand}
            </div>
          </NavbarBrand>
        </Navbar>
      </header>
    </>
  );
};



export default SimpleHeader;
