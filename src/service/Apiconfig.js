/**
 * This is base URL for api call
 */


export var BASE_URL = "";
export var CHECKVPN = "";
export var CRYPTO_SECRET = "";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    BASE_URL = "http://localhost:8080/api/";
    CHECKVPN = false;
    CRYPTO_SECRET = "I_LOVE_BID_APP";

} else {
    BASE_URL = "https://shrouded-sands-42838.herokuapp.com/api/";
    CHECKVPN = false;
    CRYPTO_SECRET = "ss71AUVotev5geHS";
}

