import React, { PureComponent } from 'react';
import {
    Button,
    Card,
    Form,
    message, Spin
} from "antd";

import AddItem from './AddItem';
import * as urlConfig from '../../../../constants/URLConstant';
import IntlMessages from "../../../../util/IntlMessages";
import ItemService from '../../../../service/ItemService';

const FormItem = Form.Item;

class ItemDetails extends PureComponent {
    state = {
        loadingData: false,
        spinLoading: false,
        validation: false,
        userData: {},
        totalData: {}
    };

    componentWillMount() {
        this.fetchData();
    }

    fetchData = async () => {
        if (this.props.location.state !== undefined && this.props.location.state.id) {
            this.setState({ idRow: true, spinLoading: true })
            const response = await ItemService.GetItemByID(this.props.location.state.id);
            if (response.status === urlConfig.SUCCESS_CODE) {
                var data = response.data
                this.setState({
                    userData: {
                        id: data.id,
                        name: data.name,
                        price: data.price,
                        thickness: data.thickness,
                        yield: data.yield,
                        labour: data.labour
                    },
                    totalData: response.data,
                    loadingData: false,
                    mobileData: data.mobile
                })
            } else {
                message.error('Something wrong happened');
                this.setState({
                    selectedRowKeys: [],
                });
            }
            this.setState({
                spinLoading: false,
            });
        }

    }

    handleChange = (name, value) => {
        let data = this.state.totalData
        data[name] = value
        this.setState({ totalData: data })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loadingData: true });
                this.addItem(values);

            }
        })
    };

    getTotal = () => {
        var total = 0;
        let data = this.state.totalData
        var array = [data.price, data.thickness, data.yield, data.labour]
        for (let index = 0; index < array.length; index++) {
            var amount = array[index]
            if (isNaN(Number(amount))) {
                amount = 0
            }
            total += Number(amount);
        }
        return total;
    }

    addItem = async (formData) => {
        var response;
        let total = await this.getTotal()
        formData = {
            ...formData,
            total: total
        }
        if (formData.id)
            response = await ItemService.UpdateItem(formData);
        else
            response = await ItemService.AddItem(formData);

        if (response.status === urlConfig.SUCCESS_CODE) {
            message.success(response.message);
            this.setState({ loadingData: false });
            this.props.history.replace(urlConfig.SUPER_ADMIN_ITEMS_LIST);
        } else {
            message.error(response.message);
            this.setState({ loadingData: false });
        }
    }

    handleRevert = () => {
        this.props.form.resetFields()
        let newData = {
            id: this.state.userData.id,
            name: this.state.userData.name,
            price: this.state.userData.price,
            thickness: this.state.userData.thickness,
            yield: this.state.userData.yield,
            labour: this.state.userData.labour
        }
        this.setState({ totalData: newData })
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
            <Card title='Add Item'>
                <Spin tip="Loading..." spinning={this.state.spinLoading}>

                    <div className="components-table-demo-control-bar">
                        <Form layout="inline">
                            <FormItem>
                                <Button
                                    type='primary'
                                    icon="rollback"
                                    onClick={() => this.handleRevert()}
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
                        <AddItem form={form} userData={this.state.userData} handleChange={this.handleChange} totalData={this.state.totalData} spinLoading={e => this.setState({ loading: false })} validation={this.state.validation} />
                    </Form>
                </Spin>
            </Card>
        );
    }
}

const WrappedLocalAuthForm = Form.create()(ItemDetails);

export default WrappedLocalAuthForm;
