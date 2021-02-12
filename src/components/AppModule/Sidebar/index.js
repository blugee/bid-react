import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Drawer, Layout } from "antd";

import SidebarContent from "./SidebarContent";
import { onVerticalNavStyleChange, toggleCollapsedSideNav, updateWindowWidth } from "../../../appRedux/actions/Setting";
import {
  HORIZONTAL_NAVIGATION,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI,
  TAB_SIZE,
  THEME_TYPE_LITE
} from "../../../constants/ThemeSetting";

const { Sider } = Layout;


export class Sidebar extends PureComponent {

  onToggleCollapsedNav = (verticalNavStyle) => {
    if (verticalNavStyle === NAV_STYLE_DRAWER) {
      this.props.toggleCollapsedSideNav(!this.props.navCollapsed);
    } else if (verticalNavStyle === NAV_STYLE_FIXED) {
      this.props.onVerticalNavStyleChange(NAV_STYLE_MINI)
    } else {
      this.props.onVerticalNavStyleChange(NAV_STYLE_FIXED)
    }
  };

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.props.updateWindowWidth(window.innerWidth)
    });
  }

  htmlCode() {
    const { themeType, navCollapsed, width, navStyle } = this.props;
    if (width > TAB_SIZE && navStyle === HORIZONTAL_NAVIGATION)
      return null;
    let { verticalNavStyle } = this.props;
    if (width < TAB_SIZE && verticalNavStyle === NAV_STYLE_FIXED) {
      verticalNavStyle = NAV_STYLE_DRAWER;
    }
    let drawerStyle = "";
    if (verticalNavStyle === NAV_STYLE_MINI) {
      drawerStyle = "gx-mini-sidebar"
    } else if (verticalNavStyle === NAV_STYLE_DRAWER || navStyle === HORIZONTAL_NAVIGATION) {
      drawerStyle = "gx-collapsed-sidebar"
    }
    let code = <Sider
      className={`gx-app-sidebar  ${drawerStyle} ${themeType !== THEME_TYPE_LITE ? 'gx-layout-sider-dark' : null}`}
      trigger={null}
      collapsed={verticalNavStyle === NAV_STYLE_MINI}
      theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
      collapsible>
      {
        verticalNavStyle === NAV_STYLE_DRAWER || width < TAB_SIZE ?
          <Drawer
            className={`gx-drawer-sidebar   ${themeType !== THEME_TYPE_LITE ? 'gx-drawer-sidebar-dark' : null}`}
            placement="left"
            closable={false}
            onClose={this.onToggleCollapsedNav.bind(this, verticalNavStyle)}
            visible={navCollapsed}>
            <SidebarContent/>
          </Drawer> : <SidebarContent />
      }
    </Sider>
    return code
  }
  render() {

    return (
      this.htmlCode()
      )
  }
}

const mapStateToProps = ({ settings }) => {
  const { verticalNavStyle, themeType, navStyle, isDirectionRTL, navCollapsed, width, locale } = settings;
  return { verticalNavStyle, themeType, navStyle, isDirectionRTL, navCollapsed, width, locale }
};
export default connect(mapStateToProps, { toggleCollapsedSideNav, onVerticalNavStyleChange, updateWindowWidth })(Sidebar);
