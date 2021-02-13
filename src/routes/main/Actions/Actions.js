import React, { Component } from 'react';
import { Button, Popconfirm } from "antd";

export default class Actions extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <React.Fragment>
                {this.props.isShowPdf &&
                    <Button onClick={() => this.props.handlePdfClick()}>PDF</Button>
                }
                <Button onClick={() => this.props.handleEdit()}>Edit</Button>
                <Popconfirm title="Sure to delete?" onConfirm={() => this.props.handleDelete()}>
                    <Button>Delete</Button>
                </Popconfirm>
            </React.Fragment>
        )
    }
}
