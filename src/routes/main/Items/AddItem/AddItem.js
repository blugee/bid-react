import React, { PureComponent } from 'react';
import { Col, Row } from "antd";
import InputText from '../../../../components/AppModule/InputControl/InputText/InputText';
import InputId from '../../../../components/AppModule/InputControl/InputText/InputId';
import InputSpan from '../../../../components/AppModule/InputControl/InputSpan/InputSpan';

class AddItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: {},

            disable: false
        }
    }

    getTotal = () => {
        var total = 0;
        let data = this.props.totalData
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

    handleChange = (name, value) => {
        this.props.handleChange(name, value)
    }


    render() {
        const { id, name, thickness, labour, price } = this.props.userData;


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
                            label='Item'
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
                            pattern={new RegExp(/[0-9]/)}
                            inputNumber={true}
                            validation='please enter numbers only'
                            label='Price'
                            name="price"
                            initialValue={price}
                            validationMessage='please enter numbers only'
                            requiredMessage='Please Enter Price'
                            display={true}
                            onChange={this.handleChange}
                        />
                    </Col>
                </Row>


                <Row type="flex" justify="center">
                    <Col sm={12} xs={24}>
                        <InputText
                            field={this.props.form}
                            pattern={new RegExp(/[0-9]/)}
                            inputNumber={true}
                            validation='please enter numbers only'
                            label='Thickness'
                            name="thickness"
                            initialValue={thickness}
                            validationMessage='please enter numbers only'
                            requiredMessage='Please Enter Thickness'
                            display={true}
                            onChange={this.handleChange}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col sm={12} xs={24}>
                        <InputText
                            field={this.props.form}
                            pattern={new RegExp(/[0-9]/)}
                            inputNumber={true}
                            validation='please enter numbers only'
                            label='Yield'
                            name="yield"
                            initialValue={this.props.userData.yield}
                            validationMessage='please enter numbers only'
                            requiredMessage='Please Enter Yield'
                            display={true}
                            onChange={this.handleChange}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col sm={12} xs={24}>
                        <InputText
                            field={this.props.form}
                            pattern={new RegExp(/[0-9]/)}
                            inputNumber={true}
                            validation='please enter numbers only'
                            label='Labour'
                            name="labour"
                            initialValue={labour}
                            validationMessage='please enter numbers only'
                            requiredMessage='Please Enter Labour'
                            display={true}
                            onChange={this.handleChange}
                        />
                    </Col>
                </Row>

                <Row type="flex" justify="center">
                    <Col sm={12} xs={24}>
                        <InputSpan
                            field={this.props.form}
                            label='Total'
                            name="total"
                            initialValue={this.getTotal()}
                            requiredMessage='Please Enter Labour'
                            display={true}
                        />
                    </Col>
                </Row>



            </React.Fragment>
        );
    }
}

export default AddItem;
