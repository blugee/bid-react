import React, { PureComponent } from 'react';
import '../Auth.css';
import loginLogo from '../../../../assets/images/logo/logo.png';
import { Button, Form, message } from "antd";
import { withRouter } from 'react-router-dom';
import AuthService from '../../../../service/AuthService';
import * as urlConfig from '../../../../constants/URLConstant';
import InputPrefix from '../../InputControl/InputPerefix/InputPrefix';

const FormItem = Form.Item;


class ResetPassword extends PureComponent {
  state = {

    loadingData: false,
    email: '',
    submitted: false,
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values) {
          this.checkEmail(values);
        }
      }
    });
  };
  checkEmail = async (formData) => {
    this.setState({loadingData: true });
    const response = await AuthService.VerifyEmail(formData);
    if (response.status === urlConfig.SUCCESS_CODE) {
      message.success('Mail sent');
      this.props.history.replace(`/login`)
      this.setState({ submitted: true, loadingData: false });
    } else {
      message.success(response.message)
      this.setState({ submitted: true, loadingData: false });
    }

  }

  render() {
    const { loadingData } = this.state;
    return (
      <div className="gx-login-container auth-bg" style={{  backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="gx-login-content">
          <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
            <div className="gx-login-header gx-text-center">
              <img
                className="gx-login-title"
                src={loginLogo}
                style={{ height: 70 }}
                alt="company logo"
              />
            </div>
            <div className="gx-login-header gx-text-center">
              <h3 className="gx-login-title"><b>Forgot Password</b> </h3>
            </div>
            <InputPrefix
                field={this.props.form}
                label='Email'
                name="email"
                validationMessage='enter.valid.email'
                requiredMessage='input.email'
                email={true}
              />
            <FormItem className="gx-text-center">
              <Button
                type="primary"
                htmlType="submit"
                loading={loadingData}
                size="small"
              >
                    Submit
              </Button>
                  <Button
                    htmlType="button"
                    disabled={loadingData}
                    size="small"
                    onClick={() => this.props.history.replace(`/login`)}
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
const WrappedNormalLoginForm = Form.create()(ResetPassword);

export default withRouter(WrappedNormalLoginForm);
