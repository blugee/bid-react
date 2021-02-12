import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  Avatar,
  Dropdown,
  Menu,
  Icon,
} from "antd";
import UserContext from "../../../contexts/UserContext";
import * as urlConfig from "../../../constants/URLConstant";
import AdminProfile from "../../../assets/images/ProfileImage/Admin.png";
import AuthService from "../../../service/AuthService";
import IntlMessages from "../../../util/IntlMessages";

let profileUrl = urlConfig.SUPER_ADMIN_BASIC_INFO;

class UserInfo extends PureComponent {
  state = {
    ip: '',
    auditLogging: '',
    data: [],
    profile: null,
    defaultProfile: null
  };


 
  componentDidMount = async () => {
    var profile = await AuthService.GetCurrentLoggedUserDetails();
    var userDetails = profile

    if (userDetails) {
        profileUrl = urlConfig.SUPER_ADMIN_BASIC_INFO;
        this.setState({
          defaultProfile: AdminProfile
        })
    }
   
    let networkData = Cookies.get('networkData');
    if (networkData) {
      networkData = JSON.parse(Cookies.get('networkData'));
    }
    if (networkData && networkData.ip) {
      this.setState({ ip: JSON.parse(Cookies.get('networkData')).ip });
    }
    this.setState({ auditLogging: Cookies.get('auditLogging') });
  }

  render() {
    return (
      <UserContext.Consumer>
        {( ) => {

          const menu = (
            <Menu placement="bottom-right" style={{ top: 10 }}>
              <Menu.Item key="0" style={{ cursor: 'default' }} disabled>
                <div className="gx-classic-testimonial gx-slide-item" style={{ textAlign: 'center' }}>
                  {this.props.setProfile ? this.props.setProfile === 'DefaultImage' ? <Avatar src={this.state.defaultProfile} alt="..." /> : <Avatar
                    src={this.props.setProfile}
                    alt=""
                  /> : this.state.profile ? <Avatar src={`data:image/png;base64,${this.state.profile}`} alt="..." /> :
                      <Avatar src={this.state.defaultProfile} alt="..." />}
                </div>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="2">
                <Icon type="user" /> <Link to={profileUrl}><IntlMessages id="myprofile" /></Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="logout" /> <Link to={urlConfig.LOGOUT}><IntlMessages id="logout" /></Link>
              </Menu.Item>
            </Menu>
          );

          return (
            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
              {this.props.setProfile ? this.props.setProfile === 'DefaultImage' ? <Avatar
                src={this.state.defaultProfile}
                className="gx-size-50 gx-pointer"
                alt=""
              /> : <Avatar
                  src={this.props.setProfile}
                  className="gx-size-50 gx-pointer"
                  alt=""
                /> : this.state.profile ? <Avatar
                  src={`data:image/png;base64,${this.state.profile}`}
                  className="gx-size-50 gx-pointer"
                  alt=""
                /> :
                  <Avatar
                    src={this.state.defaultProfile}
                    className="gx-size-50 gx-pointer"
                    alt=""
                  />}


            </Dropdown>
          )
        }}
      </UserContext.Consumer>
    )
  }
}

const mapStateToProps = ({ settings }) => {
  const { themeType, width, navStyle, horizontalNavPosition, verticalNavStyle, layoutType, local, setProfile, name } = settings;
  return { themeType, width, navStyle, horizontalNavPosition, verticalNavStyle, layoutType, local, setProfile, name }
};

export default connect(mapStateToProps)(UserInfo);
