/**
 * Status response
 */
export const INVALID_ID_PASSWORD_TEXT = 'invalid-password';

export const PASSWORD_EXPIRED_TEXT = 'password-expired';
export const INVALID_OTP = 'One Time Password(OTP) is not valid.';
export const SUCCESS = 'Success';
export const INVALID_TOKEN_TEXT = 'Invalid token';
export const INTERNAL_SERVER_ERROR_TEXT = 'Internal Server Error';
export const SERVER_STOP_TEXT = 'Server is not running';

export const SUCCESS_CODE = 200;
export const OTP_EXPIRED = 700;
export const SERVER_STOP_CODE = 100;
export const FAILURE_CODE = 100;
export const INVALID_AUTHENTICATION_CODE = 401;
export const INTERNAL_SERVER_ERROR_CODE = 500;
export const INVALID_TOKEN_CODE = 403;

/**
 * Role Configuration
 */
export const ADMINISTRATOR = 'SUPER_ADMIN';
export const PATIENT = 'PATIENT';
export const SECRETORY = 'SECRETORY';
export const DOCTOR = 'DOCTOR';
export const NURSE = 'NURSE';



/**
 * Common URLs (Role = PUBLIC)
 */
export const DASHBOARD = "/";

export const SIGNUP = `/signup`;
export const LOGIN = `/login`;
export const ACCESS_DENIED = `/access-denied`;
export const LOGOUT = `/logout`;
export const FORGOT_PASSWORD = `/forgotpassword`;
export const ACCEPT_INVITATION = `/invitation/checking`;

//otp text
export const IS_EMAIL = false;


/**
 * URLs
 */


export const SUPER_ADMIN_BID_LIST = `/main/bid`;
export const SUPER_ADMIN_ADD_BID_LIST = `/main/bid/add`;
export const SUPER_ADMIN_EDIT_BID_LIST = `/main/bid/edit`;
export const SUPER_ADMIN_ITEMS_LIST = `/main/items`;
export const SUPER_ADMIN_ITEMS_LIST_ADD = `/main/items/add`;
export const SUPER_ADMIN_ITEMS_LIST_EDIT = `/main/items/edit`;
export const SUPER_ADMIN_CUSTOMER = `/main/customer`;
export const SUPER_ADMIN_CUSTOMER_ADD = `/main/customer/add`;
export const SUPER_ADMIN_CUSTOMER_EDIT = `/main/customer/edit`;
export const SUPER_ADMIN_BASIC_INFO = `/main/profile/basic-info`;
export const SUPER_ADMIN_EMAILTEMPLATES_LIST = `/main/emailtemplates/`;
export const SUPER_ADMIN_EMAILTEMPLATES_LIST_ADD = `/main/emailtemplates/add`;
export const SUPER_ADMIN_EMAIL_SERVICE = `/main/emailserver`;
export const SUPER_ADMIN_EMAIL_SERVICE_ADD = `/main/emailserver/add`;
export const SUPER_ADMIN_WEBRTC_CONFIG = `/main/webrtcconfig`;
export const SUPER_ADMIN_WEBRTC_CONFIG_ADD = `/main/webrtcconfig/add`;


