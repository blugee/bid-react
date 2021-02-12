import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal, Row, Col, Button } from 'antd';
import IntlMessages from '../../../util/IntlMessages';
import { QuestionCircleTwoTone } from '@ant-design/icons';

const formItemLayout = {
    labelcol: {
        xs: { span: 24 },
        sm: { span: 7 },
    },
    wrappercol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
export class ConfirmModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visibleModel
        }
    }
    handleCancel = e => {
        this.setState({
            visible: false,
            loadingButton: false
        });
        setTimeout(() => {
           this.props.visible()
          }, 1000);
        
    };
    handleSubmit = e => {
        
        this.setState({
            visible: false,
            loadingButton: false
        });
        this.props.actionData.action()
        setTimeout(() => {
            this.props.visible()
           }, 1000);
    };
    showConfirm = () => {
        return (

            <Modal
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
                destroyOnClose={true}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      <IntlMessages id="no" />
                    </Button>,
                    <Button key="submit" type="primary"  onClick={this.handleSubmit}>
                      <IntlMessages id="yes" />
                    </Button>,
                  ]}>
                <div {...formItemLayout}>
                    <Row type="flex">
                        <Col sm={3} xs={3} >
                            <QuestionCircleTwoTone twoToneColor="#fa8c16" style={{ fontSize: '22px' }} />
                        </Col>
                        <Col sm={18} xs={24} >
                            <h3>{this.props.actionData.message}</h3>
                        </Col>
                    </Row>
                </div>
            </Modal>

        )
    };
    render() {
        return (
            this.showConfirm()
        )
    }
}

export default withRouter(ConfirmModel)
