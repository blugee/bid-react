import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { Icon } from 'antd';
import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import IntlMessages from "../../../util/IntlMessages";
import { NAV_STYLE_MINI, THEME_TYPE_LITE } from "../../../constants/ThemeSetting";
import Auxiliary from "../../../util/Auxiliary";
import * as urlConfig from '../../../constants/URLConstant';
import UserContext from "../../../contexts/UserContext";
import {
  PlayCircleOutlined,
} from '@ant-design/icons';


const MenuItemGroup = Menu.ItemGroup;

class SidebarContent extends PureComponent {
  removeFirstChar = str => str.substring(1);
  findSideMenuKeys = key => this.props.pathname.includes(key)
    ? this.removeFirstChar(this.props.pathname)
    : this.removeFirstChar(key);

  render() {
    const { themeType, verticalNavStyle, pathname } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (
      <UserContext.Consumer>
        {({ userDetails }) => (
          <Auxiliary>
            <SidebarLogo />
            <CustomScrollbars className="gx-layout-sider-scrollbar">
              <Menu
                defaultOpenKeys={[defaultOpenKeys]}
                selectedKeys={[selectedKeys]}
                collapsed={verticalNavStyle === NAV_STYLE_MINI ? "true" : null}
                theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
                mode="inline"
              >

                <MenuItemGroup key="/superadmin" title={
                  <span style={{ fontWeight: '800' }}>
                    <Icon type="deployment-unit" style={{ marginRight: 16 }} /> <IntlMessages id="sidebar.superadmin" />
                  </span>}>

                  <Menu.Item key={this.findSideMenuKeys(urlConfig.SUPER_ADMIN_ITEMS_LIST)}>
                    <Link to={urlConfig.SUPER_ADMIN_ITEMS_LIST}>
                      <PlayCircleOutlined />
                         Items
                        </Link>
                  </Menu.Item>

                  <Menu.Item key={this.findSideMenuKeys(urlConfig.SUPER_ADMIN_BID_LIST)}>
                    <Link to={urlConfig.SUPER_ADMIN_BID_LIST}>
                      <Icon type="solution" />
                        Bid
                        </Link>
                  </Menu.Item>

                  <Menu.Item key={this.findSideMenuKeys(urlConfig.SUPER_ADMIN_CUSTOMER)}>
                    <Link to={urlConfig.SUPER_ADMIN_CUSTOMER}>
                      <Icon type="user" />
                        Customers
                        </Link>
                  </Menu.Item>


                </MenuItemGroup>


              </Menu>
            </CustomScrollbars>
          </Auxiliary>
        )}
      </UserContext.Consumer>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({ settings }) => {
  const { navStyle, verticalNavStyle, themeType, locale, pathname } = settings;
  return { navStyle, verticalNavStyle, themeType, locale, pathname }
};
export default connect(mapStateToProps)(SidebarContent);
