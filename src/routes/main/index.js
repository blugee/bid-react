import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";

const Main = ({ match }) => (
  <Switch>

    <Route path={`${match.url}/bid`} exact component={asyncComponent(() => import('./Bid'))} />
    <Route path={`${match.url}/bid/add`} component={asyncComponent(() => import('./Bid/AddBid'))} />
    <Route path={`${match.url}/bid/edit`} component={asyncComponent(() => import('./Bid/AddBid'))} />


    <Route path={`${match.url}/items`} exact component={asyncComponent(() => import('./Items'))} />
    <Route path={`${match.url}/items/add`} exact component={asyncComponent(() => import('./Items/AddItem'))} />
    <Route path={`${match.url}/items/edit`} component={asyncComponent(() => import('./Items/AddItem'))} />

    <Route path={`${match.url}/customer`} exact component={asyncComponent(() => import('./Customer'))} />
    <Route path={`${match.url}/customer/add`} exact component={asyncComponent(() => import('./Customer/AddCustomer'))} />
    <Route path={`${match.url}/customer/edit`} component={asyncComponent(() => import('./Customer/AddCustomer'))} />

    <Route path={`${match.url}/profile/basic-info`} exact component={asyncComponent(() => import('../../components/AppModule/Profile'))} />
  </Switch>
);

export default Main;
