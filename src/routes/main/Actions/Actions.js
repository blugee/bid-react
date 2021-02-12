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
              
                <Popconfirm title="Sure to delete?" onConfirm={() => this.props.handleDelete()}>
                    <Button>Delete</Button>
                </Popconfirm>
            </React.Fragment>
        )
    }
}
