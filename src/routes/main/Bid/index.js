import React, { PureComponent } from "react";
import {

    Menu,
    Icon,
    message,
} from "antd";
import * as urlConfig from '../../../constants/URLConstant';
import IntlMessages from "../../../util/IntlMessages";
import { ConfirmModel } from "../../../components/AppModule/ConfirmModel";
import { TableComponent } from "../../../components/AppModule/Table";
import { withRouter } from 'react-router-dom';
import BidService from "../../../service/BidService";
import Actions from "../Actions/Actions";
import moment from "moment";
import CustomerService from "../../../service/CustomerService";
import { GeneratePDF } from "../Actions/GeneratePdf";

const title = 'Bid List'
const button = 'Add Bid'

class BidList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filteredData: null,
            loadingData: true,
            selectedRowKeys: [],
            selectedRows: '',
            visiblemodel: false,
            actionData: {
                message: '',
                action: ''
            }

        }
        const columns = [
            {
                title: 'Customer',
                dataIndex: 'customer',

            },
            {
                title: 'Bid Date',
                dataIndex: 'bid_date1',

            },
            {
                title: 'Tax',
                dataIndex: 'tax',

            },
            {
                title: 'Total',
                dataIndex: 'grand_total',

            },
            {
                title: 'Notes',
                dataIndex: 'notes',

            },
            {
                title: 'Actions',
                width: 300,
                render: (text, index) => <Actions data={index} isShowPdf={true} handlePdfClick={() => this.handlePdfClick(index, true)} handleEdit={() => this.showConfirm(index)} handleDelete={() => this.handleDelete(index)} />
            },
        ];
        this.tableData = {
            title: title,
            columns: columns,
            button: button,
            NotrowSelection: true,
            addNewDataUrl: urlConfig.SUPER_ADMIN_ADD_BID_LIST,
            handleRefresh: this.handleRefresh,
            filterData: this.filterData,
            onSelectionChange: this.onSelectionChange,
            generatePdf: this.handlePdfClick
        }
    }

    componentDidMount = () => {
        this.fetchData();
    }

    fetchData = async () => {
        let customerList = await this.fetchCustomer()
        this.setState({ loadingData: true })
        let response = await BidService.GetBids();
        if (response.status === urlConfig.SUCCESS_CODE) {
            response.data = this.formatData(response.data, customerList)
            this.setState({ data: response.data });
        } else {
            message.error(response.message);
        }
        this.setState({ loadingData: false });
    };

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

    formatData = ( data, customerList) => {
        return data.map((item, i) => {
            let customerName = ''
            let bid_date = ''
            if (customerList && customerList.length > 0) {
                let product = customerList.filter(prod => prod.id === item.customer_id)
                if (product.length > 0) customerName = product[0].name
            }
            if(item.bid_date){
                bid_date =  moment(new Date(item.bid_date)).format('DD/MM/YYYY')
            }
            return {
                ...item,
                bid_date1: bid_date,
                customer: customerName
            };
        });

    }

    handlePdfClick = async ( data, isSingle) => {
        this.setState({ loadingData: true });
        if (!isSingle) {
            data = this.state.data
        }
        await GeneratePDF(data, !isSingle)
        this.setState({ loadingData: false });
    }

    handleDelete = async (data) => {
        this.setState({ loadingData: true });
        const response = await BidService.DeleteBid(data);
        if (response.status === urlConfig.SUCCESS_CODE) {
            message.success(response.message);
            setTimeout(() => {
                this.setState({ data: [], loadingData: true });
                this.fetchData();
            }, 2000);
        } else {
            message.error(response.message);
            this.setState({ loadingData: false });

        }
    }

    handleRefresh = () => {
        this.setState({ data: [], loadingData: true });
        this.fetchData();

    };

    onSelectionChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    };


    showConfirm = data => {
        const that = this;
        this.setState({ visiblemodel: true })
        this.setState({
            actionData: {
                message: <IntlMessages id="edit.entry" />, action: e => that.handleEdit(data)
            }
        })
    };

    onActionChange = value => {
        const actionValue = value.key;
        this.showConfirm(actionValue);
    };


    filterData = (data, value) => data.filter(elem => (
        Object.keys(elem).some(key => elem[key] != null ? elem[key].toString().toLowerCase().includes(value) : "")
    ));


    handleEdit = (row) => {
        this.setState({ loadingData: true });
        setTimeout(() => {
            this.props.history.push({ pathname: urlConfig.SUPER_ADMIN_EDIT_BID_LIST, state: { id: row.id } });
        }, 2000);

    };

    visibleModel = () => {
        this.setState({ visiblemodel: !this.state.visiblemodel })
    }

    render() {
        const { data } = this.state;
        if (!data) {
            return;
        }

        return (
            <React.Fragment>
                <TableComponent
                    dataSource={data}
                    data={this.tableData}
                    loadingData={this.state.loadingData}
                    {...this.props}
                />
                {this.state.visiblemodel ? <ConfirmModel actionData={this.state.actionData} visibleModel={this.state.visiblemodel} visible={this.visibleModel} /> : null}
            </React.Fragment>
        );
    }
}

export default withRouter(BidList);
