import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  /**
   * Fixed top is true the nav is fixed in the top of the application.
   */
  fixedTop?: boolean;

  /**
   * The color theme of the navbar.
   */
  variant?: 'light' | 'dark';
}

const Navbar: React.FC<Props> = ({
  fixedTop,
  children,
  variant = 'light',
  ...rest
}) => (
  <nav style={rest.style} className={`navbar ${variant === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} ${fixedTop ? 'fixed-top' : ''}`}>
    {children}
  </nav>
);

export default Navbar;
