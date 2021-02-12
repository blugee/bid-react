import React from "react";
import { Button, Form, Icon, Input, Alert, message, Tooltip } from "antd";
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive';
import * as urlConfig from '../../../../constants/URLConstant';
import loginLogo from '../../../../assets/images/logo/logo.png';

import AuthService from "../../../../service/AuthService";
import './Auth.css'

const FormItem = Form.Item;
const containDigits = "(?=.*[0-9])";
const dataDigits = "0-9";
const containLetters = "A-Za-z";
const containUpperCase = "(?=.*[A-Z])";
const dataUpperCase = "A-Z";
const containLowerCase = "(?=.*[a-z])";
const dataLowerCase = "a-z";
const containSymbol = "(?=.*[-!$%^&*#+?_=:';])"
const dataSymbol = "-!$%^&*#+?_=:';"
const containSpecialCharacter = "(?=.*[_:';!@#$%^&*)(+=._-)"
const dataSpecialCharacter = "[_:';!@#$%^&*)(+=._-"
var minimumLenght = 10
var maximunLengh = 16
var data = ''
var array = ''
var tooltip = ''
var tooltipData = []

class ConfirmEmail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            submitError: false,
            error: '',
            loading: false,
            capsLockWarning: false,
            submitted: false,
            showConfirmPassword: false,
            encrypted_data: "",
            passWord: "",
            name: '',
            newRegEx: '',
            firstPassword: '',
            allTooltipData: [],
            userdata: {
                digits: '',
                id: '',
                is_active: '',
                letters: '',
                lowercase: '',
                maximum_length: '',
                minimum_length: '',
                organization_id: '',
                special_characters: '',
                symbols: '',
                uppercase: ''
            },
            digits: false,
            letters: false,
            lowercase: false,
            maximum_length: false,
            minimum_length: false,
            organization_id: false,
            special_characters: false,
            symbols: false,
            uppercase: false,
            lowercaseData: 'Have at least one lowercase letters'
        };
    }


    componentWillMount() {
        var data = this.props.location.search;
        let params = new URLSearchParams(data);
        let value = params.get('value');
        let name = params.get('name');
        if (value && value !== null && name && name !== null) {
            this.setState({ encrypted_data: value, name: name });
        }
    }

    getPasswordPolicy = async (value) => {
        var body = { encrypted_data: value };
        const response = await AuthService.PasswordPolicy(body)
        if (response.status === urlConfig.SUCCESS_CODE) {
            console.log(response.data)

            this.setState({
                userdata: response.data
            })
            this.setRegEx()
        }
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        this.setState({
            firstPassword: value
        })
        if (this.state.newRegEx.test(value)) {
            this.setState({ showConfirmPassword: true })
        } else if (!this.state.newRegEx.test(value)) {
            this.setState({ showConfirmPassword: false })
        }
        callback();
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ error: "" });
        this.props.form.validateFields((err, values) => {

            if (!err) {
                this.setState({ loading: true });
                this.confirmEmail(values)
            }
        });
    };
    confirmEmail = async (formdata) => {
        const response = await AuthService.ConfirmEmail(formdata)

        if (response.status === urlConfig.SUCCESS_CODE) {
            this.setState({ loading: false });
            const { from } = this.props.location.state || { from: { pathname: `/login` } };
            message.success(response.message)
            this.props.history.push(from);
        }
        else {
            this.setState({ loading: false });
            message.error(response.message);

        }
    }
    componentDidMount() {
        var data = this.props.location.search;
        let params = new URLSearchParams(data);
        let value = params.get('value');
        if (value && value !== null) {
            this.setState({ encrypted_data: value });
            this.getPasswordPolicy(value)
        }
    }

    resetPassword = () => {
        // this.setState({ userName: "", passWord: "" })
        this.props.history.push(`/login`);
    }
    setRegEx = () => {

        if (this.state.userdata !== null) {
            const { digits,
                letters,
                lowercase,
                maximum_length,
                minimum_length,
                special_characters,
                symbols,
                uppercase } = this.state.userdata
            minimumLenght = minimum_length;
            maximunLengh = maximum_length;
            if (digits) {
                data = containDigits
                array = dataDigits
                tooltip = tooltipData.push("Have at least one number")
                this.setState({ digits: true })
            }
            if (letters) {
                if (uppercase && lowercase) {
                    data = data + containUpperCase + containLowerCase
                    array = array + containLetters
                    tooltip = tooltipData.push("Have at least one capital letters")
                    tooltip = tooltipData.push('Have at least one lowercase letters')
                    this.setState({ uppercase: true, lowercase: true })
                }
                else if (uppercase) {
                    data = data + containUpperCase
                    array = array + dataUpperCase
                    tooltip = tooltipData.push("Have at least one capital letters")
                    this.setState({ uppercase: true })
                } else if (lowercase) {
                    data = data + containLowerCase
                    array = array + dataLowerCase
                    tooltip = tooltipData.push(this.state.lowercaseData)
                    this.setState({ lowercase: true })
                }

            }
            if (symbols) {
                data = data + containSymbol
                array = array + dataSymbol
                tooltip = tooltipData.push('Have at least one symbols')
                this.setState({ symbols: true })
            }
            if (special_characters) {
                data = data + containSpecialCharacter
                array = array + dataSpecialCharacter
                tooltip = tooltipData.push('Have at least one special character')
                this.setState({ special_characters: true })
            }
            if (!digits && !letters && !symbols && !special_characters) {
                data = data + containUpperCase + containLowerCase + containDigits
                array = containLetters + dataDigits
                tooltip = tooltipData.push("Have at least one capital letters")
                tooltip = tooltipData.push('Have at least one lowercase letters')
                tooltip = tooltipData.push("Have at least one number")
                this.setState({ uppercase: true, lowercase: true, digits: true })
            }
            tooltip = tooltipData.push(`${"Be at least " + minimumLenght + "characters"}`)
            tooltip = tooltipData.push(`${"Maximum " + maximunLengh + " characters"}`)
            // tooltipData = tooltipData && tooltipData.map(data => data)
            tooltipData = <span>Password must:
      <ul>
                    {tooltipData && tooltipData.map(data => <li>{data}</li>)}
                    {/* <li>Be at least {minimumLenght} characters</li>
          <li>Maximum {maximunLengh} characters</li> */}
                </ul>
            </span>
        } else {
            data = data + containUpperCase + containLowerCase + containDigits
            array = containLetters + dataDigits
            tooltip = tooltipData.push("Have at least one capital letters")
            tooltip = tooltipData.push('Have at least one lowercase letters')
            tooltip = tooltipData.push("Have at least one number")
            tooltip = tooltipData.push(`${"Be at least " + minimumLenght + "characters"}`)
            tooltip = tooltipData.push(`${"Maximum " + maximunLengh + " characters"}`)
            tooltipData = <span>Password must:
            <ul>
                    {tooltipData && tooltipData.map(data => <li>{data}</li>)}
                    {/* <li>Be at least {minimumLenght} characters</li>
                <li>Maximum {maximunLengh} characters</li> */}
                </ul>
            </span>
            this.setState({ uppercase: true, lowercase: true, digits: true })

        }
        const matchRegEx = new RegExp("^" + data + "[" + array + "]{" + minimumLenght + "," + maximunLengh + "}$", 'g')
        this.setState({ newRegEx: matchRegEx, allTooltipData: tooltipData })
        console.log(tooltip)
    }

    passwordChange = (value) => {
        var tooltipData2 = []
        var data = false

        if (this.state.digits) {
            if (/([0-9]+)/g.test(value.target.value)) {
                tooltipData2.push(<b style={{ color: 'green' }}>Have at least one number</b>)
                data = true
            } else {
                tooltipData2.push('Have at least one number')
            }
        }
        if (this.state.uppercase) {
            if (/([A-Z]+)/g.test(value.target.value)) {
                tooltipData2.push(<b style={{ color: 'green' }}>Have at least one capital letters</b>)
                data = true
            } else {
                tooltipData2.push('Have at least one capital letters')
            }

        }
        if (this.state.lowercase) {
            if (/([a-z]+)/g.test(value.target.value)) {
                tooltipData2.push(<b style={{ color: 'green' }}>Have at least one lowercase letters</b>)
                data = true
            } else {
                tooltipData2.push('Have at least one lowercase letters')
            }

        }
        if (this.state.symbols) {
            if (/([-!$%^&*#+?_=:';]+)/g.test(value.target.value)) {
                tooltipData2.push(<b style={{ color: 'green' }}>Have at least one symbols</b>)
                data = true
            } else {
                tooltipData2.push('Have at least one symbols')
            }
        }
        if (this.state.special_characters) {
            if (/([_:';!@#$%^&*)(+=._-]+)/g.test(value.target.value)) {
                tooltipData2.push(<b style={{ color: 'green' }}>Have at least one special character</b>)
                data = true
            } else {
                tooltipData2.push('Have at least one special character')
            }
        }
        var pattern = new RegExp("[" + value.target.value + "]{" + minimumLenght + ",}$", 'g')
        if (value.target.value.match(pattern)) {
            tooltipData2.push(<b style={{ color: 'green' }}>Be at least {minimumLenght} characters</b>)
            data = true
        } else {
            tooltipData2.push(`${"Be at least " + minimumLenght + "characters"}`)
        }
        if (value.target.value.match(pattern)) {
            tooltipData2.push(<b style={{ color: 'green' }}>Maximum {maximunLengh} characters</b>)
            data = true
        } else {
            tooltipData2.push(`${"Maximum " + maximunLengh + " characters"}`)
        }

        var tooltipData1 = <span>Password must:
        <ul>
                {tooltipData2 && tooltipData2.map(data => <li>{data}</li>)}

            </ul>
        </span>
        if (data) {
            this.setState({ allTooltipData: tooltipData1 })

        } else {
            this.setState({ allTooltipData: tooltipData })

        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { error, encrypted_data, showConfirmPassword } = this.state;


        return (
            <React.Fragment>
                <div className="gx-login-container auth-bg" style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <div className="gx-login-content">
                        <div className="gx-login-header gx-text-center">
                            <img
                                className="gx-login-title"
                                src={loginLogo}
                                style={{ height: 70 }}
                                alt="company logo"
                            />
                        </div>
                        <div className="gx-login-header gx-text-center">
                            <h5 className="gx-login-title"><b>Welcome, {this.state.name}</b> </h5>
                        </div>
                        <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
                            {
                                error && (
                                    <FormItem>
                                        <Alert
                                            message={error}
                                            type="error"
                                            closable
                                        />
                                    </FormItem>
                                )
                            }
                            <FormItem>
                                <ReactIsCapsLockActive>
                                    {
                                        active => active
                                            ? <Alert
                                                message='Warning : Caps lock is on'
                                                type="warning"
                                                closable
                                            />
                                            : null
                                    }
                                </ReactIsCapsLockActive>
                            </FormItem>
                            <Form.Item style={{ display: 'none' }}>
                                {getFieldDecorator("encrypted_data", {
                                    rules: [
                                        {
                                            required: false
                                        }
                                    ],
                                    initialValue: encrypted_data
                                })(<Input />)}
                            </Form.Item>
                            <Tooltip placement="bottom" title={this.state.allTooltipData}>
                                <Form.Item label="New password" hasFeedback>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                message: 'Please enter correct Credentials',
                                                pattern: new RegExp("^" + data + "[" + array + "]{" + minimumLenght + "," + maximunLengh + "}$", 'g')
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your new password!',
                                            },
                                            {
                                                validator: this.validateToNextPassword,
                                            },
                                        ],
                                    })(
                                        <Input.Password
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            size="small"
                                            onChange={this.passwordChange}
                                        ></Input.Password>
                                    )}
                                </Form.Item>
                            </Tooltip>
                            {showConfirmPassword ? <Form.Item label="Confirm Password" hasFeedback>
                                {getFieldDecorator('confirm', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        {
                                            validator: this.compareToFirstPassword,
                                        },
                                    ],
                                })(
                                    <Input.Password
                                        size="small"
                                        onBlur={this.handleConfirmBlur}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />
                                )}
                            </Form.Item> : <Form.Item label="Confirm Password" hasFeedback>
                                    {getFieldDecorator('confirm', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please confirm your password!',
                                            },
                                            {
                                                validator: this.compareToFirstPassword,
                                            },
                                        ],
                                    })(
                                        <Input.Password
                                            disabled
                                            size="small"
                                            onBlur={this.handleConfirmBlur}
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    )}
                                </Form.Item>}


                            <FormItem className="gx-text-center">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={this.state.loading}
                                >
                                    Submit
                                </Button>
                                <Button
                                    type="reset"
                                    htmlType="reset"
                                    // loading={this.state.loading}
                                    onClick={this.resetPassword}
                                >
                                    Cancel
                                 </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(ConfirmEmail);

export default WrappedNormalLoginForm;