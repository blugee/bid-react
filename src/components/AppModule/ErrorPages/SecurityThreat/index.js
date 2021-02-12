import React from "react";

import IntlMessages from "util/IntlMessages";
import wrongImage from '../../../../assets/images/wrong.jpg';
import { Link } from "react-router-dom";


const SecurityThreat = () => (
  <div className="gx-page-error-container" style={{ backgroundColor: '#fff' }}>
    <div className="gx-page-error-content" style={{ width: '468px' }}>
      <div className="gx-error-code gx-mb-4">
        <img src={wrongImage} alt='' />
      </div>
      <h2 className="gx-text-center">
        <span>Aaaah! We Can't complete your request! Please remove VPN or proxy connection to access this!</span>
      </h2>
      <p className="gx-text-center">
        <Link className="gx-btn gx-btn-primary" to="/"><IntlMessages id="extraPages.goHome"/></Link>
      </p>
    </div>
  </div>
);

export default SecurityThreat;
