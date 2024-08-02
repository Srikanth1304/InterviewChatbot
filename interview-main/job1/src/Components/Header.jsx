// Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <Link to="/">Interview</Link>
      <Link to="/notifications">Notifications</Link>
    </div>
  );
};

export default Header;
