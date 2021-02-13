import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import Session from 'store2';

import { removeUIError, setTime } from '../../appRedux/actions';
import ErrorBoundary from "../../util/ErrorBoundary";
import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from "../../components/AppModule/Authentication/SignIn";
import SignOut from "../../components/AppModule/Authentication/SignOut";
import AccessDenied from "../../components/AppModule/ErrorPages/404";
import SomethingWrong from "../../components/AppModule/ErrorPages/SomethingWrong";
import SecurityThreat from "../../components/AppModule/ErrorPages/SecurityThreat";
import { LAYOUT_TYPE_BOXED, LAYOUT_TYPE_FRAMED, LAYOUT_TYPE_FULL } from "../../constants/ThemeSetting";
import AuthService from '../../service/AuthService';
import ReactPlaceholder from "react-placeholder";
import CircularProgress from "../../components/AppModule/CircularProgress";
import UserContext from '../../contexts/UserContext';
import RestrictedRoute from "../../util/RestrictedRoute";
import SessionWrong from "../../components/AppModule/ErrorPages/SessionWrong";
import SignUp from "../../components/AppModule/Authentication/SignUp";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: false,
      userDetails: null,
      logginStatus: true,
      login: async () => {
        const userDetails = await AuthService.GetCurrentLoggedUserDetails();
        this.setState({ authenticated: true, userDetails });
      },
      logout: () => this.setState({ authenticated: false, userDetails: null }),
    };
    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress"
    ];

    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);

    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }

    this.setTimeout();
  }
  clearTimeout() {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);

    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    if (this.props.location.pathname === `/login`) {
    } else {
      this.props.setTime(Date.now())
      this.warnTimeout = setTimeout(this.logout, 60000 * 1000);
    }
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  logout() {
    this.props.history.push(`/logout`);
  }



  destroy() {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.error) {
      this.props.removeUIError()
    }
  }

  componentDidMount() {
    this.validateToken();
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
  }

  validateToken = async () => {
    if (Session.session('userAccessToken')) {
      const userDetails = await AuthService.GetCurrentLoggedUserDetails();

      this.setState({ loading: false, authenticated: true, userDetails: userDetails })

    } else {
      this.setState({ loading: false, authenticated: false })
    }
  }

  setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };
  setClient = (clientData) => {
    this.setState({ client: clientData })
  }
  render() {
    const { match, location, layoutType, locale, error } = this.props;

    if (location.pathname === '/') {
      return (<Redirect to={`/main/items`} />);
    }
    this.setLayoutType(layoutType);

    const currentAppLocale = AppLocale[locale.locale];

    if (error) {
      return (<Redirect to={`/something-wrong`} />);
    }

    if (this.state.loading)
      return (
        <ReactPlaceholder type="text" rows={7} ready={PureComponent !== null}>
          <CircularProgress />
        </ReactPlaceholder>
      );

    return (
      <React.Fragment>
        <ConfigProvider locale={currentAppLocale.antd}>
          <UserContext.Provider value={this.state}>
            <IntlProvider
              locale={currentAppLocale.locale}
              messages={currentAppLocale.messages}>
              <ErrorBoundary>
                <Switch>
                  <Route exact path={`/login`} render={props =>
                    !this.state.authenticated ? <React.Fragment><SignIn {...props} /></React.Fragment> : <Redirect to={`/main/items`} />
                  } />

                  <Route path={`/logout`} render={props => <SignOut var={this.props.rabbitData} var1={this.props} />} />

                  <Route exact path={`/signup`}  render={props =>
                    <React.Fragment><SignUp {...props} /></React.Fragment>
                  } />
                  <Route path={`/something-wrong`} component={SomethingWrong} />
                  <Route path={`/session-wrong`} component={SessionWrong} />
                  <Route path={`/security-threat`} component={SecurityThreat} />
                  <Route path={`/access-denie`} component={AccessDenied} />
                  <RestrictedRoute path={`${match.url}`} component={MainApp} setTime={this.props.setTime} />
                </Switch>

              </ErrorBoundary>
            </IntlProvider>
          </UserContext.Provider>
        </ConfigProvider >
      </React.Fragment>
    )
  }


}

const mapStateToProps = ({ settings, errorUI }) => {
  const { locale, layoutType, setTime } = settings;
  const { error } = errorUI;
  return { locale, layoutType, error, setTime }
};

const mapDispatchToProps = dispatch => {
  return {
    removeUIError: () => dispatch(removeUIError()),
    setTime: (time) => dispatch(setTime(time))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
