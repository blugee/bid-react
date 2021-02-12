import React, { Component } from 'react';
import IntlMessages from "../../../../util/IntlMessages";
import { Form, Input } from "antd";


export default class InputEmail extends Component {


    render() {
        const { getFieldDecorator } = this.props.field;
        return (


            <Form.Item label={<IntlMessages id={this.props.label} />}>
                { this.props.isSpan ?
                    getFieldDecorator(this.props.name, {
                        rules: [{
                            type: 'email',
                            message: <IntlMessages id={this.props.validationMessage} />,
                            // pattern: new RegExp(/^[0-9]*$/g),
                        }, {
                            required: true,
                            message: <IntlMessages id={this.props.requiredMessage} />,
                        }],
                        initialValue: this.props.initialValue
                    })(<span>{this.props.initialValue}</span>)
                    :
                    getFieldDecorator(this.props.name, {
                        rules: [{
                            type: 'email',
                            message: <IntlMessages id={this.props.validationMessage} />,
                            // pattern: new RegExp(/^[0-9]*$/g),
                        }, {
                            required: true,
                            message: <IntlMessages id={this.props.requiredMessage} />,
                        }],
                        initialValue: this.props.initialValue
                    })(<Input />)
                }

            </Form.Item>



        )
    }
}
