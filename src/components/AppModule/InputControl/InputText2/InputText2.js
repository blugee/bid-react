import React, { Component } from 'react';
import { Form, Input, Row, Col } from "antd";


export default class InputText2 extends Component {
    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e.target.value, this.props.name)
        }
    }

    render() {
        const { getFieldDecorator } = this.props.field;
        return (
            <Form.Item label={this.props.label} wrapperCol={{ labelCol: 20 }} style={this.props.display ? '' : { display: 'none' }}>
                {this.props.pattern ?
                    (this.props.inputNumber ?
                        (
                            getFieldDecorator(this.props.name, {
                                rules: [{
                                    pattern: this.props.pattern,
                                    message: this.props.validationMessage
                                }, {
                                    required: true,
                                    message: this.props.requiredMessage
                                },
                                ],
                                initialValue: this.props.initialValue
                            })(<Input onChange={(e) => this.handleChange(e)} />)
                        ) :
                        (
                            getFieldDecorator(this.props.name, {
                                rules: [{
                                    pattern: this.props.pattern,
                                    message: this.props.validationMessage
                                }, {
                                    required: true,
                                    message: this.props.requiredMessage,
                                }],
                                initialValue: this.props.initialValue
                            })(<Input onChange={(e) => this.handleChange(e)} />)
                        )
                    )
                    : (
                        getFieldDecorator(this.props.name, {
                            rules: [{
                                required: true,
                                message: this.props.requiredMessage,
                            }],
                            initialValue: this.props.initialValue

                        })(<Input onChange={(e) => this.handleChange(e)} />)
                    )
                }
            </Form.Item>
        )
    }
}
