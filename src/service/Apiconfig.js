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


// export const VPN_CONNECTION ="https://api.ipdata.co?api-key=82537d89fc8d2eeb8e021fa690a7921e9b49c8475ac2cb0e293651dd";
export const VPN_CONNECTION = "https://api.ipdata.co?api-key=302dfe833304031a8b463b68570efb291ec71bed37e1a87cafa96f0c";
