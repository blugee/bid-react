import React, { PureComponent } from 'react';
import { Button, Card, Form, message, Spin } from "antd";
import AddBid from './AddBid';
import BidService from '../../../../service/BidService';
import * as urlConfig from '../../../../constants/URLConstant';
import IntlMessages from "../../../../util/IntlMessages";
import moment from 'moment';
import LineItemService from '../../../../service/LineItemService';
import CustomerService from '../../../../service/CustomerService';
import ItemService from '../../../../service/ItemService';

const FormItem = Form.Item;

class BidDetails extends PureComponent {
    state = {
        loadingData: false,
        spinLoading: false,
        bidData: {
            bid_date: moment(new Date())
        },
        lineItemsArr: [{
            key: 1,
            item_id: '',
            line_sqft: '',
            line_thickness: '',
            calculate_pitch: '',
            line_pitch: 0,
            line_volume: 0,
            line_sets: 0,
            line_item_price: 0,
            line_material_cost: 0,
            line_labor_cost: 0,
        }],
        bidTax: '',
        lineItemsForRevert: []
    };

    componentDidMount = () => {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ spinLoading: true })
        let customerList = await this.fetchCustomer()
        let itemsList = await this.fetchItems()
        let lineItemsForRevert = this.state.lineItemsArr
        if (this.props.location.state !== undefined && this.props.location.state.id) {
            this.setState({ idRow: true })
            const response = await BidService.GetBidByID(this.props.location.state.id);
            if (response.status === urlConfig.SUCCESS_CODE) {
                var data = response.data
                const res = await LineItemService.GetLineItemsByBidID(this.props.location.state.id);
                if (response.status === urlConfig.SUCCESS_CODE) {
                    data.bid_date = moment(data.bid_date)
                    lineItemsForRevert = res.data
                    this.setState({
                        bidData: data,
                        lineItemsArr: res.data,
                        loadingData: false,
                        bidTax: data.tax
                    })
                } else {
                    message.error('Something wrong happened');
                }
            } else {
                message.error('Something wrong happened');
            }
        }
        this.setState({ customerList: customerList, itemsList: itemsList, spinLoading: false, lineItemsForRevert: lineItemsForRevert })
    }

    fetchCustomer = async () => {
        const response = await CustomerService.GetCustomers();
        let data = []
        if (response.status === urlConfig.SUCCESS_CODE) {
            data = response.data
        } else {
            console.log(response.message)
        }
        return data
    }

    fetchItems = async () => {
        const response = await ItemService.GetItems();
        let data = []
        if (response.status === urlConfig.SUCCESS_CODE) {
            data = response.data
        } else {
            console.log(response.message)
        }
        return data
    };

    handleArray(e) {
        this.setState({ lineItemsArr: e })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loadingData: true });
                this.addBid(values);
            }
        });
    };

    addBid = async (formData) => {
        var data = {
            id: formData.id,
            customer_id: formData.customer_id,
            bid_date: formData.bid_date,
            total_labor_cost: formData.total_labor_cost,
            total_material_cost: formData.total_material_cost,
            total_item_price: formData.total_item_price,
            total_sets: formData.total_sets,
            total_volume: formData.total_volume,
            total_sqft: formData.total_sqft,
            tax: formData.tax,
            bid_total: formData.bid_total,
            options_total: formData.options_total,
            grand_total: formData.grand_total,
            notes: formData.notes,
            terms: formData.terms
        };
        var response;
        if (formData.id) {
            response = await BidService.UpdateBid(data)
        } else {
            response = await BidService.AddBid(data)
        }

        if (response.status === urlConfig.SUCCESS_CODE) {
            let lineItem = {
                line_item: this.state.lineItemsArr,
                bid_id: response.data.id
            }

            let res
            if (formData.id) {
                res = await LineItemService.UpdateLineItem(lineItem)
            } else {
                res = await LineItemService.AddLineItem(lineItem)
            }

            if (res.status === urlConfig.SUCCESS_CODE) {
                message.success(response.message);
                setTimeout(() => {
                    this.props.history.replace(urlConfig.SUPER_ADMIN_BID_LIST);

                }, 2000);
            } else {
                message.error(response.message);
                this.setState({ loadingData: false });

            }
        } else {
            message.error(response.message);
            this.setState({ loadingData: false });

        }
    }

    handleRevert = () => {
        this.props.form.resetFields()
        let tax = this.state.bidData.tax || 0
        this.setState({ lineItemsArr: this.state.lineItemsForRevert, bidTax: tax })
    }

    taxChange = (value) => {
        this.setState({ bidTax: value })
    }

    render() {
        const { form } = this.props;
        const { customerList, itemsList, bidData, lineItemsArr, bidTax } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
            <Card title='Add Bid'>
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
                        <AddBid
                            form={form}
                            customerList={customerList}
                            itemsList={itemsList}
                            bidData={bidData}
                            bidTax={bidTax}
                            lineItemsArr={lineItemsArr}
                            ontaxChange={this.taxChange}
                            handleArray={e => this.handleArray(e)}
                            spinLoading={e => this.setState({ spinLoading: false })}
                        />
                    </Form>
                </Spin>
            </Card>
        );
    }
}

const WrappedLocalAuthForm = Form.create()(BidDetails);

export default WrappedLocalAuthForm;
