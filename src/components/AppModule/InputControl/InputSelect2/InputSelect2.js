import React, { Component } from 'react';
import { Select } from "antd";

const { Option } = Select;

export default class InputSelect2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e, this.props.keyValue)
        }
    }

    render() {
        return (
            <React.Fragment>
                <Select
                    placeholder='plese select Item Name'
                    style={{ width: 200 }}
                    value={this.props.initialValue}
                    showSearch={this.props.showSearch ? true : false}
                    onChange={(e) => this.handleChange(e)}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().startsWith(input.toLowerCase())
                    }
                >
                    {
                        this.props.list && this.props.list.map(data =>

                            <Option value={data.id} key={data.id}>{data.item_name}</Option>
                        )
                    }
                </Select>
            </React.Fragment>
        )
    }
}
