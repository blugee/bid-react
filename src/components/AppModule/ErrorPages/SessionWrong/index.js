import React from "react";

import wrongImage from '../../../../assets/images/wrong.jpg';

const SessionWrong = () => (
  <div className="gx-page-error-container" style={{backgroundColor: '#fff'}}>
    <div className="gx-page-error-content" style={{width: '468px'}}>
      <div className="gx-error-code gx-mb-4">
        <img src={wrongImage} alt=''/>
      </div>
      <h2 className="gx-text-center">
        <span>Aaaah! Other session is active. Please close that and try again later!</span>
      </h2>
    </div>
  </div>
);

export default SessionWrong;
