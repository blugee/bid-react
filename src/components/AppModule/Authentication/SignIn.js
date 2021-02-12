import React from "react";
import { Button, Form, Alert, message } from "antd";
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive';
import { connect } from 'react-redux';
import UserContext from '../../../contexts/UserContext';
import './Auth.css';
import loginLogo from '../../../assets/images/logo/logo2.png';
import AuthService from "../../../service/AuthService.js";
import Session from 'store2';
import { Link, withRouter } from "react-router-dom";
import { setTime } from "../../../appRedux/actions";
import InputPrefix from "../InputControl/InputPerefix/InputPrefix";
import './SignIn.css'
import * as urlConfig from '../../../constants/URLConstant';

var memoryStorage = require('memorystorage')
var key = []
const FormItem = Form.Item;

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

class SignIn extends React.PureComponent {
  static contextType = UserContext;

  state = {
    submitError: false,
    error: '',
    loading: false,
    capsLockWarning: false,
    submitted: false,
    email: "",
    passWord: "",
    onlySpace: ""
  };

  handleSubmit = (e) => {
    this.setState({ error: "" });
    e.preventDefault();

    const { submitError } = this.state;

    this.props.form.validateFields((err, values) => {
      if (!err && !submitError) {

        const { email, password } = values;
        this.setState({ loading: true, email: email, passWord: password });
        const formData = {
          ...values,
        };
        this.checkLogin(formData);

      }
    });

  };

  checkLogin = async (formData) => {
    const response = await AuthService.Login(formData);
    if (response.status === urlConfig.SUCCESS_CODE) {
      const { from } = { from: { pathname: "/" } };
      this.context.login();
      Session.session('auditLogging', new Date().toLocaleString());
      Session.session("userAccessToken", response.accessToken);
      setTimeout(() => {
        this.props.history.push(from);
      }, 2000);

    } else {
      message.error(response.message);
    }
    this.setState({ submitted: false, loading: false });
  }

  resetPassword = () => {
    setTimeout(() => {
      this.props.history.push(`/reset-password`);
    }, 2000);

  }
  componentDidMount = async () => {
    await sessionFunction()

  }

  render() {
    const { error } = this.state;


    return (
      <React.Fragment>
        <div className="gx-login-container auth-bg" style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          <div className="gx-login-content">
            <div className="gx-login-header gx-text-center">
              <img
                className="gx-login-title"
                src={loginLogo}
                style={{ height: 100 }}
                alt="company logo"
              />

            </div>
            {/* <div className='signin-name gx-text-center'>Fortune Hardware</div> */}
            <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
              {
                error && (
                  <FormItem>
                    <Alert
                      message={error}
                      type="error"
                      closable
                    />
                  </FormItem>
                )
              }
              <FormItem>
                <ReactIsCapsLockActive>
                  {
                    active => active
                      ? <Alert
                        message='Warning : Caps lock is on'
                        type="warning"
                        closable
                      />
                      : null
                  }
                </ReactIsCapsLockActive>
              </FormItem>

              <InputPrefix
                field={this.props.form}
                label=''
                name="user_name"
                validationMessage='enter.valid.email'
                requiredMessage='input.username'

              />
              {/* <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password" />
                )}
              </FormItem> */}
              <InputPrefix
                field={this.props.form}
                label=''
                name="password"
                validationMessage='Please input your Password!'
                requiredMessage='Please input your Password!'
                password={true}
              />
              <FormItem className="gx-text-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.state.loading}
                >
                  Log in
              </Button>
                <Link
                  type="primary"
                  to={`/signup`}
                >
                  Sign up
                </Link>



                {/* {
                  error && error === "Password is Expired." ? (
                    <Button
                      type="primary"
                      htmlType="reset"
                      loading={this.state.loading}
                      onClick={this.resetPassword}
                    >
                      Reset Password
                    </Button>
                  )
                    : (null)
                } */}
              </FormItem>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(SignIn);

const mapStateToProps = ({ settings }) => {
  const { setProfile } = settings;
  return { setProfile }
};
export default withRouter(connect(mapStateToProps, {
  setTime
})(WrappedNormalLoginForm));

