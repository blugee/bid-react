import React, { PureComponent } from 'react';
import { Col, Row, Form, Button, Card } from "antd";
import { withRouter } from 'react-router-dom';
import InputText from '../../../../components/AppModule/InputControl/InputText/InputText';
import InputId from '../../../../components/AppModule/InputControl/InputText/InputId';
import { PlusOutlined } from '@ant-design/icons';
import LineItems from './LineItems';
import InputSelect from '../../../../components/AppModule/InputControl/InputSelect/InputSelect';
import InputDate from '../../../../components/AppModule/InputControl/InputDate/InputDate';
import moment from 'moment';
import InputSpan from '../../../../components/AppModule/InputControl/InputSpan/InputSpan';





class AddBid extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
     
    }

  }




  addPerameter() {
    let lastObj = this.props.lineItemsArr.reduce((prev, current) => (prev.key > current.key) ? prev : current)

    let newObj = {
      key: lastObj.key + 1,
      item_id: '',
      line_sqft: '',
      line_thickness: '',
      line_pitch: 0,
      line_volume: 0,
      line_sets: 0,
      line_item_price: 0,
      line_material_cost: 0,
      line_labor_cost: 0,
    }
    var newArray = this.props.lineItemsArr
    var Array = newArray.concat(newObj);
    this.props.handleArray(Array)
  }

  deletePerameter(e) {
    const items = this.props.lineItemsArr.filter(item => item.key !== e);
    this.props.handleArray(items)
  }

  handlePerameterChange = async (key, name, value) => {

    let lineItemsArr = this.props.lineItemsArr
    let newArray = [...this.props.lineItemsArr]
    let objIndex = lineItemsArr.findIndex((obj => obj.key === key));
    newArray[objIndex] = { ...newArray[objIndex], [name]: value }


    if (name === 'calculate_pitch' || name === 'line_sqft') {
      let line_pitch = await this.handlePitchChange(newArray[objIndex])
      newArray[objIndex] = { ...newArray[objIndex], line_pitch: line_pitch }
    }

    if (name === 'line_thickness' || name === 'line_sqft' || name === 'item_id') {
      let obj = await this.handleVolumeChange(newArray[objIndex])
      newArray[objIndex] = obj
    }

    this.setState({ lineItemsArr: newArray, }, () => {
      this.props.handleArray(newArray)
    });

  }


  handlePitchChange = (data) => {
    let total = 0
    if (Number(data.calculate_pitch) && Number(data.line_sqft)) {
      total = data.calculate_pitch / 144
      total = Math.sqrt(total + 1)
      total = total * data.line_sqft
      total = total.toFixed(2)
    }
    return total
  }

  handleVolumeChange = async (data) => {
    let total = 0
    let sets = 0
    let materialCost = 0
    let labourCost = 0
    let totalCost = 0
    if (Number(data.line_sqft) && Number(data.line_thickness)) {
      total = data.line_sqft * data.line_thickness
      total = total.toFixed(2)
    }
    if (data.item_id) {
      let item = await this.props.itemsList.filter(item => item.id === data.item_id)
      if (item && item.length > 0) {
        if (total !== 0) {
          sets = total / item[0].yield
          sets = sets.toFixed(2)
        }
        materialCost = item[0].price * data.line_sqft
        labourCost = item[0].labour * data.line_sqft
        totalCost = materialCost + labourCost
      }
    }

    data =
    {
      ...data,
      line_volume: total,
      line_sets: sets,
      line_material_cost: materialCost,
      line_labor_cost: labourCost,
      line_item_price: totalCost
    }
    return data

  }



  getTotal = (key, isGrandTotal) => {
    var total = 0;
    let data = this.props.lineItemsArr
    if (key) {
      total = data.reduce((acc, current) => acc + (current[key] && Number(current[key]) ? Number(current[key]) : current[key]), 0)
    }

    if (isGrandTotal && Number(this.props.bidTax)) {
      total = total + Number(this.props.bidTax)
    }
    return total;
  }


  handleChange = (name, value) => {
    this.props.ontaxChange(value)
  }



  render() {
    const {
      id,
      customer_id,
      bid_date,
      notes,
      terms,
      tax,
    } = this.props.bidData;

    const { customerList, itemsList } = this.props;


    return (
      <React.Fragment>
        <Row>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card>
              <Row type="flex" justify="center">
                <Col sm={24} xs={24}>
                  <InputId
                    field={this.props.form}
                    label='form.label.id'
                    name="id"
                    initialValue={id}
                    display={false}
                  />
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col sm={24} xs={24}>
                  <InputSelect
                    field={this.props.form}
                    list={customerList}
                    bid_date initialValue={customer_id}
                    label='Customer'
                    name="customer_id"
                    validationMessage='Please enter Customer'
                    requiredMessage='Please enter Customer'
                  />
                </Col>
              </Row>

              <Row type="flex" justify="center">
                <Col sm={24} xs={24}>
                  <InputDate
                    field={this.props.form}
                    label='Date'
                    name='bid_date'
                    requiredMessage='Please select date'
                    initialValue={bid_date}
                    display={true}
                  />
                </Col>
              </Row>

              <Row type="flex" justify="center">
                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                  <InputSpan
                    labelCol={14}
                    wrapperCol={8}
                    field={this.props.form}
                    label='Total labor cost'
                    name="total_labor_cost"
                    initialValue={this.getTotal('line_labor_cost')}
                    requiredMessage='Please Enter total labor cost'
                    display={true}
                  />
                </Col>


                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                  <InputSpan
                    labelCol={14}
                    wrapperCol={8}
                    field={this.props.form}
                    label='Total material cost'
                    name="total_material_cost"
                    initialValue={this.getTotal('line_material_cost')}
                    requiredMessage='Please Enter total material cost'
                    display={true}
                  />
                </Col>


                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                  <InputSpan
                    labelCol={14}
                    wrapperCol={8}
                    field={this.props.form}
                    label='Total item price'
                    name="total_item_price"
                    initialValue={this.getTotal('line_item_price')}
                    requiredMessage='Please Enter total item price'
                    display={true}
                  />
                </Col>

                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                  <InputSpan
                    labelCol={14}
                    wrapperCol={8}
                    field={this.props.form}
                    label='Total sets'
                    name="total_sets"
                    initialValue={this.getTotal('line_sets')}
                    requiredMessage='Please Enter total sets'
                    display={true}
                  />
                </Col>

                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                  <InputSpan
                    labelCol={14}
                    wrapperCol={8}
                    field={this.props.form}
                    label='Total volume'
                    name="total_volume"
                    initialValue={this.getTotal('line_volume')}
                    requiredMessage='Please Enter total volume'
                    display={true}
                  />
                </Col>

                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                  <InputSpan
                    labelCol={14}
                    wrapperCol={8}
                    field={this.props.form}
                    label='Total sqft'
                    name="total_sqft"
                    initialValue={this.getTotal('line_sqft')}
                    requiredMessage='Please Enter total sqft'
                    display={true}
                  />
                </Col>
              </Row>

              <Row type="flex" justify="center">
                <Col sm={24} xs={24}>
                  <InputText
                    field={this.props.form}
                    pattern={new RegExp(/[0-9]/)}
                    inputNumber={true}
                    validation='please enter numbers only'
                    label='Tax'
                    name="tax"
                    initialValue={tax}
                    validationMessage='please enter numbers only'
                    requiredMessage='Please Enter tax'
                    onChange={this.handleChange}
                    display={true}
                  />
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col xl={12} lg={24} md={24} sm={24} xs={24}  >
                  <InputSpan
                    labelCol={14}
                    wrapperCol={8}
                    field={this.props.form}
                    label='Bid total'
                    name="bid_total"
                    initialValue={this.getTotal('line_item_price')}
                    requiredMessage='Please Enter bid total'
                    display={true}
                  />
                </Col>

                <Col xl={12} lg={24} md={24} sm={24} xs={24}  >
                  <InputSpan
                    labelCol={14}
                    wrapperCol={8}
                    field={this.props.form}
                    label='Options total'
                    name="options_total"
                    initialValue={this.getTotal()}
                    requiredMessage='Please Enter options total'
                    display={true}
                  />
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col sm={24} xs={24}>
                  <InputSpan
                    field={this.props.form}
                    label='Grand total'
                    name="grand_total"
                    initialValue={this.getTotal('line_item_price', true)}
                    requiredMessage='Please Enter grand total'
                    display={true}
                  />
                </Col>
              </Row>



              <Row type="flex" justify="center">
                <Col sm={24} xs={24}>
                  <InputText
                    field={this.props.form}
                    label='Notes'
                    name="notes"
                    initialValue={notes}
                    validationMessage='Please Enter Correct notes'
                    requiredMessage='Please enter notes'
                    display={true}

                  />
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col sm={24} xs={24}>
                  <InputText
                    field={this.props.form}
                    label='Terms'
                    name="terms"
                    initialValue={terms}
                    validationMessage='Please Enter Correct terms'
                    requiredMessage='Please enter terms'
                    display={true}
                  />
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col sm={24} xs={24} push={7} >
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => { this.addPerameter(); }}
                    // style={{ width: '50%' }}
                    >
                      <PlusOutlined /> Add Line Items
                            </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>



          {this.props.lineItemsArr.map((index) => (
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Card>
                <LineItems name="item_params"
                  key={index.key}
                  data={index}
                  itemsList={itemsList}
                  arrayNumber={index.key}
                  onChange={(key, name, value) => this.handlePerameterChange(key, name, value)}
                  onDelete={(e) => this.deletePerameter(e)}
                  form={this.props.form} />
                <Row type="flex" justify="center">
                  <Col sm={24} xs={24} push={7} >
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => { this.addPerameter(); }}
                      // style={{ width: '50%' }}
                      >
                        <PlusOutlined /> Add Line Items
                            </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
          }





        </Row>


      </React.Fragment >
    );
  }
}

export default withRouter(AddBid)
