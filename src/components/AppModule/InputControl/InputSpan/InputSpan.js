import React, { Component } from 'react';
import IntlMessages from "../../../../util/IntlMessages";
import { Form, Input } from "antd";


export default class InputSpan extends Component {


    render() {
        const { getFieldDecorator } = this.props.field;
        let labelCol = {}
        if (this.props.labelCol) {
            labelCol = { labelCol: this.props.labelCol }
        }
        let wrapperCol = {}
        if (this.props.wrapperCol) {
            wrapperCol = { wrapperCol: this.props.wrapperCol }
        }
        return (


            <Form.Item {...labelCol} {...wrapperCol} label={<IntlMessages id={this.props.label} />}>

                {getFieldDecorator(this.props.name, {
                    rules: [{
                        required: true,
                        message: <IntlMessages id={this.props.requiredMessage} />,
                    }],
                    initialValue: this.props.initialValue
                })(<span>{this.props.initialValue}</span>)
                }



            </Form.Item>



        )
    }
}
