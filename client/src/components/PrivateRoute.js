import React from 'react';
import {
    Route,
    Redirect
  } from 'react-router-dom';

// the privateRoute will be used for pages that need the user to be logged in order to view the page
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      sessionStorage.getItem('auth') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signIn',
            state: {from: props.location}
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
