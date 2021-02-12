import React, { PureComponent } from 'react';
import { Col, Row, message } from "antd";
import { withRouter } from 'react-router-dom'
import InputText from '../../../../components/AppModule/InputControl/InputText/InputText';
import InputId from '../../../../components/AppModule/InputControl/InputText/InputId';
import * as urlConfig from '../../../../constants/URLConstant';
import InputEmail from '../../../../components/AppModule/InputControl/InputEmail/InputEmail';
import CustomerService from '../../../../service/CustomerService';

class AddCustomer extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                id: '',
                first_name: '',
            },

            disable: false
        }
    }

   

    componentWillMount =  () => {
         this.fetchData();
    }

    fetchData = async () => {
        if (this.props.location.state !== undefined && this.props.location.state.id) {
            this.setState({ idRow: true })
            const response = await CustomerService.GetCustomerByID(this.props.location.state.id);
            if (response.status === urlConfig.SUCCESS_CODE) {
                var data = response.data
                this.setState({
                    userData: {
                        id: data.id,
                        name: data.name,
                        company_name: data.company_name,
                        phone_number: data.phone_number,
                        email: data.email,
                        address: data.address
                    },
                    totalData: response.data,
                    loadingData: false,
                    mobileData: data.mobile
                })
            } else {
                message.error('Something wrong happened');
                this.setState({
                    selectedRowKeys: []
                });
            }
        }
        this.props.spinLoading()
    }



    render() {
        const { id, name, company_name, phone_number, email, address } = this.state.userData;


        return (
            <React.Fragment>
                <Row type="flex" justify="center">
                    <Col sm={12} xs={24}>
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
                    <Col sm={12} xs={24}>
                        <InputText
                            field={this.props.form}
                            label='Name'
                            name="name"
                            initialValue={name}
                            validationMessage='Please Enter Correct Name'
                            requiredMessage='Please Enter Name'
                            display={true}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col sm={12} xs={24}>
                        <InputText
                            field={this.props.form}
                            label='Company Name'
                            name="company_name"
                            initialValue={company_name}
                            validationMessage='Please Enter Correct Company Name'
                            requiredMessage='Please Enter Company Name'
                            display={true}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col sm={12} xs={24}>
                        <InputText
                            field={this.props.form}
                            pattern={new RegExp(/^\+(?:[0-9]?){6,14}[0-9]$/g)}
                            inputNumber={true}
                            validation='please enter numbers only'
                            label='Phone Number'
                            name="phone_number"
                            initialValue={phone_number}
                            validationMessage='please enter numbers only'
                            requiredMessage='Please Enter phone number'
                            display={true}
                            onChange={this.handleChange}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col sm={12} xs={24}>
                        <InputEmail
                            field={this.props.form}
                            label='form.label.email'
                            name="email"
                            initialValue={email}
                            validationMessage='enter.valid.email'
                            requiredMessage='input.email'
                            display={true}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col sm={12} xs={24}>
                        <InputText
                            field={this.props.form}
                            label='Address'
                            name="address"
                            initialValue={address}
                            validationMessage='Please Enter Correct address'
                            requiredMessage='Please Enter address'
                            display={true}
                        />
                    </Col>
                </Row>






            </React.Fragment>
        );
    }
}

export default withRouter(AddCustomer);
