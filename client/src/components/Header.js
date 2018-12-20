import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => {

// this renders the html
  return (
    <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <NavLink to='/signUp' className="signup">Sign Up</NavLink>
          <NavLink to='/signIn' className="signin">Sign In</NavLink>
        </div>
      </div>
    );
  };

export default Header;
