import React, { PureComponent } from 'react';
import { Button, Card, Form, message, Spin } from "antd";
import AddCustomer from './AddCustomer';
import * as urlConfig from '../../../../constants/URLConstant';
import IntlMessages from "../../../../util/IntlMessages";
import CustomerService from '../../../../service/CustomerService';

const FormItem = Form.Item;

class CustomerDetails extends PureComponent {
    state = {
        loadingData: false,
        spinLoading: true,
        validation: false,
        userData: {},
        totalData: {}
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loadingData: true });
                this.addCustomer(values);

            }
        })
    };

    addCustomer = async (formData) => {
        var response;
        if (formData.id)
            response = await CustomerService.UpdateCustomer(formData);
        else
            response = await CustomerService.AddCustomer(formData);

        if (response.status === urlConfig.SUCCESS_CODE) {
            message.success(response.message);
            this.setState({ loadingData: false });
            this.props.history.replace(urlConfig.SUPER_ADMIN_CUSTOMER);
        } else {
            message.error(response.message);
            this.setState({ loadingData: false });

        }
    }

    render() {
        const { form } = this.props;
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
            <Card title='Add Customer'>
                <Spin tip="Loading..." spinning={this.state.spinLoading}>

                    <div className="components-table-demo-control-bar">
                        <Form layout="inline">
                            <FormItem>
                                <Button
                                    type='primary'
                                    icon="rollback"
                                    onClick={() => this.props.form.resetFields()}
                                    style={{ marginBottom: 0 }}
                                >
                                    <IntlMessages id="button.revert" />
                                </Button>
                            </FormItem>
                            <FormItem>
                                <Button
                                    type='primary'
                                    icon="arrow-left"
                                    onClick={() => this.props.history.goBack()}
                                    style={{ marginBottom: 0 }}
                                >
                                    <IntlMessages id="button.back" />
                                </Button>
                            </FormItem>
                            <FormItem>
                                <Button
                                    type='primary'
                                    htmlType="submit"
                                    onClick={(e) => this.handleSubmit(e)}
                                    loading={this.state.loadingData}
                                    style={{ marginBottom: 0 }}
                                >
                                    <IntlMessages id="button.save.details" />
                                </Button>
                            </FormItem>
                        </Form>
                    </div>

                    <Form onSubmit={this.handleSubmit} {...formItemLayout}>
                        <AddCustomer form={form} userData={this.state.userData} spinLoading={e => this.setState({ spinLoading: false })} validation={this.state.validation} />
                    </Form>
                </Spin>
            </Card>
        );
    }
}

const WrappedLocalAuthForm = Form.create()(CustomerDetails);

export default WrappedLocalAuthForm;
