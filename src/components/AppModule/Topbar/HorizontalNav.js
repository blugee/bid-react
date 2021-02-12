import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Icon, Menu } from "antd";
import { Link } from "react-router-dom";
import IntlMessages from "../../../util/IntlMessages";
import * as urlConfig from '../../../constants/URLConstant';
import UserContext from "../../../contexts/UserContext";
import { PlayCircleOutlined } from "@ant-design/icons";


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HorizontalNav extends PureComponent {
  removeFirstChar = str => str.substring(1);
  findSideMenuKeys = key => this.props.pathname.includes(key)
    ? this.removeFirstChar(this.props.pathname)
    : this.removeFirstChar(key);

  htmlCode() {
    const { pathname } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    let code = <UserContext.Consumer>
      {({ userDetails }) => (
        <Menu
          defaultOpenKeys={[defaultOpenKeys]}
          selectedKeys={[selectedKeys]}
          mode="horizontal">



          {(userDetails && userDetails.role.includes(urlConfig.ADMINISTRATOR)) && (
            <SubMenu key="superadmin" title={
              <span style={{ fontWeight: '800' }}>
                <Icon type="deployment-unit" style={{ marginRight: 16 }} /> <IntlMessages id="sidebar.superadmin" />
              </span>}>

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
            </SubMenu>
          )}

        </Menu>
      )}
    </UserContext.Consumer>

    return code;
  }

  render() {
    return (
      this.htmlCode()
    );
  }
}

HorizontalNav.propTypes = {};
const mapStateToProps = ({ settings }) => {
  const { themeType, pathname, local } = settings;
  return { themeType, pathname, local }
};
export default connect(mapStateToProps)(HorizontalNav);

