import React, { PureComponent } from 'react';
import { Form, Select } from "antd";

const { Option } = Select;

export default class InputSelect extends PureComponent {
    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e)
        }
    }

    render() {
        const { getFieldDecorator } = this.props.field;
        let labelCol = {}
        if (this.props.labelCol) {
            labelCol = { labelCol: this.props.labelCol }
        }
        return (
            <Form.Item {...labelCol} label={this.props.label}>
                {getFieldDecorator(this.props.name, {
                    rules: [{
                        required: true,
                        message: this.props.requiredMessage,
                    }],
                    initialValue: this.props.initialValue,
                })(
                    <Select
                        disabled={this.props.disable ? true : false}
                        placeholder={this.props.placeholder}
                        initialValue={this.props.initialValue}
                        showSearch={this.props.showSearch ? true : false}
                        onSelect={(e) => this.handleChange(e)}
                        onDeselect={(e) => this.handleChange(e)}
                        style={this.props.styles ? this.props.styles : {}}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().startsWith(input.toLowerCase())
                        }
                    >
                        {
                            this.props.list && this.props.list.map(data =>
                                <Option value={data.id} key={data.id}>{data.name}</Option>
                            )
                        }
                    </Select>

                )}
            </Form.Item>


        )
    }
}
