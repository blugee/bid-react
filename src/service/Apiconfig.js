/**
 * This is base URL for api call
 */


export var BASE_URL = "";
export var CHECKVPN = "";
export var CRYPTO_SECRET = "";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
{
    BASE_URL = "http://localhost:8080/api/";
    CHECKVPN = false;
    CRYPTO_SECRET = "I_LOVE_DOCTOR_APP";
    
} else {
    BASE_URL = "https://shrouded-sands-42838.herokuapp.com/api/";
    CHECKVPN = false;
    CRYPTO_SECRET = "ss71AUVotev5geHS";
}


/**
* Basic URLs
*/

export const LOGIN_URL = BASE_URL + "auth/signin";
export const LOGOUT_URL = BASE_URL + "session/USER_ID/logout";
export const VERIFY_OTP = BASE_URL + "verify-otp";
export const FETCH_LOGGED_USER_DETAIL = BASE_URL + "users/manager";
export const VALIDATE_TOKEN = BASE_URL + 'validate-token';
export const USERS = BASE_URL + 'users';
export const GROUPS = BASE_URL + 'groups';
export const SERVICES = BASE_URL + 'services';
export const ADD_SERVICE = BASE_URL + 'services/add';
export const UPDATE_SERVICE = BASE_URL + 'services/update';
export const SERVICE_STATUS = BASE_URL + '/services/status';
export const RESET_PASSWORD = BASE_URL + 'change_password';
export const GET_USER_BY_UID = BASE_URL + "users/";
export const VERIFY_SYNC_TOKEN = BASE_URL + "sync-otp";
export const ENABLE_ORGANIZATION = BASE_URL + "organization/status";
export const ENABLE_USERS = BASE_URL + "users/enable";
export const DISABLE_USERS = BASE_URL + "users/disable";
export const CHANGE_PASSWORD_INTERNAL = BASE_URL + "users/USER_UID/resetPassword";
export const RESET_OTP = BASE_URL + "users/USER_UID/resetOtp";
export const ADD_SECRETORY = BASE_URL + "add-secretory";
export const ADD_PATIENT = BASE_URL + "add-patient";
export const UPDATE_ALL_USERS = BASE_URL + "edit-user";
export const ADD_DOCTOR = BASE_URL + "add-doctor";
export const USER = BASE_URL + 'user';
export const UPDATE_PROFILE = BASE_URL + 'edit-profile';
export const All_USER_STATUS = BASE_URL + 'user/status';


// export const RELOAD_BACKGROUND = "https://source.unsplash.com/random/"+document.body.clientWidth+"x"+document.body.clientHeight;
export const RELOAD_BACKGROUND = "https://source.unsplash.com/random/"+document.body.clientWidth+"x"+document.body.clientHeight+"/?wildlife,natural,city,car,nature,Fruits,food,table,water,plant,tree,animals,forest,road,cup,architecture,aerial"
// export const VPN_CONNECTION ="https://api.ipdata.co?api-key=82537d89fc8d2eeb8e021fa690a7921e9b49c8475ac2cb0e293651dd";
export const VPN_CONNECTION ="https://api.ipdata.co?api-key=302dfe833304031a8b463b68570efb291ec71bed37e1a87cafa96f0c";
