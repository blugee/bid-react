import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, Form, Dropdown, Button, Input, Card, Icon, DatePicker, Checkbox, Select } from 'antd'
import IntlMessages from '../../../util/IntlMessages';
import Table from '../../AppModule/DefaultTable';
import moment from 'moment';
import { FilePdfOutlined } from '@ant-design/icons';


const { RangePicker } = DatePicker;

const { Option } = Select;
const { Search } = Input;
const FormItem = Form.Item;
export class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filteredData: null,
            loadingData: true,
            selectedRowKeys: [],
            selectedRows: '',
            update: true,
            buttonAction: false,
            visiblemodel: false,
            actionData: {
                message: '',
                action: ''
            },
            sizeData: '',
            sizeOptions: '',
            materialOption: [
                { name: 'Brass', id: 'Brass' },
                { name: 'Aluminium', id: 'Aluminium' },
                { name: 'S.S.', id: 'S.S.' },
                { name: 'Steel', id: 'Steel' },
            ]

        }
        this.onDateChange = this.onDateChange.bind(this)
    }
    componentDidUpdate() {
        if (this.state.update) {
            if (this.props.searchInput) {
                this.onSearch(this.props.searchInput)
                this.setState({ update: false })
                console.log(this.props.searchInput)
            }
        }
    }
    onSelectionChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
        this.props.data.onSelectionChange(selectedRowKeys, selectedRows)
    };



    onSearchStringChange = event => {
        if (event.target.value === '') {
            this.setState({ filteredData: null, searchInput: null });
            return;
        }
        const value = event.target.value.toLowerCase();
        const newData = this.props.data.filterData(this.props.dataSource, value);
        this.setState({ filteredData: newData, searchInput: event.target.value });
    };

    onSearch = value => {
        if (value === '') {
            this.setState({ filteredData: null });
            return;
        }
        
        const newData = this.props.data.filterData(this.props.dataSource, value);
        this.setState({ filteredData: newData, searchInput: value });
    };
    onDateChange = (dates, dateStrings) => {
        var newData = []
        var newData1 = ''
        var minDate = dates[0]
        var maxDate = dates[1]
        var dataString1 = dateStrings[0]
        for (var i = dates[0]; i <= maxDate;) {
            newData1 = this.props.data.filterDate(this.props.dataSource, dataString1);
            newData = newData.concat(newData1)
            i = moment(minDate).add('1', 'days')
            minDate = i
            dataString1 = moment(i).format("YYYY-MM-DD")

        }
        var flags = [], output = [], l = newData.length, x;
        for (x = 0; x < l; x++) {
            if (flags[newData[x].id]) continue;
            flags[newData[x].id] = true;
            output.push(newData[x]);
        }
        if (output.length > 0) {
            this.setState({ filteredData: output });
        } else if (output.length === 0 && dateStrings[0] !== "") {
            this.setState({ filteredData: output });
        } else {
            this.setState({ filteredData: this.props.dataSource });
        }


    };

    handleChange = (value) => {
        const newData = this.props.data.filterByPrice(this.props.dataSource, value);
        let matchData = []
        const items = newData.filter(item => {
            if (item.items_params) {
                for (let i = 0; i < item.items_params.length; i++) {
                    if (matchData.indexOf(item.items_params[i].Size) == -1) {
                        matchData.push(item.items_params[i].Size)
                    }
                }
            }
        });
        this.setState({ filteredData: newData, materialData: newData, sizeOptions: matchData, sizeData: '' });
    }

    handleChangeSize = (value) => {
        const newData = this.props.data.handleSizeChange(this.state.materialData, value);
        this.setState({ sizeData: newData });
    }

    handleMaterialSelect = (value) => {
        const newData = this.props.data.handleMaterialChange(this.state.filteredData, value);
        let matchData = []
        const items = newData.filter(item => {
            if (item.items_params) {
                for (let i = 0; i < item.items_params.length; i++) {
                    if (matchData.indexOf(item.items_params[i].Size) == -1) {
                        matchData.push(item.items_params[i].Size)
                    }
                }
            }
        });
        this.setState({ materialData: newData, sizeOptions: matchData, sizeData: '' });
    }

    render() {
        const { data, selectedRowKeys, filteredData, sizeData, materialData } = this.state;

        if (!data) {
            return;
        }

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.onSelectionChange(selectedRowKeys, selectedRows);
            }
        };
        if (this.state.buttonAction) {

            this.onSelectionChange(this.state.selectedRowKeys, this.state.selectedRows);

        }
        return (
            <React.Fragment>
                <Row>
                    <Col span={24}>
                        <Card title={this.props.data.title}>

                            <div className="components-table-demo-control-bar">
                                <Form layout="inline">
                                    {this.props.menu ?
                                        <FormItem>
                                            <Dropdown
                                                overlay={this.props.menu}
                                                trigger={['click']}
                                                disabled={selectedRowKeys.length === 0}
                                            >
                                                <Button style={{ marginBottom: 0 }} >
                                                    {<IntlMessages id="button.action" />} <Icon type="down" />
                                                </Button>
                                            </Dropdown>
                                        </FormItem> :
                                        null}
                                    {this.props.data.NotNeeded ? null :

                                        <FormItem>
                                            <Search
                                                placeholder="input search text"
                                                onChange={this.onSearchStringChange}
                                                onSearch={this.onSearch}
                                                value={this.state.searchInput}
                                                allowClear
                                                style={{ width: 130, marginRight: 15 }}
                                            />
                                        </FormItem>
                                    }
                                    {this.props.data.filterByPrice ?
                                        <FormItem>
                                            <Select
                                                placeholder='plese select Item Name'
                                                style={{ width: 200, marginRight: '10px' }}
                                                // value={this.props.initialValue}
                                                showSearch={true}
                                                onChange={(e) => this.handleChange(e)}
                                                filterOption={(input, option) =>
                                                    option.props.children[0].toLowerCase().startsWith(input.toLowerCase())
                                                }
                                            >
                                                {
                                                    this.props.selectData && this.props.selectData.map(data =>

                                                        <Option value={data.id} key={data.id}>{data.item_name}</Option>
                                                    )
                                                }
                                            </Select>
                                            <Select
                                                placeholder='material'
                                                style={{ width: 150, marginRight: '10px' }}
                                                // value={this.props.initialValue}
                                                showSearch={true}
                                                onChange={(e) => this.handleMaterialSelect(e)}
                                                filterOption={(input, option) =>
                                                    option.props.children[0].toLowerCase().startsWith(input.toLowerCase())
                                                }
                                            >
                                                {
                                                    this.state.sizeOptions && this.state.materialOption.map(data =>

                                                        <Option value={data.id} key={data.id}>{data.name}</Option>
                                                    )
                                                }
                                            </Select>
                                            <Select
                                                placeholder='size'
                                                style={{ width: 100 }}
                                                // value={this.props.initialValue}
                                                showSearch={true}
                                                onChange={(e) => this.handleChangeSize(e)}
                                                filterOption={(input, option) =>
                                                    option.props.children[0].toLowerCase().startsWith(input.toLowerCase())
                                                }
                                            >
                                                {
                                                    this.state.sizeOptions && this.state.sizeOptions.map(data =>

                                                        <Option value={data} key={data}>{data}</Option>
                                                    )
                                                }
                                            </Select>
                                        </FormItem>
                                        : null
                                    }

                                    {this.props.data.NotrowSelection ? null :
                                        <FormItem>
                                            <Button
                                                type='primary'
                                                icon="reload"
                                                onClick={this.props.data.handleRefresh}
                                                style={{ marginBottom: 0 }}
                                            >
                                                {<IntlMessages id="button.refresh" />}
                                            </Button>
                                        </FormItem>}



                                    {this.props.data.addTask ?
                                        <FormItem>
                                            <Button
                                                type='primary'
                                                icon='plus'
                                                onClick={this.props.data.visibleTask}
                                                style={{ marginBottom: 0, marginRight: 5 }}
                                            >
                                                {this.props.data.buttonTask}
                                            </Button>
                                        </FormItem> : null}
                                    {this.props.data.addNewDataUrl ?
                                        <FormItem>
                                            <Button
                                                type='primary'
                                                icon='plus'
                                                onClick={() => this.props.history.push(this.props.data.addNewDataUrl)}
                                                style={{ marginBottom: 0, marginRight: 2 }}
                                            >
                                                {this.props.data.button}
                                            </Button>
                                        </FormItem> : null}
                                    {this.props.data.myTask ?
                                        <FormItem>
                                            <Button
                                                key="taskButton"
                                                type='primary'
                                                style={{ marginBottom: 0, marginRight: 15 }}
                                            >
                                                <Checkbox key="taskButtonTrue"
                                                    checked={this.props.data.myTaskData}
                                                    onChange={this.props.data.handleChecked}
                                                    name="myTask" value={this.props.data.myTaskData}><span style={{ color: 'white' }}><IntlMessages id="my.task" /></span></Checkbox>
                                            </Button>
                                        </FormItem> : null}

                                    {this.props.data.onDateChange ?
                                        <FormItem>
                                            <RangePicker
                                                ranges={{
                                                    Today: [moment(), moment()],
                                                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                                                }}
                                                onChange={this.onDateChange}
                                            />
                                        </FormItem>
                                        : null}
                                    {this.props.data.generatePdf ?
                                        <FormItem>
                                            <Button
                                                type='primary'

                                                onClick={this.props.data.generatePdf}
                                                style={{ marginBottom: 0, marginRight: 15 }}
                                            >
                                                <FilePdfOutlined /> Generate Pdf
                                            </Button>
                                        </FormItem> : null}


                                </Form>
                            </div>
                            {this.props.data.NotrowSelection ?
                                <Table
                                    className="gx-table-responsive"
                                    columns={this.props.data.columns}
                                    dataSource={sizeData || materialData || filteredData || this.props.dataSource}
                                    rowKey='id'
                                    loading={this.props.loadingData}
                                /> :
                                <Table
                                    className="gx-table-responsive"
                                    rowSelection={{
                                        type: 'radio',
                                        ...rowSelection,
                                    }}
                                    columns={this.props.data.columns}
                                    dataSource={sizeData || materialData || filteredData || this.props.dataSource}
                                    rowKey='id'
                                    loading={this.props.loadingData}
                                />}

                        </Card>
                    </Col>
                </Row>
            </React.Fragment >
        )
    }
}

export default withRouter(TableComponent)
