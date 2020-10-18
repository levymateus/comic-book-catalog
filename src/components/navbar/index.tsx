import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  fixedTop?: boolean;
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
