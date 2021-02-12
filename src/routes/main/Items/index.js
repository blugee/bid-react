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
import ItemService from "../../../service/ItemService";

const title = 'Item List';
const button = 'Add Item';

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
                title: 'Item',
                dataIndex: 'name',

            },
            {
                title: 'Price',
                dataIndex: 'price',

            },
            {
                title: 'Thickness',
                dataIndex: 'thickness',

            },
            {
                title: 'Yield',
                dataIndex: 'yield',

            },
            {
                title: 'Labour',
                dataIndex: 'labour',

            },
            {
                title: 'Total',
                dataIndex: 'total',

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
            addNewDataUrl: urlConfig.SUPER_ADMIN_ITEMS_LIST_ADD,
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
        const response = await ItemService.GetItems();
        let data = []
        if (response.status === urlConfig.SUCCESS_CODE) {
            data = response.data
        } else {
            this.setState({ openSnackbar: true, snackbarMessage: response.message, isSuccessSnackbar: false });
        }
        this.setState({ data: data, loadingData: false });
    };

    handleDelete = async (data) => {
        this.setState({ loadingData: true })
        const response = await ItemService.DeleteItem(data);
        if (response.status === urlConfig.SUCCESS_CODE) {
            message.success(response.message);
            setTimeout(() => {
                this.props.history.replace(urlConfig.SUPER_ADMIN_ITEMS_LIST);

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


    filterData = (data, value) =>
        data.filter(elem => {
            Object.keys(elem).some(key => elem[key] != null ? elem[key].toString().toLowerCase().includes(value) : "") ||
                Object.keys(elem.name).some(key => elem.name[key] != null ? elem.name[key].toString().toLowerCase().includes(value) : "")
        });


    handleEdit = (key, row) => {
        this.setState({ loadingData: true });
        setTimeout(() => {
            this.props.history.push({ pathname: urlConfig.SUPER_ADMIN_ITEMS_LIST_EDIT, state: { id: row[0].id } });
        }, 2000);
    };
    visibleModel = () => {
        this.setState({ visiblemodel: !this.state.visiblemodel })
    }

    render() {

        const { data } = this.state;
        var dups = [];
        var arr = data.filter(function (el) {
            if (dups.indexOf(el.item_name) == -1) {
                dups.push(el.item_name);
                return true;
            }

            return false;

        });
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
                    selectData={arr}
                    loadingData={this.state.loadingData}
                    {...this.props}

                />
                {this.state.visiblemodel ? <ConfirmModel actionData={this.state.actionData} visibleModel={this.state.visiblemodel} visible={this.visibleModel} /> : null}
            </React.Fragment>
        );
    }
}

export default withRouter(CustomerList);
