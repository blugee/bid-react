import React, {PureComponent} from "react";
import {connect} from "react-redux";

import {onVerticalNavStyleChange, toggleCollapsedSideNav} from "../../../appRedux/actions/Setting";
import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI, TAB_SIZE, THEME_TYPE_LITE} from "../../../constants/ThemeSetting";
import { withRouter } from "react-router-dom";

const verticalNavStyle = window.innerWidth < TAB_SIZE ? NAV_STYLE_DRAWER : NAV_STYLE_FIXED;
const navCollapsed = true;

class SidebarLogo extends PureComponent {
  handleClick = () =>{
    if (verticalNavStyle === NAV_STYLE_DRAWER) {
      this.props.toggleCollapsedSideNav(!navCollapsed);
    } else if (verticalNavStyle === NAV_STYLE_FIXED) {
      this.props.onVerticalNavStyleChange(NAV_STYLE_MINI)
    } else {
      this.props.onVerticalNavStyleChange(NAV_STYLE_FIXED)
    }
  }
  htmlCode(){
    const {width, themeType} = this.props;
    let {verticalNavStyle} = this.props;
    if (width < TAB_SIZE && verticalNavStyle === NAV_STYLE_FIXED) {
      verticalNavStyle = NAV_STYLE_DRAWER;}
    let code = <div className="gx-linebar">
    <i className={`gx-icon-btn icon icon-${verticalNavStyle === NAV_STYLE_MINI ? 'menu-unfold' : 'menu-fold'} ${themeType !== THEME_TYPE_LITE ? 'gx-text-white' : ''}`}
      onClick={this.handleClick}/></div>
      return code
  }
  onClicklogo=()=>{
    this.props.history.push({ pathname: '/'})
  }
  render() {
    const {width, themeType} = this.props;
    let {verticalNavStyle} = this.props;
    if (width < TAB_SIZE && verticalNavStyle === NAV_STYLE_FIXED) {
      verticalNavStyle = NAV_STYLE_DRAWER;}
    return (
      <div className="gx-layout-sider-header">
        {/* {verticalNavStyle === NAV_STYLE_DRAWER ? null : this.htmlCode()} */}
        <div className="gx-site-logo" style={{background:'white'}}>
          {themeType === THEME_TYPE_LITE ? <img onClick={this.onClicklogo} src={require("../../../assets/images/logo/logo2.png")} style={{width:'30%', height:'80%'}} alt="logo"/> :
            <img onClick={this.onClicklogo} src={require("../../../assets/images/logo/logo2.png")} style={{width:'80%', height:'30%'}} alt="logo"/>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {verticalNavStyle, themeType, width, navCollapsed} = settings;
  return {verticalNavStyle, themeType, width, navCollapsed}
};

export default withRouter(connect(mapStateToProps, {onVerticalNavStyleChange, toggleCollapsedSideNav})(SidebarLogo));
