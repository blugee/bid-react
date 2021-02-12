import React, { PureComponent } from 'react';
import { Col, Row, Button } from "antd";
import { withRouter } from 'react-router-dom';
import InputText2 from '../../../../components/AppModule/InputControl/InputText2/InputText2';
import InputSelect from '../../../../components/AppModule/InputControl/InputSelect/InputSelect';
import InputSpan from '../../../../components/AppModule/InputControl/InputSpan/InputSpan';


class LineItems extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleChange = (e, name) => {
        this.props.onChange(this.props.arrayNumber, name, e)
    }

    render() {
        return (
            <React.Fragment>

                <Row type="flex" justify="center">
                    <Col sm={24} xs={24} push={10}>
                        {this.props.arrayNumber > 1 && <Button onClick={() => this.props.onDelete(this.props.arrayNumber)}>Delete</Button>}
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col sm={24} xs={24}>
                        <InputSelect
                            field={this.props.form}
                            label='Item'
                            name={"item_id" + this.props.arrayNumber}
                            onChange={(e) => this.handleChange(e, 'item_id')}
                            list={this.props.itemsList}
                            initialValue={this.props.data.item_id}
                            validationMessage='Please enter Correct Item'
                            requiredMessage='Please enter Item'
                        />
                    </Col>
                </Row>

                <Row type="flex" justify="center">
                    <Col sm={24} xs={24}>
                        <InputText2
                            pattern={new RegExp(/[0-9]/)}
                            inputNumber={true}
                            field={this.props.form}
                            label='Line sqft'
                            name={"line_sqft" + this.props.arrayNumber}
                            inputNumber={true}
                            onChange={(e) => this.handleChange(e, 'line_sqft')}
                            initialValue={this.props.data.line_sqft}
                            validationMessage='please enter numbers only'
                            requiredMessage='Please enter sqft'
                            display={true}
                        />
                    </Col>
                </Row>

                <Row type="flex" justify="center">
                    <Col sm={24} xs={24}>
                        <InputText2
                            pattern={new RegExp(/[0-9]/)}
                            inputNumber={true}
                            field={this.props.form}
                            label='Line thickness'
                            name={"line_thickness" + this.props.arrayNumber}
                            inputNumber={true}
                            onChange={(e) => this.handleChange(e, 'line_thickness')}
                            initialValue={this.props.data.line_thickness}
                            validationMessage='please enter numbers only'
                            requiredMessage='Please enter thickness'
                            display={true}
                        />
                    </Col>
                </Row>

                <Row type="flex" justify="center">
                    <Col sm={24} xs={24}>
                        <InputText2
                            pattern={new RegExp(/[0-9]/)}
                            inputNumber={true}
                            field={this.props.form}
                            label='Calculate pitch'
                            name={"calculate_pitch" + this.props.arrayNumber}
                            inputNumber={true}
                            onChange={(e) => this.handleChange(e, 'calculate_pitch')}
                            initialValue={this.props.data.calculate_pitch}
                            validationMessage='please enter numbers only'
                            requiredMessage='Please enter pitch'
                            display={true}
                        />
                    </Col>
                </Row>

                <Row type="flex" justify="center">
                    <Col sm={24} xs={24}>
                        <InputSpan
                            field={this.props.form}
                            label='Line pitch'
                            name={"line_pitch" + this.props.arrayNumber}
                            initialValue={this.props.data.line_pitch}
                            requiredMessage='Please Enter  pitch'
                            display={true}
                        />
                    </Col>
                </Row>

                <Row type="flex" justify="center">
                    <Col sm={24} xs={24}>
                        <InputSpan
                            field={this.props.form}
                            label='Line volume'
                            name={"line_volume" + this.props.arrayNumber}
                            initialValue={this.props.data.line_volume}
                            requiredMessage='Please Enter volume'
                            display={true}
                        />
                    </Col>
                </Row>

                <Row type="flex" justify="center">
                    <Col sm={24} xs={24}>
                        <InputSpan
                            field={this.props.form}
                            label='Line sets'
                            name={"line_sets" + this.props.arrayNumber}
                            initialValue={this.props.data.line_sets}
                            requiredMessage='Please Enter sets'
                            display={true}
                        />
                    </Col>
                </Row>



                <Row type="flex" justify="center">
                    <Col sm={24} xs={24}>
                        <InputSpan
                            field={this.props.form}
                            label='Line material cost'
                            name={"line_material_cost" + this.props.arrayNumber}
                            initialValue={this.props.data.line_material_cost}
                            requiredMessage='Please Enter material cost'
                            display={true}
                        />
                    </Col>
                </Row>

                <Row type="flex" justify="center">
                    <Col sm={24} xs={24}>
                        <InputSpan
                            field={this.props.form}
                            label='Line labour cost'
                            name={"line_labor_cost" + this.props.arrayNumber}
                            initialValue={this.props.data.line_labor_cost}
                            requiredMessage='Please Enter labour cost'
                            display={true}
                        />
                    </Col>
                </Row>

                <Row type="flex" justify="center">
                    <Col sm={24} xs={24}>
                        <InputSpan
                            field={this.props.form}
                            label='Line item price'
                            name={"line_item_price" + this.props.arrayNumber}
                            initialValue={this.props.data.line_item_price}
                            requiredMessage='Please Enter item price'
                            display={true}
                        />
                    </Col>
                </Row>

            </React.Fragment>
        );
    }
}

export default withRouter(LineItems);
