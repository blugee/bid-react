import ApiHelper from "./ApiHelper";
import jwt from 'jsonwebtoken';
import Session from 'store2';
import * as apiURL from './Apiconfig';

class AuthService {
  static async Login(body) {
    return ApiHelper.postAnonymous("auth/signin", body);
  }

  static async SignUp(body) {
    return ApiHelper.postAnonymous("auth/signup", body);
  }

  static async ValidateToken(body) {
    return ApiHelper.getAuthenticated("validate-token", body);
  }

 

  static async checkVpnProxy() {
    return ApiHelper.postAnonymousCheckVPN(apiURL.VPN_CONNECTION, '')
  }
  static GetCurrentLoggedUserDetails() {
    const userAccessToken = Session.session('userAccessToken');
    if (userAccessToken) {

      return jwt.decode(userAccessToken.replace('Bearer ', ''));
    }
    return null;
  }


}
export default AuthService;
