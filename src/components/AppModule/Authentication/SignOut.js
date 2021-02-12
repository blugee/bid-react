import React, { PureComponent } from 'react';
import UserContext from '../../../contexts/UserContext';
import Session from 'store2'

export default class SignOut extends PureComponent {

  static contextType = UserContext;

  componentDidMount = () => {
    Session.clearAll();
    this.context.logout();
    window.location.assign(`/login`);
  };

  render() {
    return (
      <React.Fragment />
    )
  }
}
