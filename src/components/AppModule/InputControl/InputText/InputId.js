import React, { Component } from 'react';
import IntlMessages from "../../../../util/IntlMessages";
import { Form, Input } from "antd";


export default class InputId extends Component {


    render() {
        const { getFieldDecorator } = this.props.field;
        return (


            <Form.Item label={<IntlMessages id={this.props.label} />} style={this.props.display ? '' : { display: 'none' }}>
                {this.props.disable ?
                 (
                    getFieldDecorator(this.props.name, {
                        rules: [ {
                            required: false,
                        }],
                        initialValue: this.props.initialValue

                    })(<Input disabled />)
                ):
                (
                    getFieldDecorator(this.props.name, {
                        rules: [ {
                            required: false,
                        }],
                        initialValue: this.props.initialValue

                    })(<Input />)
                )
                   
                }
            </Form.Item>


        )
    }
}
