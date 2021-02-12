import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Layout,  } from "antd";
import { onVerticalNavStyleChange, switchLanguage, toggleCollapsedSideNav } from "../../../appRedux/actions/Setting";
import UserInfo from "../../AppModule/UserInfo";
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  HORIZONTAL_NAVIGATION,
  INSIDE_THE_HEADER,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI,
  TAB_SIZE,
  VERTICAL_NAVIGATION
} from "constants/ThemeSetting";
import HorizontalNav from "./HorizontalNav";
import Auxiliary from "../../../util/Auxiliary";
// import IntlMessages from "../../util/IntlMessages";

const { Header } = Layout;

class Topbar extends PureComponent {
constructor(){
  super();
  this.state = {
    searchText: '',
  };
  this.renderer=this.renderer.bind(this)
  this.onClicklogo=this.onClicklogo.bind(this)
}
  
  Completionist = () => <span>Thank You!{this.props.history.push(`/logout`)}</span>;
  renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      this.props.history.push(`/logout`)
      return null
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  

  updateSearchChatUser = (evt) => {
    this.setState({
      searchText: evt.target.value,
    });
  };
  onClicklogo = () => {
    this.props.history.push({ pathname: '/'})
  }
  htmlCode() {
    const { navStyle, horizontalNavPosition, navCollapsed, width } = this.props;
    let { verticalNavStyle } = this.props;
    if (width < TAB_SIZE && verticalNavStyle === NAV_STYLE_FIXED) {
      verticalNavStyle = NAV_STYLE_DRAWER;
    }
    let code = <Auxiliary>
      {navStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER && width >= TAB_SIZE ?
        <div className="gx-nav-header"><HorizontalNav {...this.props} /></div> : null}
      <Header
        className={`${navStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === INSIDE_THE_HEADER ? 'gx-layout-header-horizontal' : ''}`}>
        {width < TAB_SIZE || (navStyle === VERTICAL_NAVIGATION && verticalNavStyle === NAV_STYLE_DRAWER) ?
          <div className="gx-linebar gx-mr-3">
            <i className="gx-icon-btn icon icon-menu"
              onClick={() => {
                if (width <= TAB_SIZE || verticalNavStyle === NAV_STYLE_DRAWER) {
                  this.props.toggleCollapsedSideNav(!navCollapsed);
                } else if (verticalNavStyle === NAV_STYLE_FIXED) {
                  this.props.onVerticalNavStyleChange(NAV_STYLE_MINI)
                } else {
                  this.props.onVerticalNavStyleChange(NAV_STYLE_FIXED)
                }
              }}
            />

          </div> : null}


        {width >= TAB_SIZE && navStyle === HORIZONTAL_NAVIGATION ? <div className="gx-site-logo gx-mr-2" style={{ background: 'white' }}>
          <img onClick={this.onClicklogo} src={require("assets/images/logo.png")} alt="logo.png" style={{ width: "170px" }} />
        </div> : null}


        {/* <SearchBox styleName="gx-d-none gx-d-lg-block gx-lt-icon-search-bar-lg"
                  placeholder={<IntlMessages id="button.search" />}
                  onChange={this.updateSearchChatUser.bind(this)}
                  value={this.state.searchText}/> */}

        {width >= TAB_SIZE && navStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === INSIDE_THE_HEADER ?
          <HorizontalNav {...this.props} /> : null}
<ul className="gx-header-notifications gx-ml-auto"></ul>
        <ul className="gx-header-notifications gx-ml-auto">
         
          <li className="gx-user-nav">
            <span className="gx-pointer gx-d-block">
              <UserInfo {...this.props} />
            </span>
          </li>
        </ul>
      </Header>
      {width >= TAB_SIZE && navStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER ?
        <div className="gx-nav-header gx-nav-header-ble"><HorizontalNav {...this.props} /></div> : null}
    </Auxiliary>
    return code
  }

  render() {
    return (
      this.htmlCode()
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { navStyle, verticalNavStyle, horizontalNavPosition, locale, width, navCollapsed, setTime } = settings;
  return { navStyle, verticalNavStyle, horizontalNavPosition, locale, width, navCollapsed, setTime }
};

export default connect(mapStateToProps, { onVerticalNavStyleChange, toggleCollapsedSideNav, switchLanguage })(Topbar);
