import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const ScrollNavLink = ({ to, children, ...props }) => {
  const handleClick = () => {
    scroll.scrollTo(document.getElementById(to).offsetTop, {
      duration: 500,
      smooth: true,
    });
  };

  return (
    <NavLink
      to={`/#${to}`}
      {...props}
      onClick={handleClick}
    >
      {children}
    </NavLink>
  );
};

export default ScrollNavLink;