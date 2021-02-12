import React from "react";
import { Button, Form, Alert, Input, Icon, Divider, Card, message } from "antd";
import { connect } from "react-redux";
import { clearCredentials } from "./AuthReducer";
import UserContext from "../../../contexts/UserContext";
import "./Auth.css";
import AuthService from "../../../service/AuthService";
import * as urlConfig from '../../../constants/URLConstant';
import Session from 'store2';
var memoryStorage = require('memorystorage')
var key = []

function isEmpty(o) {
  for (var i in o) {
    return false;
  }
  return true;
};
function sessionFunction() {

  memoryStorage = {};



  if (isEmpty(memoryStorage)) {
    // Ask other tabs for memoryStorage
    localStorage.setItem('getSessionStorage', Date.now());
  };

  window.addEventListener('storage', function (event) {

    //console.log('storage event', event);

    if (event.key === 'getSessionStorage') {
      // Some tab asked for the memoryStorage -> send it

      localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));
      localStorage.removeItem('sessionStorage');

    } else if (event.key === 'sessionStorage' && isEmpty(memoryStorage)) {
      // sessionStorage is empty -> fill it

      var data = JSON.parse(event.newValue);

      for (key in data) {
        memoryStorage[key] = data[key];
      }

      showSessionStorage();
    }
  });

  window.onbeforeunload = function () {
    //sessionStorage.clear();
  };


  /* This code is only for the UI in the demo, it's not part of the sulotion */


  function showSessionStorage() {
    return !isEmpty(memoryStorage) ? window.location.assign(`/session-wrong`) : 'memoryStorage is empty';

  }

}

const FormItem = Form.Item;
const Meta = Card.Meta;

class VerifyOTP extends React.PureComponent {
  static contextType = UserContext;

  state = {
    error: "",
    loading: false,
    submitted: false
  };


  handleSubmit = e => {
    this.setState({ error: "" });
    e.preventDefault();

    this.setState({ submitted: true });

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        const formData = {
          ...values,
        };
        this.verifyOTP(formData);
      }
    });
  };

  verifyOTP = async (formData) => {
    const response = await AuthService.VerifyOTP(formData);
    if (response.status === urlConfig.SUCCESS_CODE) {
      Session.session('auditLogging', new Date().toLocaleString());
      Session.session("userAccessToken", response.token);
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      this.props.clearAuth();
      this.context.login();
      setTimeout(() => {
        this.props.history.push(from);
      }, 2000);

    } else {
      message.error(response.message);

      if (response.status === urlConfig.OTP_EXPIRED)
        this.props.history.push(`/login`);
    }
    this.setState({ submitted: false, loading: false });
  }

  handleCancel = () => {
    this.props.clearAuth();
    this.context.logout();
    this.props.history.replace(urlConfig.LOGIN);
  };
  componentDidMount() {
    sessionFunction()
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error } = this.state;

    return (
      <div
        className="gx-login-container auth-bg" style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="gx-login-content">
          <Form
            onSubmit={this.handleSubmit}
            className="gx-login-form gx-form-row0"
            layout="vertical"
            hideRequiredMark
          >
            <div className="gx-login-header gx-text-center">
              <h1 className="gx-login-title" style={{ textAlign: "left" }}>
                <span>2-Step Verification</span>
              </h1>
            </div>
            {error && (
              <FormItem>
                <Alert message={error} type="error" closable />
              </FormItem>
            )}
            <FormItem>
              <FormItem label="ENTER YOUR VERIFICATION CODE">
                {getFieldDecorator("otp", {
                  rules: [
                    {
                      message: "Please enter correct otp",
                      pattern: new RegExp(/^\d{6}$/g)
                    },
                    {
                      required: true,
                      message: "Please enter otp"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    size="small"
                  />
                )}
              </FormItem>
            </FormItem>
            <Divider />
            <Card
              style={{ marginTop: 16 }}
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <Meta
                avatar={
                  <Icon
                    type="mobile"
                    style={{
                      color: "rgba(0,0,0,.25)",
                      fontSize: 30,
                      marginTop: "0.19em"
                    }}
                  />
                }
                description={
                  `Open your email to check your verification code so that we know it's you.`
                }
              />
            </Card>
            <FormItem className="gx-text-center">
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
                size="large"
              >
                Verify
              </Button>
              <Button
                htmlType="button"
                disabled={this.state.loading}
                size="large"
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(VerifyOTP);

const mapStateToProps = ({ auth }) => ({
  email: auth.email,
  password: auth.password
});

const mapDispatchToProps = dispatch => {
  return {
    clearAuth: () => dispatch(clearCredentials())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
