import React, { PureComponent } from "react";
import {
    Menu,
    Icon,
    message,
} from "antd";
import { withRouter } from 'react-router-dom';
import * as urlConfig from '../../../constants/URLConstant';
import IntlMessages from "../../../util/IntlMessages";
import { ConfirmModel } from "../../../components/AppModule/ConfirmModel";
import { TableComponent } from "../../../components/AppModule/Table";
import Actions from "../Actions/Actions";
import CustomerService from "../../../service/CustomerService";

const title = 'Customer List';
const button = 'Add Customer';

class CustomerList extends PureComponent {

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
            },
        }

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',

            },
            {
                title: 'Company Name',
                dataIndex: 'company_name',

            },
            {
                title: 'Phone Number',
                dataIndex: 'phone_number',

            },
            {
                title: 'Email',
                dataIndex: 'email',

            },
            {
                title: 'Address',
                dataIndex: 'address',

            },
            {
                title: 'Actions',
                render: (text, index) => <Actions data={index} handleDelete={() => this.handleDelete(index)} />
            },
        ];

        this.tableData = {
            title: title,
            columns: columns,
            button: button,
            addNewDataUrl: urlConfig.SUPER_ADMIN_CUSTOMER_ADD,
            handleRefresh: this.handleRefresh,
            filterData: this.filterData,
            onSelectionChange: this.onSelectionChange,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ loadingData: true })
        const response = await CustomerService.GetCustomers();
        let data = []
        if (response.status === urlConfig.SUCCESS_CODE) {
            data = response.data
        } else {
            this.setState({ openSnackbar: true, snackbarMessage: response.message, isSuccessSnackbar: false });
        }
        this.setState({ data: data, loadingData: false });
    };

    handleDelete = async (data) => {
        this.setState({ loadingData: true });
        const response = await CustomerService.DeleteCustomer(data);
        if (response.status === urlConfig.SUCCESS_CODE) {
            message.success(response.message);
            this.fetchData();
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

    showConfirm = type => {
        const that = this;
        this.setState({ visiblemodel: true })
        if (type === 'edit') {
            this.setState({
                actionData: {
                    message: <IntlMessages id="edit.entry" />, action: e => that.handleEdit(that.state.selectedRowKeys, that.state.selectedRows)
                }
            })
        }
    };

    onActionChange = value => {
        const actionValue = value.key;
        this.showConfirm(actionValue);
    };


    filterData = (data, value) => data.filter(elem => (
        Object.keys(elem).some(key => elem[key] != null ? elem[key].toString().toLowerCase().includes(value) : "") ||
        Object.keys(elem.name).some(key => elem.name[key] != null ? elem.name[key].toString().toLowerCase().includes(value) : "")
    ));


    handleEdit = (key, row) => {
        this.setState({ loadingData: true });
        setTimeout(() => {
            this.props.history.push({ pathname: urlConfig.SUPER_ADMIN_CUSTOMER_EDIT, state: { id: row[0].id } });
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

        const menu = (
            <Menu onClick={this.onActionChange}>
                <Menu.Item key="edit">
                    <Icon type="plus" />
                    {<IntlMessages id="button.edit" />}
                </Menu.Item>

            </Menu>
        );

        return (
            <React.Fragment>
                <TableComponent
                    dataSource={data}
                    data={this.tableData}
                    menu={menu}
                    loadingData={this.state.loadingData}
                    {...this.props}

                />
                {this.state.visiblemodel ? <ConfirmModel actionData={this.state.actionData} visibleModel={this.state.visiblemodel} visible={this.visibleModel} /> : null}
            </React.Fragment>
        );
    }
}

export default withRouter(CustomerList);
