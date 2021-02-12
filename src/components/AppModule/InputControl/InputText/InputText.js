import React, { Component } from 'react';
import { Form, Input } from "antd";


export default class InputText extends Component {

    onChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(this.props.name, e.target.value)
        }
    }

    render() {
        const { getFieldDecorator } = this.props.field;
        return (


            <Form.Item label={this.props.label} style={this.props.display ? '' : { display: 'none' }}>
                {this.props.pattern ?
                    (this.props.inputNumber ?
                        (
                            getFieldDecorator(this.props.name, {
                                rules: [{
                                    pattern: this.props.pattern,
                                    message: this.props.validationMessage
                                }, {
                                    required: this.props.noRequired ? false : true,
                                    message: this.props.requiredMessage
                                },
                                ],
                                initialValue: this.props.initialValue
                            })(<Input onChange={this.onChange} />)
                        ) :
                        (
                            getFieldDecorator(this.props.name, {
                                rules: [{
                                    pattern: this.props.pattern,
                                    message: this.props.validationMessage
                                    // pattern: new RegExp(/^[0-9]*$/g),
                                }, {
                                    required: this.props.noRequired ? false : true,
                                    message: this.props.requiredMessage,
                                }],
                                initialValue: this.props.initialValue
                            })(<Input onChange={this.onChange} />)
                        )
                    )
                    : (
                        getFieldDecorator(this.props.name, {
                            rules: [{
                                required: this.props.noRequired ? false : true,
                                message: this.props.requiredMessage,
                            }],
                            initialValue: this.props.initialValue

                        })(<Input onChange={this.onChange} />)
                    )
                }
            </Form.Item>


        )
    }
}
