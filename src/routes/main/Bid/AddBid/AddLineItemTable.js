import React from 'react';
import { Table, Button, Popconfirm, Card, } from 'antd';
import { withRouter } from 'react-router-dom';
import InputSelect from '../../../../components/AppModule/InputControl/InputSelect/InputSelect';
import InputText2 from '../../../../components/AppModule/InputControl/InputText2/InputText2';
import InputSpan from '../../../../components/AppModule/InputControl/InputSpan/InputSpan';
import './AddLineItem.css'

class AddLineItemTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loadingData: false,
        };
        this.columns = [
            {
                title: 'Item',
                width: 100,
                render: (data, index) =>
                    <InputSelect field={this.props.form}
                        label=''
                        name={"item_id" + index.key}
                        onChange={(e) => this.handleChange(index.key, e, 'item_id')}
                        list={this.props.itemsList}
                        initialValue={index.item_id}
                        styles={{ width: 200 }}
                        validationMessage='Please enter Correct Item'
                        requiredMessage='Please enter Item' />,
            },
            {
                title: 'Line sqft',
                dataIndex: 'line_sqft',
                render: (text, index) =>
                    <InputText2
                        pattern={new RegExp(/[0-9]/)}
                        inputNumber={true}
                        field={this.props.form}
                        label=''
                        name={"line_sqft" + index.key}
                        inputNumber={true}
                        onChange={(e) => this.handleChange(index.key, e, 'line_sqft')}
                        initialValue={index.line_sqft}
                        validationMessage='please enter numbers only'
                        requiredMessage='Please enter sqft'
                        display={true}
                    />
            },
            {
                title: 'Line thickness',
                dataIndex: 'line_thickness',
                render: (text, index) =>
                    <InputText2
                        pattern={new RegExp(/[0-9]/)}
                        inputNumber={true}
                        field={this.props.form}
                        label=''
                        name={"line_thickness" + index.key}
                        inputNumber={true}
                        onChange={(e) => this.handleChange(index.key, e, 'line_thickness')}
                        initialValue={index.line_thickness}
                        validationMessage='please enter numbers only'
                        requiredMessage='Please enter thickness'
                        display={true}
                    />,
            },
            {
                title: 'Calculate pitch',
                dataIndex: 'calculate_pitch',
                render: (text, index) =>
                    <InputText2
                        pattern={new RegExp(/[0-9]/)}
                        inputNumber={true}
                        field={this.props.form}
                        label=''
                        name={"calculate_pitch" + index.key}
                        inputNumber={true}
                        onChange={(e) => this.handleChange(index.key, e, 'calculate_pitch')}
                        initialValue={index.calculate_pitch}
                        validationMessage='please enter numbers only'
                        requiredMessage='Please enter pitch'
                        display={true}
                    />
            },
            {
                title: 'Line pitch',
                dataIndex: 'line_pitch',
                width: 130,
                render: (text, index) => <span>{index.line_pitch}</span>,
            },
            {
                title: 'Line volume',
                dataIndex: 'line_volume',
                width: 130,
                render: (text, index) => <span>{index.line_volume}</span>,
            },
            {
                title: 'Line sets',
                dataIndex: 'line_sets',
                width: 130,
                render: (text, index) => <span>{index.line_sets}</span>,
            },
            {
                title: 'Line material cost',
                dataIndex: 'line_material_cost',
                width: 130,
                render: (text, index) => <span>{index.line_material_cost}</span>,
            },
            {
                title: 'Line labour cost',
                dataIndex: 'line_labor_cost',
                width: 130,
                render: (text, index) => <span>{index.line_labor_cost}</span>,
            },
            {
                title: 'Line item price',
                dataIndex: 'line_item_price',
                width: 130,
                render: (text, index) => <span>{index.line_item_price}</span>,
            },
            {
                title: 'operation',
                dataIndex: 'key',
                render: (text, record) =>
                (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ),
            },
        ];

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (arrayNumber, e, name) => {
        this.props.onChange(arrayNumber, name, e)
    }

    handleDelete = key => {
        this.props.onDelete(key)
    };

    handleAdd = () => {
        this.props.addLineItem()
    };

    render() {

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        return (
            <React.Fragment >
                <Card title='Line Items'>
                    <div>
                        <Button
                            onClick={this.handleAdd}
                            type="primary"
                            style={{
                                marginBottom: 16,
                            }}
                        >
                            Add a row
                        </Button>
                        <Table
                            className="gx-table-responsive"
                            rowClassName={() => 'editable-row'}
                            bordered
                            dataSource={this.props.lineItemsArr}
                            columns={columns}
                        />
                    </div>
                </Card>
            </React.Fragment>
        )
    }
}

export default withRouter(AddLineItemTable);
