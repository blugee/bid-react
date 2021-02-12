import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import UserContext from '../contexts/UserContext';

const RestrictedRoute = ({component: Component, ...rest}) => (
  <UserContext.Consumer>
    {
      user => (
        <Route
          {...rest}
          render={props =>
            user.authenticated
              ? <Component {...props} />
              : <Redirect
                to={{
                  pathname: `/login`,
                  state: {from: props.location}
                }}
              />}
        />
      )
    }
  </UserContext.Consumer>
);

export default RestrictedRoute;
