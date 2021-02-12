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

  static async VerifyOTP(body) {
    return ApiHelper.postAnonymousOTP("verify-otp", body);
  }
  static async VerifyEmail(body) {
    return ApiHelper.putAuthenticated("forgotpassword-sendemail", body);
  }
  static async ResetPassword(body) {
    return ApiHelper.putAuthenticated("forgotpassword", body);
  }
  static async ConfirmEmail(body) {
    return ApiHelper.putAuthenticated("confirm-email", body);
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
  static async PasswordPolicy(body) {
    return ApiHelper.postAnonymous("password-policy", body);
  }

}
export default AuthService;
