import ApiHelper from "./ApiHelper";
import * as apiURL from './Apiconfig';

class VPNService {
  static async Login(body) {
    return ApiHelper.postAnonymous("authenticate", body);
  }

  static async VerifyOTP(body) {
    return ApiHelper.postAnonymousOTP("verify-otp", body);
  }

  static async checkVpnProxy() {
    const requestOptions = {
      method: 'GET'
    };

    return fetch(apiURL.VPN_CONNECTION, requestOptions)
      .then(this.handleResponse)
      .then(data => {
        return data;
      }).catch(error => {
        console.log(error);
        return "Failed";
      });
  }
  
  static handleResponse(response) {
    return response.text().then(text => {
      return text && JSON.parse(text);
    });
  }
  
}
export default VPNService;
