import React, { PureComponent } from 'react';
import IntlMessages from "../../../../util/IntlMessages";
import { Form, DatePicker } from "antd";
import moment from 'moment';
// import { connect } from "react-redux";

const { RangePicker } = DatePicker;

class InputDate extends PureComponent {

    onDateChange = (dates, dateStrings) => {
        var newData = []

        var flags = [], output = [], l = newData.length, x;
        for (x = 0; x < l; x++) {
            if (flags[newData[x].id]) continue;
            flags[newData[x].id] = true;
            output.push(newData[x]);
        }
    };
    onDateChageData = (date) => {
        if (this.props.onChange) {
            this.props.onChange(date)
        }
    }
    render() {
        const { getFieldDecorator } = this.props.field;

        return (


            <Form.Item label={this.props.label} style={this.props.display ? '' : { display: 'none' }}>
                {this.props.rangepicker ?
                    (
                        getFieldDecorator(this.props.name, {
                            rules: [{
                                required: true,
                                message: this.props.requiredMessage
                            }],
                            initialValue: this.props.initialValue

                        })(<RangePicker
                            style={{ width: "100%" }}
                            ranges={{
                                Today: [moment(), moment()],
                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                            }}
                            onChange={this.onDateChange}
                        />)
                    ) :
                    this.props.validation ?
                        (
                            getFieldDecorator(this.props.name, {
                                rules: [{
                                    required: true,
                                    message: this.props.requiredMessage
                                },
                                {
                                    validator: this.props.validation,
                                }],
                                initialValue: this.props.initialValue

                            })(<DatePicker style={{ width: "100%" }} disabledDate={(current) => {
                                return moment().add(-1, 'days') >= current
                            }} initialValue={moment('04/24/2020', 'MM/DD/YYYY')} onChange={(e) => this.onDateChageData(e)} />)
                        ) :
                        (
                            getFieldDecorator(this.props.name, {
                                rules: [{
                                    required: true,
                                    message: this.props.requiredMessage
                                }],
                                initialValue: this.props.initialValue

                            })(<DatePicker style={{ width: "100%" }} initialValue={moment('04/24/2020', 'MM/DD/YYYY')} onChange={(e) => this.onDateChageData(e)} />)
                        )

                }
            </Form.Item>

        )
    }
}

export default InputDate;