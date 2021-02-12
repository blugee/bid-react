import React from "react";
import {Link} from "react-router-dom";

import IntlMessages from "util/IntlMessages";
import wrongImage from '../../../../assets/images/wrong.jpg';

const SomethingWrong = () => (
  <div className="gx-page-error-container" style={{backgroundColor: '#fff'}}>
    <div className="gx-page-error-content" style={{width: '468px'}}>
      <div className="gx-error-code gx-mb-4">
        <img src={wrongImage} alt=''/>
      </div>
      <h2 className="gx-text-center">
        <span>Aaaah! Something went wrong!</span>
      </h2>
      <p className="gx-text-center">
        <Link className="gx-btn gx-btn-primary" to="/"><IntlMessages id="extraPages.goHome"/></Link>
      </p>
    </div>
  </div>
);

export default SomethingWrong;
