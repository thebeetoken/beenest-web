/**
 * This component is a custom
 * React-Router component.
 *
 * @author kevin
 * Created: July 31, 2018
 **/

import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LocationDescriptor } from 'history';

interface BeeLinkProps {
  activeClassName?: string;
  children: React.ReactNode;
  className?: string;
  exact?: boolean;
  href?: string;
  isNav?: boolean;
  rel?: string;
  to?: LocationDescriptor;
  target?: string;
}

const BeeLink = ({ activeClassName, children, className, exact, href, isNav, rel, target, to }: BeeLinkProps): JSX.Element => {
  if (!!href && !isNav) {
    return (
      <a className={className ? className : ''} href={href} target={target} rel={rel}>
        {children}
      </a>
    );
  } else if (isNav && !!to) {
    return (
      <NavLink className={className ? className : ''} to={to} exact={exact} activeClassName={activeClassName} target={target}>
        {children}
      </NavLink>
    );
  } else if (!isNav && !!to) {
    return (
      <Link className={className ? className : ''} to={to} target={target}>
        {children}
      </Link>
    );
  } else {
    return <a target={target}>{children}</a>;
  }
};

/** @component */
export default BeeLink;
