import React, { Component } from 'react'
import {
    Col,
    Row,
    message,
} from "antd";

import * as urlConfig from '../../../constants/URLConstant';
import ProfileService from '../../../service/ProfileService';
import AuthService from '../../../service/AuthService';
import 'react-html5-camera-photo/build/css/index.css';
import {
    setProfileTopCorner, setFullName
} from "../../../appRedux/actions/Setting";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InputId from '../InputControl/InputText/InputId';
import InputText from '../InputControl/InputText/InputText';
import InputEmail from '../InputControl//InputEmail/InputEmail';



export class MyProfile extends Component {
    constructor() {
        super();
        this.state = {
            userData: {
                id: '',
                first_name: '',
                last_name: '',
                email: '',
                mobile: '',
                country_id: '',
                state_id: '',
                city_id: '',
            },
            loadingData: true,
            visible: false,
            uid: '',
            departmentList: [],
            countryList: [],
            stateList: [],
            cityList: [],
            countyID: '',
            stateId: '',
            country: false,
            data: [],
            loading: false,
            profile: null,
            role: '',
            submitted: '',
            defaultImage: '',
            cameraVisible: false,
            mobileData: ''
        };
    }
    showOpenFileDlg = () => {
        this.inputOpenFileRef.current.click()
    }


    componentDidMount = async () => {
        this.setState({ loadingData: false })
        await this.fetchData();
        this.props.spinLoading()
    }



    fetchData = async () => {
        var profile = await AuthService.GetCurrentLoggedUserDetails();
        const response = await ProfileService.GetUserByID(profile.id);
        if (response.status === urlConfig.SUCCESS_CODE) {
            this.setState({
                userData: response.data,
                loadingData: false,
            })
        } else {
            message.error('Something wrong happened');
        }
    }



    openProfileModel = () => {
        this.setState({ visible: true })
    }
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const {
            id,
            user_name,
            address,
            email,
            mo_no,
            city,
        } = this.state.userData;

  

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

                        <InputText
                            field={this.props.form}
                            label='Username'
                            name="user_name"
                            initialValue={user_name}
                            validationMessage='Please Enter Correct Name'
                            requiredMessage='Please Enter Name'
                            display={true}
                        />
                    </Col>
                </Row>


                <Row type="flex" justify="center">
                    <Col sm={12} xs={24}>
                        <InputEmail
                            field={this.props.form}
                            label='form.label.email'
                            name='email'
                            validationMessage='enter.valid.email'
                            requiredMessage='input.email'
                            initialValue={email}
                            disable={true}
                            isSpan={true}
                        />
                    </Col>
                </Row>


               
               

               
            </React.Fragment >
        )
    }
}
const mapStateToProps = ({ settings }) => {
    const { setProfile } = settings;
    return { setProfile }
};
export default withRouter(connect(mapStateToProps, {
    setProfileTopCorner, setFullName
})(MyProfile));
