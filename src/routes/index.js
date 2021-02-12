import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";


import Main from './main';



import UserContext from '../contexts/UserContext';
import {
  ACCESS_DENIED,
} from '../constants/URLConstant';

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <UserContext.Consumer>
      {
        user => (
          <Switch>
            {
             <Route path={`${match.url}main`} component={Main} /> 
            }
            <Redirect to={ACCESS_DENIED} />
          </Switch>
        )
      }
    </UserContext.Consumer>
  </div>
);

export default App;
