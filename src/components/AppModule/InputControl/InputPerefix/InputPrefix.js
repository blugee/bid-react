import React, { Component } from 'react';
import IntlMessages from "../../../../util/IntlMessages";
import { Form, Input, Icon } from "antd";


export default class InputPrefix extends Component {


    render() {
        const { getFieldDecorator } = this.props.field;
        return (


            <Form.Item label={this.props.label}>
                {this.props.email ? (
                    getFieldDecorator(this.props.name, {
                        rules: [{
                            type: 'email',
                            message: <IntlMessages id={this.props.validationMessage} />,
                        }, {
                            required: true,
                            message: <IntlMessages id={this.props.requiredMessage} />,
                        }],

                    })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="email"
                        autoComplete="email" />)
                ) : this.props.password ? (
                    getFieldDecorator(this.props.name, {
                        rules: [{
                            required: true,
                            message: this.props.requiredMessage,
                        }],

                    })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password" />)
                ) : (
                            getFieldDecorator(this.props.name, {
                                rules: [{
                                    required: true,
                                    message: <IntlMessages id={this.props.requiredMessage} />,
                                }],

                            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder='Username'
                                autoComplete="username" />)
                        )
                }
            </Form.Item>


        )
    }
}
