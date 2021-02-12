import React, {PureComponent} from 'react';


import SecondStep from "./SecondStep";
import '../Auth.css';


class ResetPassword extends PureComponent {
  state = {
    userDetails: {},
    activeStep: 0
  };
  
  handleNext = () => {
    this.setState(prevState => ({activeStep: prevState.activeStep + 1}));
  };

  render() {
    return (
      <div className="gx-login-container auth-bg" style={{   backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="gx-login-content">
          <SecondStep/>          
        </div>
      </div>
    );
  }
}

export default ResetPassword;
