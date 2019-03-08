import * as React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

import { BeenestSVGPrimary, BeenestSVGWhite } from 'legacy/shared/svgComponents/SvgComponents'

const HEADER_CLASSES = 'd-flex align-items-center custom-header-height';
const NAVBAR_BRAND_CLASSES = 'navbar-brand u-header__navbar-brand u-header__navbar-brand-center u-header__navbar-brand-default p-0 m-0 h-auto w-auto'
const BRAND_CONTAINER_STYLE = {
  height: '36px'
};

type Props = Partial<{
  block: boolean;
  fixed: boolean;
  primary: boolean;
  white: boolean;
}>

const SimpleHeader = ({ primary = false, white = false, fixed = false, block = false }: Props) => {
  let mobileBrand = <BeenestSVGPrimary />;
  let brand = <BeenestSVGWhite />;
  let headerBackground = 'bg-transparent';

  if (primary) {
    brand = <BeenestSVGPrimary />;
  }

  if (white) {
    mobileBrand = <BeenestSVGWhite />;
  }

  return (
    <>
      <header className={`${HEADER_CLASSES} ${headerBackground} ${fixed ? 'fixed-top' : block ? '' : 'sticky-top'}`.trim()}>
        <Navbar className="d-lg-none vw-100">
          <NavbarBrand
            tag={Link}
            to="/"
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
            to="/"
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
