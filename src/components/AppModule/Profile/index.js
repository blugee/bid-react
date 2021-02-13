import React, { PureComponent } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Spin
} from "antd";

import * as urlConfig from '../../../constants/URLConstant';
import ProfileService from '../../../service/ProfileService';
import AuthService from '../../../service/AuthService';
import 'react-phone-input-2/lib/style.css'
import IntlMessages from "../../../util/IntlMessages";
import MyProfile from './MyProfile';
import { ConfirmModel } from '../ConfirmModel';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setFullName } from "../../../appRedux/actions/Setting";



const FormItem = Form.Item;



class Profile extends PureComponent {
  state = {
    userData: {

      email: '',

    },
    spinLoading: true,
    loadingData: false,
    visible: false,

    loading: false,

    submitted: '',
    visiblemodel: false,
    actionData: {
      message: '',
      action: ''
    },
    validation: false
  };

  updateProfile = async (formData) => {
    this.setState({ loadingData: true });
    const response = await ProfileService.UpdateProfile(formData);
    if (response.status === urlConfig.SUCCESS_CODE) {
      message.success('User updated Successfully');
      this.setState({
        validation: false
      })
    } else {
      message.success(response.message);
    }
    this.setState({ loadingData: false, validation: false });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.updateProfile(values);
      }
    });
  };

  handleRevert = () => {
    this.setState(prevState => {
      return {
        ...prevState,

      }
    });
    this.props.form.resetFields();
  };

  handleRefresh = () => {
    this.setState({ loadingData: true });
    this.fetchData();
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  visibleModel = () => {
    this.setState({ visiblemodel: !this.state.visiblemodel })
  }
  render() {
    const { form } = this.props
    const { getFieldDecorator } = this.props.form;
    const {

      email,

    } = this.state.userData;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };

    return (
      <Card title={<IntlMessages id="myprofile" />} >
        <Spin tip="Loading..." spinning={this.state.spinLoading}>

          <div className="components-table-demo-control-bar">
            <Form layout="inline">
              <FormItem>
                <Button
                  type='primary'
                  icon="rollback"
                  onClick={() => this.handleRevert()}
                >
                  {<IntlMessages id="button.revert" />}
                </Button>
              </FormItem>
              <FormItem>
                <Button
                  type='primary'
                  icon='arrow-left'
                  onClick={() => this.props.history.goBack()}
                >
                  {<IntlMessages id="button.back" />}
                </Button>
              </FormItem>

            </Form>
          </div>

          <Form onSubmit={this.handleSubmit} {...formItemLayout}>
            <MyProfile form={form} spinLoading={e => this.setState({ spinLoading: false })} validation={this.state.validation} />
          </Form>
          <Modal
            title="Change Email"
            visible={this.state.visible}
            onOk={this.handleCancel}
            onCancel={this.handleCancel}
          >
            <Form.Item label={<IntlMessages id="form.label.email" />}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
                initialValue: email
              })(<Input />)}
            </Form.Item>
          </Modal>
        </Spin>
        {this.state.visiblemodel ? <ConfirmModel actionData={this.state.actionData} visibleModel={this.state.visiblemodel} visible={this.visibleModel} /> : null}

      </Card>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { setProfile } = settings;
  return { setProfile }
};

const BasicInfo = Form.create()(Profile);

export default withRouter(connect(mapStateToProps, {
  setFullName
})(BasicInfo));
